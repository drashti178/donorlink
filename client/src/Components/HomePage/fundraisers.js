import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Typography } from '@material-ui/core';
import base_url from '../../api/bootapi';
import FundraiserCard from './FundraiserCard';



const Fundraisers =()=> {
  
  const [fundraisers,setFundraisers] = useState([]);
  useEffect(() => {   
    getAllFundraisers();
  },[]);
  
  const getAllFundraisers= ()=>
  {
  
    const token = "Bearer " + localStorage.getItem("AccessToken");
     axios.get(`${base_url}/home/activefundraisers`,).then(
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
      {(fundraisers.length===0)?<Typography variant="h6" gutterBottom style={{marginTop:"3%",marginLeft:"20%"}}>You haven't added any Fundraiser yet.</Typography> : <div> {fundraisers.map((product) => (
      <FundraiserCard key={product.a_id} fundraiser={product} />
    ))}</div>
    }
   
    </div>
  )
}

export default Fundraisers;



