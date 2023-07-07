import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../constants';

const LoginWrapper = (Component) =>
  function HOC() {
    let navigate = useNavigate();
    useEffect(() => {
      if (
        localStorage.getItem(tokens.jwt) == null ||
        localStorage.getItem(tokens.jwt) === ''
      ) {
        navigate('/GLogin');
      }
    }, [navigate]);

    const Token = localStorage.getItem(tokens.jwt) != null;
    return Token ? <Component /> : null;
  };

export default LoginWrapper;
