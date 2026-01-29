import EventsPage from './events/page';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { eventsQueryFn, eventsQueryKey } from '@/services/events';
import { Metadata } from 'next';

export const revalidate = 60;

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: eventsQueryKey(1, '', []),
    queryFn: () => eventsQueryFn(1, '', []),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventsPage />
    </HydrationBoundary>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const events = await eventsQueryFn(1, '', []);

  if (!events || events.data.length === 0) {
    return {
      title: 'No events found',
      description: 'There are currently no events available.',
    };
  }

  return {
    title: 'Events',
    description: 'Browse upcoming events.',
  };
}
