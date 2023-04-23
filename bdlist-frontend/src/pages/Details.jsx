import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getUsers } from '../data/repository';
import { useState } from 'react';
import { admin } from '../constants';

import SpeedDialComponent from '../components/SpeedDialComponent';

const Details = () => {
  let navigate = useNavigate();

  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('jwtToken_Login') === null) {
      navigate('/GLogin');
    }
    const user = jwt_decode(localStorage.getItem('jwtToken_Login'));
    if (user.userType !== admin) {
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
            users.map((user, index) => (
              <Accordion key={index}>
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
      <SpeedDialComponent />
    </div>
  );
};

export default Details;
