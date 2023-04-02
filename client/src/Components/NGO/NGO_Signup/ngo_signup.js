import React, { useState, useEffect } from "react";
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
import Third from "./third";
import { Box } from "@mui/system";
import axios from "axios";
import base_url from "../../../api/bootapi";
import { json, useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
var passwordValidator = require('password-validator');
var emailvalidator = require("email-validator");

const steps = ['Account Information', 'Contact Information', 'Review Information'];



const NgoSignup = () => {
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

  var schema = new passwordValidator();
  schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces();

  let [inputs, setInputs] = useState({
    ngoname: "",
    password: "",
    email: "",
    tagline: "",
    founder: "",
    areaofwork: "",
    address: "",
    country: "",
    pincode: "",
    mobile: "",
    weblink: "",
    has80G: "false"
  });

  let [profile, setProfile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [certiUrl, setCertiUrl] = useState(null);
  let [certificate, setCertificate] = useState("");
  const [activestep, SetActtivestep] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    if (profile) {
      setSeverity("success");
      setMsg("Profile Uploaded Successfully");
      handleClick();
      setImageUrl(URL.createObjectURL(profile));
    }
  }, [profile]);
  useEffect(() => {
    if (certificate) {
      setSeverity("success");
      setMsg("Certificate Uploaded Successfully");
      handleClick();
      setCertiUrl(URL.createObjectURL(certificate));
    }
  }, [certificate]);
  let onProfileUpload = (event) => {
    setProfile(event.target.files[0]);
  }
  let onCertiUpload = (event) => {
    setCertificate(event.target.files[0]);
  }

  let onChangeData = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  }

  let [pageno, SetPageno] = useState(1);
  let nextToSecond = () => {
    if (!schema.validate(inputs.password)) {
      setSeverity("error");
      setMsg("Invalid Password!");
      handleClick();
    }
    else if (!emailvalidator.validate(inputs.email)) {
      setSeverity("error");
      setMsg("Invalid Email Address!");
      handleClick();
    }
    else if (inputs.ngoname.trim().length == 0 || inputs.founder.trim().length == 0 || inputs.areaofwork.trim().length == 0) {
      setSeverity("error");
      setMsg("Kindly Fill Mandatory field(*) then click on next.");
      handleClick();
    }
    else {
      SetPageno(pageno + 1);
      SetActtivestep(activestep + 1);
    }
  }

  let nextToThird = () => {
    if (inputs.pincode.trim().length != 6 || inputs.pincode.match(/^[0-9]+$/) == null) {
      setSeverity("error");
      setMsg("Invalid Pin number!! (Should be Containing 7-digit number)");
      handleClick();
    }
    else if (inputs.mobile.trim().length != 10 || inputs.mobile.match(/^[0-9]+$/) == null) {
      setSeverity("error");
      setMsg("Invalid Contact Number!");
      handleClick();
    }
    else if (inputs.address.trim().length == 0 || !inputs.country) {
      setSeverity("error");
      setMsg("Kindly Fill Mandatory field(*) then click on next.");
      handleClick();
    }
    else {
      SetPageno(pageno + 1);
      SetActtivestep(activestep + 1);
    }
  }
  let prev = () => {
    SetPageno(pageno - 1)
    SetActtivestep(activestep - 1);
  }
  var formData = new FormData();
  formData.append("data", JSON.stringify(inputs));


  formData.append("profile", profile);
  formData.append("certificate", certificate);
  // console.log(JSON.stringify(inputs));


  let submit = (e) => {
    console.log(inputs);
    console.log(profile);
    console.log(certificate);
    console.log(formData);
    postData(formData);
    e.preventDefault();
  }




  const postData = (data) => {
    axios.post(`${base_url}/auth/ngo/signup`, data).then(
      (response) => {
        console.log(response);
        console.log("success");
        navigate('/ngo/login');
      },
      (error) => {
        console.log(error);
        if(error.response.status === 401 && inputs.has80G === 'true'){
          setSeverity("error");
          setMsg("Invalid Profile Image or Certificate");
        }
        else if(error.response.status === 401){
          setSeverity("error");
          setMsg("Invalid Profile Image");
        }
        else{
            setSeverity("error");
            setMsg(error.response.data);
        }
        handleClick();
      }

    )
  }

  const paperStyle = {
    padding: 20,
    margin: "10vh auto",
    width: 860,
  };

  const smallDev = {
    padding: 20,
    margin: "16vh auto",
    width: 500,
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {msg}
          </Alert>
        </Snackbar>
      </Stack>
      <Grid align="center" className="gridStyle">

        <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
          <Box>
            <Stepper activeStep={activestep} >
              {steps.map((label, index) => {

                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel >
                  </Step>

                );

              })}


            </Stepper>
          </Box>
          {(pageno === 1) ? <First nextfun={nextToSecond} changefun={onChangeData} inputs={inputs} onFileUpload={onProfileUpload} prfile={profile} /> : (pageno === 2) ? <Second nextfun={nextToThird} prevfun={prev} changefun={onChangeData} inputs={inputs} onFileUpload={onCertiUpload} certificate={certificate} /> : <Third prevfun={prev} submitfun={submit} changefun={onChangeData} inputs={inputs} profile={profile} certificate={certificate} certiUrl={certiUrl} imageUrl={imageUrl} />}
        </Paper>
      </Grid>
    </>


  );
};
export default NgoSignup;