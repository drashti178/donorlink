// import React from "react";


// import CardActionArea from "@mui/material/CardActionArea";
// import CardActions from "@mui/material/CardActions";

// import Button from "@mui/material/Button";

// import { makeStyles } from '@mui/styles';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardMedia from '@mui/material/CardMedia';



// const useStyles = makeStyles({
//   root: {
//     width: 800,
//     margin: "20px 10px"
//   },
//   media: {
//     height: 140
//   },
//   cardContainer: {
//     display: "flex",
//     overflowX: "auto"
//   }
// });

// const cardData = [
//   {
//     id: 1,
//     title: "Card 1",
//     image: "image_url_1",
//     content: "Content of card 1"
//   },
//   {
//     id: 2,
//     title: "Card 2",
//     image: "image_url_2",
//     content: "Content of card 2"
//   },
//   {
//     id: 3,
//     title: "Card 3",
//     image: "image_url_3",
//     content: "Content of card 3"
//   },
//   {
//     id: 4,
//     title: "Card 4",
//     image: "image_url_4",
//     content: "Content of card 4"
//   },
//   {
//     id: 5,
//     title: "Card 5",
//     image: "image_url_5",
//     content: "Content of card 5"
//   }
// ];

// const NgoHome = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.cardContainer}>
//       {cardData.map(card => (
//         <Card className={classes.root} key={card.id}>
//           <CardActionArea>
//             <CardMedia
//               className={classes.media}
//               image={card.image}
//               title={card.title}
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="h2">
//                 {card.title}
//               </Typography>
//               <Typography variant="body2" color="textSecondary" component="p">
//                 {card.content}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//           <CardActions>
//             <Button size="small" color="primary">
//               Share
//             </Button>
//             <Button size="small" color="primary">
//               Learn More
//             </Button>
//           </CardActions>
//         </Card>
//       ))}
//     </div>
//   );
// }


// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//     width:"20%",
//     margin: "5%"
//   },
//   media: {
//     height: 140
//   },
//   cardcontainer : {
//     display:"flex",

//     flexDirection: 'row',
//     overflow:'auto',
//     flexWrap: 'wrap' ,
//   }
// });

// const cardData = [
//   {
//     id: 1,
//     title: "Card 1",
//     image: "image_url_1",
//     content: "Content of card 1"
//   },
//   {
//     id: 2,
//     title: "Card 2",
//     image: "image_url_2",
//     content: "Content of card 2"
//   },
//   {
//     id: 3,
//     title: "Card 3",
//     image: "image_url_3",
//     content: "Content of card 3"
//   },
//   {
//     id: 4,
//     title: "Card 1",
//     image: "image_url_1",
//     content: "Content of card 1"
//   },
//   {
//     id: 5,
//     title: "Card 2",
//     image: "image_url_2",
//     content: "Content of card 2"
//   },
//   {
//     id: 6,
//     title: "Card 3",
//     image: "image_url_3",
//     content: "Content of card 3"
//   },
//   {
//     id: 7,
//     title: "Card 1",
//     image: "image_url_1",
//     content: "Content of card 1"
//   },
//   {
//     id: 8,
//     title: "Card 2",
//     image: "image_url_2",
//     content: "Content of card 2"
//   },
//   {
//     id: 9,
//     title: "Card 3",
//     image: "image_url_3",
//     content: "Content of card 3"
//   }
// ];

// const NgoHome = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.cardcontainer}>
//       {cardData.map(card => (
//         <Card className={classes.root} key={card.id}>
//           <CardActionArea>
//             <CardMedia
//               className={classes.media}
//               image={card.image}
//               title={card.title}
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="h2">
//                 {card.title}
//               </Typography>
//               <Typography variant="body2" color="textSecondary" component="p">
//                 {card.content}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//           <CardActions>
//             <Button size="small" color="primary">
//               Share
//             </Button>
//             <Button size="small" color="primary">
//               Learn More
//             </Button>
//           </CardActions>
//         </Card>
//       ))}
//     </div>
//   );
// }

import { Button, Typography } from '@mui/material';
import NavBar from '../Navbar';

import Activities from '../NGO/Activity';
import Carousel from '../carousel';


import React, { useContext, useEffect } from "react";

import { Grid, Box } from "@mui/material";
import '../../Components/style.css'
import Images from "../../constants/images";
import { UserContext } from "../../Context/UserContext";
import NgoCard from './NgoCard';
import axios from 'axios';
import base_url from '../../api/bootapi';



let cards = [
  {
    id: 1,
    title: 'Card 1',
    description: 'This is card 1',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 2,
    title: 'Card 2',
    description: 'This is card 2',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 3,
    title: 'Card 3',
    description: 'This is card 3',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 4,
    title: 'Card 1',
    description: 'This is card 1',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 5,
    title: 'Card 2',
    description: 'This is card 2',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 6,
    title: 'Card 3',
    description: 'This is card 3',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 7,
    title: 'Card 1',
    description: 'This is card 1',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 8,
    title: 'Card 2',
    description: 'This is card 2',
    image: 'https://via.placeholder.com/345x140'
  },
  {
    id: 9,
    title: 'Card 3',
    description: 'This is card 3',
    image: 'https://via.placeholder.com/345x140'
  },
]
const Home = () => {

  let images = [

    'https://via.placeholder.com/355x140'
    ,

    'https://via.placeholder.com/345x140'

  ]

  // const role = localStorage.getItem("role");

  return (
    <>
      <NavBar type="ngohome" />
      <div>
        <Button />
      </div>
      <div>
        <Carousel images={images} />
      </div>

      <Grid container spacing={5} margin="2">
        <NgoCard />
        <NgoCard />
        <NgoCard />
        <NgoCard />
      </Grid>
      <Typography></Typography>
      <h1 style={{}}>
        Activities
      </h1>
      <div>
        <Activities cards={cards} />
      </div>
    </>

  );
};

export default Home;