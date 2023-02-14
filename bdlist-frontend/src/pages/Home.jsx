import React, { useState } from 'react';
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

const Home = () => {
  const [activeTab, setActiveTab] = useState('1');

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Stack
      spacing={2}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box sx={{ width: { xs: 320, sm: 400 }, typography: 'body1' }}>
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
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position='static' style={{ background: 'green' }}>
                <Toolbar>
                  <Typography variant='h8' component='div' sx={{ flexGrow: 1 }}>
                    News
                  </Typography>
                  <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ ml: 7 }}
                  >
                    <MoreIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </Box>
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
