import { EventCategory } from "../../enums";

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
