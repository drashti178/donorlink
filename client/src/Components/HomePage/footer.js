import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#075456",
    padding: 6,
    marginTop:20
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 2,
  },
  socialIcon: {
    margin: 1,
    padding: 1,
    backgroundColor: '#075456',
    borderRadius: '50%',
    color: 'white',
    '&:hover': {
      backgroundColor: "#075456",
    },
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <img src="/logo.png" alt="Logo" className={classes.logo} />
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="center" gutterBottom>
              Connect with us
            </Typography>
            <div className={classes.socialIcons}>
              <IconButton className={classes.socialIcon} aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton className={classes.socialIcon} aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton className={classes.socialIcon} aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
