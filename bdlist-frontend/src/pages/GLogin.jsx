import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { googleSignIn } from '../data/repository';
import Tilt from 'react-parallax-tilt';
import GoogleIcon from '../img/google_icon-icons.com_62736.ico';

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
      className='mt-15 md:mt-20'
    >
      <h3 className='text-[30px] shadow-sm py-3 underline decoration-green-400 animate-bounce underline-offset-8'>
        Welcome to Shuttleday
      </h3>
      <Tilt>
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className='rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col border border-green-400 shadow-card h-[450px] lg:h-[500px]'
        >
          <h3 className='text-[20px] font-bold text-center font-sans'>
            Login with
          </h3>
          <img
            src={GoogleIcon}
            alt='google'
            className='App-logo h-[70px] w-[70px] p-1'
          />
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
      <p className=' font-light text-[15px] text-center absolute inset-x-4 bottom-4'>
        Created by :{' '}
        <a href='https://pierreccesario.com/' className=' text-cyan-400'>
          Pierre Cesario
        </a>{' '}
        and{' '}
        <a href='https://www.tjonathan.com/' className=' text-cyan-400'>
          Jonathan Teh
        </a>
      </p>
    </Stack>
  );
};

export default GLogin;
