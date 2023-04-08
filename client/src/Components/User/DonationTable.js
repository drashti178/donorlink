import { Button, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import base_url from "../../api/bootapi";
import React from 'react';


const DonationTable = (props) => {

    useEffect(() => {

    })
    const [claim,setClaim] = useState("");
    const addClaim = (donationId, index) => {

        const token = "Bearer " + localStorage.getItem("AccessToken");
        axios.post(`${base_url}/claim/add/${donationId}`, {}, {
            headers: {
                'Authorization': token,
            }
        }).then(
            (response) => {
                console.log(index, response);
                setClaim("hello");
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const [res,setRes] = useState("");

    const isApproved = (donationId, index) => {
        const token = "Bearer " + localStorage.getItem("AccessToken");
        axios.get(`${base_url}/claim/approvalStatus/${donationId}`, {
            headers: {
                'Authorization': token,
            }
        }).then(
            (response) => { 
                // console.log(response);
                // if(res == "")
                    setRes(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    
    const changeFormat = (date) => {
        const d = new Date(date);
        return (d.toUTCString()).split("GMT");
    }
    // let res ="";
    return (
        <>
            {isApproved(props.i.d_id,props.index)}
            <tr>
                <td>{props.i.d_id}</td>
                <td>{props.i.amount}</td>
                <td>{changeFormat((props.i.date).split('.')[0])}</td>
                <td>{props.i.ngo.ngoname}</td>
                <td>{
                    (props.i.eligible) ?
                        ((res == 'yes') ?
                            <Button
                                variant="contained"
                                sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, marginTop: 1, width: "50%", backgroundColor: '#075456' }}
                            >
                                Download Certificate
                            </Button> :
                            ((res == 'notPresent') ?
                                <Button
                                    variant="contained"
                                    sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, marginTop: 1, width: "25%", backgroundColor: '#075456' }}
                                    onClick={() => addClaim(props.i.d_id, props.index)}
                                >
                                    Claim
                                </Button>
                                :
                                <Tooltip title="Your request is pending.">
                                    <span>
                                        <Button
                                            variant="contained"
                                            sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, marginTop: 1, width: "25%", backgroundColor: '#075456' }}
                                            disabled>
                                            Pending
                                        </Button>
                                    </span>
                                </Tooltip>
                            )
                        ) :
                        <Tooltip title="You cannot claim tax deduction certificate because donated amount is less than 2k.">
                            <span>
                                <Button
                                    variant="contained"
                                    sx={{ "&:hover": { backgroundColor: '#9C7875', color: 'white', }, marginTop: 1, width: "25%", backgroundColor: '#9C7875' }}
                                    disabled>
                                    Claim
                                </Button>
                            </span>
                        </Tooltip>
                }</td>
            </tr>
        </>
    ); 
}

export default DonationTable;