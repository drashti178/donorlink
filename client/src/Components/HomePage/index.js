import React from "react";
import NavBar from "../Navbar";
import { Grid, Box, Paper } from "@mui/material";
import './style.css'
import Images from "../../constants/images";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
    return (
        <>
            <Grid align="center">
              
                    <Carousel className="caro" interval="4000" autoPlay infiniteLoop centerMode stopOnHover={false}>
                        <Box sx={{  width: "99%" }}>
                            <img src={Images.home1} style={{height:"20%"}} alt="h1" ></img>
                        </Box>
                        <Box sx={{ width: "99%"  }}>
                            <img src={Images.home2} style={{height:"20%"}} alt="h1"></img>
                        </Box>
                        <Box sx={{  width: "99%"  }}>
                            <img src={Images.home3} style={{height:"20%"}} ></img>
                        </Box>
                        <Box sx={{ width: "99%"  }}>
                            <img src={Images.home4} style={{height:"20%"}} ></img>
                        </Box>
                        <Box sx={{ width: "99%"  }}>
                            <img src={Images.home5} style={{height:"20%"}} alt="h1"></img>
                        </Box>
                    </Carousel>
              

            </Grid>
            {/* <Grid>
        
            </Grid> */}

        </>
    )

};

export default Home;