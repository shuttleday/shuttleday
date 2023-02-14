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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import TabPanel from '@mui/material/Tab';
// import { TabsContext } from '@mui/base';

const Home = () => {
  const [activeTab, setActiveTab] = useState('one');

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Stack
      spacing={3}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='secondary tabs example'
          centered
        >
          <Tab value='one' label='Item One' />
          <Tab value='two' label='Item Two' />
        </Tabs>
      </Box>
      <List
        sx={{
          width: { sm: 200, md: 300, lg: 440 },
          maxWidth: 360,
          bgcolor: 'background.paper',
          maxHeight: 300,
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
            primary='Brunch this weekend?'
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
            <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
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
    </Stack>
  );
};

export default Home;
