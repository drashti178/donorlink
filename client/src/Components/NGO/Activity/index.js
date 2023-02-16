import CardItem from "./carditem";
import React from 'react';
import { makeStyles } from '@mui/styles';




const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflow:'auto',
    flexWrap: 'wrap' ,
    alignItems: 'center',
    marginLeft:'4%'
  },
  
});

const Activities = (props) => {
    
    const classes = useStyles();
    return (
        
        <div className={classes.cardContainer} >
        {props.cards.map(card => <CardItem key={card.id} {...card} />)}
        </div>
    
    );
  };

  export default Activities;
  