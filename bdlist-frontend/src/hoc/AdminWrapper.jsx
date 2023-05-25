import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { admin } from '../constants';

const AdminWrapper = (Component) =>
  function HOC() {
    let navigate = useNavigate();
    useEffect(() => {
      if (localStorage.getItem('jwtToken_Login') == null) {
        navigate('/GLogin');
      }
      const user = jwt_decode(localStorage.getItem('jwtToken_Login'));
      if (user.userType !== admin) {
        navigate('/NotFound-404');
      }
    }, [navigate]);

    const isAuthenticated = localStorage.getItem('jwtToken_Login') !== null;
    const user = jwt_decode(localStorage.getItem('jwtToken_Login'));
    const isAdmin = isAuthenticated && user.userType === admin;

    return isAdmin ? <Component /> : null;
  };

export default AdminWrapper;
