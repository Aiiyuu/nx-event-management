import { Stack, Typography, alpha } from '@mui/material';
import { CategoryOutlined } from '@mui/icons-material';
import { Event } from '@/types/events';

type Props = {
  event: Event;
};

export const EventHeader = ({ event }: Props) => (
  <Stack spacing={1}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <CategoryOutlined color="primary" sx={{ fontSize: 20 }} />

      <Typography
        variant="overline"
        sx={{ fontWeight: 800, letterSpacing: 2, color: 'primary.main' }}
      >
        {event.category}
      </Typography>
    </Stack>

    <Typography
      variant="h2"
      sx={{
        fontWeight: 900,
        background: 'linear-gradient(45deg, #fff 30%, #aaa 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: { xs: '2.5rem', md: '3.75rem' },
      }}
    >
      {event.title}
    </Typography>

    <Typography
      variant="body1"
      sx={{
        fontSize: '1.15rem',
        lineHeight: 1.8,
        color: alpha('#fff', 0.7),
        whiteSpace: 'pre-wrap',
      }}
    >
      {event.description}
    </Typography>
  </Stack>
);
