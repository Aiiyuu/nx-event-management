'use client';

import { useEffect } from 'react';
import { EventList } from './components/EventList';
import { EventsHeader } from './components/EventsHeader';
import { useEventsStore } from '@/store/events';
import { EventsFooter } from './components/EventsFooter';

export default function EventsPage() {
  const { fetchAll, categories, sort } = useEventsStore();

  useEffect(() => {
    fetchAll();
  }, [fetchAll, categories, sort]);

  return (
    <div className="events">
      <EventsHeader />
      <EventList />
      <EventsFooter />
    </div>
  );
}
