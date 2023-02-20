import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
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
import Bank from '../BankQR.jpg';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const Home = () => {
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

  let navigate = useNavigate();

  const amount = 'This session is $4.50 Per person';

  //Control logic for Modal
  const [openModalImage, setOpenModalImage] = useState(false);
  const handleOpenModalImage = () => setOpenModalImage(true);
  const handleCloseModalImage = () => setOpenModalImage(false);

  //Control logic for tabs
  const [activeTab, setActiveTab] = useState('1');
  const [open, setOpen] = useState(false);

  //Control logic for Images
  const [image, setImage] = useState(null);
  const [buttonOn, setButtonON] = useState(true);

  const handleOnChange = (e) => {
    console.log(e.target.files[0]);
    setButtonON(false);
    setImage(e.target.files[0]);
  };

  // const onUpload = () => {};

  useEffect(() => {
    if (sessionStorage.getItem('jwtToken_Login') === null) {
      navigate('/GLogin');
    }

    console.log(sessionStorage.getItem('jwtToken_Login'));
    // eslint-disable-next-line
  }, []);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const onJoin = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
    <Stack
      spacing={2}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <div></div>
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
                  maxWidth: 660,
                  bgcolor: 'background.paper',
                  maxHeight: 400,
                  overflow: 'auto',
                }}
                alignItems='center'
                justifycontent='center'
              >
                <ListItem alignitems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Remy Sharp'
                      src='/static/images/avatar/1.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Mikel Lu'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </Fragment>
                    }
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem alignitems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Travis Howard'
                      src='/static/images/avatar/2.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Summer BBQ'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          to Scott, Alex, Jennifer
                        </Typography>
                        {" — Wish I could come, but I'm out of town this…"}
                      </Fragment>
                    }
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem alignitems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Cindy Baker'
                      src='/static/images/avatar/3.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Oui Oui'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignitems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Cindy Baker'
                      src='/static/images/avatar/3.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Oui Oui'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Cindy Baker'
                      src='/static/images/avatar/3.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Oui Oui'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Cindy Baker'
                      src='/static/images/avatar/3.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Oui Oui'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Cindy Baker'
                      src='/static/images/avatar/3.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Oui Oui'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Cindy Baker'
                      src='/static/images/avatar/3.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Oui Oui'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Cindy Baker'
                      src='/static/images/avatar/3.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Oui Oui'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Cindy Baker'
                      src='/static/images/avatar/3.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Oui Oui'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Cindy Baker'
                      src='/static/images/avatar/3.jpg'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary='Oui Oui'
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </Fragment>
                    }
                  />
                </ListItem>
              </List>
              <br />
              <Button
                variant='contained'
                color='success'
                size='large'
                onClick={onJoin}
              >
                Join
              </Button>
            </Stack>
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                onClose={handleClose}
                severity='success'
                sx={{ width: '100%' }}
              >
                Joined successfully!
              </Alert>
            </Snackbar>
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
    </Stack>
  );
};

export default Home;
