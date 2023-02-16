import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';


const useStyles = makeStyles({
  
  card: {
    display:'inline-block',
    width: "400px",
    height: 300,
    margin: 10,
  },
  media: {
        height: 140,
      },
});

const CardItem = (props) =>{
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.title}
      />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{props.title}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
          </Typography>
        </CardContent>
      </Card>
  );
  
};

export default CardItem;