import { EventCategory } from '@org/models';

export const CATEGORY_OPTIONS = [
  { label: 'Conference', value: EventCategory.CONFERENCE },
  { label: 'Meetup', value: EventCategory.MEETUP },
  { label: 'Workshop', value: EventCategory.WORKSHOP },
  { label: 'Webinar', value: EventCategory.WEBINAR },
  { label: 'Social', value: EventCategory.SOCIAL },
];

export enum EventSort {
  DATE_DESC = 'DATE_DESC',
  DATE_ASC = 'DATE_ASC',
  TITLE_ASC = 'TITLE_ASC',
  TITLE_DESC = 'TITLE_DESC',
}

export interface Event {
  id: string;
  title: string;
  location: string;
  description: string;
  eventDate: string;
  category: EventCategory;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedEvents {
  data: Event[];
  total: number;
  recommendations?: Event[];
}

export interface EventDetailResponse {
  event: Event;
  recommendations: Event[];
}
