import React, { useEffect } from 'react';
import Error from '../components/error';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  let navigate = useNavigate();

  useEffect(() => {
    let timer1 = setTimeout(() => navigate('/'), 5000);
    return () => {
      clearTimeout(timer1);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Error
      title={'Hello... What are you doing here?'}
      subTitle={'You will be redirected back to the main page soon...'}
    />
  );
};

export default NotFound;
