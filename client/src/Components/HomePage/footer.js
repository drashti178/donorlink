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
    marginTop: 20,
    height: "90vh"
  },
  socialIcons: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 2,
  },
  socialIcon: {

    padding: 1,

    borderRadius: '50%',
    marginInline: "2%",
    color: 'white',

  },
  cotactIcons: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "flex-start",

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
        {/* <Box style={{ marginTop: "2%", display: "flex", flexDirection: "row", marginInline: "30%" }}>
          <AdbIcon style={{ color: 'white', marginLeft: 70 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            style={{

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
        </Box> */}
        <Box style={{ flexGrow: 1, marginTop: "4%", height: "400px", display: "flex", flexDirection: "row", }}>


          <Box style={{ display: "flex", flexDirection: "column", padding: "2%", width: "70%", color: "white" }}>
            <Typography variant="h4" gutterBottom >
              About us
            </Typography>
            <Typography variant="body" gutterBottom style={{ marginBlockEnd: "5%" }}>
              Our website provides a platform for people to donate to any NGO
              of their choice, and it also gives NGOs a place to initiate fundraising
              campaigns for specific days or months or collaborate with other NGOs.
            </Typography>

            <Typography variant="h4" gutterBottom >
              Connect with us
            </Typography>
            <div className={classes.socialIcons} >
              <IconButton className={classes.socialIcon} aria-label="Facebook">
                <FacebookIcon fontSize='large' style={{ color: "white" }} /> <Typography variant='h6' style={{ color: "white", marginLeft: "5%" }}>Facebook</Typography>
              </IconButton>
              <IconButton className={classes.socialIcon} aria-label="Twitter">
                <TwitterIcon fontSize='large' style={{ color: "white" }} /><Typography variant='h6' style={{ color: "white", marginLeft: "5%" }}>Twitter</Typography>
              </IconButton>
              <IconButton className={classes.socialIcon} aria-label="LinkedIn">
                <LinkedInIcon fontSize='large' style={{ color: "white" }} /><Typography variant='h6' style={{ color: "white", marginLeft: "5%" }}>LinkedIn</Typography>
              </IconButton>
            </div>
          </Box>



          <Box style={{ display: "flex", flexDirection: "column", padding: "2%", color: "white", width: "30%" }}>



            <Typography variant="h4" gutterBottom >
              Contact us
            </Typography>
            <div className={classes.cotactIcons}>
              <IconButton style={{ justifyContent: "space-between" }} gutterBottom>
                <LocationOnIcon fontSize='large' style={{ color: "white" }} />  <Typography variant='body2' style={{ color: "white", marginLeft: "5%", textAlign: "left" }}>203 Fake St. Mountain View, San Francisco, California, USA</Typography>
              </IconButton>

              <IconButton style={{ justifyContent: "space-between" }} gutterBottom>
                <LocalPhoneIcon fontSize='large' style={{ color: "white" }} /> <Typography variant='body2' style={{ color: "white", marginLeft: "5%" }}>+917990012657</Typography>
              </IconButton>
              <IconButton style={{ justifyContent: "space-between" }} gutterBottom>
                <EmailIcon fontSize='large' style={{ color: "white", marginRight: "5%" }} /> <Typography variant='body2' style={{ color: "white", marginLeft: "3%" }}>info@yourdomain.com</Typography>
              </IconButton>
            </div>

          </Box>


        </Box>
        <Box style={{ color: "white", textAlign: "center" }}><p style={{ fontSize: "22px" }}>
          Join us on this journey towards a better world, and be a part of the change you want to see.
        </p></Box>
      </Container>
    </footer>
  );
};

export default Footer;
