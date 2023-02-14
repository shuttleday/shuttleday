import React from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { ColorModeContext } from '../App';

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <>
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
        {theme.palette.mode} mode
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color='inherit'
        >
          {theme.palette.mode === 'dark' ? <ModeNightIcon /> : <WbSunnyIcon />}
        </IconButton>
      </Box>
    </>
  );
};

export default Header;
