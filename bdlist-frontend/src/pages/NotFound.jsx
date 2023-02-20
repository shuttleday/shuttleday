import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import Mikel from '../img/Mikel.jpg';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  let navigate = useNavigate();

  useEffect(() => {
    let timer1 = setTimeout(() => navigate('/'), 5000);
    return () => {
      clearTimeout(timer1);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Stack
      spacing={2}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Card
        sx={{
          width: { sx: 280, sm: 350, md: 500 },
          height: { sx: 280, sm: 350, md: 500 },
        }}
      >
        <CardMedia component='img' image={Mikel} alt='Paella dish' />
      </Card>
      <Typography
        sx={{ display: 'flex' }}
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
