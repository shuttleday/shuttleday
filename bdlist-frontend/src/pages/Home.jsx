import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

const Home = () => {
  return (
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
  );
};

export default Home;
