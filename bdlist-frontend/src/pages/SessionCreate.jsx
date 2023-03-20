import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import SpeedDialComponent from '../components/SpeedDialComponent';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Typography } from '@mui/material';
import { createSession } from '../data/repository';

const SessionCreate = () => {
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  const [condition, setCondition] = useState('success');

  const RE = /^\d+(,\d+)*$/; //Format for input e.g. 1,2,3,4
  const [value, setValue] = useState(dayjs());
  const [courts, setCourts] = useState(null);

  const [cost, setCost] = useState(0);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const onChange = (event) => {
    setCourts(event.target.value);
    console.log(courts);
  };

  const onCost = (event) => {
    setCost(event.target.value);
  };

  const onCreate = async () => {
    if (!RE.test(courts)) {
      setAlertMsg('Format for courts not valid');
      setCondition('error');
      setOpen(true);
    }

    const courtList = courts.split(',').map(String);

    const sessionData = {
      start: dayjs().toISOString(),
      end: dayjs(value).toISOString(),
      courts: courtList,
      cost: parseInt(cost),
    };

    const response = await createSession(sessionData);

    if (response) {
      setAlertMsg('Created session succesfully');
      setCondition('success');
      setOpen(true);
    } else {
      setAlertMsg('Something went wrong');
      setCondition('error');
      setOpen(true);
    }
  };
  return (
    <div>
      <Stack
        spacing={6}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Box>
          <Typography variant='h6' align='left' sx={{ mb: 1 }}>
            Choose date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label='Session date'
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography variant='h6' align='left' sx={{ mb: 1 }}>
            Court number
          </Typography>
          <TextField
            id='text'
            label='Courts'
            defaultValue='0'
            helperText='Seperate the numbers with a comma'
            variant='standard'
            onChange={onChange}
          />
        </Box>

        <Box>
          <Typography variant='h6' align='left' sx={{ mb: 1 }}>
            Price per player
          </Typography>
          <TextField
            id='text-price'
            label='Price'
            defaultValue='0'
            helperText='Optional, can be added later in edit'
            variant='standard'
            onChange={onCost}
          />
        </Box>

        <Button
          variant='contained'
          color='success'
          size='large'
          onClick={onCreate}
        >
          Create
        </Button>
      </Stack>

      <SpeedDialComponent />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={condition}
          sx={{ width: '100%' }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SessionCreate;
