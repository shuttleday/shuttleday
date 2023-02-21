import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GLogin from './pages/GLogin';
import NotFound from './pages/NotFound';
import { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/header';
import { CssBaseline } from '@mui/material';
// import Authentication from './pages/authentication';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div justifyContent='center' alignItems='center'>
            <Header />
            <>
              <Routes>
                <Route path='/' element={<Home />} />

                {/* <Route path='/auth' element={<Authentication />} /> */}
                <Route path='/Glogin' element={<GLogin />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
