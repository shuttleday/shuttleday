import React from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
// import ModeNightIcon from '@mui/icons-material/ModeNight';
import { ColorModeContext } from '../App';
import Container from '@mui/material/Container';
import { GiShuttlecock } from 'react-icons/gi';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        <IconButton
          sx={{ ml: 1, justifyContent: 'right' }}
          onClick={colorMode.toggleColorMode}
          color='inherit'
        >
          {theme.palette.mode === 'dark' ? (
            <GiShuttlecock
              sx={{ justifyContent: 'center' }}
              size={30}
              style={{ transform: 'rotate(125deg)' }}
            />
          ) : (
            <GiShuttlecock
              sx={{ justifyContent: 'center' }}
              size={30}
              style={{ transform: 'rotate(45deg)' }}
            />
          )}
        </IconButton>
      </Box>
    </Container>
  );
};

export default Header;
