import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { googleSignIn } from '../data/repository';
import Tilt from 'react-parallax-tilt';
import GoogleIcon from '../img/google_icon-icons.com_62736.ico';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { amber } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styleImage } from '../constants';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

const GLogin = () => {
  const [modal, setModal] = useState(false);
  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);
  const color = amber[700];
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
      <Modal
        open={modal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ ...styleImage }}>
          <div>
            <Typography align='center'>
              <Typography variant='h4' color={color}>
                Disclaimer
              </Typography>
              <br />
              <p>
                Shuttleday has no access to your private data, Google only
                provides user emails for login.
              </p>
              <br />
              <p className=' text-center'>
                Source code can be found{' '}
                <Link href='https://github.com/shuttleday/shuttleday'>
                  here
                </Link>{' '}
                for vetting.
              </p>
            </Typography>
          </div>
        </Box>
      </Modal>
      <h3 className='text-[30px] shadow-sm py-3 underline decoration-green-400 animate-bounce underline-offset-8'>
        Welcome to Shuttleday
      </h3>
      <Tilt>
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className='rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col border border-green-400 shadow-card w-[340px] h-[480px] lg:h-[500px]'
        >
          <IconButton
            aria-label='upload picture'
            className='absolute top-0 right-0 mt-2 mr-2 z-20'
            component='label'
            onClick={handleOpenModal}
            sx={{ color: color }}
          >
            <InfoIcon />
          </IconButton>
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
      <div className='font-light text-[15px] text-center absolute inset-x-4 bottom-4'>
        <p>
          Created by :{' '}
          <a href='https://pierreccesario.com/' className=' text-cyan-400'>
            Pierre Cesario
          </a>{' '}
          and{' '}
          <a href='https://www.tjonathan.com/' className=' text-cyan-400'>
            Jonathan Teh
          </a>
        </p>
      </div>
    </Stack>
  );
};

export default GLogin;
