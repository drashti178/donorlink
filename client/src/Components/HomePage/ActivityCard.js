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
content:{
  backgroundColor:"#075456"
}

});

const ActivityCard = ({activity}) => {
    const navigate = useNavigate();
   
    const classes = useStyles();
    const { activityname
        , activityImgName, description, participation

    } = activity;
    const ImgPath = "/images/activity/";
    return (
      <Card sx={{ minWidth: "300px" }} className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="green iguana"
          height="140"
          image={ImgPath + activityImgName}
        />
        <CardContent  className={classes.content}>
          <Typography variant="h5" component="div" style={{borderBottom:"solid white",color:"white"
          }}>
          {activityname}
          </Typography>
          <Typography variant="body2" color="white">
           Description : {description}
           <Typography variant="body2" color="white">
           Participation : {participation}
          </Typography>
          </Typography>

        </CardContent>
       
      </Card>
    );
}

export default ActivityCard