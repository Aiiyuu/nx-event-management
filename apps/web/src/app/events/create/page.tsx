'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Paper, Container, Stack, Typography, Button, alpha } from '@mui/material';
import { AddCircleOutline, ArrowBackIosNew } from '@mui/icons-material';
import { useEventsStore } from '@/store/events';
import { CreateEventDto, EventCategory } from '@org/models';
import { CreateEventForm } from './components/CreateEventForm';

export default function CreateEventPage() {
  const router = useRouter();
  const { addEvent, fieldErrors, isLoading, clearErrors } = useEventsStore();

  const initialState: Partial<CreateEventDto> = {
    title: '',
    description: '',
    location: '',
    category: '' as EventCategory,
    eventDate: '',
  };

  const [formState, setFormState] = useState<Partial<CreateEventDto>>(initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formState };

    if (payload.eventDate) {
      payload.eventDate = new Date(payload.eventDate).toISOString();
    }

    await addEvent(payload);

    const updatedState = useEventsStore.getState();

    if (!updatedState.fieldErrors) {
      setFormState(initialState);

      clearErrors();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Button
        startIcon={<ArrowBackIosNew sx={{ fontSize: 14 }} />}
        onClick={() => {
          clearErrors();
          router.back();
        }}
        sx={{ color: alpha('#fff', 0.5), mb: 3, '&:hover': { color: '#fff' } }}
      >
        Back
      </Button>

      <Paper
        sx={{
          bgcolor: '#121212',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          p: { xs: 3, md: 5 },
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AddCircleOutline color="primary" />

            <Typography
              variant="overline"
              sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: 1.5 }}
            >
              New Experience
            </Typography>
          </Stack>

          <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff' }}>
            Create Event
          </Typography>
        </Stack>

        <CreateEventForm
          formState={formState}
          setFormState={setFormState}
          fieldErrors={fieldErrors as Record<string, string>}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Container>
  );
}
