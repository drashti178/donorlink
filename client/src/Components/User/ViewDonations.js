import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import base_url from '../../api/bootapi';
import { UserContext } from '../../Context/UserContext';
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';
import DonationTable from './DonationTable';
import FDonationTable from './FDonationTable';
import React from 'react';

const ViewDonation = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState([]);
    const [fdonations, setFDonations] = useState([]);
    const handleClose = () => {
        setLoading(false);
    };
    const handleToggle = () => {
        setLoading(!loading);
    };

    useEffect(() => {
        if (localStorage.getItem("AccessToken") == null) {
            setTimeout(() => {
                alert('Log in First');
            }, 100);
            navigate('/user/login');
        }
        else {
            if (context.user == null) {
                const token = "Bearer " + localStorage.getItem("AccessToken");
                axios.get(`${base_url}/user/profile`, {
                    headers: {
                        'Authorization': token,
                    }
                }).then(
                    (response) => {
                        // console.log(response.data);
                        context.setUser(response.data);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
            else {
                if (context.user.role === 'ngo') {
                    navigate('/');
                }
            }
        }
    }, [context.user]);

    useEffect(() => {
        setTimeout(() => {
            handleClose();
        },1000)
        fetchDonations();
        fetchFDonations();
    }, []);

    const fetchDonations = () => {
        const token = "Bearer " + localStorage.getItem("AccessToken");

        axios.get(`${base_url}/donation/getAll`, {
            headers: {
                'Authorization': token,
            }
        }).then(
            (response) => {
                setInputs(response.data);
                
            },
            (error) => {
                console.log(error);
            }
        )
    }
    const fetchFDonations = () => {
        const token = "Bearer " + localStorage.getItem("AccessToken");

        axios.get(`${base_url}/donation/fundraiser/getAll`, {
            headers: {
                'Authorization': token,
            }
        }).then(
            (response) => {
                console.log(response.data);
                setFDonations(response.data);
               
            },
            (error) => {
                console.log(error);
            }
        )
    }

    // const [res,setRes] = useState("");

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {!loading && (
                (inputs.length == 0) ? <Typography variant="h6" gutterBottom style={{ marginTop: "3%", marginLeft: "1%" }}>You haven't donated in any Ngo yet!! <Button onClick={() => { navigate('/') }}>click here</Button> to make donation.</Typography> :
                    <Table bordered hover style={{ marginTop: "4%" }}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Ngo name</th>
                                <th>Claim Your Certificate (if applicable)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inputs.map((i, index) => (
                                <DonationTable i={i} index={index} />
                            ))}
                        </tbody>
                    </Table>
            )}
            {!loading && (
                (fdonations.length == 0) ? <Typography variant="h6" gutterBottom style={{ marginTop: "3%", marginLeft: "1%" }}>You haven't donated in any Ngo yet!! <Button onClick={() => { navigate('/') }}>click here</Button> to make donation.</Typography> :
                    <Table bordered hover style={{ marginTop: "4%" }}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Ngo name</th>
                                <th>Claim Your Certificate (if applicable)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fdonations.map((i, index) => (
                                <FDonationTable i={i} index={index} />
                            ))}
                        </tbody>
                    </Table>
            )}
        </>
    );
}

export default ViewDonation;