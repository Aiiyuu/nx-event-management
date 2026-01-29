import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { api } from '@org/api-client';
import { EventCategory, Event } from '@org/models';

export const EVENTS_LIMIT = 10;

export const eventsQueryKey = (
  page?: number,
  searchQuery?: string,
  categories?: EventCategory[]
) => ['events', { page, limit: EVENTS_LIMIT, searchQuery, categories }] as const;

export const eventsQueryFn = (
  page?: number,
  searchQuery?: string,
  categories?: EventCategory[]
) => api.events.getAll(page, EVENTS_LIMIT, searchQuery, categories);

export function useEvents(
  page?: number,
  searchQuery?: string,
  categories?: EventCategory[]
) {
  return useQuery({
    queryKey: eventsQueryKey(page, searchQuery, categories),
    queryFn: () => eventsQueryFn(page, searchQuery, categories),
    placeholderData: keepPreviousData,
  });
}

export const eventQueryKey = (id: Event['id']) => ['events', { id }] as const;
export const eventQueryFn = (id: Event['id']) => api.events.getOne(id);

export function useEvent(id: Event['id']) {
  return useQuery({
    queryKey: eventQueryKey(id),
    queryFn: () => eventQueryFn(id),
    enabled: !!id,
  });
}
