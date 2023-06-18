import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { googleSignIn, createAccount } from '../data/repository';
import Tilt from 'react-parallax-tilt';
import GoogleIcon from '../img/google_icon-icons.com_62736.ico';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { amber } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styleImage, SUCCESS, ERROR, Alert, tokens } from '../constants';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

const GLogin = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [modal, setModal] = useState(false);
  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState('');
  const color = amber[700];
  let navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [condition, setCondition] = useState(SUCCESS);

  function onResponse(response) {
    localStorage.setItem(tokens.google, response.credential);

    googleSignIn()
      .then((res) => {
        localStorage.setItem(tokens.jwt, res.accessToken);
        localStorage.setItem(tokens.refresh, res.refreshToken);
        localStorage.removeItem(tokens.google);
        navigate('/');
      })
      .catch((error) => {
        activateAlert('info', error.response.data.error);
        handleOpen();
      });
  }

  const activateAlert = (severity, msg) => {
    setCondition(severity);
    setAlertMsg(msg);
    setAlert(true);
  };
  const handleCloseAlert = () => {
    setAlert(false);
  };

  const handleSubmit = () => {
    if (!checked) {
      activateAlert(ERROR, 'Please tick the checkbox.');
      return;
    }

    createAccount(username)
      .then((res) => {
        activateAlert(SUCCESS, 'Your account has been created.');
        handleClose();
        googleSignIn()
          .then((res) => {
            localStorage.setItem(tokens.jwt, res.accessToken);
            localStorage.setItem(tokens.refresh, res.refreshToken);
            localStorage.removeItem(tokens.google);
            navigate('/');
          })
          .then((error) => {
            activateAlert(ERROR, error.response.data.error);
          });
      })
      .catch((error) => {
        activateAlert(ERROR, error.response.data.error);
        return;
      });
  };
  const handleCheck = () => {
    setChecked((prev) => (prev === true ? false : true));
  };

  const onChange = (e) => {
    setUsername(e.target.value);
  };

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
        <Box sx={styleImage}>
          <Typography align='center' component='a'>
            <Typography variant='h4' color={color}>
              Disclaimer
            </Typography>
            <br />
            <Typography>
              Shuttleday has no access to your private data, Google only
              provides user emails for login.
            </Typography>
            <br />
            <Typography>
              Source code can be found{' '}
              <Link href='https://github.com/shuttleday/shuttleday'>here</Link>{' '}
              for vetting.
            </Typography>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleImage}>
          <Typography id='modal-modal-title' variant='h6' component='a'>
            Enter your preferred name
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label='Name'
              id='fullWidth'
              color='secondary'
              value={username}
              onChange={onChange}
            />
          </Typography>
          <FormControlLabel
            className=' shadow-neutral-400 mb-2'
            label='This is the name I prefer.'
            control={<Checkbox onChange={handleCheck} />}
          ></FormControlLabel>

          <Box textAlign='center'>
            <Button
              variant='contained'
              color={SUCCESS}
              maxwidth='100%'
              onClick={handleSubmit}
            >
              Enter
            </Button>
          </Box>
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
      <Snackbar
        open={alert}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={condition}
          sx={{ width: '100%' }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default GLogin;
