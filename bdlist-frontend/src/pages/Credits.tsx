import React, { useState } from 'react';
import SpeedDialComponent from '../components/SpeedDialComponent';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Tilt from 'react-parallax-tilt';
import { info } from '../constants/constants';
import { Button } from '@mui/material';

const Credits = () => {
  return (
    <div>
      <div className='flex justify-center items-center flex-col'>
        <div className='py-10'>
          <div className='underline underline-offset-8 rounded-md'>
            <h1 className='text-4xl p-4 font-mono'>Credits</h1>
          </div>
        </div>

        {info.map((dev, index) => (
          <Tilt className=' p-9'>
            <div
              options={{ max: 45, scale: 1, speed: 450 }}
              className='w-[300px] sm:w-[470px] md:w-[510px] lg:w-[600px] border border-green-400 shadow-card rounded-[24px]'
            >
              <div className='flex flex-col md:flex-row md:space-x-14 p-4 items-center'>
                <div className='p-4'>
                  <Avatar
                    alt={dev.name}
                    src={dev.image}
                    sx={{
                      width: { xs: 90, sm: 100, md: 160 },
                      height: { xs: 90, sm: 100, md: 160 },
                    }}
                  />
                </div>
                <div className='flex flex-col justify-center md:justify-start items-center md:items-start'>
                  <p className='text-[35px] p-1 font-name'>{dev.name}</p>
                  <p
                    className={`text-[25px] animate-text bg-gradient-to-r ${dev.gradients} bg-clip-text text-transparent font-black`}
                  >
                    {dev.title}
                  </p>
                </div>
              </div>

              <LoreComponent dev={dev} />
            </div>
          </Tilt>
        ))}
      </div>

      <SpeedDialComponent />
      <p className=' font-light text-[15px] text-center bottom-4 mb-9 p-3'>
        You can find more about us at{' '}
        <a href='https://pierreccesario.com/' className=' text-cyan-400'>
          Pierre Cesario
        </a>{' '}
        and{' '}
        <a href='https://www.tjonathan.com/' className=' text-cyan-400'>
          Jonathan Teh
        </a>
      </p>
    </div>
  );
};

const LoreComponent = (props) => {
  const [compact, setCompact] = useState(true);

  const onClick = (event) => {
    setCompact((prev) => (prev ? false : true));
  };
  return (
    <div className='flex items-center justify-center p-5 text-base'>
      <Paper elevation={24} sx={{ width: 600 }} className='p-5'>
        {compact ? (
          <div className='font-mono text-left line-clamp-6 md:line-clamp-none'>
            {props.dev.lore}
          </div>
        ) : (
          <div className='font-mono text-left'>{props.dev.lore}</div>
        )}

        <div className='mt-2 visible md:hidden'>
          {compact ? (
            <Button onClick={onClick}>Expand</Button>
          ) : (
            <Button onClick={onClick}>Collapse</Button>
          )}
        </div>
      </Paper>
    </div>
  );
};
export default Credits;
