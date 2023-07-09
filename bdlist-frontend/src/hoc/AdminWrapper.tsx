import React, { useEffect, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { ID, tokens } from '../constants/constants';
import { userCheck } from '../data/repository';
import User from '../constants/types';

const AdminWrapper = (Component: FC) =>
  function HOC() {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      async function checkAdmin(data: User) {
        const res = await userCheck(
          data.email,
          sessionStorage.getItem(ID) as string
        );
        if (res.isAdmin) {
          setIsAdmin(true);
        } else {
          navigate('/NotFound-404');
        }
      }

      if (
        localStorage.getItem(tokens.jwt) == null ||
        localStorage.getItem(tokens.jwt) === ''
      ) {
        navigate('/GLogin');
      } else {
        const user: User = jwt_decode(
          localStorage.getItem(tokens.jwt) as string
        );
        checkAdmin(user);
      }
    }, [navigate]);

    if (!isAdmin) {
      return null;
    }
    return <Component />;
  };

export default AdminWrapper;
