import { React,  useState } from 'react';
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


const Navbar = (props) => {
    const [anchorElNav, setAnchorElNav] = useState(0);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 
  const UserProfile = (event) => {
    navigate('/user/profile');
  };
  
  const LogoutUser = (event) => {
    localStorage.removeItem("role");
    localStorage.removeItem("AccessToken");
    navigate('/user/login');
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const clickNgos = (event) =>
  {
    props.onDataReceived("Ngos");
   
  }
  const clickColaborations = (event) =>{
    props.onDataReceived("Colaborations");
   
  }
  const clickFundraisers = (event) =>{
    props.onDataReceived("Fundraisers");
  
  }
 
    const pages = [{"page":"Ngos","event":clickNgos}, {"page":"Colaborations","event":clickColaborations}, {"page":"Fundraisers","event":clickFundraisers}];
      return (
        <AppBar position="static" style={{backgroundColor:"darkcyan"}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon style={{ display: { xs: 'none', md: 'flex' }, mr: 1 , color: 'white',}} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                style={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: "'Aboreto', cursive;",
                  fontWeight: 700,  
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
                    sx={{ my: 2, backgroundColor:"darkcyan", color: 'white', display: 'block' }}
                  >
                    {p.page}
                  </Button>
                ))}
              </Box>
             
              <Box sx={{ flexGrow: 0 }}>
              <Button sx={{color:"white"}} onClick={LogoutUser}>Logout</Button>
                  <IconButton onClick={UserProfile} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      );
}

export default Navbar