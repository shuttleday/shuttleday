import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/header';
import { CssBaseline } from '@mui/material';

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
        <Header />
        <>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
