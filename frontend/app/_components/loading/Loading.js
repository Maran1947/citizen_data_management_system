import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading({
    color,
    width = '8px',
    height = '8px'
}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress sx={{ color, width, height }} />
    </Box>
  );
}