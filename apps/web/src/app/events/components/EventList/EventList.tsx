import { Typography } from '@mui/material';
import { Event } from '@org/models';
import EventListAnimated from '../EventListAnimated/EventListAnimated';

type Props = {
  events: Event[];
};

export const EventList = ({ events }: Props) => {
  if (events.length === 0) {
    return (
      <Typography variant="h6" textAlign="center" color="text.secondary" py={4}>
        No events found.
      </Typography>
    );
  }

  return <EventListAnimated events={events} />;
};
