import React, { useEffect, useRef, useState, useReducer } from 'react';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  SUCCESS,
  Alert,
  WARNING,
  ERROR,
  ACTIONS,
  operations,
  ID,
  roomActions,
  tokens,
} from '../constants';
import jwtDecode from 'jwt-decode';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { grey, green } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  createRoom,
  joinRoom,
  getRoomByID,
  leaveRoom,
  deleteRoom,
  editRoom,
  getJoinedRooms,
} from '../data/repository';
import Snackbar from '@mui/material/Snackbar';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { LoginWrapper } from '../hoc';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

const roomReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ACTIONS.FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
      };
    default:
      return state;
  }
};

const Rooms = () => {
  const colorG = green[400];
  let navigate = useNavigate();
  const color = grey[900];
  const passwordRef = useRef();
  const [roomName, setRoomName] = useState(null);
  const [roomDescription, setRoomDescription] = useState('');
  const initialRoomState = {
    loading: true,
    data: null,
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 320, sm: 500 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
  };

  const [roomState, roomDispatch] = useReducer(roomReducer, initialRoomState);

  const getAllRooms = async () => {
    getJoinedRooms()
      .then((res) => {
        roomDispatch({ type: ACTIONS.SUCCESS, payload: res });
      })
      .catch((error) => {
        roomDispatch({ type: ACTIONS.FAILURE, payload: null });
      });
  };

  useEffect(() => {
    async function getData() {
      getAllRooms();
    }

    getData();
  }, []);

  const user = localStorage.getItem(tokens.jwt)
    ? jwtDecode(localStorage.getItem(tokens.jwt))
    : null;

  //Alert logic for page information
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [condition, setCondition] = useState(SUCCESS);
  //----------------------------------------------------------

  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  //Used as an index to identify which room is currently selected
  const [selected, setSelected] = useState(0);

  const [infoScreen, setInfoScreen] = useState(true);

  const [buttonOp, setButtonOp] = useState(operations.create);
  const [isClicked, setIsClicked] = useState(false);

  function handleSpeedDial(operation) {
    if (operation === 'credits') {
      navigate('/credits');
    } else if (operation === 'report') {
      navigate('/report');
    } else if (operation === 'logout') {
      localStorage.removeItem(tokens.jwt);
      localStorage.removeItem(tokens.refresh);
      navigate('/Glogin');
    }
  }
  const handleClick = (index) => {
    setInfoScreen(true);
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
  const handleOpenCreate = (operation) => {
    if (operation === operations.edit) {
      setButtonOp(operation);
      setRoomName(roomState.data[selected].name);
      setRoomDescription(roomState.data[selected].description);
    } else {
      setButtonOp(operations.create);
    }
    handleOpenCreateModal();
  };

  const activateAlert = (severity, msg) => {
    setCondition(severity);
    setAlertMsg(msg);
    setAlert(true);
  };

  const handleShow = () => {
    getRoomByID(roomState.data[selected]._id)
      .then((res) => {
        setPassword(res.password);
        setShowPass(true);
      })
      .catch((error) => {
        setPassword('N/A');
        setShowPass(true);
      });
  };

  const handleHide = () => {
    setShowPass(false);
    setPassword('');
  };

  const handleWarning = (operation) => {
    setWarningMsg(operation);
    handleShowWarningOpen();
  };

  //Handle the password for verification in the backend
  const handlePassword = () => {
    if (!passwordRef.current.value) {
      activateAlert(WARNING, 'Enter password.');
      return;
    }

    const password = {
      password: passwordRef.current.value,
    };

    joinRoom(password)
      .then((res) => {
        activateAlert(SUCCESS, 'Joined!');
        getAllRooms();
        handlePassCloseModal();
      })
      .catch((error) => {
        activateAlert(ERROR, error.response.data.error + ': No rooms found.');
      });
  };

  //Leave selected room
  const handleLeave = () => {
    leaveRoom(roomState.data[selected]._id)
      .then((res) => {
        activateAlert(SUCCESS, 'You have left this room.');
        getAllRooms();
        handleBack();
        setInfoScreen(false);
        setSelected(0);
        handleShowWarningClose();
      })
      .catch((error) => {
        activateAlert(ERROR, error.response.data.error);
      });
  };

  //Delete seleted room
  const handleDelete = () => {
    deleteRoom(roomState.data[selected]._id)
      .then((res) => {
        handleShowWarningClose();
        getAllRooms();
        handleBack();
        setInfoScreen(false);
        setSelected(0);
        activateAlert(SUCCESS, 'Room has been deleted.');
      })
      .catch((error) => {
        activateAlert(ERROR, error.response.data.error);
      });
  };

  const onChangeName = (e) => {
    setRoomName(e.target.value);
  };
  const onChangeDes = (e) => {
    setRoomDescription(e.target.value);
  };
  //Edit seleted room
  const handleEdit = () => {
    if (!roomName) {
      activateAlert(WARNING, 'Room must have a name.');
      return;
    }
    if (roomDescription.split(' ').length > 55) {
      activateAlert(WARNING, 'Description must be less than 55 words.');
      return;
    }

    const newInfo = {
      name: roomName,
      description: roomDescription,
    };

    editRoom(roomState.data[selected]._id, newInfo)
      .then((res) => {
        activateAlert(SUCCESS, 'Room info updated!');
        getAllRooms();
        setOpenCreateModal(false);
      })
      .catch((error) => {
        activateAlert(ERROR, error.response.data.error);
      });
  };

  //Creates a new room
  const handleCreate = () => {
    if (!roomName) {
      activateAlert(WARNING, 'Room must have a name.');
      return;
    }
    if (roomDescription.split(' ').length > 55) {
      activateAlert(WARNING, 'Description must be less than 55 words.');
      return;
    }
    const newRoom = {
      name: roomName,
      description: roomDescription,
    };

    createRoom(newRoom)
      .then((res) => {
        activateAlert(SUCCESS, 'Room created!');
        getAllRooms();
        setOpenCreateModal(false);
      })
      .catch((error) => {
        activateAlert(ERROR, error.response.data.error);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    activateAlert(SUCCESS, 'Copied!');
  };

  const handleEnter = () => {
    sessionStorage.setItem(ID, roomState.data[selected]._id);
    navigate('/Home');
  };

  const [warningMsg, setWarningMsg] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const handleShowWarningOpen = () => setShowWarning(true);
  const handleShowWarningClose = () => setShowWarning(false);

  const [openPassModal, setOpenPassModal] = useState(false);
  const handlePassOpenModal = () => setOpenPassModal(true);
  const handlePassCloseModal = () => setOpenPassModal(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  return (
    <div>
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
                inputRef={passwordRef}
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

        <Modal open={openCreateModal} onClose={handleCloseCreateModal}>
          <Box sx={modalStyle}>
            <Typography
              id='modal-modal-title'
              variant='h4'
              component='h2'
              sx={{ mb: 2 }}
            >
              Room info
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
                value={roomName}
                onChange={onChangeName}
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
                value={roomDescription}
                onChange={onChangeDes}
              />
            </Typography>

            <Box textAlign='center' sx={{ mt: 2 }}>
              {buttonOp === operations.create ? (
                <Button
                  variant='contained'
                  color={SUCCESS}
                  maxwidth='100%'
                  onClick={handleCreate}
                >
                  Create
                </Button>
              ) : (
                <Button
                  variant='contained'
                  color={SUCCESS}
                  maxwidth='100%'
                  onClick={handleEdit}
                >
                  Confirm
                </Button>
              )}
            </Box>
          </Box>
        </Modal>
        <Modal
          open={showWarning}
          onClose={handleShowWarningClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={modalStyle}>
            <Typography align='center'>
              <Typography
                id='modal-modal-title'
                variant='h5'
                component='h2'
                color={ERROR}
              >
                WARNING
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                {`Are you sure about ${warningMsg} this room?`}
              </Typography>
            </Typography>

            <Stack
              spacing={2}
              display='flex'
              direction='row'
              sx={{ justifyContent: 'center', mt: 2 }}
            >
              {warningMsg === operations.delete ? (
                <Button
                  variant='contained'
                  color={ERROR}
                  maxwidth='100%'
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  variant='contained'
                  maxwidth='100%'
                  onClick={handleLeave}
                  color={ERROR}
                >
                  Leave
                </Button>
              )}
              <Button
                variant='contained'
                maxwidth='100%'
                onClick={handleShowWarningClose}
                color='info'
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>
        <div className='flex justify-center items-center flex-col'>
          <div className='underline underline-offset-8 rounded-md p-7'>
            <h1 className='text-4xl font-mono'>Rooms</h1>
          </div>

          <div className='perspective'>
            <div
              className={` min-h-[680px] ${
                showPass && 'h-[670px]'
              } w-[355px] mb-16 relative border border-green-400 rounded-[20px] shadow-card duration-1000 preserve-3d ${
                isClicked ? 'my-rotate-y-180' : ''
              }`}
            >
              <div className='py-7 px-12 flex items-center flex-col gap-6 absolute w-full h-full backface-hidden'>
                {roomState.loading ? (
                  <Loading />
                ) : (
                  roomState.data && (
                    <>
                      {roomState.data.map((room, index) => (
                        <Button
                          variant='contained'
                          className='w-full py-4 px-6 bg-green-400 text-lg rounded-2xl'
                          onClick={() => {
                            handleClick(index, room.id);
                          }}
                          key={`${room.name}-room`}
                        >
                          {room.name}
                        </Button>
                      ))}
                    </>
                  )
                )}

                <Button
                  variant='contained'
                  className='w-full py-4 px-6 bg-gray-500 text-lg rounded-2xl'
                  onClick={handleJoin}
                >
                  Join a Room
                </Button>
                <IconButton
                  variant='contained'
                  className='w-full py-4 px-6 bg-gray-500 text-lg rounded-2xl'
                  onClick={() => handleOpenCreate(operations.create)}
                >
                  <AddIcon />
                </IconButton>
              </div>
              <div className='absolute w-full h-full rounded-[20px] backface-hidden bg-black my-rotate-y-180'>
                {roomState.data && infoScreen ? (
                  <div className='p-6 flex items-left text-lg flex-col gap-4'>
                    <div className='font-bold text-[30px] mt-6 text-white'>
                      {roomState.data[selected].name}
                    </div>
                    <div className='min-h-[310px] text-white'>
                      {roomState.data[selected].description ? (
                        <p>{roomState.data[selected].description}</p>
                      ) : (
                        <p>No Description</p>
                      )}
                    </div>

                    {roomState.data[selected].creatorUsername ===
                    user.username ? (
                      <div className='flex flex-col gap-2'>
                        <div className='grid grid-cols-2 gap-2'>
                          <Button
                            variant='contained'
                            className='w-full py-3 px-6 bg-purple-500 text-lg rounded-2xl'
                            onClick={() => handleOpenCreate(operations.edit)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant='contained'
                            className='w-full py-3 px-6 bg-red-500 text-lg rounded-2xl'
                            onClick={() => handleWarning(operations.delete)}
                          >
                            Delete
                          </Button>
                          {showPass ? (
                            <Button
                              variant='contained'
                              className='w-full py-3 px-6 bg-cyan-700 text-lg rounded-2xl'
                              onClick={handleHide}
                            >
                              Hide
                            </Button>
                          ) : (
                            <Button
                              variant='contained'
                              className='w-full py-3 px-6 bg-blue-600 text-lg rounded-2xl'
                              onClick={handleShow}
                            >
                              Password
                            </Button>
                          )}
                          <IconButton
                            variant='contained'
                            className='w-full py-4 px-6 bg-gray-500 text-lg rounded-2xl'
                            onClick={handleBack}
                          >
                            <ArrowBackIcon />
                          </IconButton>
                        </div>
                        <Button
                          variant='contained'
                          className='w-full py-3 px-6 bg-green-400 text-lg rounded-2xl'
                          onClick={handleEnter}
                        >
                          Enter
                        </Button>
                        <div
                          className={`border border-gray-400 w-full rounded-xl flex justify-between transition-opacity duration-700 ease-in ${
                            showPass ? 'opacity-100' : 'opacity-0'
                          } `}
                        >
                          <p className='p-2 text-center'>{password}</p>
                          <IconButton onClick={handleCopy}>
                            <ContentCopyIcon />
                          </IconButton>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Button
                          variant='contained'
                          className='w-full py-3 px-6 bg-green-400 text-lg rounded-2xl'
                          onClick={handleEnter}
                        >
                          Enter
                        </Button>
                        <Button
                          variant='contained'
                          className='w-full py-3 px-6 bg-red-500 text-lg rounded-2xl'
                          onClick={() => handleWarning(operations.leave)}
                        >
                          Leave
                        </Button>
                        <IconButton
                          variant='contained'
                          className='w-full py-4 px-6 bg-gray-500 text-lg rounded-2xl'
                          onClick={handleBack}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                      </>
                    )}
                  </div>
                ) : (
                  <div></div>
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
      <Box
        sx={{
          transform: 'translateZ(0px)',
          flexGrow: 1,
          position: 'fixed',
          bottom: 0,
          width: 1.0,
        }}
      >
        <SpeedDial
          sticky='true'
          ariaLabel='SpeedDial openIcon'
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            '& .MuiFab-primary': { backgroundColor: colorG },
          }}
          icon={<SpeedDialIcon openIcon={<AccountCircleIcon />} />}
        >
          {roomActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              onClick={(e) => {
                handleSpeedDial(action.operation);
              }}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  );
};

export default LoginWrapper(Rooms);
