import { Backdrop, Badge, Button, CircularProgress, Grid, Snackbar, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Context/UserContext";
import { makeStyles } from "@material-ui/core";
import Table from "react-bootstrap/esm/Table";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from "axios";
import base_url from "../../../api/bootapi";
import MuiAlert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    overflow: 'scroll',
};


const useStyles = makeStyles({
    titleFont: {
        fontFamily: 'Dosis, sans-serif;',
    },
});

export default function Collaborations() {
    const sty = useStyles();
    const [loading, setLoading] = useState(true);
    const [ngos, setNgos] = useState([]);
    const [reqngos, setReqNgos] = useState([]);
    const context = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [updated,setUpdated]=useState(false);
    const [topen, setTOpen] = useState(false);
    const [severity, setSeverity] = useState("error");

    const handleTClick = () => {
        setTOpen(true);
    };

    const handleTClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setTOpen(false);
    };

    const [tmsg, setTMsg] = useState("");


    useEffect(() => {
        setLoading(true);
        const token = "Bearer " + localStorage.getItem("AccessToken");
        // console.log(token);
        axios.get(`${base_url}/ngo/findAllCollab`, {
            headers: {
                'Authorization': token,
            }
        }).then(
            (response) => {

                setReqNgos((response.data.filter(e => e.ngo1.ngoId === context.user.ngoId && !e.approved)));
                setNgos((response.data.filter(e => e.ngo1.ngoId === context.user.ngoId && e.approved)));
                // console.log(reqngos);
                // console.log(typeof ngos);
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }, [updated]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onAcceptance = (reqId) => {
        setLoading(true);
        setOpen(false);
        const token = "Bearer " + localStorage.getItem("AccessToken");
        axios.put(`${base_url}/ngo/approveRequest/${reqId}`, {}, {
            headers: {
                'Authorization': token,
            }
        }).then(
            (response) => {
                setTMsg(response.data);
                setSeverity("success");
                handleTClick();
                setUpdated(!updated);
                axios.get(`${base_url}/ngo/profile`, {
                    headers: {
                        'Authorization': token,
                    }
                }).then(
                    (res) => {
                        context.setUser(res.data);
                        setLoading(false);
                    },
                    (err) => {
                        console.log(err);
                    }
                )
            },
            (error) => {
                console.log(error);
            }
        )
        // setLoading(false);
    }

    const onDecline = (reqId) => {
        setLoading(true);
        setOpen(false);
        const token = "Bearer " + localStorage.getItem("AccessToken");
        axios.put(`${base_url}/ngo/declineRequest/${reqId}`, {}, {
            headers: {
                'Authorization': token,
            }
        }).then(
            (response) => {
                setTMsg(response.data);
                setSeverity("success");
                handleTClick();
                setUpdated(!updated);
                axios.get(`${base_url}/ngo/profile`, {
                    headers: {
                        'Authorization': token,
                    }
                }).then(
                    (res) => {
                        context.setUser(res.data);
                        setLoading(false);
                    },
                    (err) => {
                        console.log(err);
                    }
                )
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const NgoRow = ({ ngo }) => {
        return (
            <>
                <tr>
                    <td>{ngo.ngoId}</td>
                    <td>{ngo.ngoname}</td>
                    <td>{ngo.email}</td>
                    <td>{ngo.mobile}</td>
                    <td>{ngo.address}</td>
                    <td>{ngo.totaldonation}</td>
                </tr>
            </>
        );
    }

    const ReqNgoRow = (props) => {
        const { ngo } = props;
        // console.log(ngo)
        return (
            <>
                <tr>
                    <td>{ngo.ngoname}</td>
                    <td>{ngo.email}</td>
                    <td>{ngo.mobile}</td>
                    <td>{ngo.address}</td>
                    <td>{<><Button variant="contained" sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, width: "40%", backgroundColor: '#075456', marginRight: '10%' }}
                        onClick={() => onAcceptance(props.k)}
                    >Accept</Button><Button variant="contained" sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, width: "40%", backgroundColor: '#075456', }}
                        onClick={() => onDecline(props.k)}
                    >Decline</Button></>}</td>
                </tr>
            </>
        );
    }
    
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {!loading && <>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={topen} autoHideDuration={4000} onClose={handleTClose}>
                        <Alert onClose={handleTClose} severity={severity} sx={{ width: '100%' }}>
                            {tmsg}
                        </Alert>
                    </Snackbar>
                </Stack>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 800 }}>
                        <h2 id="child-modal-title" style={{ fontFamily: "'Aboreto', 'cursive'", textAlign: "center" }}>{reqngos.length === 0 ? "No Requests" : "Requests for Collaborations"}</h2>
                        {reqngos.length > 0 &&
                            <Table bordered hover style={{ marginTop: "4%" }}>
                                <thead>
                                    <tr>
                                        <th>Ngo Name</th>
                                        <th>Email</th>
                                        <th>Contact no</th>
                                        <th>Address</th>
                                        <th>Accept/Decline</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reqngos.map((i, index) => (
                                        <ReqNgoRow k={i.reqId} ngo={i.ngo2} index={index} />
                                    ))}
                                </tbody>
                            </Table>}
                    </Box>
                </Modal>

                <Grid sx={{ marginLeft: "auto", textAlign: "center", marginRight: "auto", marginTop: "2%", display: "block" }}>
                    <Badge badgeContent={reqngos.length} color="secondary">
                        <Button variant="contained" sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, width: "100%", backgroundColor: '#075456', }}
                            onClick={handleOpen}
                        >Collaboration Requests</Button>
                    </Badge>
                </Grid>
                {ngos.length === 0 ? <Typography variant="h6" gutterBottom style={{ marginTop: "3%", marginLeft: "1%" }}>No Collaboration found!! </Typography>  : <>
                    <div className="row justify-content-center" style={{ marginTop: "5%", marginBottom: "3%" }}>
                        <div className="col-md-7 text-center">
                            <h1 className={sty.titleFont}>Your Collaborations</h1>
                            <p>Below are your collaborated ngo's details.</p>
                        </div>
                    </div>
                    <Table bordered hover style={{ marginTop: "4%" }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ngo Name</th>
                                <th>Email</th>
                                <th>Contact no</th>
                                <th>Address</th>
                                <th>Collected Donation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ngos.map((i, index) => (
                                <NgoRow key={index} ngo={i.ngo2} index={index} />
                            ))}
                        </tbody>
                    </Table>
                </>}
            </>

            }
        </>
    );
}