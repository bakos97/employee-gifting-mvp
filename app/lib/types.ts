export interface Employee {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string; // ISO Date YYYY-MM-DD
  startDate: string; // ISO Date YYYY-MM-DD
  leavingDate?: string; // ISO Date YYYY-MM-DD
  department?: string;
  avatarUrl?: string;
}

export interface CelebrationPage {
  id: string;
  employeeId: string;
  slug: string;
  templateId: 'classic' | 'modern';
  status: 'DRAFT' | 'PUBLISHED';
  content: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage?: string;
    stats: { label: string; value: string; }[];
    timeline: { year: string; title: string; description: string; }[];
    gallery: { src: string; caption: string; }[];
    messages: { name: string; title: string; text: string; avatar?: string; }[];
  };
  createdAt: string;
  updatedAt: string;
}

export type EventType = 'BIRTHDAY' | 'ANNIVERSARY' | 'LEAVING' | 'CHRISTMAS';

export interface GiftEvent {
  id: string;
  employeeId: string;
  type: EventType;
  date: string; // The date of the event for the current year
  status: 'UPCOMING' | 'PENDING_ACTION' | 'COMPLETED';
  pageId?: string; // Replaces selectedGiftId/cardId
}

export interface EventState {
  id: string; // The event ID (e.g. evt_bd_emp1_2026)
  pageId?: string;
  status: 'UPCOMING' | 'PENDING_ACTION' | 'COMPLETED';
}

export interface AppData {
  employees: Employee[];
  pages: CelebrationPage[];
  eventStates: Record<string, EventState>;
}
