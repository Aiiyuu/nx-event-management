import { create } from 'zustand';
import { AxiosError } from 'axios';
import { ValidationError } from 'next/dist/compiled/amphtml-validator';
import { EventCategory, PaginatedEvents, Event, EventSort } from '@/types/events';
import { ApiErrorResponse } from '@/types/api-error';
import api from '@/lib/axios';

interface EventsState {
  events: Event[];
  recommendations: Event[];
  total: number;
  currentEvent: Event | null;
  isLoading: boolean;
  error: string | null;
  fieldErrors: ValidationError | null;

  categories: EventCategory[];
  sort: EventSort;
  page: number;
  limit: number;
  searchQuery: string;

  fetchAll: () => Promise<void>;
  search: (query: string) => void;
  setSearchQuery: (query: string) => void;
  fetchById: (id: string) => Promise<void>;
  addEvent: (eventData: Partial<Event>) => Promise<void>;
  updateEvent: (id: string, updateEventDto: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  setCategories: (categories: EventCategory[]) => void;
  setSort: (sort: EventSort) => void;
  setPage: (page: number) => void;
  clearErrors: () => void;
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  recommendations: [],
  total: 0,
  currentEvent: null,
  isLoading: false,
  error: null,
  fieldErrors: null,

  categories: [],
  sort: EventSort.DATE_DESC,
  searchQuery: '',
  page: 1,
  limit: 10,

  clearErrors: () => set({ error: null, fieldErrors: null }),

  setCategories: (categories) => {
    set({ categories, page: 1 });
    get().fetchAll();
  },

  setSort: (sort) => {
    set({ sort, page: 1 });
    get().fetchAll();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, page: 1 });
    get().fetchAll();
  },

  search: (query) => {
    get().setSearchQuery(query);
  },

  setPage: (page) => {
    set({ page });
    get().fetchAll();
  },

  fetchAll: async () => {
    const { categories, page, limit, searchQuery } = get();
    set({ isLoading: true, error: null });

    try {
      const categoryQuery = categories.length ? `&category=${categories.join(',')}` : '';
      const queryString = searchQuery
        ? `/events/search?q=${encodeURIComponent(searchQuery)}&page=${page}&limit=${limit}${categoryQuery}`
        : `/events?page=${page}&limit=${limit}${categoryQuery}`;

      const { data } = await api.get<PaginatedEvents>(queryString);

      set({
        events: data.data,
        total: data.total,
        recommendations: data.recommendations || [],
        isLoading: false,
      });
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set({
        error: axiosError.response?.data?.message?.toString() || 'Fetch failed',
        isLoading: false,
      });
    }
  },

  fetchById: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await api.get<Event>(`/events/${id}`);
      set({ currentEvent: data, isLoading: false });
    } catch {
      set({ error: 'Event not found', isLoading: false });
    }
  },

  addEvent: async (eventData) => {
    set({ isLoading: true, error: null, fieldErrors: null });

    try {
      const { data } = await api.post<Event>('/events', eventData);

      set((state) => ({
        events: [data, ...state.events],
        total: state.total + 1,
        isLoading: false,
      }));
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;

      set({
        fieldErrors: axiosError.response?.data?.errors || null,
        error: axiosError.response?.data?.message?.toString() || 'Create failed',
        isLoading: false,
      });
    }
  },

  updateEvent: async (id, updateEventDto) => {
    set({ isLoading: true, error: null, fieldErrors: null });

    try {
      const { data } = await api.patch<Event>(`/events/${id}`, updateEventDto);

      set((state) => ({
        events: state.events.map((e) => (e.id === id ? data : e)),
        currentEvent: data,
        isLoading: false,
      }));
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;

      set({
        fieldErrors: axiosError.response?.data?.errors || null,
        error: axiosError.response?.data?.message?.toString() || 'Update failed',
        isLoading: false,
      });
    }
  },

  deleteEvent: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await api.delete(`/events/${id}`);

      set((state) => ({
        events: state.events.filter((e) => e.id !== id),
        total: state.total - 1,
        isLoading: false,
      }));
    } catch {
      set({ error: 'Delete failed', isLoading: false });
    }
  },
}));
