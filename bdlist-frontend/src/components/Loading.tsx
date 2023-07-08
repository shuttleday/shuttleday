import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';
const Loading = () => {
  return (
    <Stack
      spacing={2}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <CircularProgress color='success' />
    </Stack>
  );
};

export default Loading;
