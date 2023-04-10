import React, { useState, useEffect, useCallback } from 'react';
import SpeedDialComponent from '../components/SpeedDialComponent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import Error from '../components/error';
import ImageViewer from 'react-simple-image-viewer';
import { Box, Stack, Typography } from '@mui/material';
import { getSession, getReceipts } from '../data/repository';

const ReceiptProof = () => {
  const [images, setImages] = useState(null);
  const [isNull, setIsNull] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback(
    (index, infoIndex) => {
      setSelectedImages(images[infoIndex].viewableImage);
      setCurrentImage(index);
      setIsViewerOpen(true);
      // eslint-disable-next-line
    },
    [images]
  );

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    async function getData() {
      getSession().then((resData) => {
        if (resData.gameSessions !== null) {
          getReceipts(resData.gameSessions)
            .then((res) => {
              setImages(res);
            })
            .error(setIsNull(true));
        } else {
          alert('No data found');
        }
      });
    }

    getData();
    // eslint-disable-next-line
  }, []);

  if (images === null) {
    return (
      <Stack
        spacing={2}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <CircularProgress color='success' />
      </Stack>
    );
  }
  return (
    <div>
      {isNull ? (
        <Error
          title={'No data found...'}
          subTitle={
            'Either no sessions has been created or no one has paid yet....'
          }
        />
      ) : (
        <Stack
          spacing={2}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
          ></Typography>
          {images === [] ? (
            <Box></Box>
          ) : (
            images.map((imageInfo, infoIndex) => (
              <Box key={infoIndex}>
                <ImageList
                  sx={{
                    width: { sx: 240, sm: 300, md: 500 },
                    height: { sx: 100, sm: 100, md: 550 },
                  }}
                >
                  <ImageListItem key='Subheader' cols={2}>
                    <ListSubheader
                      component='div'
                      className='bg-primary p-3 rounded-md sm:'
                    >
                      <Typography
                        id='modal-modal-title'
                        className='text-white font-medium lg:text-[28px] sm:text-[25px] xs:text-[17px] text-[16px] lg:leading-[40px] text-center'
                      >
                        {dayjs(imageInfo.date).format(
                          'DD/MM/YYYY dddd hh:mm A'
                        )}
                      </Typography>
                    </ListSubheader>
                  </ImageListItem>

                  {imageInfo.urls.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        className='rounded-md'
                        src={`${image.signedUrl}`}
                        srcSet={`${image.signedUrl}`}
                        alt={image.payer}
                        onClick={() => openImageViewer(index, infoIndex)}
                      />
                      <ImageListItemBar
                        title={image.payer}
                        subtitle={''}
                        className='rounded-md'
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                <br />
              </Box>
            ))
          )}
        </Stack>
      )}

      {isViewerOpen && (
        <ImageViewer
          src={selectedImages}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}
          closeOnClickOutside={true}
        />
      )}
      <SpeedDialComponent />
    </div>
  );
};

export default ReceiptProof;
