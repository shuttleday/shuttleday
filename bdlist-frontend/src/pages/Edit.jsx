import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SpeedDialComponent from '../components/SpeedDialComponent';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { editSession, getSession } from '../data/repository';

const Edit = () => {
  const location = useLocation();

  useEffect(() => {
    async function getData() {
      getSession().then((res) => {
        console.log(res.gameSessions);
        if (res.gameSessions !== null) {
          setSessionInfo(res.gameSessions);
          setSelected(0);
        }
      });
    }

    if (sessionInfo === null) {
      getData();
    }
    // eslint-disable-next-line
  }, []);
  const [sessionInfo, setSessionInfo] = useState(location.state.sessionInfo);
  const [selected, setSelected] = useState(0);

  const handleSelect = (event) => {
    setSelected(event.target.value);
  };
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  const [condition, setCondition] = useState('success');
  const RE = /^\d+(,\d+)*$/; //Format for input e.g. 1,2,3,4
  const [value, setValue] = useState(
    dayjs(location.state.sessionInfo[selected].end)
  );
  const [courts, setCourts] = useState(
    location.state.sessionInfo[selected].courts.join(',')
  );

  const [cost, setCost] = useState(location.state.sessionInfo[selected].cost);

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

  const onConfirm = async () => {
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
      payTo: sessionInfo[selected].payTo,
      sessionId: sessionInfo[selected]._id,
    };

    const response = await editSession(sessionData);

    if (response) {
      setAlertMsg('Session edit succesful');
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
      <Stack spacing={6} display='flex' justify='center' alignItems='center'>
        <Box>
          <Typography variant='h6' align='left' sx={{ mb: 1 }}>
            Edit Session
          </Typography>
        </Box>
        <Box>
          <FormControl sx={{ m: 1, minWidth: { xs: 150, sm: 180, md: 200 } }}>
            <InputLabel id='demo-simple-select-helper-label'>
              Sessions
            </InputLabel>
            <Select
              id='Session-payment'
              value={selected}
              label='Sessions'
              color='primary'
              onChange={handleSelect}
            >
              {sessionInfo === null ? (
                <MenuItem value={0}>N/A</MenuItem>
              ) : (
                sessionInfo.map((date, index) => (
                  <MenuItem key={index} value={index}>
                    {dayjs(date.end).format('DD/MM/YYYY ddd')}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography variant='h6' align='left' sx={{ mb: 1 }}>
            New date
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
            defaultValue={courts}
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
            defaultValue={cost}
            helperText='Optional, can be added later in edit'
            variant='standard'
            onChange={onCost}
          />
        </Box>

        <Button
          variant='contained'
          color='success'
          size='large'
          onClick={onConfirm}
        >
          Confirm
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
      <br />
    </div>
  );
};

export default Edit;
