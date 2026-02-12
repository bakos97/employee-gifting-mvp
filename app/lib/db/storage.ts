import { createAdminClient } from '../supabase/admin';

const BUCKET = 'tribute-images';

export async function uploadImage(
  celebrationId: string,
  responseId: string,
  file: File
): Promise<string> {
  const admin = createAdminClient();

  const ext = file.name.split('.').pop() || 'jpg';
  const filePath = `celebrations/${celebrationId}/${responseId}/${Date.now()}.${ext}`;

  const { error } = await admin.storage
    .from(BUCKET)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) throw error;

  const { data } = admin.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  const admin = createAdminClient();

  // Extract path from public URL
  const bucketUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;
  const filePath = url.replace(bucketUrl, '');

  if (!filePath) return;

  const { error } = await admin.storage
    .from(BUCKET)
    .remove([filePath]);

  if (error) throw error;
}

export function getPublicUrl(path: string): string {
  const admin = createAdminClient();
  const { data } = admin.storage
    .from(BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}
