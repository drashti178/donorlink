import React, { useContext, useEffect, useState } from "react";
import base_url from "../../api/bootapi";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Carousel from "react-multi-carousel";
import { Paper } from "@material-ui/core";
import { Box, Button, CardActions, Checkbox, Grid, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import BootButton from 'react-bootstrap/Button';
import MuiAlert from '@mui/material/Alert';
import "react-multi-carousel/lib/styles.css";

const useStyles = makeStyles({
    titleFont: {
        fontFamily: 'Dosis, sans-serif;',
    },
});

const Events = () => {

    const [topen, setTOpen] = useState(false);
    const [severity, setSeverity] = useState("error");

    const handleToastClick = () => {
        setTOpen(true);
    };

    const [msg, setMsg] = useState("");
    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setTOpen(false);
    };

    const context = useContext(UserContext);
    const sty = useStyles();
    const [events, setEvents] = useState([]);
    // const imgPath = '/images/ngoprofileImgs/';
    const navigate = useNavigate();
    const [updated, setUpdated] = useState(false);

    const [show, setShow] = useState(false);
    const [evnt, setEvnt] = useState();
    const [accept, setAccept] = useState(false);
    const handleClose = () => {
        setAccept(false);
        setShow(!show);
    }

    useEffect(() => {
        axios.get(`${base_url}/home/getAllEvents`).then(
            (response) => {
                console.log(response);
                setEvents(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }, [updated]);
    const onApply = (Event) => {
        if (context.user == null) {
            setTimeout(() => {
                alert('Log in First');
            }, 100);
            navigate('/user/login');
        }
        if (accept) {
            setShow(false);
            console.log(evnt);
            const token = "Bearer " + localStorage.getItem("AccessToken");
            axios.put(`${base_url}/event/addVolunteer`, evnt, {
                headers: {
                    'Authorization': token,
                }
            }).then(
                (response) => {
                    console.log(response);
                    setAccept(false);
                    setMsg("Applied Successfully");
                    setSeverity("success");
                    handleToastClick();
                    setUpdated(!updated);
                },
                (error) => {
                    console.log(error);
                    // setAccept(!accept);
                    setShow(true);
                    setMsg("Something went wrong.");
                    setSeverity("error");
                    handleToastClick();
                }
            )
        }
        else {
            setEvnt(Event);
            setShow(!show);
        }
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };


    const changeFormat = (date) => {
        const d = new Date(date);
        return (d.toUTCString()).split("GMT");
    }

    function EventCard(props) {
        const { event } = props;

        return (

            <Card sx={{ width: 320 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="300"
                        sx={{ backgroundImage: `url(/images/ngoprofileImgs/${event.ngo.profileImgName})`, borderBottom: 0 }}
                    // image={imgPath + event.ngo.profileImgName}
                    // style={{display:"block" }}
                    // alt="green iguana"
                    />
                    <CardContent>
                        <Card sx={{ minWidth: 289, marginTop: "-22%", boxShadow: "0", border: "none", position: "relative", marginRight: "3%", borderRadius: "0" }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {event.eventname}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {event.ngo.ngoname}
                                </Typography>
                                <Typography variant="body2">
                                    Date:- {changeFormat((event.date).split('.')[0])}
                                    Venue:- {event.venue}
                                    <br />
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Tooltip title={(context.user && event.donors.filter(e => e.id === context.user.id).length > 0) ? "You have already applied for this event!!!" : "Click for Apply"}>
                                    <span style={{ width: "100%" }}>
                                        <Button variant="contained" sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, width: "100%", backgroundColor: '#075456' }} onClick={() => onApply(event)}
                                            disabled={(context.user && event.donors.filter(e => e.id === context.user.id).length > 0)}
                                        >Apply for Volunteer</Button>
                                    </span>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={topen} autoHideDuration={4000} onClose={handleToastClose}>
                    <Alert onClose={handleToastClose} severity={severity} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Stack>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Applying for volunteer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Checkbox name="check" defaultChecked={false} onChange={() => setAccept(!accept)} />
                    By Checking this  box you make sure that you will follow our ngo's rules and regulation during volunteering this event.
                </Modal.Body>
                <Modal.Footer>
                    <BootButton variant="secondary" onClick={handleClose}>
                        Close
                    </BootButton>
                    <BootButton variant="primary" onClick={() => onApply(evnt)} disabled={!accept}>
                        Accept
                    </BootButton>
                </Modal.Footer>
            </Modal>

            {events.length > -1 && <>
                <div className="row justify-content-center" style={{ marginTop: "8%", marginBottom: "3%" }}>
                    <div className="col-md-7 text-center">
                        <h1 className={sty.titleFont}>Be a Volunteer</h1>
                        <p>Be a part of our family by volunteering in any event organized by our NGOs and take a pride of being servent.</p>
                    </div>
                </div>
                <Grid
                    spacing={2}
                     style={{ backgroundColor: "#efefef", marginBottom: "10%", padding: "1%" }}
                >
                    <Carousel
                        sx={{ height:"500px", textAlign:"center" }}
                        showDots={true}
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        keyBoardControl={true}
                        // customTransition="all .5"
                        // transitionDuration={500}
                        containerClass="carousel-container"
                        deviceType="windows"
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-10-px" 
                        draggable={true}
                        centerMode={true}
                        arrows={true}
                        >


                        {events.map((event, index) => (
                            <Grid item>
                                <EventCard event={event} />
                            </Grid>
                        ))}


                    </Carousel>
                </Grid>
            </>
            }
        </>
    )
}

export default Events;