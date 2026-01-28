import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { api } from '@org/api-client';
import { EventCategory, Event } from '@org/models';

export function useEvents(
  page?: number,
  limit?: number,
  searchQuery?: string,
  categories?: EventCategory[]
) {
  return useQuery({
    queryKey: ['events', { page, limit, searchQuery, categories }],
    queryFn: () => api.events.getAll(page, limit, searchQuery, categories),
    placeholderData: keepPreviousData,
  });
}

export function useEvent(id: Event['id']) {
  return useQuery({
    queryKey: ['events', { id }],
    queryFn: () => api.events.getOne(id),
    enabled: !!id,
  });
}
