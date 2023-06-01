import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginWrapper = (Component) =>
  function HOC() {
    let navigate = useNavigate();
    useEffect(() => {
      if (localStorage.getItem('jwtToken_Login') == null) {
        navigate('/GLogin');
      }
    }, [navigate]);

    const isAuthenticated = localStorage.getItem('jwtToken_Login') !== null;

    return isAuthenticated ? <Component /> : null;
  };

export default LoginWrapper;
