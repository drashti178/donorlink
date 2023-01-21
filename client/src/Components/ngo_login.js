import { React, useState } from "react";
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
  FormControlLabel,
  Switch
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";


const NgoLogin = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPassword = () => {
    setInputs({
      ...inputs,
      showPassword: !inputs.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
  };

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
    <Grid align="center">
      <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
        <Grid align="center">
          <Avatar sx={{width:60,height:60}}>
            <AccountCircleRoundedIcon
              sx={{ fontSize: 60, backgroundColor: "#1bbd7e" }}
            />
          </Avatar>
          <Typography sx={{ mt: 1.5 }} variant="h6">
            Log In
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            varient="outlined"
            label="Username"
            value={inputs.username}
            style={{ marginTop: "25px" }}
            onChange={handleChange}
            fullWidth
            required
          />

          <FormControl sx={{ width: "100%", marginTop: 2 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={inputs.showPassword ? "text" : "password"}
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
                    {inputs.showPassword ? <Visibility /> : <VisibilityOff />}
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
              to="/forgetPassword"
              sx={{
                "&:hover" :{backgroundColor: '#1bbd7e',color: 'white',},
                width: "50%",
                textTransform: "capitalize",
                fontSize: 13,
                color: "#1bbd7e"
              }}
            >
              Forgot Password ?
            </Button>
            <Button
              component={Link}
              to="/usignup"
              sx={{ "&:hover" :{backgroundColor: '#1bbd7e',color: 'white',},color: 'white',width: "50%", textTransform: "capitalize", color: "#1bbd7e" }}
            >
              Create an account
            </Button>
            <Button type="submit" variant="contained" sx={{ "&:hover" :{backgroundColor: "#14ae72"}, width: "50%",marginTop: 1, align: "center", color: 'white', backgroundColor: '#1bbd7e' }} >
              Submit
            </Button>
            <FormControlLabel
              control={
                <Switch
                  component={Link}
                  to = '/usignup'
                  checked={!inputs.isUser}
                  onClick = {() => { setInputs({ ...inputs, isUser: !inputs.isUser })}}
                  name="isUser"
                  value={inputs.isUser}
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