import React, { useContext, useEffect, useState, } from "react";
import {
  Typography,
  Avatar,
  Grid,
  TextField,
  FormControl,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
  Stack,
  Box,
  Container,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import axios from "axios";
import base_url from "../../../api/bootapi";
import { UserContext } from "../../../Context/UserContext";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const NgoLogin = () => {
  const [msg, setMsg] = useState("");

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [inputs, setInputs] = useState({
    ngoname: "",
    password: "",
  });
  const [controls, setControls] = useState({
    showPassword: false,
    isUser: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setControls((values) => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  };

  const handleClickShowPassword = () => {
    setControls({
      ...controls,
      showPassword: !controls.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onLogin(inputs);

  };
  
  useEffect(() => {
    localStorage.setItem("role","ngo");
  },[]);


  const { user, setUser } = useContext(UserContext);
  const onLogin = (data) => {
    axios.post(`${base_url}/auth/ngo/login`, data).then(
      (response) => {
        localStorage.setItem("AccessToken", response.data.accessToken);
        const token = "Bearer " + localStorage.getItem("AccessToken");
        
        axios.get(`${base_url}/ngo/profile`, {
          headers: {
            'Authorization': token,
          }
        }).then(
          (res) => {
            console.log(res.data)
            setUser(res.data);
            localStorage.setItem("role", res.data.role);
            navigate('/ngo/home');
          },
          (err) => {
            console.log(err);
            navigate('/ngo/login');
          }
        )
      },
      (error) => {
        console.log(error);
        setSeverity("error");
        if (error.response.status === 401) {
          setMsg("Invalid Password!!!");
        }
        else if (error.response.status === 400) {
          setMsg("Invalid Username or Email Address!!!");
        }

        handleClick();
      }
    )
  }
  const paperStyle = {
    padding: 20,
    margin: "16vh auto",
    width: 350,
  };

  const smallDev = {
    padding: 20,
    margin: "16vh auto",
    width: 320,
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
    <div
        style={{
          backgroundImage: "url('/images/lbg.jpg')",
          backgroundSize: "cover",
          height: "100vh",
          
        }}
      >
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {msg}
          </Alert>
        </Snackbar>
      </Stack>
      
      <Grid align="center" className="gridUserStyle">
        <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
          <Grid align="center">
            <Avatar sx={{ width: 60, height: 60 }}>
              <AccountCircleRoundedIcon
                sx={{ fontSize: 60, backgroundColor: "darkcyan" }}
              />
            </Avatar>
            <Typography sx={{ mt: 1.5 }} variant="h6">
              Log In
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              name="ngoname"
              varient="outlined"
              label="Username/Email"
              value={inputs.ngoname}
              style={{ marginTop: "25px" }}
              onChange={handleChange}
              fullWidth
              required
            />

            <FormControl sx={{ width: "100%", marginTop: 2 }} required variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                type={controls.showPassword ? "text" : "password"}
                value={inputs.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {controls.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                fullWidth
                required
              />
            </FormControl>
            <Grid
              container
              spacing={2}
              style={{ marginTop: "20px" }}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                component={Link}
                to="/ngo/signup"
                sx={{ width: "50%", textTransform: "capitalize", color: "darkcyan" }}
              >
                Create an account
              </Button>
              <Button
                component={Link}
                to="/forgetPassword"
                sx={{

                  width: "50%",
                  textTransform: "capitalize",
                  color: "darkcyan"
                }}
              >
                Forgot Password ?
              </Button>
              <Button type="submit" variant="contained" sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', }, align: "center", color: 'white', backgroundColor: "darkcyan", marginTop: 1, width: "50%" }} >
                Submit
              </Button>
              <FormControlLabel
                style={{
                  color: "darkcyan"
                }}
                control={
                  <Switch
                    style={{
                      color: "darkcyan"
                    }}
                    checked={!controls.isUser}
                    onClick={() => {
                      setTimeout(() => {
                        navigate('/user/login');
                      }, 100);
                      setControls({ ...controls, isUser: !controls.isUser });
                    }
                    }
                    name="isUser"
                    value={controls.isUser}
                  />
                }
                label="NGO"
              />
            </Grid>
          </form>
        </Paper>
      </Grid>
      </div>
    </>

  );
};
export default NgoLogin;