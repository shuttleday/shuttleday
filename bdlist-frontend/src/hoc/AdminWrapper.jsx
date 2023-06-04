import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { ID, tokens } from '../constants';
import { userCheck } from '../data/repository';

const AdminWrapper = (Component) =>
  function HOC() {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      async function checkAdmin(data) {
        const res = await userCheck(data.email, sessionStorage.getItem(ID));
        if (res.isAdmin) {
          setIsAdmin(true);
        } else {
          navigate('/NotFound-404');
        }
      }

      if (localStorage.getItem(tokens.jwt) === null) {
        navigate('/GLogin');
      } else {
        const user = jwt_decode(localStorage.getItem(tokens.jwt));
        checkAdmin(user);
      }
    }, [navigate]);

    if (!isAdmin) {
      return null;
    }
    return <Component />;
  };

export default AdminWrapper;
