'use client';

import { Box, Pagination } from '@mui/material';
import { useEventsStore } from '@/store/events';

export const EventsFooter = () => {
  const { total, page, limit, setPage } = useEventsStore();
  const pageCount = Math.ceil(total / limit);

  if (pageCount <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4} mb={4}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
      />
    </Box>
  );
};
