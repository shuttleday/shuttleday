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
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.user);
  });

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

  return (
    <Stack
      spacing={2}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
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
            <List
              sx={{
                width: { xm: 300, sm: 500, lg: 440 },
                maxWidth: 360,
                bgcolor: 'background.paper',
                maxHeight: 400,
                overflow: 'auto',
              }}
              alignItems='center'
              justifyContent='center'
            >
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                </ListItemAvatar>
                <ListItemText
                  primary='Mikel cool'
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
              <ListItem alignItems='flex-start'>
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
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
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
                  <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
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
                  <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
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
                  <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
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
                  <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
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
                  <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
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
          </TabPanel>
        </TabContext>
      </Box>
    </Stack>
  );
};

export default Home;
