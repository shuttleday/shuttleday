import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import jwt_decode from 'jwt-decode';
import { admin, SUCCESS } from '../constants';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { grey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Rooms = () => {
  const color = grey[900];
  const [isAdmin, setIsAdmin] = useState(false);
  const password = useRef();
  const name = useRef();
  const description = useRef();

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 320, sm: 500 },
    bgcolor: color,
    border: '2px solid #000',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const user = jwt_decode(localStorage.getItem('jwtToken_Login'));
    if (user.userType === admin) {
      setIsAdmin(true);
    }
  }, [isAdmin]);

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };
  const handleBack = () => {
    setIsClicked(false);
  };
  const handleJoin = () => {
    handlePassOpenModal();
  };

  const handleOpenCreate = () => {
    handleOpenCreateModal();
  };
  const handlePassword = () => {
    console.log(password);
  };

  const [openPassModal, setOpenPassModal] = useState(false);
  const handlePassOpenModal = () => setOpenPassModal(true);
  const handlePassCloseModal = () => setOpenPassModal(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleClosePassModal = () => setOpenCreateModal(false);

  return (
    <div>
      <Modal
        open={openPassModal}
        onClose={handlePassCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Enter room password
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label='Password'
              id='fullWidth'
              color='secondary'
              className='mb-2'
              inputRef={password}
            />
          </Typography>

          <Box textAlign='center' sx={{ mt: 2 }}>
            <Button
              variant='contained'
              color={SUCCESS}
              maxwidth='100%'
              onClick={handlePassword}
            >
              Enter
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openCreateModal}
        onClose={handleClosePassModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography
            id='modal-modal-title'
            variant='h4'
            component='h2'
            sx={{ mb: 2 }}
          >
            Create room
          </Typography>

          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Name
          </Typography>
          <Typography id='modal-modal-description'>
            <TextField
              fullWidth
              label='Name'
              id='fullWidth'
              color='secondary'
              className='mb-2'
              inputRef={name}
            />
          </Typography>

          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ mt: 2 }}
          >
            Description
          </Typography>
          <Typography id='modal-modal-description'>
            <TextField
              fullWidth
              label='55 word Limit'
              id='fullWidth'
              color='secondary'
              className='mb-2'
              multiline
              rows={2}
              inputRef={description}
            />
          </Typography>

          <Box textAlign='center' sx={{ mt: 2 }}>
            <Button
              variant='contained'
              color={SUCCESS}
              maxwidth='100%'
              onClick={handlePassword}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
      <div className='flex justify-center items-center flex-col'>
        <div className='underline underline-offset-8 rounded-md p-7'>
          <h1 className='text-4xl font-mono'>Rooms</h1>
        </div>
        {}
        <div className='perspective'>
          <div
            className={`min-h-[500px] w-[355px] lg:h-[520px] relative border border-green-400 rounded-[20px] shadow-card duration-1000 preserve-3d ${
              isClicked ? 'my-rotate-y-180' : ''
            }`}
          >
            <div className='py-5 px-12 flex items-center flex-col gap-6 absolute w-full h-full backface-hidden'>
              <Button
                variant='contained'
                className='w-full py-4 px-6 bg-green-400 text-lg rounded-2xl'
                onClick={handleClick}
              >
                Room 1
              </Button>

              <Button
                variant='contained'
                className='w-full py-4 px-6 bg-green-400 text-lg rounded-2xl'
                onClick={handleClick}
              >
                Room 2
              </Button>
              <Button
                variant='contained'
                className='w-full py-4 px-6 bg-green-400 text-lg rounded-2xl'
              >
                Confirm
              </Button>

              {isAdmin && (
                <IconButton
                  variant='contained'
                  className='w-full py-4 px-6 bg-gray-500 text-lg rounded-2xl'
                  onClick={handleOpenCreate}
                >
                  <AddIcon />
                </IconButton>
              )}
            </div>

            <div className='absolute w-full h-full rounded-[20px] backface-hidden my-rotate-y-180'>
              <div className='p-6 flex items-left text-lg flex-col gap-6'>
                <div className='font-bold text-[24px] mt-6'>TITLE</div>
                <p>
                  There are a number of reasons you may need a block of text and
                  when you do, a random paragraph can be the perfect solution.
                  If you happen to be a web designer and you need some random
                  text to show in your layout, a random paragraph can be an
                  excellent way
                </p>
                <Button
                  variant='contained'
                  className='w-full py-3 px-6 bg-green-400 text-lg rounded-2xl'
                  onClick={handleJoin}
                >
                  Join
                </Button>
                <IconButton
                  variant='contained'
                  className='w-full py-4 px-6 bg-gray-500 text-lg rounded-2xl'
                  onClick={handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
