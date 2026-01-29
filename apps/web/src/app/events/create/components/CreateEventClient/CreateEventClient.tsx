'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, alpha } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { CreateEventDto, EventCategory } from '@org/models';
import { useCreateEvent } from '@/services/events';
import { CreateEventForm } from '../CreateEventForm';

const INITIAL_STATE: Partial<CreateEventDto> = {
  title: '',
  description: '',
  location: '',
  category: '' as EventCategory,
  eventDate: '',
};

export default function CreateEventClient() {
  const router = useRouter();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const createMutation = useCreateEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formState,
      eventDate: formState.eventDate
        ? new Date(formState.eventDate).toISOString()
        : undefined,
    } as CreateEventDto;

    await createMutation.mutateAsync(payload);
    router.push('/');
  };

  const fieldErrors: Record<string, string> | null =
    createMutation.error?.errors ?? null;

  return (
    <>
      <Button
        startIcon={<ArrowBackIosNew sx={{ fontSize: 14 }} />}
        onClick={() => router.back()}
        sx={{ color: alpha('#fff', 0.5), mb: 3 }}
      >
        Back
      </Button>

      <CreateEventForm
        formState={formState}
        setFormState={setFormState}
        fieldErrors={fieldErrors}
        isLoading={createMutation.isPending}
        onSubmit={handleSubmit}
      />
    </>
  );
}
