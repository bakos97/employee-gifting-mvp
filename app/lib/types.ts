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

export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'BIRTHDAY' | 'ANNIVERSARY' | 'LEAVING' | 'CHRISTMAS';
  image?: string; // Optional for now
}

export type EventType = 'BIRTHDAY' | 'ANNIVERSARY' | 'LEAVING' | 'CHRISTMAS';

export interface GiftEvent {
  id: string;
  employeeId: string;
  type: EventType;
  date: string; // The date of the event for the current year
  status: 'UPCOMING' | 'PENDING_ACTION' | 'COMPLETED';
  selectedGiftId?: string;
  cardId?: string;
}

export interface EventState {
  id: string; // The event ID (e.g. evt_bd_emp1_2026)
  selectedGiftId?: string;
  cardId?: string;
  status: 'UPCOMING' | 'PENDING_ACTION' | 'COMPLETED';
}

export interface Card {
  id: string;
  eventId: string;
  recipientName: string;
  title: string;
  signatures: {
    id: string;
    name: string;
    message: string;
    createdAt: string;
  }[];
  status: 'DRAFT' | 'SENT';
}

export interface AppData {
  employees: Employee[];
  gifts: Gift[];
  // We don't store "events" as they are calculated, but we store their state
  eventStates: Record<string, EventState>;
  cards: Card[];
}
