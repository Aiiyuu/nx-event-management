'use client';

import { useMemo, useState } from 'react';
import { EventList } from './components/EventList';
import { EventsHeader } from './components/EventsHeader';
import { EventsFooter } from './components/EventsFooter';
import { useEvents } from '@/services/events';
import { useDebounce } from '@/hooks/useDebounce';
import { EventCategory, EventSort } from '@org/models';
import { sortEvents } from '@/utils/events';

const EVENTS_LIMIT = 10;

export default function EventsPage() {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState<EventSort>(EventSort.DATE_DESC);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const { data: events, isLoading } = useEvents(
    page,
    EVENTS_LIMIT,
    debouncedSearch,
    categories
  );

  const sortedEvents = useMemo(() => {
    if (!events?.data) return [];

    return sortEvents(events.data, sort);
  }, [events?.data, sort]);

  const handleCategoriesChange = (val: EventCategory[]) => {
    setCategories(val);
    setPage(1);
  };

  const handleQueryChange = (val: string) => {
    setSearchQuery(val);
    setPage(1);
  };

  const handleSortChange = (val: EventSort) => {
    setSort(val);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="events">
      <EventsHeader
        categories={categories}
        onCategoriesChange={handleCategoriesChange}
        query={searchQuery}
        onQueryChange={handleQueryChange}
        sort={sort}
        onSortChange={handleSortChange}
        total={events?.total}
      />

      <EventList events={sortedEvents} isLoading={isLoading} />

      <EventsFooter
        page={page}
        onPageChange={handlePageChange}
        total={events?.total ?? 0}
        limit={EVENTS_LIMIT}
      />
    </div>
  );
}
