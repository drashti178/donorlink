import React, { useContext } from "react";

import { Grid, Box } from "@mui/material";
import './style.css'
import Images from "../../constants/images";
import { UserContext } from "../../Context/UserContext";


const Home = () => {

    const context = useContext(UserContext);
    // console.log(context);
    // let role = context.role;

    return (
        <>
            <Grid align="center">

                    {/* {role == "user" ? <h1>User</h1> : (role == "admin" ? <h1>Admin</h1> : <h1>NGO</h1>)} */}
                    {/* <Carousel className="caro" interval="4000" autoPlay infiniteLoop centerMode stopOnHover={false}>
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
               */}

            </Grid>
            

        </>
    )

        }

export default Home;