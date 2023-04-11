import React, { useContext, useEffect, useState } from 'react';
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
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import base_url from '../../../api/bootapi';


const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(0);
  const navigate = useNavigate();
  const [login,setLogin] = useState(false);

  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const context = useContext(UserContext);

  if (context.user == null && localStorage.getItem("AccessToken") != null) {
    const token = "Bearer " + localStorage.getItem("AccessToken");
    axios.get(`${base_url}/ngo/profile`, {
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

  const NgoProfile = (event) => {
    navigate('/ngo/profile');
  };

  const LogoutNgo = (event) => {
    localStorage.removeItem("role");
    localStorage.removeItem("AccessToken");
    navigate('/ngo/login');
  };




  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const clickNgos = (event) => {
    props.onDataReceived("Ngos");

  }
  const clickCollaborations = (event) => {
    props.onDataReceived("Collaborations");

  }
  const clickFundraisers = (event) => {
    props.onDataReceived("Fundraisers");

  }

  const pages = [{ "page": "Ngos", "event": clickNgos }, { "page": "Collaborations", "event": clickCollaborations }, { "page": "Fundraisers", "event": clickFundraisers }];

  return (
    <AppBar position="static" style={{ backgroundColor: "darkcyan" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon style={{ mr: 1, display: { xs: 'none', md: 'flex' }, color: "white" }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              fontFamily: "'Aboreto', cursive;",
            }}
            style={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              marginRight: "1%",
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Donor Link
          </Typography>

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
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"

            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            Donor Link
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((p) => (
              <Button
                key={p.page}
                onClick={p.event}
                sx={{ my: 2, backgroundColor: "darkcyan", color: 'white', display: 'block' }}
              >
                {p.page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button sx={{ color: "white" }} onClick={LogoutNgo}>Logout</Button>
            <IconButton onClick={NgoProfile} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={(localStorage.getItem("role") === 'ngo' && context.user) &&  `/images/ngoprofileImgs/${context.user.profileImgName}`} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

}

export default Navbar;







