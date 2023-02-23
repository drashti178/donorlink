import axios from "axios";
import React, { useEffect, useState } from "react";
import base_url from "../../api/bootapi";

const ViewProfile = () => {
    const id = 0;
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
        loadUser();
    })
    
    const loadUser = async () => {
        await axios.get(`${base_url}/user/profile/${id}`).then(
            (response) => {
                // console.log(response);
                setInputs(response.data)
            },
            (error) => {
                console.log(error);
            }
        )
        // console.log(inputs);
    }
    return (
        <h1></h1>
    )
}

export default ViewProfile;