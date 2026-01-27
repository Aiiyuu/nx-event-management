'use client';

import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import Link from 'next/link';
import { Event } from '@/types/events';

export function RecommendationsSlider({ recommendations }: { recommendations: Event[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        pb: 2,
        px: 1,
        '&::-webkit-scrollbar': { height: '8px' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ccc',
          borderRadius: '4px',
        },
      }}
    >
      {recommendations.map((item) => (
        <Link href={`/events/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              minWidth: 280,
              maxWidth: 280,
              height: '100%',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
            }}
          >
            <CardContent>
              <Chip
                label={item.category}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mb: 1 }}
              />

              <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }}>
                {item.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {new Date(item.eventDate).toLocaleDateString()}
              </Typography>

              <Typography variant="body2" color="text.primary" noWrap sx={{ mt: 0.5 }}>
                📍 {item.location}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
}
