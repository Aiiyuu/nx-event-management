import { Container, Paper, Stack, Typography } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import CreateEventClient from './components/CreateEventClient/CreateEventClient';

export default function CreateEventPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        sx={{
          bgcolor: '#121212',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          p: { xs: 3, md: 5 },
        }}
      >
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AddCircleOutline color="primary" />
            <Typography variant="overline">New Experience</Typography>
          </Stack>

          <Typography variant="h3">Create Event</Typography>
        </Stack>

        <CreateEventClient />
      </Paper>
    </Container>
  );
}
