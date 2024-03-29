import { createContext, React, useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import base_url from '../api/bootapi';
import { DispatchUserContext, UserContext } from '../Context/UserContext';
import Logout from './Logout';
import { Tab, Tabs } from '@mui/material';

function NavBar(props) {

  const [anchorElNav, setAnchorElNav] = useState(0);
  const navigate = useNavigate();
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
      }
    )
  }


  useEffect(() => {
    setTimeout(() => {
      if (context.user) {
        // console.log(context);
        // role = context.user.role;
        setLogin(true);
        localStorage.setItem("role", context.user.role);
      }
    }, 100);
  }, [context.user]);


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const LoginPage = (event) => {
    navigate('/user/login');
  };

  const LogoutUser = (event) => {
    localStorage.clear();
    context.setUser(null);
    navigate('/user/login');
  };

//  if (props.type === "userprofile") {

    const clickMyProfile = (event) => {
      props.onDataReceived("My Profile");
      handleCloseNavMenu();
    }
    const clickMyDonations = (event) => {
      props.onDataReceived("My Donations");
      handleCloseNavMenu();
    }

    const pages = [{ "page": "My Profile", "event": clickMyProfile }, { "page": "My Donations", "event": clickMyDonations },];
    return (
      <AppBar position="static" style={{ backgroundColor: "#075456" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
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
                    <Typography textAlign="center">{p.page}</Typography>
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
              marginRight:"1%",
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
              marginRight:"1%",
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
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {p.page}
                </Button>
              ))}
            </Box>
            {!login ?
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ color: "white" }} onClick={LoginPage}>Login</Button>
              </Box> :
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ color: "white" }} onClick={LogoutUser}>Logout</Button>
                <IconButton onClick={clickMyProfile} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={(localStorage.getItem("role") === 'user') ? `/images/userprofileImgs/${context.user.profileImgName}` :  `/images/ngoprofileImgs/${context.user.profileImgName}`} />
                </IconButton>
              </Box>}
          </Toolbar>
        </Container>
      </AppBar>
    );
  // }
}

export default NavBar;
