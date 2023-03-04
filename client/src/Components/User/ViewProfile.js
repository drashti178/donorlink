import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import base_url from "../../api/bootapi";
import { UserContext } from "../../Context/UserContext";
import NavBar from "../Navbar";

const ViewProfile = () => {
    const id = 0;
    const context = useContext(UserContext);
    const navigate = useNavigate();
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
            setInputs(context);
        }
    }, []);


    const deleteUser = async () => {
        await axios.delete(`${base_url}/user/delete`).then(
            (response) => {
                console.log(response);
                alert('User deleted successfully');
                navigate('/user/login');
            },
            (error) => {
                console.log(error);
            }
        )
    }
    return (
        <>
        <NavBar type="userprofile"/>
            <h1>Profile Page</h1>
            {/* <Button></Button> */}
    
        </>
    )
}

export default ViewProfile;