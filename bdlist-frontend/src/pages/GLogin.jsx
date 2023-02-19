import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const GLogin = () => {
  let navigate = useNavigate();
  function onResponse(response) {
    console.log(response.credential);
    const userObj = jwt_decode(response.credential);
    const user = {
      email: userObj.email,
      username: userObj.name,
    };
    sessionStorage.setItem('jwtToken_Login', response.credential);

    navigate('/', {
      state: {
        user: user,
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
