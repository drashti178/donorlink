// import { createContext, React, useContext, useEffect, useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import { useNavigate } from "react-router-dom";
// import { UserContext } from '../Context/UserContext';





// function NavBar(props) {
  
//   const [anchorElNav, setAnchorElNav] = useState(0);
//   const navigate = useNavigate();


   
//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const NgoProfile = (event) => {
//     navigate('/ngo/profile');
//   };
//   const UserProfile = (event) => {
//     navigate('/user/profile');
//   };
//   const LoginPage = (event) => {
//     navigate('/ngo/login');
//   };
//   const LogoutNgo = (event) => {
//     localStorage.removeItem("role");
//     localStorage.removeItem("AccessToken");
//     navigate('/ngo/login');
//   };
//   const LogoutUser = (event) => {
//     localStorage.removeItem("role");
//     localStorage.removeItem("AccessToken");
//     navigate('/user/login');
//   };

 

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

 
// }
// export default NavBar;
