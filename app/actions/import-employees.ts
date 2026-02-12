'use server';

import { revalidatePath } from 'next/cache';
import * as XLSX from 'xlsx';
import { upsertEmployeeByEmail } from '../lib/db/employees';
import { ImportResult } from '../lib/types';

const COLUMN_MAPPINGS: Record<string, string> = {
  // Norwegian
  'navn': 'name',
  'e-post': 'email',
  'epost': 'email',
  'fødselsdato': 'date_of_birth',
  'startdato': 'start_date',
  'avdeling': 'department',
  // English
  'name': 'name',
  'email': 'email',
  'date of birth': 'date_of_birth',
  'dateofbirth': 'date_of_birth',
  'start date': 'start_date',
  'startdate': 'start_date',
  'department': 'department',
};

function normalizeColumnName(col: string): string | null {
  const normalized = col.toLowerCase().trim();
  return COLUMN_MAPPINGS[normalized] ?? null;
}

function parseDate(value: unknown): string | null {
  if (!value) return null;

  // XLSX may return a number (Excel serial date)
  if (typeof value === 'number') {
    const date = XLSX.SSF.parse_date_code(value);
    if (date) {
      const y = date.y;
      const m = String(date.m).padStart(2, '0');
      const d = String(date.d).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
  }

  const str = String(value).trim();

  // Try ISO format YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

  // Try DD.MM.YYYY (Norwegian format)
  const dotMatch = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (dotMatch) {
    return `${dotMatch[3]}-${dotMatch[2].padStart(2, '0')}-${dotMatch[1].padStart(2, '0')}`;
  }

  // Try DD/MM/YYYY
  const slashMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    return `${slashMatch[3]}-${slashMatch[2].padStart(2, '0')}-${slashMatch[1].padStart(2, '0')}`;
  }

  return null;
}

export async function importEmployees(formData: FormData): Promise<ImportResult> {
  const file = formData.get('file') as File;
  if (!file) return { success: 0, skipped: 0, errors: ['Ingen fil valgt'] };

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return { success: 0, skipped: 0, errors: ['Ingen ark funnet i filen'] };

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

  if (rows.length === 0) return { success: 0, skipped: 0, errors: ['Filen er tom'] };

  // Map columns
  const firstRow = rows[0];
  const columnMap: Record<string, string> = {};
  for (const key of Object.keys(firstRow)) {
    const mapped = normalizeColumnName(key);
    if (mapped) {
      columnMap[key] = mapped;
    }
  }

  // Validate required columns
  const mappedValues = Object.values(columnMap);
  const required = ['name', 'email', 'date_of_birth', 'start_date'];
  const missing = required.filter(r => !mappedValues.includes(r));
  if (missing.length > 0) {
    return { success: 0, skipped: 0, errors: [`Mangler påkrevde kolonner: ${missing.join(', ')}`] };
  }

  const result: ImportResult = { success: 0, skipped: 0, errors: [] };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 2; // 1-indexed + header

    try {
      const mapped: Record<string, string | null> = {};
      for (const [original, target] of Object.entries(columnMap)) {
        mapped[target] = row[original] != null ? String(row[original]).trim() : null;
      }

      if (!mapped.name || !mapped.email) {
        result.errors.push(`Rad ${rowNum}: Mangler navn eller e-post`);
        continue;
      }

      const dob = parseDate(row[Object.keys(columnMap).find(k => columnMap[k] === 'date_of_birth')!]);
      const startDate = parseDate(row[Object.keys(columnMap).find(k => columnMap[k] === 'start_date')!]);

      if (!dob) {
        result.errors.push(`Rad ${rowNum}: Ugyldig fødselsdato`);
        continue;
      }
      if (!startDate) {
        result.errors.push(`Rad ${rowNum}: Ugyldig startdato`);
        continue;
      }

      const { action } = await upsertEmployeeByEmail({
        name: mapped.name,
        email: mapped.email,
        date_of_birth: dob,
        start_date: startDate,
        department: mapped.department || null,
      });

      if (action === 'created') {
        result.success++;
      } else {
        result.skipped++;
      }
    } catch (err) {
      result.errors.push(`Rad ${rowNum}: ${err instanceof Error ? err.message : 'Ukjent feil'}`);
    }
  }

  revalidatePath('/', 'layout');
  return result;
}
