import {
  ApiErrorResponse,
  CreateEventDto,
  Event,
  EventCategory,
  EventDetailResponse,
  PaginatedEvents,
} from '@org/models';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data as ApiErrorResponse);
    }

    const fallbackError: ApiErrorResponse = {
      message: error.message || 'An unexpected error occurred',
      error: 'Internal Server Error',
      statusCode: error.response?.status || 500,
    };

    return Promise.reject(fallbackError);
  }
);

export const api = {
  events: {
    getAll: async (
      page = 1,
      limit = 10,
      searchQuery = '',
      categories: EventCategory[] = []
    ): Promise<PaginatedEvents> => {
      const categoryQuery = categories.length
        ? `&category=${categories.join(',')}`
        : '';

      const queryString = searchQuery
        ? `/events/search?q=${encodeURIComponent(
            searchQuery
          )}&page=${page}&limit=${limit}${categoryQuery}`
        : `/events?page=${page}&limit=${limit}${categoryQuery}`;

      const { data } = await axiosInstance.get<PaginatedEvents>(queryString);
      return data;
    },

    getOne: async (id: Event['id']): Promise<EventDetailResponse> => {
      const { data } = await axiosInstance.get<EventDetailResponse>(
        `/events/${id}`
      );
      return data;
    },

    create: async (eventData: CreateEventDto): Promise<Event> => {
      const { data } = await axiosInstance.post<Event>('/events', eventData);
      return data;
    },

    update: async (
      id: Event['id'],
      eventData: Partial<CreateEventDto>
    ): Promise<Event> => {
      const { data } = await axiosInstance.patch<Event>(
        `/events/${id}`,
        eventData
      );
      return data;
    },

    delete: async (id: Event['id']): Promise<void> => {
      await axiosInstance.delete(`/events/${id}`);
    },
  },
};
