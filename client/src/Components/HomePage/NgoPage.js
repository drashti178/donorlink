import React, { useState,useEffect,useContext } from 'react'
import axios from "axios";
import base_url from '../../api/bootapi';
import Pagination from '@mui/material/Pagination';
import ActivityCard from './ActivityCard';
import FundraiserCard from './FundraiserCard';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../Context/UserContext';
import { Box, Button } from '@mui/material';

const useStyles = makeStyles({
  list:{
      display: "flex",
  flexDirection:" row",
  flexWrap: "wrap",
  justifyContent: "space-evenly"
     
  }
})


const NgoPage = () => {
  const classes = useStyles();
    const id = localStorage.getItem("ngoId");
    console.log(id);
    const [ngo,setNgo] = useState();
    const [activities,setActivities] = useState([]);
    const [fundraisers,setFundraisers] = useState([]);
    let [page, setPage] = useState(1);
  const per_page = 3;
  const count = Math.ceil(activities.length / per_page);
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


  useEffect(() => {
    setTimeout(() => {
      if (context.user) {
        setLogin(true);
        localStorage.setItem("role", context.user.role);
      }
    }, 100);
  }, [context.user]);

  const handleChange = (e, p) => {
    setPage(p);
    activities.jump(p);
  };
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
    console.log(localStorage.getItem("role"));
    console.log(login);
  return (
    <>
    <div>NgoPage</div>
    <div>Basic Profile</div>
    
    <div>Activities
    {(!login || (login && localStorage.getItem("role")=== "user")) ?
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ my: 2, backgroundColor:"#075456", color: 'white', display: 'block' }} >Donate</Button>
              </Box> :
              <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ my: 2, backgroundColor:"#075456", color: 'white', display: 'block' }}>Collaborate</Button>
              </Box>} 
    <div className={classes.list}>
    <Box p="5">
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"y
        
        shape="rounded"
        onChange={handleChange}
      />
      {activities.map((product) => (
      <ActivityCard key={product.a_id} activity={product}/>
      
    ))}
    

    </Box>
    {/* {activities.map((product) => (
      <ActivityCard key={product.a_id} activity={product}/>
      
    ))}
    </div> 
      <Stack spacing={2}>
      <Pagination count={10} shape="rounded" />
      </Stack> */}

    </div>
    </div>
    <div>Fundraisers
    <div className={classes.list}>
    {fundraisers.map((product) => (
      <FundraiserCard key={product.fun_id} fundraiser={product}/>
      
    ))}
    </div> 
    </div>
   


    </>
    
 

  )
}

export default NgoPage