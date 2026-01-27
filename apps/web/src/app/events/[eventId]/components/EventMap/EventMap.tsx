'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import '@/lib/leafletIconFix';

export default function EventMap({ location }: { location: string }) {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const geocode = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );
        const data = await res.json();

        if (data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setError('Location not found');
        }
      } catch {
        setError('Failed to load map');
      }
    };

    geocode();
  }, [location]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!coords) {
    return <Typography>Resolving location…</Typography>;
  }

  return (
    <Box sx={{ height: 500 }}>
      <MapContainer center={coords} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={coords}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}
