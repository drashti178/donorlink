import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  imageContainer: {
    height: '80%',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  caption: {
    padding: 2,
    textAlign: 'center',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    padding:2,
  },
}));

const Carousel = ({ images, captions }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const handlePrevious = () => {
    setIndex((index + images.length - 1) % images.length);
  };

  const handleNext = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <Box className={classes.root}>
      <IconButton onClick={handlePrevious}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      <Box className={classes.imageContainer}>
        <img src={images[index]} alt="slide" className={classes.image} />
      </Box>
      {/* <Typography variant="body1" className={classes.caption}>
        {captions[index]}
      </Typography> */}
      {/* <Box className={classes.controls}>
         */}
        <IconButton onClick={handleNext}>
          <KeyboardArrowRightIcon />
        </IconButton>
      {/* </Box> */}
    </Box>
  );
};


export default Carousel;
