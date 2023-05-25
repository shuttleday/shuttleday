import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import jwt_decode from 'jwt-decode';
import { admin, SUCCESS } from '../constants';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { grey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Rooms = () => {
  const color = grey[700];
  const [isAdmin, setIsAdmin] = useState(false);
  const password = useRef();
  const name = useRef();

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

  const handleClick = () => {
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
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Create room
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label='Name'
              id='fullWidth'
              color='secondary'
              className='mb-2'
              inputRef={name}
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
        <div className='rounded-[20px] py-5 px-12 min-h-[480px] flex items-center flex-col border border-green-400 shadow-card w-[340px]  lg:h-[500px] gap-6'>
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
      </div>
    </div>
  );
};

export default Rooms;
