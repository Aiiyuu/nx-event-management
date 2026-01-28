'use client';

import { use } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Container,
  Stack,
  Alert,
} from '@mui/material';
import { RecommendationsSlider } from './components/RecommendationsSlider';
import { EventDetailContent } from './components/EventDetailContent';
import { useEvent, useUpdateEvent, useDeleteEvent } from '@/services/events';
import { CreateEventDto } from '@org/models';
import dynamic from 'next/dynamic';

const EventMap = dynamic(() => import('./components/EventMap'), { ssr: false });

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);

  const {
    data: eventResponse,
    isLoading,
    error: fetchError,
  } = useEvent(eventId);

  const updateMutation = useUpdateEvent();
  const deleteMutation = useDeleteEvent();

  const handleUpdate = (data: Partial<CreateEventDto>) => {
    updateMutation.mutate({ id: eventId, data });
  };

  const handleDelete = () => {
    deleteMutation.mutate(eventId);
  };
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (fetchError || !eventResponse) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Event not found</Alert>
      </Container>
    );
  }

  const { event, recommendations } = eventResponse;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={6}>
        <EventDetailContent
          key={event.id}
          event={event}
          fieldErrors={updateMutation.error?.errors || null}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

        <EventMap location={event.location} />

        <Divider />

        {recommendations.length > 0 && (
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Recommended for You
            </Typography>

            <RecommendationsSlider recommendations={recommendations} />
          </Box>
        )}
      </Stack>
    </Container>
  );
}
