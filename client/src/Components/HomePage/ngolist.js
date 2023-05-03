import React, { useState,useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import base_url from '../../api/bootapi';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Card } from '@material-ui/core';
import { UserContext } from '../../Context/UserContext';

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    // height: "100%",
   
    overflow: "hidden",
    boxShadow: "0px 0px 20px 5px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
   marginBlock:"10%",
  marginLeft:"5%",
  
  },
  centerCard: {
    zIndex: 1,
  },
  leftCard: {
    zIndex: 0,
  },
  rightCard: {
    zIndex: 0,
  },
  media: {
    height: "240px",
  },
}));







const NgoList = (props) => {
  const [ngos,setNgos] = useState([]);
  const context = useContext(UserContext);
  useEffect(() => {   
    if(props.category==="All")
    {
      getAllNgos();
    }
    else{
     
      getNgosByCategory(props.category);
    }
  },[props.category]);
    
    const getAllNgos=()=>
    {
      
       axios.get(`${base_url}/home/ngos`).then(
        (response)=>{
          setNgos(response.data);
        },
        (error)=>{
          console.log(error);
          console.log("Error");
        }
      )
    }
  
    const getNgosByCategory=(cat)=>
    {
     
      
       axios.get(`${base_url}/home/getngoByCat/${cat}`).then(
        (response)=>{
          setNgos(response.data);
        },
        (error)=>{
          console.log(error);
          console.log("Error");
        }
      )
    }
  
    const classes = useStyles();
    const [currentCard, setCurrentCard] = useState(0);
  
    const handleCardClick = (index) => {
      setCurrentCard(index);
    };
  
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    const profilePath = "/images/ngoprofileImgs/";
    const navigate = useNavigate();
  return (
    <>
      <MultiCarousel
      responsive={responsive}
      infinite
      centerMode
      swipeable
      draggable
      showDots={false}
      ssr={true}
      autoPlaySpeed={1000}
      keyBoardControl
      customTransition="all .5s ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="carousel-item-padding-40-px"
      centerSlidePercentage={33.33}
      beforeChange={(nextSlide) => setCurrentCard(nextSlide)}
      renderButtonGroupOutside={true}
      height={800}
    >
      {ngos.map((item, index) => (
        ((!context.user || (context.user.role ==='ngo' && context.user.ngoname !== item.ngoname) || context.user.role==='user') &&
        <Card 
          key={item.id}
          className={[
            classes.card,
            index === currentCard && classes.centerCard,
            index === currentCard - 1 && classes.leftCard,
            index === currentCard + 1 && classes.rightCard,
          ].join(" ")}
          onClick={() => handleCardClick(index)}
        >
          <CardMedia
            component="img"
            height="150"
            sx={{ backgroundImage: item.image, borderBottom: 0 }}
            image={profilePath + item.profileImgName}
            alt={item.title}
            className={classes.media}
            
          />
            <div style={{ display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <CardContent style={{padding:"6px"}}>
       
                           
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.ngoname}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.tagline}
                                </Typography>
                                
                            </CardContent>
                            <CardActions>
                                <Tooltip title={ "View and donate"}>
                                    <span style={{ width: "100%" }}>
                                    <Button sx={{backgroundColor:"#075456",color:"white","&:hover": { backgroundColor: "darkcyan", color: 'white', },flexGrow:1}} onClick={() => {
        
           console.log("clicked");
                    setTimeout(() => {
                      navigate('/ngopage',{state:item.ngoId});
                    }, 100);}}>
        View</Button>
                                    </span>
                                </Tooltip>
                            </CardActions>
                            </div>
                        
        </Card>)
      ))}
    </MultiCarousel>
  
    
  
    
    </>
    
  )
}

export default NgoList;