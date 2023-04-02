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

const ActivityCard = ({activity}) => {
    const navigate = useNavigate();
   
    const classes = useStyles();
    const { activityname
        , activityImgName, description, participation

    } = activity;
    const ImgPath = "/images/activity/";
    return (
      <Card sx={{ maxWidth: 345 }} className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="green iguana"
          height="140"
          image={ImgPath + activityImgName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {activityname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {description}
           <Typography variant="body2" color="text.secondary">
           {participation}
          </Typography>
          </Typography>

        </CardContent>
       
      </Card>
    );
}

export default ActivityCard