import React, { useState,useEffect } from 'react';
import axios from "axios";
import base_url from '../../../../../api/bootapi';
import Activity from './activity';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';





const Activities = () => {
  const [activities,setActivities] = useState([]);
  useEffect(() => {   
    getAllActivities();
  },[]);
  const navigate = useNavigate();
  const getAllActivities= ()=>
  {
    console.log("getactivities");
    const token = "Bearer " + localStorage.getItem("AccessToken");
     axios.get(`${base_url}/ngo/activities`,{
            headers: {
              'Authorization': token,
            }
          }).then(
      (response)=>{
        setActivities(response.data);
       console.log(response.data);
        
      },
      (error)=>{
        console.log(error);
        console.log("Error");
      }
    )
    
  }
  return (
    <div>
      {(activities.length===0)?<Typography variant="h6" gutterBottom style={{marginTop:"3%",marginLeft:"20%"}}>You haven't added any Activity yet.</Typography> : <div> {activities.map((product) => (
      <Activity key={product.a_id} product={product} />
    ))}</div>
    }
   
    </div>
    
  )
}
export default Activities;


