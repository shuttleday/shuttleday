import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdminWrapper } from '../hoc';
const Dev = () => {
  let navigate = useNavigate();

  const token = useRef();
  function submit() {
    console.log(token.current.value);
    localStorage.setItem('jwtToken_Login', token.current.value);

    navigate('/');
  }
  return (
    <div>
      <TextField
        required
        inputRef={token}
        id='outlined-required'
        label='Required'
      />
      <Button variant='contained' onClick={submit}>
        Enter
      </Button>
    </div>
  );
};

export default AdminWrapper(Dev);
