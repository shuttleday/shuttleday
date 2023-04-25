import React, { useEffect, useState } from 'react';
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
import { uploadQR, editQR, getQR } from '../data/repository';
import Snackbar from '@mui/material/Snackbar';
import { Alert, ERROR, WARNING, SUCCESS } from '../constants';
import { amber } from '@mui/material/colors';
import SpeedDialComponent from '../components/SpeedDialComponent';
import jwt_decode from 'jwt-decode';
import { BiErrorAlt } from 'react-icons/bi';

const QRManagement = () => {
  const color = amber[700];

  const user = jwt_decode(localStorage.getItem('jwtToken_Login'));
  const [value, setValue] = useState('1');
  const [image, setImage] = useState(null);
  const [buttonOn, setButtonON] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');
  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(SUCCESS);
  const [adminQR, setAdminQR] = useState(null);
  const [isNull, setIsNull] = useState(false);

  useEffect(() => {
    getQR(user.email)
      .then((res) => {
        setAdminQR(res.url);
      })
      .catch((error) => {
        setIsNull(true);
      });
    // eslint-disable-next-line
  }, []);

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
        setImage(null);
        setOpen(true);
      })
      .catch((error) => {
        setAlertMsg(error.response.data.error);
        setCondition(ERROR);
        setOpen(true);
      });
  };

  const handleEdit = () => {
    editQR(image)
      .then((res) => {
        setAlertMsg('QR Updated!');
        setCondition(SUCCESS);
        setImage(null);
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
                <Tab label='Edit' value='2' disabled={isNull} />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <div className='flex justify-center items-center flex-col space-y-5'>
                <Chip
                  icon={<InfoIcon />}
                  label={
                    'Your QR code should fit in this box with minimal whitespace'
                  }
                  color={WARNING}
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
                      color={SUCCESS}
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
            <TabPanel value='2'>
              <div className='flex justify-center items-center flex-col space-y-5'>
                <Chip
                  icon={<InfoIcon />}
                  label={'Current QR'}
                  color={WARNING}
                  variant='outlined'
                />
                <div className='w-[300px] md:w-[350px]'>
                  <Card className=' relative rounded-md flex items-center border border-green-400 justify-center'>
                    {adminQR ? (
                      <CardMedia component='img' src={adminQR} alt='QR-Code' />
                    ) : (
                      <div className='flex items-center justify-center h-full w-full p-60'>
                        <div className=' justify-center items-center '>
                          <BiErrorAlt className='h-[60px] w-[60px]' />
                        </div>

                        <p className='text-center font-bold text-red-500 '>
                          No receipts has been uploaded yet
                        </p>
                      </div>
                    )}
                  </Card>
                </div>

                <Chip
                  icon={<InfoIcon />}
                  label={'Current QR'}
                  color='success'
                  variant='outlined'
                />
                <div className=' w-[300px] md:w-[350px]'>
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
                </div>
                <div className='w-full p-5'>
                  <Button
                    variant='contained'
                    color='success'
                    size='large'
                    className='w-full '
                    disabled={buttonOn}
                    onClick={handleEdit}
                  >
                    Upload QR
                  </Button>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>

      <SpeedDialComponent />
    </div>
  );
};

export default QRManagement;
