import { EventCategory } from "src/enums";

export interface CreateEventDto {
  title: string;
  description: string;
  category: EventCategory;
  eventDate: string;
  location: string;
};