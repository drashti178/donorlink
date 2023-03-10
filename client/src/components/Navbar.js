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
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import base_url from '../api/bootapi';
import { DispatchUserContext, UserContext } from '../Context/UserContext';
import Logout from './Logout';



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


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const NgoProfile = (event) => {
    navigate('/ngo/profile');
  };
  const UserProfile = (event) => {
    navigate('/user/profile');
  };
  const LoginPage = (event) => {
    navigate('/user/login');
  };
  const LogoutNgo = (event) => {
    Logout();
    navigate('/user/login');
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  if (props.type === "home") {
    const pages = ['Activities', 'FundRaisers'];
    return (
      <AppBar position="static" sx={{ backgroundColor: (context.user && context.user.role == 'ngo') ? "darkcyan" : "#9C7875" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: "'Aboreto', cursive;",
                fontWeight: 700,
                color: 'inherit',
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Donor Link
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {!login ?
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ color: "white" }} onClick={LoginPage}>Login</Button>
              </Box> :
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ color: "white" }} onClick={LogoutNgo}>Logout</Button>
                <IconButton onClick={(context.user && context.user.role === 'ngo') ? NgoProfile : UserProfile} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Box>}



          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  else if (props.type === "userprofile") {
    const pages = ['Home', 'My Donations'];

    return (
      <AppBar position="static" sx={{ backgroundColor: (context.user && context.user.role == 'ngo') ? "darkcyan" : "#9C7875" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: "'Aboreto', cursive;",
                fontWeight: 700,
                color: 'inherit',
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Donor Link
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {!login ?
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ color: "white" }} onClick={LoginPage}>Login</Button>
              </Box> :
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ color: "white" }} onClick={LogoutNgo}>Logout</Button>
                <IconButton onClick={(context.user && context.user.role === 'ngo') ? NgoProfile : UserProfile} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Box>}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  else if (props.type === "ngoprofile") {
    const clickMyactivities = (event) => {
      props.onDataReceived("Activities");
      console.log("1");
    }
    const clickDonations = (event) => {
      props.onDataReceived("Donations");
      console.log("2");
    }
    const clickMyRequest = (event) => {
      props.onDataReceived("Requests");
      console.log("3");
    }

    const pages = [{ "page": "MyActivities", "event": clickMyactivities }, { "page": "Donation", "event": clickDonations }, { "page": "MyRequests", "event": clickMyRequest },];

    return (
      <AppBar position="static" sx={{ backgroundColor: "darkcyan" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: "'Aboreto', cursive;",
                fontWeight: 700,
                // letterSpacing: '.3rem',
                color: 'inherit',
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
                  <MenuItem key={p.page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" >{p.page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
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
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {p.page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button sx={{ color: "white" }} onClick={LogoutNgo}>Logout</Button>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

}
export default NavBar;