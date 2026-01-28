'use client';

import { Grid, Box, Typography } from '@mui/material';
import { EventCard } from '../EventCard';
import { AnimatePresence, motion } from 'framer-motion';
import { Event } from '@org/models';

type Props = {
  events: Event[];
  isLoading?: boolean;
};

export const EventList = ({ events, isLoading }: Props) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <Typography>Loading events...</Typography>
      </Box>
    );
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
        {events.map((event, index) => (
          <Grid
            key={event.id}
            size={{ xs: 12, sm: 6, md: 4 }}
            component={motion.div}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
              opacity: { delay: index * 0.03 },
              y: { delay: index * 0.03 },
            }}
          >
            <EventCard event={event} />
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
};
