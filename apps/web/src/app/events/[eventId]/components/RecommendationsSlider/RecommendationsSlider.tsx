import { Box } from '@mui/material';
import { Event } from '@org/models';
import { EventCard } from '@/app/events/components/EventCard';

export function RecommendationsSlider({
  recommendations,
}: {
  recommendations: Event[];
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        pb: 2,
        px: 1,
        flexWrap: 'nowrap',
        '&::-webkit-scrollbar': { height: '8px' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ccc',
          borderRadius: '4px',
        },
      }}
    >
      {recommendations.map((item) => (
        <Box key={item.id} sx={{ flex: '0 0 340px' }}>
          <EventCard event={item} />
        </Box>
      ))}
    </Box>
  );
}
