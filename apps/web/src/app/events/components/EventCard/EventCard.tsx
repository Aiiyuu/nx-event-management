import { Card, CardContent, Typography, Chip, Box, Stack } from '@mui/material';
import { Event } from '@/types/events';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';

interface Props {
  event: Event;
}

export const EventCard = ({ event }: Props) => {
  return (
    <Link href={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
      <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography variant="h6" component="div" fontWeight="bold">
              {event.title}
            </Typography>

            <Chip label={event.category} size="small" color="primary" variant="outlined" />
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
            <CalendarMonthIcon fontSize="small" color="action" />

            <Typography variant="body2" color="text.secondary">
              {new Date(event.eventDate).toLocaleDateString()}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
            <LocationOnIcon fontSize="small" color="action" />

            <Typography variant="body2" color="text.secondary">
              {event.location}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {event.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
