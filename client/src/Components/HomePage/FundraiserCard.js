import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
  
root: {
  
  width:'340px',
  marginTop:"2%",
  marginLeft:"2%",
  
},
media: {
   
 
  height: "240px",
},


});

const FundraiserCard = ({fundraiser}) => {
    const navigate = useNavigate();
   
    const classes = useStyles();
    const {fr_name,target
        , fr_img , cause, duration,amount


    } = fundraiser;
    const ImgPath = "/images/fundraiser/";
    return (
      <Card sx={{ maxWidth: 345 }} className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="green iguana"
          height="140"
          image={ImgPath + fr_img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {fr_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {cause}
           <Typography variant="body2" color="text.secondary">
           {duration}
           {amount}
           {target}
          </Typography>
          </Typography>

        </CardContent>
       
      </Card>
    );
}

export default FundraiserCard