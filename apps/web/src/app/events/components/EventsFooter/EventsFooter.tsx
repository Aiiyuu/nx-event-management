'use client';

import { Box, Pagination } from '@mui/material';
import React, { ChangeEvent } from 'react';

interface Props {
  total: number;
  page: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}

export const EventsFooter = ({ total, page, limit, onPageChange }: Props) => {
  const pageCount = Math.ceil(total / limit);

  if (pageCount <= 1) return null;

  const handlePaginationChange = (_: ChangeEvent<unknown>, value: number) => {
    onPageChange(value);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box display="flex" justifyContent="center" mt={4} mb={4}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePaginationChange}
        color="primary"
        shape="rounded"
        size="large"
      />
    </Box>
  );
};
