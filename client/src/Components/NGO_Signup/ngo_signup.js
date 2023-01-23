import { React, useState } from "react";
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


const steps = ['Account Information', 'Contact Information', 'Rievew Information'];


const NgoSignup = () => {
    let [inputs, setInputs] = useState({
        name: "",
        email:"",
        password: "",
        tagline:"",
        founder:"",
        areaofwork:"",
        address:"",
        country:"",
        pincode:"",
        mobile:"",
        link:"",
        certi:"False"
      });
    let [profile,setProfile] = useState();
    let [certificate,setCertificate] = useState();
    const [activestep,SetActtivestep] = useState(0);

    

    let onProfileChange = (event) => {
      
        setProfile(event.target.files[0]);
    }
    let onCertiChange = (event) => {
      
      setCertificate(event.target.files[0]);
  }
  let onFileUpload = () => {
    console.log(profile);
    console.log(certificate);
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
    let submit = () =>{
        console.log(inputs);
        console.log(profile);
        console.log(certificate);
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
            {(pageno===1)?<First nextfun={next} changefun={onChangeData} inputs={inputs} onFileChange={onProfileChange} onFileUpload={onFileUpload}/>:(pageno===2)?<Second nextfun={next} prevfun={prev} changefun={onChangeData} inputs={inputs} onFileChange={onCertiChange} onFileUpload={onFileUpload}/>:<Third prevfun={prev} submitfun={submit} changefun={onChangeData} inputs={inputs} profile={profile} certificate={certificate}/>}
            {/* {(pageno===2 || pageno===3)?<Button onClick={prev}>Prev</Button>:<></>}
            {(pageno===2 || pageno===1)?<Button onClick={next}>Next</Button>:(pageno===3)?<Button onClick={submit}>Submit</Button>:<></>} */}
              </Paper>
              </Grid>
            </>
           
        
    );
  };
export default NgoSignup;