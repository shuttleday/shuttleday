import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const GLogin = () => {
  let navigate = useNavigate();
  function onResponse(response) {
    const userObj = jwt_decode(response.credential);
    const user = {
      email: userObj.email,
      username: userObj.name,
    };

    navigate('/', {
      state: {
        user: user,
      },
    });
  }

  return (
    <Box mt={9} display='flex' justifyContent='center' alignItems='center'>
      <GoogleLogin
        onSuccess={(response) => {
          onResponse(response);
        }}
        onError={(response) => console.log('error')}
      />
    </Box>
  );
};

export default GLogin;
