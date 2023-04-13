import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Typography } from '@material-ui/core';
import base_url from '../../api/bootapi';
import FundraiserCard from './FundraiserCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  boxes:{
   width:"33.33%",
   backgroundColor:"black"
  },
  titleFont: {
   fontFamily: 'Dosis, sans-serif;',
 },
});  

const Fundraisers =()=> {
  const classes = useStyles();
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
    <>
    <div className="row justify-content-center" style={{ marginTop: "5%" }}>
                <div className="col-md-7 text-center">
                    <h1 className={classes.titleFont}>Fundraisers</h1>
                    <p>Below is all active Fundraiser, which are started by ngos registered at our site. You can donate to fundraiser by clicking on donate button.</p>
                </div>
            </div>
        <div>
      {(fundraisers.length===0)?<Typography variant="h6" gutterBottom style={{marginTop:"3%",textAlign:"center"}}>No active Fundraiser.</Typography> : <div> {fundraisers.map((product) => (
      <FundraiserCard key={product.a_id} fundraiser={product} />
    ))}</div>
    }
   
    </div>
    </>
  )
}

export default Fundraisers;



