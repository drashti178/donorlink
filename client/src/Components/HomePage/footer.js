import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography, IconButton, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AdbIcon from '@mui/icons-material/Adb';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#252525",
    padding: 6,
    marginTop:20,
    height:"90vh"
  },
  socialIcons: {
    display: 'flex',
    flexDirection:"row",
    justifyContent:"flex-start",
    marginTop: 2,
  },
  socialIcon: {
   
    padding: 1,
    
    borderRadius: '50%',
    marginInline:"2%",
    color: 'white',
    
  },
  cotactIcons:{
    display: 'flex',
    flexDirection:"column",
    alignItems:"flex-start",
   
    marginTop: 2,
  },
  logo: {
    height: 'auto',
    width: 100,
    marginBottom: 2,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Box style={{marginTop:"4%",display:"flex",flexDirection:"row",marginInline:"30%"}}>
        <AdbIcon style={{ mr: 1,color: 'white',ml:15 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            style={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "'Aboreto', 'cursive'",
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Donor Link
          </Typography>
        </Box>
      <Box style={{ flexGrow: 1,mt:"4%",height:"400px",display:"flex",flexDirection:"row",}}>
   
          
   <Box style={{display:"flex",flexDirection:"column",padding:"2%",width:"70%",color:"white"}}>
   <Typography variant="h4"gutterBottom >
              About us
            </Typography>
            <Typography variant="body" gutterBottom style={{marginBlockEnd:"5%"}}>
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
            </Typography>
  
   <Typography variant="h4" gutterBottom >
              Connect with us
            </Typography>
            <div className={classes.socialIcons} >
              <IconButton className={classes.socialIcon} aria-label="Facebook">
                <FacebookIcon fontSize='large' style={{color:"white"}}/> <Typography variant='h6' style={{color:"white",ml:"5%"}}>Facebook</Typography>
              </IconButton>
              <IconButton className={classes.socialIcon} aria-label="Twitter">
                <TwitterIcon fontSize='large' style={{color:"white"}}/><Typography variant='h6' style={{color:"white",ml:"5%"}}>Twitter</Typography>
              </IconButton>
              <IconButton className={classes.socialIcon} aria-label="LinkedIn">
                <LinkedInIcon fontSize='large' style={{color:"white"}}/><Typography variant='h6' style={{color:"white",ml:"5%"}}>LinkedIn</Typography>
              </IconButton>
            </div>
   </Box> 
      


   <Box style={{display:"flex",flexDirection:"column",padding:"2%",color:"white",width:"30%"}}>
    
    
    
   <Typography variant="h4"gutterBottom >
              Contact us
            </Typography>
            <div className={classes.cotactIcons}>
              <IconButton style={{justifyContent:"space-between"}} gutterBottom>
                <LocationOnIcon fontSize='large' style={{color:"white"}}/>  <Typography variant='body2' style={{color:"white",ml:"5%",textAlign:"left"}}>203 Fake St. Mountain View, San Francisco, California, USA</Typography>
              </IconButton>
             
              <IconButton style={{justifyContent:"space-between"}} gutterBottom>
                <LocalPhoneIcon fontSize='large' style={{color:"white"}}/> <Typography variant='body2' style={{color:"white",ml:"5%"}}>+917990012657</Typography>
              </IconButton>
              <IconButton style={{justifyContent:"space-between"}} gutterBottom>
                <EmailIcon fontSize='large' style={{color:"white",marginRight:"5%"}}/> <Typography variant='body2' style={{color:"white",ml:"3%"}}>info@yourdomain.com</Typography>
              </IconButton>
            </div>
    
   </Box> 
 

</Box>
<Box style={{color:"white",textAlign:"center"}}><p>
  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" >Colorlib</a>
</p></Box>
      </Container>
    </footer>
  );
};

export default Footer;
