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
import First from "../User/User_Signup/first";
import Second from "../User/User_Signup/second";
import { Box } from "@mui/system";
import axios from "axios";
import base_url from "../../api/bootapi";
import { useNavigate } from 'react-router-dom';
import "../../Components/style.css";
import { UserContext } from "../../Context/UserContext";
// import pics from "../../../../server/static/images/userprofileImgs";

const steps = ['Account Information', 'Review Information'];


const EditUser = () => {

    const navigate = useNavigate();
    const context = useContext(UserContext);

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

    useEffect(() => {
        // console.log(context);
        if (context == null) {
            setTimeout(() => {
                alert('Log in First');
            }, 100);
            navigate('/user/login');
        }
        else {
            context.password = "";
            setInputs(context);
        }

    }, []);



    let [profile, setProfile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [activestep, SetActivestep] = useState(0);
    const id = 5;
    useEffect(() => {
        if (profile) {
            // console.log(profile);
            var binaryData = [];
            binaryData.push(profile);
            setImageUrl(window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" })));

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
    formData.append("data", JSON.stringify(inputs));
    formData.append("profile", profile);

    let submit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        // console.log(profile);
        postData(formData);
    }

    const postData = (data) => {
        console.log(data);
        const token = "Bearer " + localStorage.getItem("AccessToken");
        axios.put(`${base_url}/user/edit`, data, {
            headers: {
                'Authorization': token,
            }
        }).then(
            (response) => {
                console.log(response);
                console.log("success");
                navigate(`/user/profile`);
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
                                        <StepLabel>{label}</StepLabel >
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
}

export default EditUser;