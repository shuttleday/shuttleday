import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SUCCESS, Alert, WARNING, ERROR } from '../constants';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { grey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createRoom, getRooms } from '../data/repository';
import Snackbar from '@mui/material/Snackbar';
import Loading from '../components/Loading';

const Rooms = () => {
  const color = grey[900];
  const password = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();

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

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [condition, setCondition] = useState(SUCCESS);
  const [roomsData, setRoomsData] = useState(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    async function getRoomsData() {
      getRooms()
        .then((res) => {
          setRoomsData(res.rooms);
        })
        .catch((error) => {
          setRoomsData(undefined);
        });
    }

    getRoomsData();
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = (index) => {
    setSelected(index);
    setIsClicked(true);
  };
  const handleBack = () => {
    setIsClicked(false);
  };
  const handleJoin = () => {
    handlePassOpenModal();
  };

  const handleCloseAlert = () => {
    setAlert(false);
  };
  const handleOpenCreate = () => {
    handleOpenCreateModal();
  };

  const handleCreate = () => {
    if (!nameRef.current.value) {
      setCondition(WARNING);
      setAlertMsg('Room must have a name.');
      setAlert(true);
      return;
    }
    if (descriptionRef.current.value.split(' ').length > 65) {
      setCondition(WARNING);
      setAlertMsg('Description must be less than 55 words.');
      setAlert(true);
      return;
    }
    const newRoom = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };

    createRoom(newRoom)
      .then((res) => {
        setCondition(SUCCESS);
        setAlertMsg('Room created!');
        setAlert(true);
        getRooms()
          .then((res) => {
            setRoomsData(res.rooms);
          })
          .catch((error) => {
            setRoomsData(undefined);
          });
        setOpenCreateModal(false);
      })
      .catch((error) => {
        setCondition(ERROR);
        setAlertMsg(error.response.data.error);
        setAlert(true);
      });
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
              inputRef={nameRef}
            />
          </Typography>

          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ mt: 2 }}
          >
            Description (optional)
          </Typography>
          <Typography id='modal-modal-description'>
            <TextField
              fullWidth
              label='65 word Limit'
              id='fullWidth'
              color='secondary'
              className='mb-2'
              multiline
              rows={3}
              inputRef={descriptionRef}
            />
          </Typography>

          <Box textAlign='center' sx={{ mt: 2 }}>
            <Button
              variant='contained'
              color={SUCCESS}
              maxwidth='100%'
              onClick={handleCreate}
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

        <div className='perspective'>
          <div
            className={`min-h-[600px] w-[355px] mb-6 relative border border-green-400 rounded-[20px] shadow-card duration-1000 preserve-3d ${
              isClicked ? 'my-rotate-y-180' : ''
            }`}
          >
            <div className='py-5 px-12 flex items-center flex-col gap-6 absolute w-full h-full backface-hidden'>
              {roomsData === null ? (
                <Loading />
              ) : (
                roomsData &&
                roomsData.map((room, index) => (
                  <Button
                    variant='contained'
                    className='w-full py-4 px-6 bg-green-400 text-lg rounded-2xl'
                    onClick={() => {
                      handleClick(index);
                    }}
                    key={room.name}
                  >
                    {room.name}
                  </Button>
                ))
              )}

              <IconButton
                variant='contained'
                className='w-full py-4 px-6 bg-gray-500 text-lg rounded-2xl'
                onClick={handleOpenCreate}
              >
                <AddIcon />
              </IconButton>
            </div>

            <div className='absolute w-full h-full rounded-[20px] backface-hidden my-rotate-y-180'>
              {roomsData && (
                <div className='p-6 flex items-left text-lg flex-col gap-6'>
                  <div className='font-bold text-[24px] mt-6'>
                    {roomsData[selected].name}
                  </div>
                  <div className='h-[310px]'>
                    {roomsData[selected].description ? (
                      <p>{roomsData[selected].description}</p>
                    ) : (
                      <p>No Description</p>
                    )}
                  </div>

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
              )}
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default Rooms;
