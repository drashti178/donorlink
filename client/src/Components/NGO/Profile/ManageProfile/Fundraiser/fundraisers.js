import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import base_url from '../../../../../api/bootapi';
import axios from "axios";
import { Typography } from '@material-ui/core';
import Fundraiser from './Fundraiser';

const Fundraisers = () => {
  const [fundraisers,setFundraisers] = useState([]);
  useEffect(() => {   
    getAllFundraisers();
  },[]);
  
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
    <div>
      {(fundraisers.length===0)?<Typography variant="h6" gutterBottom style={{marginTop:"3%",marginLeft:"20%"}}>You haven't added any Activity yet.</Typography> : <div> {fundraisers.map((product) => (
      <Fundraiser key={product.a_id} product={product} />
    ))}</div>
    }
   
    </div>
  )
}

export default Fundraisers