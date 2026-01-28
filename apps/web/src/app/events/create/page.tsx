'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Paper, Container, Stack, Typography, Button, alpha } from '@mui/material';
import { AddCircleOutline, ArrowBackIosNew } from '@mui/icons-material';
import { CreateEventDto, EventCategory } from '@org/models';
import { CreateEventForm } from './components/CreateEventForm';
import { useCreateEvent } from '@/services/events';

const INITIAL_STATE: Partial<CreateEventDto> = {
  title: '',
  description: '',
  location: '',
  category: '' as EventCategory,
  eventDate: '',
};

export default function CreateEventPage() {
  const router = useRouter();
  const [formState, setFormState] = useState<Partial<CreateEventDto>>(INITIAL_STATE);
  
  const createMutation = useCreateEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = { ...formState } as CreateEventDto;

    if (payload.eventDate) {
      payload.eventDate = new Date(payload.eventDate).toISOString();
    }

    try {
      await createMutation.mutateAsync(payload);
      setFormState(INITIAL_STATE);
      router.push('/');
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  const fieldErrors = createMutation.error?.errors || null;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Button
        startIcon={<ArrowBackIosNew sx={{ fontSize: 14 }} />}
        onClick={() => router.back()}
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
          isLoading={createMutation.isPending}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Container>
  );
}