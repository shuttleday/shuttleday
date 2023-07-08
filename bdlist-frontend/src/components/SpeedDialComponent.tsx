import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { green } from '@mui/material/colors';
import { ID } from '../constants';

const SpeedDialComponent = () => {
  let navigate = useNavigate();

  const color = green[400];
  const actions = [{ icon: <HomeIcon />, name: 'Home' }];

  function handleSpeedDial(operation) {
    if (sessionStorage.getItem(ID) == null) {
      navigate('/');
    } else {
      navigate('/Home');
    }
  }

  return (
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
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          '& .MuiFab-primary': { backgroundColor: color },
        }}
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
  );
};

export default SpeedDialComponent;
