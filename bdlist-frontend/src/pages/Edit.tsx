import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Error from '../components/error';
import SpeedDialComponent from '../components/SpeedDialComponent';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Typography } from '@mui/material';
import { editSession, getSession } from '../data/repository';
import { Alert, ERROR, SUCCESS, RE, ID } from '../constants/constants';
import { AdminWrapper } from '../hoc';
import Loading from '../components/Loading';

const Edit = () => {
  const roomID = sessionStorage.getItem(ID);
  useEffect(() => {
    async function getData() {
      getSession(roomID).then((res) => {
        if (res.gameSessions.length > 0) {
          setSessionInfo(res.gameSessions);
          setValue(dayjs(res.gameSessions[selected].start));
          setCourts(res.gameSessions[selected].courts.join(','));
          setTotal(res.gameSessions[selected].cost);
          setTitle(res.gameSessions[selected].title);
          setDuration(
            dayjs(res.gameSessions[selected].end).diff(
              dayjs(res.gameSessions[selected].start),
              'hour'
            )
          );
        } else {
          setSessionInfo(undefined);
        }
      });
    }

    getData();

    // eslint-disable-next-line
  }, []);

  const [sessionInfo, setSessionInfo] = useState(null);
  const [selected, setSelected] = useState(0);

  const handleSelect = (event) => {
    setSelected(event.target.value);
    setSessionInfo(sessionInfo);
    setValue(dayjs(sessionInfo[event.target.value].start));
    setCourts(sessionInfo[event.target.value].courts.join(','));
    setTitle(sessionInfo[event.target.value].title);
    setDuration(
      dayjs(sessionInfo[event.target.value].end).diff(
        dayjs(sessionInfo[event.target.value].start),
        'hour'
      )
    );
  };
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  //Default values obtained from the given session infomation
  const [condition, setCondition] = useState(SUCCESS);
  const [value, setValue] = useState(null);
  const [courts, setCourts] = useState(null);
  const [duration, setDuration] = useState(null);
  const [title, setTitle] = useState(null);
  const [total, setTotal] = useState(0);

  const [show, setShow] = useState(false);
  const [manual, setManual] = useState(true);
  const players = useRef(1);
  const Nshuttle = useRef(0);
  const costShuttle = useRef(0);
  const Ncourts = useRef(0);
  const costCourt = useRef(0);

  const onTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeDuration = (event) => {
    setDuration(event.target.value);
  };

  const onChange = (event) => {
    setCourts(event.target.value);
  };

  const onTotal = (event) => {
    console.log(Nshuttle.current.value);
    const shuttleTotal = Nshuttle.current.value * costShuttle.current.value;
    const courtTotal =
      Ncourts.current.value * duration * costCourt.current.value;
    const perPerson = (shuttleTotal + courtTotal) / players.current.value;

    setTotal(perPerson.toFixed(2));
    setShow(true);
  };

  const onConfirm = async () => {
    if (!RE.test(courts)) {
      setAlertMsg('Format for courts not valid');
      setCondition(ERROR);
      setOpen(true);
    }

    const courtList = courts.split(',').map(String);

    const sessionData = {
      start: dayjs(value).toISOString(),
      end: dayjs(value).add(duration, 'hour').toISOString(),
      courts: courtList,
      payTo: sessionInfo[selected].payTo,
      cost: parseFloat(total),
      sessionId: sessionInfo[selected]._id,
      title: title,
    };

    editSession(sessionData)
      .then((res) => {
        setAlertMsg('Session edit succesful');
        setCondition(SUCCESS);
        setOpen(true);
      })
      .catch((error) => {
        setAlertMsg(error.response.data.error);
        setCondition(ERROR);
        setOpen(true);
      });
  };
  return (
    <div>
      {sessionInfo === null ? (
        <Loading />
      ) : sessionInfo === undefined ? (
        <Error
          title={'No data found...'}
          subTitle={'Go make a new sessions before trying to edit one kay..?'}
        />
      ) : (
        <div className='flex justify-center'>
          <div className='rounded-[20px] flex justify-evenly items-center flex-col border border-green-400 space-y-9 w-[380px] '>
            <p className=' text-center text-[30px] mt-4'>Edit Session</p>
            <div>
              <FormControl
                sx={{ m: 1, minWidth: { xs: 150, sm: 180, md: 200 } }}
              >
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
            </div>
            <Box>
              <Typography variant='h6' align='left' sx={{ mb: 1 }}>
                New date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                  sx={{ width: 250 }}
                  value={value}
                  label='Date'
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
                value={duration}
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
                id='text'
                value={courts}
                helperText='Seperate the numbers with a comma'
                variant='standard'
                onChange={onChange}
              />
            </Box>

            <Box>
              <Typography variant='h6' align='left' sx={{ mb: 1 }}>
                Price per player
              </Typography>
              {manual ? (
                <div className='flex flex-col items-center'>
                  <TextField
                    style={{ width: 250 }}
                    id='text-price'
                    label='Price'
                    defaultValue='0'
                    helperText='Optional, can be added later in edit'
                    variant='standard'
                    value={total}
                  />
                  <Button className='mt-3' onClick={() => setManual(false)}>
                    Calculator
                  </Button>
                </div>
              ) : (
                <div className='rounded-[20px] border space-y-6 w-[270px] p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Typography variant='subtitle1' align='left'>
                        {' '}
                        No. Players:{' '}
                      </Typography>
                    </div>
                    <div>
                      <TextField
                        style={{ width: 100 }}
                        id='text-price'
                        inputRef={players}
                        size='small'
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Typography variant='subtitle1' align='left'>
                        {' '}
                        Cost per hour:
                      </Typography>
                    </div>
                    <div>
                      <TextField
                        style={{ width: 100 }}
                        id='text-price'
                        inputRef={costCourt}
                        size='small'
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Typography variant='subtitle1' align='left'>
                        {' '}
                        No. Courts:{' '}
                      </Typography>
                    </div>
                    <div>
                      <TextField
                        style={{ width: 100 }}
                        id='text-price'
                        inputRef={Ncourts}
                        size='small'
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Typography variant='subtitle1' align='left'>
                        {' '}
                        No. Shuttles:{' '}
                      </Typography>
                    </div>
                    <div>
                      <TextField
                        style={{ width: 100 }}
                        id='text-price'
                        inputRef={Nshuttle}
                        size='small'
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Typography variant='subtitle1' align='left'>
                        {' '}
                        Duration:{' '}
                      </Typography>
                    </div>
                    <div>
                      {duration ? (
                        <Typography variant='subtitle1' align='left'>
                          {duration} Hour(s)
                        </Typography>
                      ) : (
                        <Typography variant='subtitle1' align='left'>
                          0 Hour(s)
                        </Typography>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Typography variant='subtitle1' align='left'>
                        {' '}
                        Shuttle cost:{' '}
                      </Typography>
                    </div>
                    <div>
                      <TextField
                        style={{ width: 100 }}
                        id='text-price'
                        inputRef={costShuttle}
                        size='small'
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Button
                        variant='contained'
                        color='success'
                        onClick={onTotal}
                      >
                        Total
                      </Button>
                    </div>
                    <div>
                      <Typography
                        variant='h6'
                        align='left'
                        className={`transition-opacity duration-700 ease-in ${
                          show ? 'opacity-100' : 'opacity-0'
                        } `}
                      >
                        RM {total}
                      </Typography>
                    </div>
                  </div>
                  <div className='flex items-center justify-center'>
                    <Button onClick={() => setManual(true)}>
                      Manual Input
                    </Button>
                  </div>
                </div>
              )}
            </Box>

            <Box>
              <Typography variant='h6' align='left' sx={{ mb: 1 }}>
                Title
              </Typography>
              <TextField
                style={{ width: 250 }}
                id='text-title'
                value={title}
                multiline
                rows={2}
                helperText='Optional, can be added later in edit'
                onChange={onTitle}
              />
            </Box>

            <div className='p-6'>
              <Button
                variant='contained'
                color='success'
                size='large'
                onClick={onConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

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

export default AdminWrapper(Edit);
