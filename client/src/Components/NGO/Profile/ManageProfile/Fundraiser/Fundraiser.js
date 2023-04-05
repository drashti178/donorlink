import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@mui/material';
import StopFundraiser from './stopFundraiser';
import ViewFDonations from './viewFDonations';


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
const Fundraiser = ({product}) => {
    const imgPath = "/images/fundraiser/";
    const classes = useStyles();
    const { fun_id,fr_name, fr_img, duration
        , amount,target,cause,ngo,enddate

    } = product;
   console.log(amount);
   console.log(target);
  
  return (
   <>
   <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={imgPath + fr_img}
         
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            Name  : {fr_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {cause}
          </Typography>
          {
            (enddate===null)?<Typography variant="h6" color="textSecondary" component="p">
            Active  <br /> Amount : {amount}     Target : {target}
           </Typography>:<Typography variant="h6" color="textSecondary" component="p">
            Completed    <br /> Amount : {amount}  Duration:{duration}
           </Typography>
          }
          
          <Grid
              container
              spacing={1}
              
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
                {
            (enddate===null)?
            <StopFundraiser fr_id={fun_id}/>:
             <ViewFDonations fr_id={fun_id} />}
             
        
              
              
             
             
              
              </Grid>
        </CardContent>
      </Card>

   </>
  )
}

export default Fundraiser

  
 