'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Grid,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  alpha,
} from '@mui/material';
import { Event } from '@org/models';
import { EventHeader } from '../EventHeader';
import { CreateEventDto } from '@org/models';
import { EventSidebar } from '../EventSidebar';
import { EventEditForm } from '../EventEditForm';

interface Props {
  event: Event;
  fieldErrors: Record<string, string> | null;
  onUpdate: (data: Partial<CreateEventDto>) => void;
  onDelete: () => void;
}

export function EventDetailContent({
  event,
  fieldErrors,
  onUpdate,
  onDelete,
}: Props) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState({ type: '', open: false });
  const [formState, setFormState] = useState<Partial<CreateEventDto>>({
    title: event.title,
    description: event.description,
    location: event.location,
    category: event.category,
    eventDate: event.eventDate ? event.eventDate.slice(0, 16) : '',
  });

  const handleConfirmedAction = async () => {
    if (confirmOpen.type === 'update') {
      const payload = { ...formState };

      if (payload.eventDate)
        payload.eventDate = new Date(payload.eventDate).toISOString();

      await onUpdate(payload);

      router.push('/');
    } else {
      await onDelete();
      router.push('/');
    }
    setConfirmOpen({ type: '', open: false });
  };

  return (
    <Box sx={{ color: '#fff' }}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 8 }}>
          <EventHeader event={event} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <EventSidebar
            event={event}
            editMode={editMode}
            setEditMode={setEditMode}
            onDelete={() => setConfirmOpen({ type: 'delete', open: true })}
          />
        </Grid>
      </Grid>

      <Collapse in={editMode}>
        <EventEditForm
          formState={formState}
          fieldErrors={fieldErrors}
          setFormState={setFormState}
          onSave={() => setConfirmOpen({ type: 'update', open: true })}
          onCancel={() => setEditMode(false)}
        />
      </Collapse>

      <Dialog
        open={confirmOpen.open}
        onClose={() => setConfirmOpen({ type: '', open: false })}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            color: '#fff',
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {confirmOpen.type === 'delete' ? 'Delete Event?' : 'Apply Updates?'}
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ color: alpha('#fff', 0.6) }}>
            {confirmOpen.type === 'delete'
              ? 'This action is irreversible. All data will be permanently removed.'
              : 'Are you sure you want to save changes and return to the home page?'}
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            sx={{ color: alpha('#fff', 0.5) }}
            onClick={() => setConfirmOpen({ type: '', open: false })}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color={confirmOpen.type === 'delete' ? 'error' : 'primary'}
            onClick={handleConfirmedAction}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
