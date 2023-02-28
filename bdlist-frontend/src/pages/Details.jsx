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

const Details = () => {
  let navigate = useNavigate();

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
        {users ? (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ) : (
          <div></div>
        )}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2a-content'
            id='panel2a-header'
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel3a-content'
            id='panel3a-header'
          >
            <Typography>Disabled Accordion</Typography>
          </AccordionSummary>
        </Accordion>
      </Box>
    </Stack>
  );
};

export default Details;
