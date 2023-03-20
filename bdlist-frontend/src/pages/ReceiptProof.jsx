import React, { useState, useEffect, useCallback } from 'react';
import SpeedDialComponent from '../components/SpeedDialComponent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import dayjs from 'dayjs';
import ImageViewer from 'react-simple-image-viewer';
import { Box, Stack } from '@mui/material';
import { getSession, getReceipts } from '../data/repository';

const ReceiptProof = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState(null);

  const imagess = [
    'http://placeimg.com/1200/800/nature',
    'http://placeimg.com/800/1200/nature',
    'http://placeimg.com/1920/1080/nature',
    'http://placeimg.com/1500/500/nature',
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback((index, infoIndex) => {
    console.log(images[infoIndex].viewableImage);
    setSelectedImages(images[infoIndex].viewableImage);
    setCurrentImage(index);
    setIsViewerOpen(true);
    // eslint-disable-next-line
  }, []);

  const closeImageViewer = () => {
    console.log(selectedImages);
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    async function getData() {
      getSession().then((res) => {
        console.log(res.gameSessions[0]._id);
        if (res.gameSessions !== null) {
          getReceipts(res.gameSessions).then((res) => {
            setImages(res);
          });
        } else {
          alert('No data found.');
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
                    {dayjs(imageInfo.date).format('DD/MM/YYYY ddd')}
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

                <ImageListItem>
                  <img
                    src={`https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=248&fit=crop&auto=format`}
                    srcSet={`https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={'hellow'}
                    loading='lazy'
                  />
                  <ImageListItemBar title={'hello'} subtitle={'this'} />
                </ImageListItem>
                <ImageListItem>
                  <img
                    src={`https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=248&fit=crop&auto=format`}
                    srcSet={`https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={'hellow'}
                    loading='lazy'
                  />
                  <ImageListItemBar title={'hello'} subtitle={'this'} />
                </ImageListItem>
                <ImageListItem>
                  <img
                    src={`https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=248&fit=crop&auto=format`}
                    srcSet={`https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={'hellow'}
                    loading='lazy'
                  />
                  <ImageListItemBar title={'hello'} subtitle={'this'} />
                </ImageListItem>
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
