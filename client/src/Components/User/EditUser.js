import  React ,{ useState, useEffect, useContext } from "react";
import {
    Grid,
    Paper,
    useTheme,
    useMediaQuery,
    Stepper,
    Step,
    StepLabel,
    Stack,
    Snackbar,
} from "@mui/material";
import First from "../User/User_Signup/first";
import Second from "../User/User_Signup/second";
import { Box } from "@mui/system";
import axios from "axios";
import base_url from "../../api/bootapi";
import { useNavigate } from 'react-router-dom';
import "../../Components/style.css";
import { UserContext } from "../../Context/UserContext";
import Modal from 'react-bootstrap/Modal';
import BootButton from 'react-bootstrap/Button';
import MuiAlert from '@mui/material/Alert';
// import pics from "../../../../server/static/images/userprofileImgs";

const steps = ['Account Information', 'Review Information'];

function MyVerticallyCenteredModal(props) {

    const navigate = useNavigate();

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ReLogin
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    You Have to login again inorder to generate new jwt TOKEN for new username.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <BootButton onClick={props.onHide}>Close</BootButton>
                <BootButton onClick={() => { navigate('/user/login') }}>ReLogin</BootButton>
            </Modal.Footer>
        </Modal>
    );
}

const EditUser = () => {

    const navigate = useNavigate();
    const context = useContext(UserContext);
    const imgPath = "/images/userprofileImgs/";
    let [profile, setProfile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [activestep, SetActivestep] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [msg, setMsg] = useState("");

    const [open, setOpen] = useState(false);
    // const [severity,setSeverity] = useState("error");

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
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
        profileImgName: "",
    });

    // useEffect (() => {
    //     if(context.user){
    //         context.user.password = "";
    //         setImageUrl(imgPath + context.user.profileImgName);
    //         console.log(context.user);
    //         setInputs(context.user);
    //     }
    // });
    // console.log(context.user);

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
                        console.log(response.data);
                        context.setUser(response.data);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
            else {
                setImageUrl(imgPath + context.user.profileImgName);
                console.log(context.user);
                setInputs(context.user);
            }

        }
    }, [context.user]);

    // useEffect(() => {
    //     console.log(context);
    //     if (context == null) {
    //         setTimeout(() => {
    //             alert('Log in First');
    //         }, 100);
    //         navigate('/user/login');
    //     }
    //     else {
    //         context.password = "";
    //         setInputs(context);
    //     }

    // }, []);
    // console.log(context);
    // if (context == null) {
    //     setTimeout(() => {
    //         alert('Log in First');
    //     }, 100);
    //     navigate('/user/login');
    // }
    // else{
    //     context.user.password = "";
    //     setInputs(context.user);
    // }

    const id = 5;
    useEffect(() => {
        if (profile) {
            console.log(profile);
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
    // delete inputs.profileImgName;
    var formData = new FormData();
    formData.append("data", JSON.stringify(inputs));
    formData.append("profile", profile);

    let submit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        // console.log(profile);
        if (!profile) {

            const token = "Bearer " + localStorage.getItem("AccessToken");
            axios.put(`${base_url}/user/editInfoOnly`, inputs, {
                headers: {
                    'Authorization': token,
                }
            }).then(
                (response) => {
                    console.log(response);
                    console.log("success");
                    if (inputs.username === context.user.username) {
                        navigate('/user');
                    }
                    else {          
                        setModalShow(true);
                    }
                },
                (error) => {
                    console.log(error);
                    setMsg(error.response.data);
                    handleClick();
                }
            )
        }
        else {
            postData(formData);
        }
    }

    const postData = (data) => {
        // delete data.profileImgName;
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
                navigate('/user');
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
    
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
             <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Stack>
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
                    {(pageno === 1) ? <First nextfun={next} fromEdit={true} changefun={onChangeData} inputs={inputs} onFileUpload={onProfileUpload} profile={profile} imageUrl={imageUrl} /> : <Second nextfun={next} prevfun={prev} submitfun={submit} changefun={onChangeData} inputs={inputs} imageUrl={imageUrl} />}
                </Paper>
            </Grid>
        </>
    );
}

export default EditUser;