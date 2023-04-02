import React , { useState, useEffect, useContext } from "react";
import {
    Grid,
    Paper,
    useTheme,
    useMediaQuery,
    Stepper,
    Step,
    StepLabel,
    Stack,
    Snackbar,
} from "@mui/material";
import First from "./first";
import Second from "./second";
import { Box } from "@mui/system";
import axios from "axios";
import base_url from "../../../api/bootapi";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../Context/UserContext";
import MuiAlert from '@mui/material/Alert';
var passwordValidator = require('password-validator');
var emailvalidator = require("email-validator");

const steps = ['Account Information', 'Review Information'];

const UserSignup = () => {
    var schema = new passwordValidator();
    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces();

    const [msg, setMsg] = useState("");

    const [open, setOpen] = useState(false);
    // const [severity,setSeverity] = useState("error");

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    let [inputs, setInputs] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        country: "",
        contactno: "",
        adharno: "",
        profession: "",
        type: "",
    });

    const navigate = useNavigate();
    let [profile, setProfile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [activestep, SetActivestep] = useState(0);

    useEffect(() => {
        if (profile) {
            // console.log(profile);
            setImageUrl(URL.createObjectURL(profile));
        }
    }, [profile]);

    let onProfileUpload = (event) => {
        setProfile(event.target.files[0]);
    }

    let onChangeData = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        // console.log(name,value);
        setInputs((values) => ({ ...values, [name]: value }));
    }

    let [pageno, SetPageno] = useState(1);
    let next = () => {
        if(!schema.validate(inputs.password)){
            setMsg("Invalid Password!");
            handleClick();
        }
        else if(!emailvalidator.validate(inputs.email)){
            setMsg("Invalid Email Address!");
            handleClick();
        }
        else if(inputs.adharno.trim().length != 12 || inputs.adharno.match(/^[0-9]+$/) == null){
            setMsg("Invalid Adhar Number!");
            handleClick();
        }
        else if(inputs.contactno.trim().length != 10 || inputs.contactno.match(/^[0-9]+$/) == null){
            setMsg("Invalid Contact Number!");
            handleClick();
        }
        else if(inputs.name.trim().length == 0 || !inputs.country || !inputs.profession || !inputs.type){
            setMsg("All Field is Mandatory, Kindly Fill it then click on next.");
            handleClick();
        }
        else{
            SetPageno(pageno + 1);
            SetActivestep(activestep + 1);
        }
    }
    let prev = () => {
        SetPageno(pageno - 1)
        SetActivestep(activestep - 1);
    }

    var formData = new FormData();
    formData.append("donorBody",JSON.stringify(inputs));
    formData.append("profile",profile);
    
    // console.log(JSON.stringify(inputs));
    let submit = (e) => {
        e.preventDefault();
        postData(formData);
    }

    const postData = (data) => {
        console.log(data);
        axios.post(`${base_url}/auth/user/signup`, data).then(
            (response) => {
                console.log(response);
                console.log("success");
                navigate('/user/login');
            },
            (error) => {
                console.log(error);
                if(error.response.status === 401){
                    setMsg("Invalid Profile Image");
                }
                else{
                    setMsg(error.response.data);
                }
                handleClick();
            }
        )
    }

    const paperStyle = {
        padding: 20,
        width: 900,
        marginTop: "4%"

    };

    const smallDev = {
        padding: 20,
        width: 500,
    };
    
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Stack>
            <Grid align="center" className="gridStyle" >
                <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
                    <Box>
                        <Stepper activeStep={activestep} style={{
                            marginTop: "5%", marginLeft: "15%",
                            width: "70%"
                        }} >
                            {steps.map((label, index) => {

                                return (
                                    <Step key={label} sx={{ color: "#9C7875" }}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>

                                );

                            })}


                        </Stepper>
                    </Box>
                    {(pageno === 1) ? <First nextfun={next} changefun={onChangeData} inputs={inputs} onFileUpload={onProfileUpload} profile={profile} imageUrl={imageUrl} /> : <Second nextfun={next} prevfun={prev} submitfun={submit} changefun={onChangeData} inputs={inputs} />}
                </Paper>
            </Grid>
        </>


    );
};
export default UserSignup;