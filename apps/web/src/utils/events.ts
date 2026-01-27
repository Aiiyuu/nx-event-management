import { Event, EventSort } from '@/types/events';

export function sortEvents(events: Event[], sort: EventSort): Event[] {
  return [...events].sort((a, b) => {
    switch (sort) {
      case EventSort.DATE_DESC:
        return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
      case EventSort.DATE_ASC:
        return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
      case EventSort.TITLE_ASC:
        return a.title.localeCompare(b.title);
      case EventSort.TITLE_DESC:
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
}
