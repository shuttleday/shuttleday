import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
const InfoHeader = (props) => {
  return (
    <>
      <div className='flex space-x-2'>
        <div className='bg-primary flex-1 rounded-md p-2 text-center border-green-400'>
          Courts <p>{props.sessionInfo[props.selected].courts.join(',')}</p>
        </div>
        <div className='bg-primary flex-1 rounded-md p-2 text-center border-green-400'>
          Time{' '}
          <p>
            {dayjs(props.sessionInfo[props.selected].start).format('hh:mm A')}
          </p>
        </div>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <div className=' bg-primary rounded-md w-full'>
          <FormControl
            sx={{
              minWidth: { xs: 150, sm: 180, md: 200 },
              flexGrow: 1,
            }}
            variant='filled'
            className=' w-full'
          >
            <InputLabel
              sx={{ color: '#000000 !important' }}
              id='selector-label'
            >
              Sessions
            </InputLabel>
            <Select
              id='selector'
              value={props.selected}
              label='Sessions'
              onChange={props.handleSelect}
              style={{ borderRadius: '8px' }}
            >
              {props.sessionInfo.map((ses, index) => (
                <MenuItem key={index} value={index}>
                  <p>
                    {dayjs(ses.end).format('DD/MM/YY ddd')} - {`${ses.title}`}
                  </p>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>
    </>
  );
};

export default InfoHeader;
