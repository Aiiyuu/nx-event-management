'use client';

import React from 'react';
import { Stack, Grid, Button, Box } from '@mui/material';
import { FormField, FormTextArea, SelectField } from '@org/ui-components';
import { CATEGORY_OPTIONS } from '@org/models';
import { CreateEventDto } from '@org/models';
import { ErrorMessage } from '../ErrorMessage';


interface Props {
  formState: Partial<CreateEventDto>;
  fieldErrors: Record<string, string> | null;
  isLoading: boolean;
  setFormState: React.Dispatch<React.SetStateAction<Partial<CreateEventDto>>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export const CreateEventForm = ({
  formState,
  setFormState,
  fieldErrors,
  isLoading,
  onSubmit,
}: Props) => {
  const updateField = (name: keyof CreateEventDto, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Stack component="form" onSubmit={onSubmit} spacing={3}>
      <Box>
        <FormField
          name="title"
          label="Title"
          value={formState.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
        />

        <ErrorMessage field="title" fieldErrors={fieldErrors} />
      </Box>

      <Box>
        <SelectField
          name="category"
          label="Category"
          value={formState.category || ''}
          options={CATEGORY_OPTIONS}
          onChange={(e) => updateField('category', e.target.value as string)}
        />

        <ErrorMessage field="category" fieldErrors={fieldErrors} />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormField
            name="eventDate"
            label="Date & Time"
            type="datetime-local"
            value={formState.eventDate || ''}
            onChange={(e) => updateField('eventDate', e.target.value)}
            sx={{
              '& input::-webkit-calendar-picker-indicator': {
                filter: 'invert(1)',
                cursor: 'pointer',
              },
            }}
          />

          <ErrorMessage field="eventDate" fieldErrors={fieldErrors} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormField
            name="location"
            label="Location"
            value={formState.location || ''}
            onChange={(e) => updateField('location', e.target.value)}
          />

          <ErrorMessage field="location" fieldErrors={fieldErrors} />
        </Grid>
      </Grid>

      <Box>
        <FormTextArea
          name="description"
          label="Description"
          value={formState.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
        />

        <ErrorMessage field="description" fieldErrors={fieldErrors} />
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
        sx={{
          py: 2,
          mt: 2,
          fontWeight: 'bold',
          borderRadius: 2,
          fontSize: '1rem',
        }}
      >
        {isLoading ? 'Creating Event...' : 'Publish Event'}
      </Button>
    </Stack>
  );
};
