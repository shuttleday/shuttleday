import React, { useState, useEffect, useCallback } from 'react';
import SpeedDialComponent from '../components/SpeedDialComponent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import dayjs from 'dayjs';
import ImageViewer from 'react-simple-image-viewer';
import { Box, Stack, Typography } from '@mui/material';
import { getSession, getReceipts } from '../data/repository';

const ReceiptProof = () => {
  const [images, setImages] = useState([]);
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
          getReceipts(resData.gameSessions).then((res) => {
            setImages(res);
          });
        } else {
          alert('No data found');
        }
      });
    }

    getData();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
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
                  height: { sx: 350, sm: 400, md: 450 },
                }}
              >
                <ImageListItem key='Subheader' cols={2}>
                  <ListSubheader component='div'>
                    <Typography
                      id='modal-modal-title'
                      variant='h6'
                      component='h2'
                    >
                      {dayjs(imageInfo.date).format('DD/MM/YYYY ddd')}
                    </Typography>
                  </ListSubheader>
                </ImageListItem>

                {imageInfo.urls.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={`${image.signedUrl}`}
                      srcSet={`${image.signedUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={image.payer}
                      onClick={() => openImageViewer(index, infoIndex)}
                      loading='lazy'
                    />
                    <ImageListItemBar title={image.payer} subtitle={''} />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          ))
        )}
      </Stack>
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