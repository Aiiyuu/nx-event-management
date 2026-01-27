import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#e0e0e0' },
    secondary: { main: '#9e9e9e' },
    background: { default: '#121212', paper: '#1d1d1d' },
    text: { primary: '#ffffff', secondary: '#b0b0b0' },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: '2rem' },
    h2: { fontWeight: 600, fontSize: '1.75rem' },
    body1: { fontSize: '1rem', color: '#e0e0e0' },
  },
  shape: { borderRadius: 8 },
});
