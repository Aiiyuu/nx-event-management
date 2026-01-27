"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Container,
  Stack,
} from "@mui/material";
import { useEventsStore } from "@/store/events";
import { RecommendationsSlider } from "./components/RecommendationsSlider";
import { EventDetailContent } from "./components/EventDetailContent";
import { Event, EventDetailResponse } from "@/types/events";
import dynamic from "next/dynamic";

const EventMap = dynamic(() => import("./components/EventMap"), { ssr: false });

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const router = useRouter();
  const {
    fetchById,
    currentEvent,
    deleteEvent,
    updateEvent,
    fieldErrors,
    isLoading,
  } = useEventsStore();

  useEffect(() => {
    if (eventId) fetchById(eventId);
  }, [eventId, fetchById]);

  if (isLoading || !currentEvent) {
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

  const response = currentEvent as unknown as EventDetailResponse;
  const eventData = response.event || (currentEvent as Event);
  const recommendations = response.recommendations || [];

  const handleDelete = async () => {
    await deleteEvent(eventId);
    router.push("/events");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={6}>
        <EventDetailContent
          key={eventData.id}
          event={eventData}
          fieldErrors={fieldErrors}
          onUpdate={updateEvent}
          onDelete={handleDelete}
        />

        <EventMap location={eventData.location} />

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
