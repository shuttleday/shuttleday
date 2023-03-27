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
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
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
  const [courts, setCourts] = useState('0');
  const [duration, setDuration] = useState(0);
  const [cost, setCost] = useState(0);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const onChange = (event) => {
    setCourts(event.target.value);
  };
  const onChangeDuration = (event) => {
    setDuration(event.target.value);
  };
  const onCost = (event) => {
    setCost(event.target.value);
  };

  const onCreate = async () => {
    if (!RE.test(courts)) {
      setAlertMsg('Format for courts not valid');
      setCondition('error');
      setOpen(true);
      return;
    }

    if (duration < 1) {
      setAlertMsg('Duration should have at least 1 hour');
      setCondition('error');
      setOpen(true);
      return;
    }

    const courtList = courts.split(',').map(String);

    const sessionData = {
      start: dayjs(value).toISOString(),
      end: dayjs(value).add(duration, 'hour').toISOString(),
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
    return;
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
            Choose date and time
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              sx={{ width: 250 }}
              defaultValue={value}
              label='Controlled picker'
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography variant='h6' align='left' sx={{ mb: 1 }}>
            Session duration
          </Typography>
          <TextField
            style={{ width: 250 }}
            helperText='Duration of this session'
            id='duration'
            label='Duration'
            defaultValue='0'
            variant='standard'
            onChange={onChangeDuration}
          />
        </Box>
        <Box>
          <Typography variant='h6' align='left' sx={{ mb: 1 }}>
            Court number
          </Typography>
          <TextField
            style={{ width: 250 }}
            id='court'
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
            style={{ width: 250 }}
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
        <br />
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
