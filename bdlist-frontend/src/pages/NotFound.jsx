import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import Mikel from '../img/Mikel.jpg';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  let navigate = useNavigate();

  useEffect(() => {
    let timer1 = setTimeout(() => navigate('/'), 5000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <Stack
      spacing={2}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <img
        alt='mikel threaten'
        src={Mikel}
        style={{ width: 500, height: 500 }}
      />
      <Typography
        sx={{ display: 'inline' }}
        component='span'
        variant='h3'
        color='text.primary'
      >
        Hello... What are you doing here?
      </Typography>
      <br />
      <Typography
        sx={{ display: 'inline' }}
        component='span'
        variant='h5'
        color='text.primary'
      >
        You'll be redirected back to the main page soon...
      </Typography>
    </Stack>
  );
};

export default NotFound;
