'use client';

import React from 'react';
import { Paper, Stack, Box, Typography, Divider, Button, alpha } from '@mui/material';
import { CalendarMonth, LocationOn, EditNote, DeleteOutline } from '@mui/icons-material';
import { Event } from '@/types/events';

interface Props {
  event: Event;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
}

export const EventSidebar = ({ event, editMode, setEditMode, onDelete }: Props) => (
  <Paper
    sx={{
      bgcolor: '#121212',
      p: 3,
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}
  >
    <Stack spacing={3}>
      <Box>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems="center">
          <CalendarMonth sx={{ color: 'primary.main', fontSize: 18 }} />
          <Typography
            variant="caption"
            sx={{ fontWeight: 'bold', color: alpha('#fff', 0.4), letterSpacing: 1 }}
          >
            WHEN
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ fontSize: '1.1rem', color: '#fff' }}>
          {new Date(event.eventDate).toLocaleString()}
        </Typography>
      </Box>

      <Box>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems="center">
          <LocationOn sx={{ color: 'primary.main', fontSize: 18 }} />
          <Typography
            variant="caption"
            sx={{ fontWeight: 'bold', color: alpha('#fff', 0.4), letterSpacing: 1 }}
          >
            WHERE
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ fontSize: '1.1rem', color: '#fff' }}>
          {event.location || 'Virtual Event'}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: alpha('#fff', 0.1) }} />

      <Stack spacing={2}>
        <Button
          variant="contained"
          startIcon={<EditNote />}
          onClick={() => setEditMode(!editMode)}
          sx={{ py: 1, fontWeight: 'bold', borderRadius: 2 }}
        >
          {editMode ? 'Cancel Editing' : 'Edit Event'}
        </Button>

        <Button
          color="error"
          variant="text"
          startIcon={<DeleteOutline />}
          onClick={onDelete}
          sx={{
            fontWeight: 'bold',
            borderRadius: 2,
            '&:hover': { bgcolor: alpha('#f44336', 0.1) },
          }}
        >
          Delete Event
        </Button>
      </Stack>
    </Stack>
  </Paper>
);
