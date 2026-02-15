export interface Employee {
  id: string;
  name: string;
  email: string;
  date_of_birth: string;
  start_date: string;
  leaving_date?: string | null;
  department?: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type CelebrationType = 'birthday' | 'anniversary' | 'farewell' | 'custom';
export type CelebrationStatus = 'draft' | 'collecting' | 'published' | 'archived';

export interface Celebration {
  id: string;
  employee_id: string;
  type: CelebrationType;
  custom_type_label?: string | null;
  title: string;
  description?: string | null;
  event_date?: string | null;
  status: CelebrationStatus;
  share_token: string;
  created_at?: string;
  updated_at?: string;
}

export interface Question {
  id: string;
  celebration_id: string;
  text: string;
  sort_order: number;
  allow_image: boolean;
  is_required: boolean;
  created_at?: string;
}

export interface Response {
  id: string;
  question_id: string;
  celebration_id: string;
  contributor_name: string;
  contributor_email?: string | null;
  text_response?: string | null;
  image_url?: string | null;
  created_at?: string;
}

export interface CelebrationWithDetails extends Celebration {
  employee: Employee;
  questions: Question[];
  response_count: number;
  contributor_count: number;
}

export interface GiftCardData {
  brand: string;
  value: string;
  message?: string;
}

export interface TributePageData {
  celebration: Celebration;
  employee: Employee;
  questions: (Question & { responses: Response[] })[];
  contributors: string[];
  giftCard?: GiftCardData;
}

export interface ImportResult {
  success: number;
  skipped: number;
  errors: string[];
}

export type InvitationStatus = 'pending' | 'sent' | 'failed';

export interface Invitation {
  id: string;
  celebration_id: string;
  employee_id: string;
  email: string;
  status: InvitationStatus;
  sent_at?: string | null;
  reminder_sent_at?: string | null;
  error_message?: string | null;
  created_at?: string;
}

export interface InvitationWithEmployee extends Invitation {
  employee: Employee;
}
