import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getUsers } from '../data/repository';
import { useState } from 'react';

const Details = () => {
  let navigate = useNavigate();

  const actions = [{ icon: <HomeIcon />, name: 'Home' }];

  function handleSpeedDial(operation) {
    navigate('/');
  }
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem('jwtToken_Login') === null) {
      navigate('/GLogin');
    }
    const user = jwt_decode(sessionStorage.getItem('jwtToken_Login'));
    if (user.userType !== 'admin') {
      navigate('/NotFound-404');
    }

    async function getUsersData() {
      const allUsers = await getUsers();
      if (allUsers) {
        setUsers(allUsers);
      }
    }

    getUsersData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Stack
        spacing={1}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='h6' component='h2'>
          User's Info
        </Typography>
        <Box sx={{ width: { xs: 320, sm: 500 }, typography: 'body1' }}>
          {users !== null ? (
            users.map((user) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>{user.username}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>First Name: {user.firstName}</Typography>
                    <Typography>Last Name: {user.lastName}</Typography>
                    <Typography>User Type: {user.userType}</Typography>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <div></div>
          )}
        </Box>
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
          ariaLabel='SpeedDial basic'
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleSpeedDial}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  );
};

export default Details;
