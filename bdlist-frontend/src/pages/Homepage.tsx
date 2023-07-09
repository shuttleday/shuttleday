import React, { useEffect, useState, useCallback } from 'react';
import {
  userCheck,
  getSession,
  joinSession,
  removeFromSession,
  uploadReceipt,
  getReceipts,
  getQR,
} from '../data/repository';
import { LoginWrapper, RoomWrapper } from '../hoc';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jwt_decode from 'jwt-decode';
import Loading from '../components/Loading';
import {
  adminActions,
  userActions,
  ERROR,
  SUCCESS,
  Alert,
  styleImage,
  tokens,
  ID,
  FILE,
} from '../constants/constants';
import InfoHeader from '../components/InfoHeader';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageViewer from 'react-simple-image-viewer';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { BiErrorAlt } from 'react-icons/bi';
import { green } from '@mui/material/colors';
import dayjs from 'dayjs';
import Tilt from 'react-parallax-tilt';

const HomePage = () => {
  const color = green[400];
  let navigate = useNavigate();
  const roomID = sessionStorage.getItem(ID);

  function handleSpeedDial(operation) {
    if (operation === 'details') {
      navigate('/details');
    } else if (operation === 'create') {
      navigate('/create');
    } else if (operation === 'qr') {
      navigate('/qr');
    } else if (operation === 'credits') {
      navigate('/credits');
    } else if (operation === 'report') {
      navigate('/report');
    } else if (operation === 'logout') {
      localStorage.removeItem('jwtToken_Login');
      localStorage.removeItem('refreshToken');
      navigate('/Glogin');
    } else if (operation === 'edit') {
      navigate('/edit');
    } else if (operation === 'room') {
      navigate('/');
    }
  }

  //Session information for display
  const [sessionInfo, setSessionInfo] = useState(null);
  const [selected, setSelected] = useState(0);

  const [QR, setQR] = useState(null);
  //Used as a flag to see if the player has joined the specific session
  const [playerStat, setPlayerStat] = useState(true);

  //Control logic for tabs----------------------------------------------------------
  const [activeTab, setActiveTab] = useState('1');
  const [open, setOpen] = useState(false);
  //--------------------------------------------------------------------------------

  //Control logic for Modal---------------------------------------------------------
  const [openModalImage, setOpenModalImage] = useState(false);
  const handleOpenModalImage = () => setOpenModalImage(true);
  const handleCloseModalImage = () => setOpenModalImage(false);

  //Control logic for Images--------------------------------------------------------
  const [image, setImage] = useState(null);
  const [buttonOn, setButtonON] = useState(true);

  const [bail, setBail] = useState(false);

  const [fileType, setFileType] = useState(null);
  //Checkbox logic for usernames----------------------------------------------------

  const handleOnChange = (e) => {
    setButtonON(false);
    if (e.target.files[0].type === 'application/pdf') {
      setFileType(FILE.PDF);
    } else {
      setFileType(FILE.IMG);
    }
    setImage(e.target.files[0]);
  };

  const onUpload = async () => {
    const res = await uploadReceipt(image, sessionInfo[selected]._id);
    if (res) {
      setCondition(SUCCESS);
      setAlertMsg('Receipt uploaded!');
      setOpen(true);
      handleCloseModalImage();
    } else {
      setCondition(ERROR);
      setAlertMsg('You have uploaded your receipt.');
      setOpen(true);
    }
  };
  //--------------------------------------------------------------------------------

  useEffect(
    () => {
      const user = jwt_decode(localStorage.getItem(tokens.jwt));
      async function getSessionData() {
        getSession(roomID)
          .then((res) => {
            if (res.gameSessions.length > 0) {
              setSessionInfo(res.gameSessions);
              setSelected(0);
              if (
                res.gameSessions[selected].players.find(
                  (item) => item.userEmail === user.email
                )
              ) {
                setPlayerStat(false);
              } else {
                setPlayerStat(true);
              }

              if (
                dayjs().isAfter(
                  dayjs(res.gameSessions[selected].end).subtract(2, 'day')
                )
              ) {
                setBail(true);
              } else {
                setBail(false);
              }
            } else {
              setSessionInfo(undefined);
            }
          })
          .catch((error) => {
            setSessionInfo(undefined);
          });
      }

      //Checks if user is admin
      userCheck(user.email, roomID).then((user) => {
        if (user.isAdmin) {
          setRender(true);
        }
      });
      getSessionData();
    },
    // eslint-disable-next-line
    []
  );

  const [alertMsg, setAlertMsg] = useState('');

  const [receipts, setReceipts] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback(
    (index) => {
      setSelectedImages(receipts.viewableImage);
      setCurrentImage(index);
      setIsViewerOpen(true);
      // eslint-disable-next-line
    },
    [receipts]
  );

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === '3') {
      getReceipts(sessionInfo[selected]._id)
        .then((res) => {
          setIsEmpty(false);
          setReceipts(res);
        })
        .catch((error) => {
          setIsEmpty(true);
          setReceipts([]);
        });
    } else if (newValue === '2') {
      setQR(null);
      getQR(sessionInfo[selected].payTo)
        .then((res) => {
          setQR(res.url);
        })
        .catch((error) => {
          setQR(undefined);
        });
    }
  };

  const onJoin = () => {
    joinSession(sessionInfo[selected]._id)
      .then((res) => {
        let oldData = sessionInfo;
        oldData[selected].players = res;
        setSessionInfo(oldData);
        setCondition(SUCCESS);
        setAlertMsg('Joined successfully!');
        setOpen(true);
        setPlayerStat(false);
      })
      .catch((error) => {
        setCondition(ERROR);
        setAlertMsg(error.response.data.error);
        setOpen(true);
      });
  };
  const onRemove = () => {
    removeFromSession(sessionInfo[selected]._id)
      .then((res) => {
        let oldData = sessionInfo;
        oldData[selected].players = res;
        setSessionInfo(oldData);
        setCondition(SUCCESS);
        setAlertMsg('Removed successfully!');
        setOpen(true);
        setPlayerStat(true);
      })
      .catch((error) => {
        setCondition(ERROR);
        setAlertMsg(error.response.data.error);
        setOpen(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };

  // For rendering buttons only admins can access --------------------------------------------
  const [render, setRender] = useState(false);

  //For setting alert condition---------------------------------------------------------------
  const [condition, setCondition] = useState(SUCCESS);

  const handleSelect = (event) => {
    setSelected(event.target.value);

    if (activeTab === '1') {
      const user = jwt_decode(localStorage.getItem('jwtToken_Login'));
      if (
        sessionInfo[event.target.value].players.find(
          (item) => item.userEmail === user.email
        )
      ) {
        if (
          dayjs().isAfter(
            dayjs(sessionInfo[event.target.value].end).subtract(2, 'day')
          )
        ) {
          setBail(true);
        } else {
          setBail(false);
        }
        setPlayerStat(false);
      } else {
        setPlayerStat(true);
      }
    } else if (activeTab === '2') {
      setQR(null);
      getQR(sessionInfo[event.target.value].payTo)
        .then((res) => {
          setQR(res.url);
        })
        .catch((error) => {
          setQR(undefined);
        });
    } else if (activeTab === '3') {
      setReceipts(null);
      getReceipts(sessionInfo[event.target.value]._id)
        .then((res) => {
          setIsEmpty(false);
          setReceipts(res);
        })
        .catch((error) => {
          setIsEmpty(true);
          setReceipts([]);
        });
    }
  };
  return (
    <div>
      <Stack
        spacing={2}
        sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
      >
        <div>
          <Modal
            open={openModalImage}
            onClose={handleCloseModalImage}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={styleImage}>
              <Stack
                spacing={2}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                {image !== null && (
                  <>
                    <Card
                      sx={{
                        width: { sx: 450, sm: 490, md: 500 },
                        height: { sx: 300, sm: 350, md: 300 },
                      }}
                    >
                      {fileType === FILE.PDF ? (
                        <p
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '200px',
                          }}
                        >
                          {image.name}
                        </p>
                      ) : (
                        <CardMedia
                          component='img'
                          image={URL.createObjectURL(image)}
                          alt='Your Image'
                          sx={{
                            maxHeight: '400px',
                            height: { sx: 300, sm: 350, md: 390 },
                          }}
                        />
                      )}
                    </Card>
                  </>
                )}
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='label'
                >
                  <input
                    hidden
                    accept='image/*, application/pdf'
                    type='file'
                    onChange={handleOnChange}
                  />
                  <ImageIcon />
                </IconButton>
                <Button
                  variant='contained'
                  color={SUCCESS}
                  disabled={buttonOn}
                  onClick={onUpload}
                >
                  Upload
                </Button>
              </Stack>
            </Box>
          </Modal>
        </div>
        <Box sx={{ width: { xs: 320, sm: 500 }, typography: 'body1' }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label='lab API tabs example'
                centered
                TabIndicatorProps={{ style: { background: 'green' } }}
                textColor='inherit'
                variant='fullWidth'
              >
                <Tab label='NameList' value='1' />

                {sessionInfo != null && !playerStat && (
                  <Tab label='Payment' value='2' />
                )}
                {render && sessionInfo != null && (
                  <Tab label='Receipts' value='3' />
                )}
              </TabList>
            </Box>
            <TabPanel value='1'>
              {sessionInfo === null ? (
                <Loading />
              ) : sessionInfo === undefined ? (
                <Tilt>
                  <div className='flex justify-center'>
                    <div
                      options={{ max: 45, scale: 1, speed: 450 }}
                      className='rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col border border-green-400 shadow-card w-[340px] h-[480px] lg:h-[500px]'
                    >
                      <p className='text-[20px] font-bold text-center font-sans'>
                        No sessions avaliable yet.
                      </p>
                    </div>
                  </div>
                </Tilt>
              ) : (
                <Stack spacing={1} justifyContent='center'>
                  <InfoHeader
                    sessionInfo={sessionInfo}
                    selected={selected}
                    handleSelect={handleSelect}
                  />
                  <List
                    sx={{
                      width: { xs: 272, sm: 452, lg: 452 },
                      maxwidth: 660,
                      minHeight: 300,
                      bgcolor: 'background.paper',
                      maxHeight: 400,
                      overflow: 'auto',
                      alignItems: 'center',
                      justifycontent: 'center',
                    }}
                  >
                    {sessionInfo[selected].players.length === 0 ? (
                      <Box textAlign='center' mr={2}>
                        <Typography
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                          component='span'
                          variant='h6'
                          color='text.primary'
                        >
                          No player present yet
                        </Typography>
                      </Box>
                    ) : (
                      sessionInfo[selected].players.map((player) => (
                        <div key={player.username}>
                          <ListItem sx={{ alignitems: 'center' }}>
                            <ListItemText
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                size: 30,
                              }}
                              className='flex'
                              primary={
                                <Fragment>
                                  <Typography
                                    sx={{
                                      display: 'inline',
                                      typography: {
                                        sm: 'h5',
                                        xs: 'subtitle1',
                                      },
                                    }}
                                    component='span'
                                    //eslint-disable-next-line
                                    className={
                                      player.userEmail ===
                                      sessionInfo[selected].payTo
                                        ? 'text-yellow-400 grow'
                                        : player.paid && 'text-green-400'
                                    }
                                  >
                                    {player.username}
                                  </Typography>
                                </Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant='middle' />
                        </div>
                      ))
                    )}
                  </List>
                  <br />
                  {playerStat ? (
                    <Button
                      variant='contained'
                      className='bg-primary'
                      size='large'
                      onClick={onJoin}
                    >
                      Join
                    </Button>
                  ) : (
                    <Button
                      variant='contained'
                      color={ERROR}
                      size='large'
                      onClick={onRemove}
                      disabled={bail}
                    >
                      Remove
                    </Button>
                  )}
                </Stack>
              )}
            </TabPanel>
            {/* ---------------------------------------------------------------------------------------------------------------------------- */}
            <TabPanel value='2'>
              <Stack spacing={1} justifyContent='center'>
                <InfoHeader
                  sessionInfo={sessionInfo}
                  selected={selected}
                  handleSelect={handleSelect}
                />

                <Card className='rounded-md border border-green-400'>
                  {QR === null ? (
                    <div className='py-4 px-12  flex justify-evenly items-center flex-col h-[350px] lg:h-[500px]'>
                      <Loading />
                    </div>
                  ) : QR === undefined ? (
                    <div className='py-4 px-12  flex justify-center items-center flex-col h-[350px] lg:h-[500px]'>
                      <BiErrorAlt className='h-[60px] w-[60px]' />
                      <p className='text-center font-bold text-red-500 mt-3'>
                        No QR avaliable. Contact the host
                      </p>
                    </div>
                  ) : (
                    <CardMedia component='img' image={QR} alt='QR-Code' />
                  )}
                </Card>

                <Chip
                  label={
                    sessionInfo != null
                      ? '$' + sessionInfo[selected].cost + ' Per person.'
                      : 'Not Avaliable'
                  }
                  color='success'
                  variant='outlined'
                />
                <Button
                  variant='contained'
                  color='success'
                  size='large'
                  onClick={handleOpenModalImage}
                >
                  Upload Receipt
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel value='3'>
              <Stack spacing={1}>
                <InfoHeader
                  sessionInfo={sessionInfo}
                  selected={selected}
                  handleSelect={handleSelect}
                />

                {receipts === null ? (
                  <Loading />
                ) : isEmpty ? (
                  <div className='py-4 px-12  flex justify-evenly items-center flex-col h-[350px] lg:h-[500px]'>
                    <div className=' justify-center items-center '>
                      <BiErrorAlt className='h-[60px] w-[60px]' />
                    </div>

                    <p className='text-center font-bold text-red-500 '>
                      No receipts has been uploaded yet
                    </p>
                  </div>
                ) : (
                  <Box>
                    <ImageList
                      sx={{
                        width: { sx: 240, sm: 450 },
                        height: { sx: 200, sm: 300, md: 550 },
                      }}
                    >
                      {receipts.urls.map((image, index) => (
                        <ImageListItem key={index}>
                          <img
                            className='rounded-md'
                            src={`${image.signedUrl}`}
                            srcSet={`${image.signedUrl}`}
                            alt={image.payer}
                            onClick={() => openImageViewer(index)}
                          />
                          <ImageListItemBar
                            title={image.payer}
                            subtitle={''}
                            className='rounded-md'
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                    <br />
                  </Box>
                )}
              </Stack>
            </TabPanel>
          </TabContext>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity={condition}
            sx={{ width: '100%' }}
          >
            {alertMsg}
          </Alert>
        </Snackbar>
      </Stack>
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
            '& .MuiFab-primary': { backgroundColor: color },
          }}
          icon={<SpeedDialIcon openIcon={<AccountCircleIcon />} />}
        >
          {render
            ? adminActions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  onClick={(e) => {
                    handleSpeedDial(action.operation);
                  }}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))
            : userActions.map((action) => (
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
      {isViewerOpen && (
        <ImageViewer
          src={selectedImages}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}
          closeOnClickOutside={true}
        />
      )}
    </div>
  );
};

export default RoomWrapper(LoginWrapper(HomePage));
