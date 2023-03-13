import { React, useState, useEffect } from "react";
import {

  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import First from "./first";
import Second from "./second";
import Third from "./third";
import { Box } from "@mui/system";
import axios from "axios";
import base_url from "../../../api/bootapi";
import { json, useNavigate } from "react-router-dom";


const steps = ['Account Information', 'Contact Information', 'Review Information'];



const NgoSignup = () => {
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
    has80G: "False"
  });

  let [profile, setProfile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [certiUrl, setCertiUrl] = useState(null);
  let [certificate, setCertificate] = useState("");
  const [activestep, SetActtivestep] = useState(0);
 
  const navigate = useNavigate();
  useEffect(() => {
    if (profile) {
      window.alert('Image Uploaded Successfully');
      setImageUrl(URL.createObjectURL(profile));
    }
  }, [profile]);
  useEffect(() => {
    if (certificate) {
      window.alert('Pdf Uploaded Successfully');
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
  let next = () => {

    SetPageno(pageno + 1);
    SetActtivestep(activestep + 1);
  }
  let prev = () => {
    SetPageno(pageno - 1)
    SetActtivestep(activestep - 1);
  }
  var formData = new FormData();
  formData.append("data",JSON.stringify(inputs));

 
  formData.append("profile",profile);
  formData.append("certificate",certificate);
  console.log(JSON.stringify(inputs));

 
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
        console.log("Failure");
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
  return (
    <>
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
          {(pageno === 1) ? <First nextfun={next} changefun={onChangeData} inputs={inputs} onFileUpload={onProfileUpload} prfile={profile} /> : (pageno === 2) ? <Second nextfun={next} prevfun={prev} changefun={onChangeData} inputs={inputs} onFileUpload={onCertiUpload} certificate={certificate} /> : <Third prevfun={prev} submitfun={submit} changefun={onChangeData} inputs={inputs} profile={profile} certificate={certificate}  certiUrl={certiUrl} imageUrl={imageUrl} />}
        </Paper>
      </Grid>
    </>


  );
};
export default NgoSignup;