import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@org/api-client';
import { ApiErrorResponse, CreateEventDto } from '@org/models';
import { Event } from '@org/models';

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation<Event, ApiErrorResponse, CreateEventDto>({
    mutationFn: (data) => api.events.create(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation<
    Event,
    ApiErrorResponse,
    { id: Event['id']; data: Partial<CreateEventDto> }
  >({
    mutationFn: ({ id, data }) => api.events.update(id, data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['events', { id: data.id }],
      });
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, string>({
    mutationFn: (id) => api.events.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}
