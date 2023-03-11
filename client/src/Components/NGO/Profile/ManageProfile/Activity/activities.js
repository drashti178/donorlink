import React, { useState,useEffect } from 'react';
import axios from "axios";
import base_url from '../../../../../api/bootapi';
import Activity from './activity';





const Activities = () => {
  const [activities,setActivities] = useState([]);
  useEffect(() => {   
    getAllActivities();
  },[]);

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
    {activities.map((product) => (
      <Activity key={product.a_id} product={product} />
    ))}
    </div>
    
  )
}
export default Activities;


