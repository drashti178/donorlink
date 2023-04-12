import React, { useContext, useState } from "react";
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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, redirect, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios, { Axios } from "axios";
import './style.css';
import base_url from "../api/bootapi";

var passwordValidator = require('password-validator');


export function Forgetpassword() {
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("error");
    const [resseckey,setResSecKey] = useState("");
    const [inputs, setInputs] = useState({
        email: '',
        username: '',
        showPassword: false,
        password: '',
        securitykey:0
    });

    var schema = new passwordValidator();
    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces();

    const handleClickShowPassword = () => {
        setInputs({
            ...inputs,
            showPassword: !inputs.showPassword,
        });
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!verified && localStorage.getItem("role") === 'user') {
            axios.get(`${base_url}/auth/user/ifExists/${inputs.email}/${inputs.username}`).then(
                (response) => {
                    console.log(response);
                    setSeverity("success");
                    setMsg("Email Verification Succeded, now check your email for password reset.");
                    handleClick();
                    setResSecKey(response.data);
                    setVerified(true);
                },
                (error) => {
                    console.log(error);
                    setSeverity("error");
                    setMsg(error.response.data);
                    handleClick();
                }
            )
        }
        else if (!verified && localStorage.getItem("role") === 'ngo') {
            axios.get(`${base_url}/auth/user/ifExists/${inputs.email}/${inputs.username}`).then(
                (response) => {
                    console.log(response);
                    setSeverity("success");
                    setMsg("Email Verification Succeded, now check your email for password reset.");
                    handleClick();
                    setResSecKey(response.data);
                    setVerified(true);
                },
                (error) => {
                    console.log(error);
                }
            )
        }
        else if(verified && localStorage.getItem("role") === 'user'){
            if(!(schema.validate(inputs.password))){
                setSeverity("error");
                setMsg("Password must contain atleast one uppercase character,one lowercase character, two digits and one special character, and minimum length of 8 (without containing space).");
                handleClick();
            }
            else if(resseckey.toString() != inputs.securitykey.toString()){
                console.log(resseckey.toString());
                console.log(inputs.securitykey.toString());
                setSeverity("error");
                setMsg("Security Key doesn't matched!!");
                handleClick();
            }
            else{
                axios.put(`${base_url}/auth/user/passwordChange`,{
                    username:inputs.username,
                    email:inputs.email,
                    password:inputs.password
                }).then(
                    (response) => {
                        console.log(response);
                        console.log(response);
                        setSeverity("success");
                        setMsg(response.data);
                        setTimeout(() => {
                            navigate('/user/login');
                        },2000)
                        setVerified(false);
                        handleClick();
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
            
        }
        else if(verified && localStorage.getItem("role") === 'ngo'){
            if(!(schema.validate(inputs.password))){
                setSeverity("error");
                setMsg("Password must contain atleast one uppercase character,one lowercase character, two digits and one special character, and minimum length of 8 (without containing space).");
                handleClick();
            }
            else if(resseckey.toString() != inputs.securitykey.toString()){
                setSeverity("error");
                setMsg("Security Key doesn't matched!!");
                handleClick();
            }
            else{
                axios.put(`${base_url}/auth/ngo/passwordChange`,{
                    username:inputs.username,
                    email:inputs.email,
                    password:inputs.password
                }).then(
                    (response) => {
                        console.log(response);
                        setSeverity("success");
                        setMsg(response.data);
                        setTimeout(() => {
                            navigate('/ngo/login');
                        },2000)
                        setVerified(false);
                        handleClick();

                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
          
        }
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [msg, setMsg] = useState("");

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Stack>
            <Grid align="center" className="gridUserStyle"  >
                <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
                    <Grid align="center">
                        <Avatar sx={{ width: 60, height: 60 }}>
                            <AccountCircleRoundedIcon
                                sx={{ fontSize: 60, backgroundColor: "#9C7875" }}
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
                            disabled={verified}
                            required
                        />

                        <TextField
                            name="email"
                            varient="outlined"
                            label="Email"
                            value={inputs.email}
                            style={{ marginTop: "10px" }}
                            onChange={handleChange}
                            disabled={verified}
                            fullWidth
                            required
                        />

                        {verified && <TextField
                            name="securitykey"
                            varient="outlined"
                            label="Security Key"
                            value={inputs.securitykey}
                            style={{ marginTop: "10px" }}
                            onChange={handleChange}
                            fullWidth
                            required
                        />}

                        {verified && <FormControl sx={{ width: "100%", marginTop: 2 }} variant="outlined">
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
                        </FormControl>}
                        <Grid
                            container
                            spacing={2}
                            style={{ marginTop: "20px" }}
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ "&:hover": { backgroundColor: '#9C7875', color: 'white', }, marginTop: 1, width: "50%", backgroundColor: '#9C7875' }}
                            >
                                Submit
                            </Button>
                            {!verified &&
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={!inputs.isUser}
                                            onClick={() => {
                                                setInputs({ ...inputs, isUser: !inputs.isUser });
                                                localStorage.setItem("role", !inputs.isUser ? "user" : "ngo");
                                            }}
                                            name="isUser"
                                            value={inputs.isUser}
                                        />
                                    }
                                    label="NGO"
                                />}
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </>
    )
} 