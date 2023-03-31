import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { googleSignIn } from '../data/repository';

const GLogin = () => {
  let navigate = useNavigate();
  async function onResponse(response) {
    localStorage.setItem('jwtToken_Login', response.credential);
    const res = await googleSignIn();
    //If the user has registered, googleSignIn() will return access and refresh tokens.
    if (res === null) {
      localStorage.setItem('jwtToken_Login', 'USER NOT FOUND');
    } else {
      localStorage.setItem('jwtToken_Login', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
    }

    navigate('/', {
      state: {
        googleToken: response.credential,
      },
    });
  }

  return (
    <Stack
      spacing={2}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Card
        justifyContent='center'
        alignItems='center'
        sx={{ maxWidth: 340, height: 400 }}
        variant='outlined'
      >
        <CardContent>
          <Box
            textAlign='center'
            sx={{
              width: 500,
              maxWidth: '100%',
              mt: 14,
              ml: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <GoogleLogin
              onSuccess={(response) => {
                onResponse(response);
              }}
              onError={(response) => console.log('error')}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default GLogin;
