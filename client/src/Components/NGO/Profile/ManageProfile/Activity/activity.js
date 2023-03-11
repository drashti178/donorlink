import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@mui/material';
import EditActivity from './editActivity';

import DeleteActivity from './deleteActivity';

const useStyles = makeStyles({
    root: {
      display: 'flex',
      width: '60%',
      height: '240px',
      marginTop:"2%",
      marginLeft:"20%",
      borderRight:"2px solid darkcyan",
      borderBottom:"2px solid darkcyan",
      boxShadow:"3px 4px #888888"
      
    },
    media: {
      width: '40%',
      height: '100%',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width:"60%",
      backgroundColor:"darkcyan"
    }
  });
const Activity = ({product}) => {
    const imgPath = "/images/activity/";
    const classes = useStyles();
    const { a_id,activityname, activityImgName, description, participation } = product;
   
  
  return (
   <>
   <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={imgPath + activityImgName}
         
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            Name  : {activityname}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
           Participation : {participation}
          </Typography>
          <Grid
              container
              spacing={1}
              
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Box sx={{ width: "20%",marginLeft:"0%"}}>
                <EditActivity act_id={a_id}/>
              </Box>
              <Box sx={{ width: "20%",marginLeft:"0%"}}>
                <DeleteActivity act_id={a_id}/>
              </Box>
             
             
              
              </Grid>
        </CardContent>
      </Card>

   </>
  )
}

export default Activity

  
 