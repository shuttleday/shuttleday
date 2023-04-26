import React, { useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import SpeedDialComponent from '../components/SpeedDialComponent';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Typography } from '@mui/material';
import { createSession } from '../data/repository';
import { ERROR, SUCCESS, Alert, RE } from '../constants';

const SessionCreate = () => {
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  const [condition, setCondition] = useState(SUCCESS);

  const [value, setValue] = useState(dayjs());
  const courts = useRef();
  const duration = useRef(0);
  const cost = useRef(0);
  const title = useRef('');

  const onCreate = async () => {
    if (!RE.test(courts.current.value)) {
      setAlertMsg('Format for courts not valid');
      setCondition(ERROR);
      setOpen(true);
      return;
    }

    if (duration.current.value < 1) {
      setAlertMsg('Duration should have at least 1 hour');
      setCondition(ERROR);
      setOpen(true);
      return;
    }

    if (title.current.value.length > 30) {
      setAlertMsg('Title can only have 30 characters');
      setCondition(ERROR);
      setOpen(true);
    }

    const courtList = courts.current.value.split(',').map(String);

    const sessionData = {
      start: dayjs(value).toISOString(),
      end: dayjs(value).add(duration.current.value, 'hour').toISOString(),
      courts: courtList,
      cost: parseInt(cost.current.value),
      title: title.current.value,
    };

    createSession(sessionData)
      .then((res) => {
        setAlertMsg('Created session succesfully');
        setCondition(SUCCESS);
        setOpen(true);
      })
      .catch((error) => {
        setAlertMsg(error.response.data.error);
        setCondition(ERROR);
        setOpen(true);
      });

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
        <div className='rounded-[20px] flex justify-evenly items-center flex-col border border-green-400 space-y-9 w-[380px] '>
          <p className=' text-center text-[30px] mt-4 underline underline-offset-4'>
            Create Session
          </p>
          <Box>
            <Typography variant='h6' align='left' sx={{ mb: 1 }}>
              Choose date and time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                sx={{ width: 250 }}
                defaultValue={value}
                label='Select Date'
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
              helperText='Duration of this session in hours'
              id='duration'
              label='Duration'
              defaultValue='0'
              variant='standard'
              inputRef={duration}
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
              inputRef={courts}
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
              inputRef={cost}
            />
          </Box>

          <Box>
            <Typography variant='h6' align='left' sx={{ mb: 1 }}>
              Title
            </Typography>
            <TextField
              style={{ width: 250 }}
              id='text-price'
              label='Title'
              defaultValue=''
              multiline
              rows={2}
              helperText='Optional, can be added later in edit'
              inputRef={title}
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
        </div>
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
