import './App.css';
import { Routes, Route } from 'react-router-dom';
import GLogin from './pages/GLogin';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import SessionCreate from './pages/SessionCreate';
import { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/header';
import { CssBaseline } from '@mui/material';
import Edit from './pages/Edit';
import ReceiptProof from './pages/ReceiptProof';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/Homepage';
import Dev from './pages/Dev';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light'
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
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div justify='center'>
            <Header />
            <>
              <Routes>
                <Route path='/' element={<HomePage />} />

                {/* <Route path='/auth' element={<Authentication />} /> */}
                <Route path='/Glogin' element={<GLogin />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/details' element={<Details />} />
                <Route path='/create' element={<SessionCreate />} />
                <Route path='/edit' element={<Edit />} />
                <Route path='/receipt' element={<ReceiptProof />} />
                <Route path='/dev' element={<Dev />} />
              </Routes>
            </>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
