'use client';

import { Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import { SelectField } from '@org/ui-components';
import { useEventsStore } from '@/store/events';
import { EventCategory } from '@org/models';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { EventSort } from '@/types/events';

export const CATEGORY_OPTIONS = [
  { label: 'Conference', value: EventCategory.CONFERENCE },
  { label: 'Meetup', value: EventCategory.MEETUP },
  { label: 'Workshop', value: EventCategory.WORKSHOP },
  { label: 'Webinar', value: EventCategory.WEBINAR },
  { label: 'Social', value: EventCategory.SOCIAL },
];

export const SORT_OPTIONS = [
  { label: 'Newest first', value: EventSort.DATE_DESC },
  { label: 'Oldest first', value: EventSort.DATE_ASC },
  { label: 'Title (A–Z)', value: EventSort.TITLE_ASC },
  { label: 'Title (Z–A)', value: EventSort.TITLE_DESC },
];

export const EventsHeader = () => {
  const { categories, sort, total, setCategories, setSort, search } = useEventsStore();
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    search(debouncedQuery);
  }, [debouncedQuery, categories, search]);

  return (
    <Box mb={4}>
      <Typography variant="h5" mb={2}>
        Events
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <SelectField
          label="Category"
          name="category"
          multiple
          value={categories}
          options={CATEGORY_OPTIONS}
          onChange={(event) => {
            const value = event.target.value;
            setCategories(
              typeof value === 'string' ? [value as EventCategory] : (value as EventCategory[])
            );
          }}
        />

        <SelectField
          label="Sort by"
          name="sort"
          value={sort}
          options={SORT_OPTIONS}
          onChange={(event) => setSort(event.target.value as EventSort)}
        />

        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Stack>

      <Typography variant="body2" color="text.secondary" mt={2}>
        Total events: {total}
      </Typography>
    </Box>
  );
};
