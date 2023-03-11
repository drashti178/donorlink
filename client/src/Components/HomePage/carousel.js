import React, { useState,useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  imageContainer: {
    height: '50vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  image: {
    height: '50vh',
    width: '100%',
    objectFit: 'cover',
  },
 
  controls: {
    display: 'flex',
    justifyContent: 'center'
  },
}));

const Carouseldiv = ({images}) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  return (
    <Box className={classes.root}>
      
      <Box className={classes.imageContainer}>
     
        <img src={images[index]} alt="slide" className={classes.image} />
      
      </Box>
      
       
      
    </Box>
  );
};


export default Carouseldiv;
