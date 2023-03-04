import React, { useContext, useEffect, useState } from "react";
import {
    Typography,
    Avatar,
    Grid,
    TextField,
    Paper,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import CreditScoreSharpIcon from '@mui/icons-material/CreditScoreSharp';
import axios from "axios";
import base_url from "../../api/bootapi";
import NavBar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const PaymentInfo = () => {
    const id = 13;
    const ngoId = 2;

    const context = useContext(UserContext);
    const navigate = useNavigate();
    const [valid, setValid] = useState(false);
    const [login, setLogin] = useState(false);

    const [inputs, setInputs] = useState({
        amount: 0,
        remarks: "",
    });

    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        country: "",
        contactno: "",
        adharno: "",
        profession: "",
        type: "",
    })

    useEffect(() => {
        // console.log(context);
        if (context != null) {
            setUser(context);
            setLogin(true);
        }
        else {
            setLogin(false);
        }

    }, []);

    const initPayment = () => {
        if (localStorage.getItem("AccessToken") == null && inputs.amount <= 10000) {
            const options = {
                key: "rzp_test_ye5vdixvFR6hVR",
                amount: inputs.amount * 100,
                currency: "INR",
                name: "Donation",
                description: "Test Transaction",
                image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hhcml0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                "customer": {
                    "contact": user.contactno,
                    "email": user.email,
                    "name": user.name
                },
                "notify": {
                    "email": true,
                    "sms": true
                },
                handler: async () => {
                    await axios.post(`${base_url}/auth/donation/update/${ngoId}/${inputs.amount}`, {
                        headers: {
                            'Access-Control-Allow-Origin': "*"
                        }
                    }).then(
                        (response) => {
                            console.log(response);
                        },
                        (error) => {
                            console.log(error);
                        }
                    )
                },
                theme: {
                    color: "#3399cc",
                }
            }
        }
        const token = "Bearer " + localStorage.getItem("AccessToken");
        const options = {
            key: "rzp_test_ye5vdixvFR6hVR",
            amount: inputs.amount * 100,
            currency: "INR",
            name: "Donation",
            description: "Test Transaction",
            image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hhcml0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            "customer": {
                "contact": user.contactno,
                "email": user.email,
                "name": user.name
            },
            "notify": {
                "email": true,
                "sms": true
            },
            handler: async () => {
                await axios.post(`${base_url}/donation/update/${ngoId}/${inputs.amount}`, {
                    headers: {
                        'Authorization': token,
                        'Access-Control-Allow-Origin': "*"
                    }
                }).then(
                    (response) => {
                        console.log(response);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            },
            theme: {
                color: "#3399cc",
            }
        }
        const rzp1 = new window.Razorpay(options);
        const payment = rzp1.open();
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        })
        console.log(payment.id);
    };


    // rzp1.close();

    const handleSubmit = async (e) => {
        e.preventDefault();
        initPayment();
        // onLogin(inputs)
    };

    const handleChange = (e) => {
        if (e.target.name === "amount" && e.target.value > 10000 && !login) {
            alert('You cannot make payment of more than 10000 without login.');
        }
        else {
            setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
            if (e.target.value > 0) {
                setValid(true);
            }
            else {
                setValid(false);
            }
        }


    };

    const paperStyle = {
        padding: 20,
        margin: "14.1vh auto",
        width: 350,

    };

    const smallDev = {
        padding: 20,
        margin: "14.1vh auto",
        width: 320,
    };

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <NavBar type="home" />
            <Grid align="center" className="gridStyle"  >
                <Paper elevation={5} style={!isMatch ? paperStyle : smallDev}>
                    <Grid align="center">
                        <Avatar sx={{ width: 80, height: 80, backgroundColor: "#94726c" }}>
                            <CreditScoreSharpIcon
                                sx={{ fontSize: 70, backgroundColor: "#94726c" }}
                            />
                        </Avatar>
                        <Typography sx={{ mt: 1.5 }} variant="h6">
                            Payment
                        </Typography>
                    </Grid>
                    <form onSubmit={handleSubmit}>

                        <TextField
                            name="amount"
                            varient="outlined"
                            label="Amount"
                            value={inputs.amount}
                            style={{ marginTop: "25px" }}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            name="remarks"
                            varient="outlined"
                            label="Remarks"
                            value={inputs.remarks}
                            style={{ marginTop: "25px" }}
                            onChange={handleChange}
                            fullWidth
                        />

                        <Grid
                            container
                            spacing={2}
                            style={{ marginTop: "20px" }}
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ "&:hover": { backgroundColor: '#94726c', color: 'white', }, marginTop: 1, width: "50%", backgroundColor: '#94726c' }}
                                disabled={!valid}
                            >
                                Donate
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </>
    )
}
export default PaymentInfo