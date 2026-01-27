'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          EventsManagment
        </Typography>

        <Box>
          <Button component={Link} href="/" color="inherit">
            Events
          </Button>
          <Button component={Link} href="/events/create" color="inherit">
            Create Event
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
