import './App.css';
import { Routes, Route } from 'react-router-dom';
import GLogin from './pages/GLogin';
import NotFound from './pages/NotFound';
import Details from './pages/UserSettings';
import SessionCreate from './pages/SessionCreate';
import { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/header';
import { CssBaseline } from '@mui/material';
import Edit from './pages/Edit';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/Homepage';
import Dev from './pages/Dev';
import QRManagement from './pages/QRManagement';
import BugReport from './pages/BugReport';
import Credits from './pages/Credits';
import Rooms from './pages/Rooms';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem('mode') ? localStorage.getItem('mode') : 'dark'
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        if (mode === 'light') {
          localStorage.setItem('mode', 'dark');
        } else {
          localStorage.setItem('mode', 'light');
        }
      },
    }),
    [mode]
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
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <Header />
            <>
              <Routes>
                <Route exact path='/Home' element={<HomePage />} />
                <Route exact path='/' element={<Rooms />} />
                <Route exact path='/Glogin' element={<GLogin />} />
                <Route exact path='*' element={<NotFound />} />
                <Route exact path='/details' element={<Details />} />
                <Route exact path='/create' element={<SessionCreate />} />
                <Route exact path='/edit' element={<Edit />} />
                <Route exact path='/dev' element={<Dev />} />
                <Route exact path='/qr' element={<QRManagement />} />
                <Route exact path='/report' element={<BugReport />} />
                <Route exact path='/credits' element={<Credits />} />
              </Routes>
            </>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
