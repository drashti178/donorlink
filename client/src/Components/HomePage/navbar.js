import { React, useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import base_url from '../../api/bootapi';
import axios from 'axios';
import { Avatar } from '@mui/material';






function HomeNavBar(props) {
  
  const [anchorElNav, setAnchorElNav] = useState(0);
  const navigate = useNavigate();
  const Profile = (event) => {
    if(context.user.role === 'ngo'){
      context.setUser(null);
      navigate('/ngo/profile');
    }
    else{
      navigate('/user');
    }
  };
  const Logout = (event) => {
    localStorage.removeItem("role");
    localStorage.removeItem("AccessToken");
    if(context.user.role === 'user'){
      context.setUser(null);
      navigate('/user/login');
    }
    else{
      context.setUser(null);
      navigate('/ngo/login');
    }
   
  };  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const [login, setLogin] = useState(false);

  const context = useContext(UserContext);
  
  if (context.user == null && localStorage.getItem("AccessToken") != null) {
    const token = "Bearer " + localStorage.getItem("AccessToken");
    axios.get(`${base_url}/user/profile`, {
      headers: {
        'Authorization': token,
      }
    }).then(
      (response) => {
        console.log(response.data);
        context.setUser(response.data);
      },
      (error) => {
        console.log(error);
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("role");
        window.location.reload(true);
      
      }
    )
  }


  useEffect(() => {
    setTimeout(() => {
      if (context.user) {
        setLogin(true);
        localStorage.setItem("role", context.user.role);
      }
    }, 100);
  }, [context.user]);

  

  const LoginPage = () => {
    navigate('/user/login');
  };

  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

    const clickNgos = (event) =>
  {
    props.onDataReceived("Ngos");
   
  }
  const clickFundraisers = (event) =>{
    props.onDataReceived("Fundraisers");
  
  }


  const pages = [{"page":"Ngos","event":clickNgos}, {"page":"Fundraisers","event":clickFundraisers}];
  console.log("home");

  return (
    <AppBar position="static" style={{backgroundColor: (localStorage.getItem("role") === 'ngo') ? "darkcyan": "#075456" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="white"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((p) => (
                  <MenuItem key={p.page} onClick={p.event}>
                    <Typography textAlign="center" >{p.page}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1,color: 'white' }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white',mt:2.5 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{
              marginTop:'1.5%',
              display: { xs: 'none', md: 'flex' },
              fontFamily: "'Aboreto', 'cursive'",
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              "&:hover": { color: 'white', }, 
            }}
          >
            Donor Link
          </Typography>
            {pages.map((p) => (
              <Button
                key={p.page}
                onClick={p.event}
                sx={{ my: 2, backgroundColor: (localStorage.getItem("role") === 'ngo') ? "darkcyan": "#075456", color:'white'  }}
              >
                {p.page}
              </Button>
            ))}
          </Box>
          {!login ?
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ color: "white" }} onClick={() => LoginPage()}>Login</Button>
              </Box> :
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ color: "white" }} onClick={() => LogoutUser()}>Logout</Button>
                <IconButton onClick={UserProfile} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Box>}
         
        </Toolbar>
      </Container>
    </AppBar>
  );
              
  
  
}
export default HomeNavBar;
