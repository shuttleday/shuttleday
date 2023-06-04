import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ID } from '../constants';

const RoomWrapper = (Component) =>
  function HOC() {
    let navigate = useNavigate();
    useEffect(() => {
      if (sessionStorage.getItem(ID) == null) {
        navigate('/');
      }
    }, [navigate]);

    const Id = sessionStorage.getItem(ID) != null;
    return Id ? <Component /> : null;
  };

export default RoomWrapper;
