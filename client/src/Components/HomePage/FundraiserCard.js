import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles({
    root: {
      display: 'flex',
      width: '60%',
      height: '240px',
      marginTop:"2%",
      marginLeft:"20%",
      borderRight:"2px solid #075456",
      borderBottom:"2px solid #075456",
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
      backgroundColor:"#075456"
    }
  });
const FundraiserCard = ({fundraiser}) => {
    const imgPath = "/images/fundraiser/";
    const classes = useStyles();
    const { fun_id,fr_name, fr_img, duration
        , amount,target,cause,ngo,enddate,status

    } = fundraiser;
    const navigate = useNavigate();

   const  DonateToFundraiser= () =>{
    navigate("/fundraiser/payment",{state:fun_id})

  }
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
            (status==="active")?<Typography variant="h6" color="textSecondary" component="p">
            Active  <br /> Amount : {amount}     Target : {target}
           </Typography>:<Typography variant="h6" color="textSecondary" component="p">
            Completed    <br /> Amount : {amount}  Duration:{duration}
           </Typography>
          }
          <Box sx={{ flexGrow: 1 ,display:'flex',flexDirection:'row-reverse',mr:"5%"}}>
                <Button sx={{ backgroundColor:"white", color: '#075456', display: 'block',":hover":{backgroundColor:"white", color: '#075456'} }} onClick={DonateToFundraiser}>Donate</Button>
              </Box> 
         
        </CardContent>
      </Card>

   </>
  )
}

export default FundraiserCard

  
 