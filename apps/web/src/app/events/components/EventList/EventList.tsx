'use client';

import { useEventsStore } from '@/store/events';
import { Grid, CircularProgress, Box, Typography, Alert } from '@mui/material';
import { EventCard } from '../EventCard';
import { sortEvents } from '@/utils/events';
import { AnimatePresence, motion } from 'framer-motion';

export const EventList = () => {
  const { events, isLoading, error, sort } = useEventsStore();
  const sortedEvents = sortEvents(events, sort);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (events.length === 0) {
    return (
      <Typography variant="h6" textAlign="center" color="text.secondary" py={4}>
        No events found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      <AnimatePresence mode="popLayout">
        {sortedEvents.map((event, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={event.id}
            component={motion.div}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <EventCard event={event} />
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
};
