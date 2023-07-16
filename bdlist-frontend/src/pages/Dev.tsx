import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdminWrapper } from '../hoc';
const Dev = () => {
  let navigate = useNavigate();

  const tokenRef = useRef<HTMLInputElement | null>(null);
  function submit() {
    if (tokenRef.current == null) {
      return;
    }
    localStorage.setItem('jwtToken_Login', tokenRef.current.value);
    navigate('/');
  }
  return (
    <div>
      <TextField
        required
        inputRef={tokenRef}
        id='outlined-required'
        label='Required'
      />
      <Button variant='contained' onClick={submit}>
        Enter
      </Button>
    </div>
  );
};

export default Dev;
