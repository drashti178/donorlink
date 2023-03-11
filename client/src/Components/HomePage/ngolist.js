import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import base_url from '../../api/bootapi';




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



const ProductCard = ({ product }) => {
  const profilePath = "images/ngoprofileImgs/";
  const classes = useStyles();
  const { ngoId, ngoname, profileImgName } = product;

  return (
    <>
    
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={profilePath + profileImgName}
        title={ngoname}
        ><Typography gutterBottom variant="h6" sx={{display:"flex",
        flexDirection: "row-reverse"}}>
        {ngoname}
      </Typography>
      </CardMedia>
      
     
    </Card>
   
    </>
  );
}


const NgoList = (props) => {
  const [ngos,setNgos] = useState([]);
  useEffect(() => {   
    getAllNgos();
  },[]);

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
  const classes = useStyles();

  
  return (
    <>
    <div>{props.category}</div>
    <div className={classes.list}>
    {ngos.map((product) => (
      <ProductCard key={product.ngoId} product={product} />
    ))}
    </div>
    </>
    
  )
}

export default NgoList;