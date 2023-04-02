import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import base_url from '../../api/bootapi';
import Ngocard from './NgoCard';




const useStyles = makeStyles({
    list:{
        display: "flex",
    flexDirection:" row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
       
    },
  root: {
    display: 'flex',
    minWidth:'200px',
    width: '20%',
    height: '210px',
    marginTop:"2%",
    marginLeft:"2%",
    borderRight:"2px solid darkcyan",
    borderBottom:"2px solid darkcyan",
    boxShadow:"3px 4px #888888"
    
  },
  media: {
   
    width: '100%',
    height: '100%',
  },
  
});



const NgoList = (props) => {
  const [ngos,setNgos] = useState([]);
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

  
  return (
    <>
   <div className={classes.list}>
    {ngos.map((product) => (
      <Ngocard key={product.ngoId} product={product}/>
      
    ))}
    </div> 
    
  
    
    </>
    
  )
}

export default NgoList;