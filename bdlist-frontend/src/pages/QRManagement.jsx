import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Button, Chip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';
import { uploadQR } from '../data/repository';
import Snackbar from '@mui/material/Snackbar';
import { Alert, ERROR, SUCCESS } from '../constants';
import { amber } from '@mui/material/colors';
import SpeedDialComponent from '../components/SpeedDialComponent';

const QRManagement = () => {
  const color = amber[700];

  const [value, setValue] = useState('1');
  const [image, setImage] = useState(null);
  const [buttonOn, setButtonON] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(SUCCESS);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnChange = (e) => {
    setButtonON(false);
    setImage(e.target.files[0]);
  };

  const handleClick = () => {
    uploadQR(image)
      .then((res) => {
        setAlertMsg('QR Uploaded!');
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

      <div className='flex justify-center items-center flex-col'>
        <Box sx={{ width: { xs: 320, sm: 500 }, typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label='lab API tabs example'
                centered
                TabIndicatorProps={{ style: { background: 'green' } }}
                textColor='inherit'
                variant='fullWidth'
              >
                <Tab label='Upload' value='1' />
                <Tab label='Edit' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <div className='flex justify-center items-center flex-col space-y-5'>
                <Chip
                  icon={<InfoIcon />}
                  label={
                    'Your QR code should fit in this box with minimal whitespace'
                  }
                  color='warning'
                  variant='outlined'
                />
                <div className='h-[400px] w-[300px] md:w-[350px]'>
                  <Card className=' relative rounded-md flex items-center border border-green-400 justify-center'>
                    {image ? (
                      <div>
                        <IconButton
                          aria-label='upload picture'
                          className='absolute top-0 right-0 mt-2 mr-2 z-20'
                          component='label'
                          sx={{ color: color }}
                        >
                          <input
                            hidden
                            accept='image/*'
                            type='file'
                            onChange={handleOnChange}
                          />
                          <ImageIcon />
                        </IconButton>
                        <CardMedia
                          component='img'
                          src={URL.createObjectURL(image)}
                          alt='QR-Code'
                        />
                      </div>
                    ) : (
                      <div className='flex items-center justify-center h-full w-full p-60'>
                        <IconButton
                          color='primary'
                          aria-label='upload picture'
                          component='label'
                        >
                          <input
                            hidden
                            accept='image/*'
                            type='file'
                            onChange={handleOnChange}
                          />
                          <ImageIcon />
                        </IconButton>
                      </div>
                    )}
                  </Card>
                  <div className='w-full p-5'>
                    <Button
                      variant='contained'
                      color='success'
                      size='large'
                      className='w-full '
                      disabled={buttonOn}
                      onClick={handleClick}
                    >
                      Upload QR
                    </Button>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value='2'>Item Two</TabPanel>
          </TabContext>
        </Box>
      </div>

      <SpeedDialComponent />
    </div>
  );
};

export default QRManagement;
