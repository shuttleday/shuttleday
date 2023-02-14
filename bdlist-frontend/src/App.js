import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/header';
import { CssBaseline } from '@mui/material';
import Stack from '@mui/material/Stack';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack
          spacing={1}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Header />
          <>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </>
        </Stack>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
