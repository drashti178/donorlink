import base_url from '../../api/bootapi';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
// import Carousel from 'react-material-ui-carousel'
import { useEffect, useState } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
// import ScrollAnimate from 'react-scroll-fade-animation';

const useStyles = makeStyles({
    titleFont: {
        fontFamily: 'Dosis, sans-serif;',
    },
});

const Donors = () => {
    const imgPath = '/images/userprofileImgs/';
    const [topdonors, setTopDonors] = useState([]);
    const sty = useStyles();
    useEffect(() => {
        axios.get(`${base_url}/home/getAllSortedByDonation`).then(
            (response) => {
                console.log(response);
                setTopDonors(response.data);
            },
            (error) => {
                console.log(error);
            },
        )
    }, []);

    return (
        <>
            {/* <ScrollAnimate
                path={'left'}
                offsetHeight={-400}
            > */}
                <div className="row justify-content-center" style={{ marginTop: "3%", marginBottom: "3%" }}>
                    <div className="col-md-7 text-center">
                        <h1 className={sty.titleFont}>Our Top Donors</h1>
                        <p>Below is our donors, which have donated at various NGO using our site. You can also showcase your donation by helping to NGOs.</p>
                    </div>
                </div>
                <Grid
                    display="flex"
                    spacing={2}
                    style={{ backgroundColor: "#efefef", marginBottom: "2%", padding: "1%" }}
                    justifyContent="center"
                    container
                >
                    {topdonors.map((donor, index) => (
                        <>
                            <Grid item>
                                <Card sx={{ width: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={imgPath + donor.profileImgName}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center" }} >
                                                {donor.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                                                Donation:- {donor.totaldonation}/- Rs.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </>
                    ))
                    }
                </Grid>
            {/* </ScrollAnimate> */}
        </>
    )
}

export default Donors;