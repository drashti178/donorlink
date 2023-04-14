import React, { useState,useEffect,useContext } from 'react'
import axios from "axios";
import base_url from '../../api/bootapi';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../Context/UserContext';
import { Box, Button, Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Tab, Typography } from '@material-ui/core';
import List from './List';
import ActivitiesList from './activitiesList';
import ActivityCard from './ActivityCard';
import FundraiserCard from './FundraiserCard';


const useStyles = makeStyles({
  fund:{
      display: "flex",
  flexDirection:"column",  
  marginBottom:"4%"
  },
  act:{
    display: "flex",
flexDirection:"row",
flexWrap: "nowrap",

overflowX:"auto",
marginBlock:"8%"
   
},
root: {
  flexGrow: 1,
 
},
paper: {
  padding:0,
  margin:0,
  height:"100vh",
  borderRadius:0,
  borderBottom:"solid white 120px"
  
},
image: {
  alignContent:"center",
  width: "40%",
  marginInline:"5%",
  marginBlock:"8%",
  objectFit: "cover",
  border:"solid white"
},

second:{
  backgroundColor:"white",
  display: "flex",
  flexDirection:"column",
  

},

img:{
 
  objectFit: "cover",
  width:"100%"

},
details:{
  backgroundColor:"#075456",
  width:"100%"

}
})


const NgoPage = () => {
  const classes = useStyles();
  const location=useLocation();
    const id = location.state;
    // const id = localStorage.getItem("ngoId");
    console.log(id);
    const [ngo,setNgo] = useState([]);
    const [activities,setActivities] = useState([]);
    const [fundraisers,setFundraisers] = useState([]);
  
  const context = useContext(UserContext);
  const [login, setLogin] = useState();

  if (context.user == null && localStorage.getItem("AccessToken") != null) {
    setLogin(true);
    const token = "Bearer " + localStorage.getItem("AccessToken");
    axios.get(`${base_url}/user/profile`, {
      headers: {
        'Authorization': token,
      }
    }).then(
      (response) => {
        console.log(response.data);
        setLogin(true);
        context.setUser(response.data);
      },
      (error) => {
        console.log(error);
      }
    )
  }
 const navigate = useNavigate();


  useEffect(() => {
    setTimeout(() => {
      if (context.user) {
        setLogin(true);
        localStorage.setItem("role", context.user.role);
      }
    }, 100);
  }, [context.user]);
  const  DonateToNgo = () =>{
    navigate("/user/payment",{state:id})

  }

    useEffect(() => {  
      axios.get(`${base_url}/home/getngoById/${id}`).then(
        (response)=>{
            console.log(response.data);
          setNgo(response.data);
        },
        (error)=>{
          console.log(error);
          console.log("Error");
        }
      ) 
      axios.get(`${base_url}/home/activities/${id}`).then(
        (response)=>{
            console.log(response.data);
            setActivities(response.data);
        },
        (error)=>{
          console.log(error);
          console.log("Error");
        }
      )
      axios.get(`${base_url}/home/fundrisers/${id}`).then(
        (response)=>{
            console.log(response.data);
            setFundraisers(response.data);
        },
        (error)=>{
          console.log(error);
          console.log("Error");
        }
      )  
    },[]);
   
  return (
    <>
    <div className={classes.root}>
      <Grid container xs={12} md={12}>
        <Grid  xs={12} md={12} >
          <Paper className={classes.paper} style={{backgroundColor:"#075456"}}>
          <Typography variant="h3" style={{color:"white",textAlign:"center",borderBottom:"solid"}}>
              {ngo.ngoname}
            </Typography>
            <div style={{display:"flex",flexDirection:'row'}}>
            <img
              src="/images/home1.jpg"
              alt="Product"
              className={classes.image}
            />
            <div style={{width:"50%"}}>
           
    {(!login || (login && localStorage.getItem("role")=== "user")) ?
              <Box sx={{ flexGrow: 1 ,display:'flex',flexDirection:'row-reverse',mr:"5%"}}>
                <Button sx={{ my: 2, backgroundColor:"white", color: '#075456', display: 'block',":hover":{backgroundColor:"white", color: '#075456'} }} onClick={DonateToNgo}>Donate</Button>
              </Box> :
              <Box sx={{ flexGrow: 1,display:'flex',flexDirection:'row-reverse' }}>
                <Button sx={{ my: 2, backgroundColor:"white", color: '#075456', display: 'block' }}>Collaborate</Button>
              </Box>} 
              
            <Typography variant="h6" style={{color:"white",textAlign:"center",borderBottom:"solid",marginTop:"12%",fontSize:"2rem"}}>Tagline : {ngo.tagline}<br/>
            </Typography>
            <Typography variant="body1" style={{color:"white",textAlign:"left",borderBottom:"solid",fontSize:"1.5rem"}} gutterBottom>
             Founder :{ngo.founder} <br /> Area of Work : {ngo.areaofwork}<br/>
              </Typography>
              <Typography variant="body1" style={{color:"white",textAlign:"left",borderBottom:"solid",fontSize:"1.5rem"}}>Website : <Link>{ngo.weblink}</Link>
              <br />
              Email : {ngo.email}<br />
             
              Contact No : {ngo.mobile}<br/>
              </Typography>
              <Typography variant="body1" style={{color:"white",textAlign:"left",fontSize:"1.5rem"}}>
             Address : {ngo.address}<br />
             Country : {ngo.country}<br/>
            </Typography>
            </div>
            

            </div>
           
          </Paper>
        </Grid>
       
      </Grid>
    </div>
   
    <div className={classes.second}>
      <Typography variant="h5" style={{backgroundColor:"#075456",color:"white",textAlign:"center",borderBottom:"solid"}}>Activities
              </Typography>
         
            
   
    <Box className={classes.act}>
    
      {activities.map((product) => (
      <ActivityCard key={product.a_id} activity={product}/>
      
    ))}
    

    </Box>
   

    

    </div>
    
    <div className={classes.fund}>
    <Typography variant="h5" style={{backgroundColor:"#075456",color:"white",textAlign:"center",borderBottom:"solid"}}>Fundraisers
              </Typography>
         
    {fundraisers.map((product) => (
      <FundraiserCard key={product.fun_id} fundraiser={product}/>
      
    ))}
  
    </div>
   
    
   
   
    


    </>
    
 

  )
}

export default NgoPage