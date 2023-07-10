import React from 'react';
import Mikel from '../img/Mikel.jpg';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Stack } from '@mui/system';

interface Props {
  title: string;
  subTitle: string;
}

const error = (props: Props) => {
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
        {props.title}
      </Typography>
      <br />
      <Typography
        sx={{ display: 'inline' }}
        component='span'
        variant='h5'
        color='text.primary'
      >
        {props.subTitle}
      </Typography>
    </Stack>
  );
};

export default error;
