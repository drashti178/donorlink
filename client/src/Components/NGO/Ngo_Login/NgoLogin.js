import { React, useContext, useState, } from "react";
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
import '../../style.css';
import base_url from "../../../api/bootapi";
import { UserContext } from "../../../Context/UserContext";

const NgoLogin = () => {
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
      [e.target.name]:e.target.value
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
  

  const {user,setUser } = useContext(UserContext);
  const onLogin= async (data)=>
  {
    await axios.post(`${base_url}/auth/ngo/login`,data).then(
      (response)=>{
        localStorage.setItem("AccessToken",response.data.accessToken);
        const getUser = async () => {
          const token = "Bearer " + localStorage.getItem("AccessToken");
          // console.log(token);
          await axios.get(`${base_url}/ngo/profile`, {
            headers: {
              'Authorization': token,
            }
          }).then(
            (response) => {
              
              setUser(response.data);
              console.log(user)
             
              localStorage.setItem("role", response.data.role);
            },
            (error) => {
              console.log(error);
              navigate('/ngo/login');
            }
          )
        }
       
        getUser();
        navigate('/ngo/home');
      },
      (error)=>{
        console.log(error);
        navigate('/ngo/login');
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

  return (
    <Grid align="center" className="gridStyle">
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
            label="Username"
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
  );
};
export default NgoLogin;