export type EventCategory = 'work' | 'personal' | 'other';

export interface Event {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  category: EventCategory;
}

