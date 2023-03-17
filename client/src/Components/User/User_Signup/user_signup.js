import { React, useState, useEffect, useContext } from "react";
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
import { Box } from "@mui/system";
import axios from "axios";
import base_url from "../../../api/bootapi";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../Context/UserContext";
const steps = ['Account Information', 'Review Information'];

const UserSignup = () => {

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
    //   const getAllUsers = () => {
    //     axios.get(`${base_url}/users`).then(
    //       (response) => {
    //         console.log(response);

    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     )
    //   }
    //   useEffect(() => {
    //     getAllUsers();
    //   }, []);

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

        SetPageno(pageno + 1);
        SetActivestep(activestep + 1);
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
                console.log("Failure");
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
    
    

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
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