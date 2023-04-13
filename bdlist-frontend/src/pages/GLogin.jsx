import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { googleSignIn } from '../data/repository';
import Tilt from 'react-parallax-tilt';

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
      display='flex'
      justifyContent='center'
      alignItems='center'
      className='mt-20'
    >
      <Tilt>
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className='rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col border border-green-400 shadow-card md:h-[300px] lg:h-[400px]'
        >
          <h3 className='text-[20px] font-bold text-center font-sans'>
            Login with google
          </h3>
          <div className='border p-4 rounded-md'>
            <GoogleLogin
              onSuccess={(response) => {
                onResponse(response);
              }}
              onError={(response) => console.log('error')}
            />
          </div>
        </div>
      </Tilt>
    </Stack>
  );
};

export default GLogin;
