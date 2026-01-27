'use client';

import React, { ChangeEvent } from 'react';
import {
  Box,
  Stack,
  Typography,
  Alert,
  Grid,
  Button,
  alpha,
} from '@mui/material';
import { FormField, FormTextArea, SelectField } from '@org/ui-components';
import { CATEGORY_OPTIONS } from '@/types/events';
import { CreateEventDto } from '@org/models';

interface Props {
  formState: Partial<CreateEventDto>;
  fieldErrors: Record<string, string> | null;
  setFormState: React.Dispatch<React.SetStateAction<Partial<CreateEventDto>>>;
  onSave: () => void;
  onCancel: () => void;
}

export const EventEditForm = ({
  formState,
  fieldErrors,
  setFormState,
  onSave,
  onCancel,
}: Props) => {
  const updateField = (name: keyof CreateEventDto, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextChange =
    (name: keyof CreateEventDto) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateField(name, e.target.value);
    };

  return (
    <Box
      sx={{
        mt: 6,
        bgcolor: '#121212',
        p: 4,
        borderRadius: 4,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 4, fontWeight: 'bold', color: '#fff' }}
      >
        Update Event Details
      </Typography>

      <Stack spacing={4}>
        {fieldErrors && (
          <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
            Check highlighted fields for errors.
          </Alert>
        )}

        <FormField
          name="title"
          label="Event Title"
          value={formState.title || ''}
          onChange={handleTextChange('title')}
        />

        <SelectField
          name="category"
          label="Category"
          value={formState.category || ''}
          options={CATEGORY_OPTIONS}
          onChange={(e) => updateField('category', e.target.value as string)}
        />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="eventDate"
              label="Event Date"
              type="datetime-local"
              value={formState.eventDate || ''}
              onChange={handleTextChange('eventDate')}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="location"
              label="Location"
              value={formState.location || ''}
              onChange={handleTextChange('location')}
            />
          </Grid>
        </Grid>

        <FormTextArea
          name="description"
          label="Description"
          value={formState.description || ''}
          onChange={handleTextChange('description')}
        />

        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}
        >
          <Button
            sx={{ color: alpha('#fff', 0.6), fontWeight: 'bold' }}
            onClick={onCancel}
          >
            Discard
          </Button>

          <Button
            variant="contained"
            sx={{ px: 4, fontWeight: 'bold', borderRadius: 2 }}
            onClick={onSave}
          >
            Save Changes
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
