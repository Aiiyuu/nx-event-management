'use client';

import { Grid } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Event } from '@org/models';
import { EventCard } from '../EventCard';

type Props = {
  events: Event[];
};

export default function EventListAnimated({ events }: Props) {
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
            exit={{ opacity: 0, scale: 0.9 }}
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
}
