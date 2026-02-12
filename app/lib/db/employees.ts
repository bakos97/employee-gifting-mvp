import { createClient } from '../supabase/server';
import { Employee } from '../types';

export async function getEmployees(): Promise<Employee[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('name');

  if (error) throw error;
  return data ?? [];
}

export async function getEmployee(id: string): Promise<Employee | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createEmployee(employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>): Promise<Employee> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('employees')
    .insert(employee)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateEmployee(id: string, updates: Partial<Omit<Employee, 'id' | 'created_at'>>): Promise<Employee> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('employees')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteEmployee(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function upsertEmployeeByEmail(employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>): Promise<{ action: 'created' | 'skipped' }> {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from('employees')
    .select('id')
    .eq('email', employee.email)
    .single();

  if (existing) {
    return { action: 'skipped' };
  }

  const { error } = await supabase
    .from('employees')
    .insert(employee);

  if (error) throw error;
  return { action: 'created' };
}
