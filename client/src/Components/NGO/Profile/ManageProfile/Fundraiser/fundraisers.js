import React, { useContext, useEffect, useState } from 'react'

import base_url from '../../../../../api/bootapi';
import axios from "axios";
import { Typography } from '@material-ui/core';
import Fundraiser from './Fundraiser';
import { ActivityContext } from '../../../../../Context/UserContext';

const Fundraisers = () => {
  const context = useContext(ActivityContext);
  const [fundraisers,setFundraisers] = useState([]);
  useEffect(() => {   
    getAllFundraisers();
  },[context.isAdded]);
  
  const getAllFundraisers= ()=>
  {
  
    const token = "Bearer " + localStorage.getItem("AccessToken");
     axios.get(`${base_url}/ngo/fundrisers`,{
            headers: {
              'Authorization': token,
            }
          }).then(
      (response)=>{
        setFundraisers(response.data);
       console.log(response.data);
        
      },
      (error)=>{
        console.log(error);
        console.log("Error");
      }
    )
    
  }
  return (
    <>
      {(fundraisers.length===0)?<Typography variant="h6" gutterBottom style={{marginTop:"3%",marginLeft:"20%"}}>You haven't added any Fundraiser yet.</Typography> : <div> {fundraisers.map((product) => (
      <Fundraiser key={product.a_id} product={product} />
    ))}</div>
    }
   
    </>
  )
}

export default Fundraisers