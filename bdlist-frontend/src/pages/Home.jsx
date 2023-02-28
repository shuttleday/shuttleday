import React, { useEffect, useState } from 'react';
import {
  userCheck,
  createAccount,
  getSession,
  joinSession,
  removeFromSession,
  uploadReceipt,
} from '../data/repository';

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
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Bank from '../img/BankQR.jpg';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import jwt_decode from 'jwt-decode';

import { useLocation } from 'react-router-dom';

const Home = () => {
  const ERROR = 'error';
  const SUCCESS = 'success';
  const WARNING = 'warning';
  const location = useLocation();
  let navigate = useNavigate();

  const actions = [
    {
      icon: <ManageAccountsIcon />,
      name: 'Manage User',
      operation: 'management',
    },
    { icon: <ReceiptIcon />, name: 'Payment History', operation: 'payment' },
    { icon: <InfoIcon />, name: 'User Details', operation: 'details' },
  ];

  function handleSpeedDial(operation) {
    if (operation === 'payment') {
      console.log('payments');
    } else if (operation === 'details') {
      navigate('/details');
    } else if (operation === 'management') {
      navigate('/management');
    }
  }

  //Modal style
  const styleImage = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 400, sm: 500, md: 900 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [playerList, setPlayerList] = useState(null);
  const [sessionID, setSessionID] = useState('');
  const [playerStat, setPlayerStat] = useState(true);
  const amount = 'This session is $4.50 Per person';

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

  const handleOnChange = (e) => {
    console.log(e.target.files[0]);
    setButtonON(false);
    setImage(e.target.files[0]);
  };
  const onUpload = async () => {
    const res = await uploadReceipt(image, sessionID);
    if (res) {
      setCondition(SUCCESS);
      setAlertMsg('Receipt uploaded!');
      setOpen(true);
      handleCloseModalImage();
    } else {
      setCondition(ERROR);
      setAlertMsg('Something went wrong..');
      setOpen(true);
    }
  };
  //--------------------------------------------------------------------------------

  useEffect(() => {
    if (sessionStorage.getItem('jwtToken_Login') === null) {
      navigate('/GLogin');
    } else {
      const user = jwt_decode(sessionStorage.getItem('jwtToken_Login'));
      console.log(user);
      console.log(sessionStorage.getItem('jwtToken_Login'));

      async function getSessionData() {
        getSession().then((res) => {
          console.log(res.gameSessions[0]._id);
          if (res.gameSessions[0].players.length !== 0) {
            setPlayerList(res.gameSessions[0].players);
            setSessionID(res.gameSessions[0]._id);
          }
          if (
            res.gameSessions[0].players.find(
              (item) => item.userEmail === user.email
            )
          ) {
            setPlayerStat(false);
          } else {
            setPlayerStat(true);
          }
        });
      }

      getSessionData();

      userCheck(user.email).then((user) => {
        if (!user) {
          const googleToken = jwt_decode(location.state.googleToken);
          sessionStorage.setItem('jwtToken_Login', location.state.googleToken);
          setUsername(googleToken.name);
          handleOpen();
        }

        if (user.data.userType === 'admin') {
          setRender(true);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const [alertMsg, setAlertMsg] = useState('');

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const onJoin = async () => {
    const newPlayerList = await joinSession(sessionID);
    console.log(newPlayerList);
    if (newPlayerList) {
      setPlayerList(newPlayerList);
      setCondition(SUCCESS);
      setAlertMsg('Joined successfully!');
      setOpen(true);
      setPlayerStat(false);
    } else {
      setCondition(ERROR);
      setAlertMsg('Something went wrong..');
      setOpen(true);
    }
  };
  const onRemove = async () => {
    const newPlayerList = await removeFromSession(sessionID);
    console.log(newPlayerList);
    if (newPlayerList) {
      setPlayerList(newPlayerList);
      setCondition(SUCCESS);
      setAlertMsg('Removed successfully!');
      setOpen(true);
      setPlayerStat(true);
    } else {
      setCondition(ERROR);
      setAlertMsg('Something went wrong..');
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Modal for username -----------------------------------------------------------------------
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState('');

  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const onChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async () => {
    const accessToken = sessionStorage.getItem('jwtToken_Login');
    console.log(username);
    sessionStorage.setItem('jwtToken_Login', location.state.googleToken);
    const res = await createAccount(username);
    if (res === ERROR) {
      setCondition(ERROR);
      setAlertMsg('Username has been taken!');
      setOpen(true);
    } else {
      setCondition(SUCCESS);
      setAlertMsg('Username has been taken!');
      handleCloseModal();
    }
    sessionStorage.setItem('jwtToken_Login', accessToken);
  };
  // -----------------------------------------------------------------------------------------

  // For rendering buttons only admins can access --------------------------------------------
  const [render, setRender] = useState(false);

  //For setting alert condition---------------------------------------------------------------
  const [condition, setCondition] = useState(SUCCESS);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 320, sm: 500 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Stack
        spacing={2}
        display='flex'
        justifyContent='center'
        alignItems='center'
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
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                {image !== null && (
                  <>
                    <Card
                      sx={{
                        width: { sx: 400, sm: 450, md: 500 },
                        height: { sx: 300, sm: 350, md: 300 },
                      }}
                    >
                      <CardMedia
                        component='img'
                        image={URL.createObjectURL(image)}
                        alt='Your Image'
                      />
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
                    accept='image/*'
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
          <Button onClick={handleOpen}>Open modal</Button>
          <Modal
            open={openModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Enter your preferred name
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label='Name'
                  id='fullWidth'
                  color='secondary'
                  defaultValue={username}
                  onChange={onChange}
                />
              </Typography>
              <br />
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
                <Tab label='Payment' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <Stack spacing={1} justifyContent='center'>
                <Box sx={{ flexGrow: 1 }}>
                  <AppBar
                    position='static'
                    style={{
                      background: 'green',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Toolbar>
                      <Typography
                        variant='h7'
                        component='div'
                        sx={{ flexGrow: 1 }}
                      >
                        10 Feb (Sat)
                      </Typography>
                      <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                      >
                        <MoreIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                </Box>
                <List
                  sx={{
                    width: { xm: 300, sm: 452, lg: 452 },
                    maxwidth: 660,
                    minHeight: 300,
                    bgcolor: 'background.paper',
                    maxHeight: 400,
                    overflow: 'auto',
                  }}
                  alignItems='center'
                  justifycontent='center'
                >
                  {playerList === null ? (
                    <div>
                      <Typography
                        sx={{ display: 'flex', justifyContent: 'center' }}
                        component='span'
                        variant='h5'
                        color='text.primary'
                      >
                        No player present yet
                      </Typography>
                    </div>
                  ) : (
                    playerList.map((player) => (
                      <div key={player.username}>
                        <ListItem alignitems='center'>
                          <ListItemText
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              size: 30,
                            }}
                            primary={
                              <Fragment>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component='span'
                                  variant='h5'
                                  color='text.primary'
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
                    color={SUCCESS}
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
                  >
                    Remove
                  </Button>
                )}
              </Stack>
            </TabPanel>
            {/* ---------------------------------------------------------------------------------------------------------------------------- */}
            <TabPanel value='2'>
              <Stack
                spacing={2}
                direction='column'
                alignItems='center'
                justifyContent='center'
              >
                <Card
                  sx={{
                    width: { sx: 280, sm: 350, md: 400 },
                    height: { sx: 280, sm: 590, md: 660 },
                  }}
                >
                  <CardMedia component='img' image={Bank} alt='Paella dish' />
                </Card>
                <Chip label={amount} color='success' variant='outlined' />
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
      {render && (
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
            ariaLabel='SpeedDial openIcon example'
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon openIcon={<AccountCircleIcon />} />}
          >
            {actions.map((action) => (
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
      )}
    </div>
  );
};

export default Home;
