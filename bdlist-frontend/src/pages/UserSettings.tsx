import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, promoteUser, demoteUser } from '../data/repository';
import { useState } from 'react';
import { AdminWrapper } from '../hoc';
import {
  ID,
  ACTIONS,
  SUCCESS,
  ERROR,
  Alert,
  WARNING,
} from '../constants/constants';
import { Button } from '@mui/material';
import SpeedDialComponent from '../components/SpeedDialComponent';
import Loading from '../components/Loading';
import Snackbar from '@mui/material/Snackbar';

const userReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.playerList,
        creator: action.payload.creatorUsername,
      };
    case ACTIONS.FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
      };
    default:
      return state;
  }
};

const UserSettings = () => {
  let navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [condition, setCondition] = useState(SUCCESS);

  const initialUserState = {
    loading: true,
    data: null,
  };

  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    async function getUsersData() {
      getUsers(sessionStorage.getItem(ID)).then((res) => {
        userDispatch({ type: ACTIONS.SUCCESS, payload: res });
      });
    }

    getUsersData();
    // eslint-disable-next-line
  }, []);

  const activateAlert = (severity, msg) => {
    setCondition(severity);
    setAlertMsg(msg);
    setAlert(true);
  };

  const handleCloseAlert = () => {
    setAlert(false);
  };
  const handlePromote = (index) => {
    promoteUser(sessionStorage.getItem(ID), userState.data[index].email)
      .then((res) => {
        userDispatch({ type: ACTIONS.SUCCESS, payload: res });
        activateAlert(SUCCESS, 'User Promoted');
      })
      .catch((error) => {
        userDispatch({ type: ACTIONS.FAILURE, payload: null });
        activateAlert(ERROR, error.response.data.error);
      });
  };

  const handleDemote = (index) => {
    demoteUser(sessionStorage.getItem(ID), userState.data[index].email)
      .then((res) => {
        userDispatch({ type: ACTIONS.SUCCESS, payload: res });
        activateAlert(WARNING, 'User Demoted');
      })
      .catch((error) => {
        userDispatch({ type: ACTIONS.FAILURE, payload: null });
        activateAlert(ERROR, error.response.data.error);
      });
  };
  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <div className='underline underline-offset-8 rounded-md p-7'>
          <h1 className='text-4xl font-mono'>User Settings</h1>
        </div>
        {userState.loading ? (
          <Loading />
        ) : (
          <ul className='mt-3 ml-5 space-y-9 '>
            {userState.data.map((user, index) => (
              <li key={`user-${index}`}>
                <div className='rounded-[20px] py-5 px-12 min-h-[160px] flex flex-row shadow-mid border border-green-400 w-full'>
                  <div className='relative'>
                    <div className='flex flex-col'>
                      <h2 className='text-[23px]'>{user.username}</h2>
                      <h2>{user.email}</h2>
                      <div className='mt-3'>
                        {user.username === userState.creator ? (
                          <></>
                        ) : !user.isAdmin ? (
                          <Button
                            color={SUCCESS}
                            onClick={() => handlePromote(index)}
                          >
                            Promote
                          </Button>
                        ) : (
                          <Button
                            color={ERROR}
                            onClick={() => handleDemote(index)}
                          >
                            Demote
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Snackbar
        open={alert}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={condition}
          sx={{ width: '100%' }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
      <SpeedDialComponent />
    </div>
  );
};

export default AdminWrapper(UserSettings);
