'use client';

import {
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { SelectField } from '@org/ui-components';
import { EventCategory, CATEGORY_OPTIONS, EventSort } from '@org/models';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from 'react';

export const SORT_OPTIONS = [
  { label: 'Newest first', value: EventSort.DATE_DESC },
  { label: 'Oldest first', value: EventSort.DATE_ASC },
  { label: 'Title (A–Z)', value: EventSort.TITLE_ASC },
  { label: 'Title (Z–A)', value: EventSort.TITLE_DESC },
];

interface Props {
  total?: number;
  categories: EventCategory[];
  query: string;
  sort: EventSort;
  onCategoriesChange: (val: EventCategory[]) => void;
  onQueryChange: (val: string) => void;
  onSortChange: (val: EventSort) => void;
}

export const EventsHeader = ({
  total,
  categories,
  query,
  sort,
  onCategoriesChange,
  onQueryChange,
  onSortChange,
}: Props) => {
  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value;
    const normalizedValue = Array.isArray(value)
      ? (value as EventCategory[])
      : [value as EventCategory];

    onCategoriesChange(normalizedValue);
  };

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    onSortChange(event.target.value as EventSort);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

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
          onChange={handleCategoryChange}
        />

        <SelectField
          label="Sort by"
          name="sort"
          value={sort}
          options={SORT_OPTIONS}
          onChange={handleSortChange}
        />

        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={query}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton aria-label="search button">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Stack>

      <Typography variant="body2" color="text.secondary" mt={2}>
        Total events: {total ?? 0}
      </Typography>
    </Box>
  );
};
