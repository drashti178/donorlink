import { React, useState,useEffect } from "react";
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
import axios from  "axios";
import base_url from "../../api/bootapi";

const steps = ['Account Information', 'Contact Information', 'Rievew Information'];


const NgoSignup = () => {
    let [inputs, setInputs] = useState({
        ngoname: "",
        email:"",
        password: "",
        tagline:"",
        founder:"",
        areaofwork:"",
        address:"",
        country:"",
        pincode:"",
        mobile:"",
        weblink:"",
        certi:"False"
      });
     
    let [profile,setProfile] = useState("");
    let [certificate,setCertificate] = useState("");
    const [activestep,SetActtivestep] = useState(0);
    // const getAllNgos=()=>{
    //   axios.get(`${base_url}/ngos`).then(
    //     (response)=>{
    //       console.log(response);

    //     },
    //     (error)=>{
    //       console.log(error);
    //     }
    //   )
    // }
    // useEffect(()=>{
    //   getAllNgos();
    // },[]);

    

  //   let onProfileChange = (event) => {
      
  //       setProfile(event.target.files[0]);
  //   }
  //   let onCertiChange = (event) => {
      
  //     setCertificate(event.target.files[0]);
  // }
  let onProfileUpload = (event) => {
    setProfile(event.target.files[0]);
    
    
  }
  let onCertiUpload = (event) => {
    
    setCertificate(event.target.files[0]);
   
  }
    
    let onChangeData =  (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setInputs((values) => ({...values,[name]:value}));
    }
    
    let [pageno,SetPageno] = useState(1);
    let next = () =>{
       
        SetPageno(pageno + 1);
        SetActtivestep(activestep+1);
    }
    let prev = () =>{
        SetPageno(pageno - 1)
        SetActtivestep(activestep-1);
    }
    let submit = (e) =>{
        console.log(inputs);
        console.log(profile);
        console.log(certificate);
        postData(inputs);
        e.preventDefault();
    }
    
    const postData=(data)=>
    {
      axios.post(`${base_url}/auth/ngo/signup`,data).then(
        (response)=>{
          console.log(response);
          console.log("success");
        },
        (error)=>{
          console.log(error);
          console.log("Failure");
        }

      )
    }

    const paperStyle = {
      padding: 20,
      margin: "16vh auto",
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
            <Grid align="center">
             
      <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
      <Box>
                <Stepper activeStep={activestep} >
                  {steps.map((label, index)=>{
                    
                    return (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel >
                      </Step>

                      );

                  })}
                  

                </Stepper>
              </Box>
            {(pageno===1)?<First nextfun={next} changefun={onChangeData} inputs={inputs}  onFileUpload={onProfileUpload} prfile={profile.name}/>:(pageno===2)?
            <Second nextfun={next} prevfun={prev} changefun={onChangeData} inputs={inputs} onFileUpload={onCertiUpload} certificate={certificate.name}/>:
            <Third prevfun={prev} submitfun={submit} changefun={onChangeData} inputs={inputs} profile={profile} certificate={certificate}/>}
            
              </Paper>
              </Grid>
            </>
           
        
    );
  };
export default NgoSignup;