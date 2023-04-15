import React, {useState} from 'react';
import Categories from './categories';
import NgoList from './ngolist';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@mui/material';


const useStyles = makeStyles({
  boxes:{
   width:"33.33%",
   backgroundColor:"black"
  },
  titleFont: {
   fontFamily: 'Dosis, sans-serif;',
 },
   
   });

const Ngos = () => {
  const [cat, setCat] = useState("All");
  const handleDataReceived = (childData) => {
    setCat(childData);
  };
  const classes = useStyles();
  
  return (
    <>
     <div className="row justify-content-center" style={{ marginTop: "3%" }}>
                <div className="col-md-7 text-center">
                    <h1 className={classes.titleFont}>Ngos</h1>
                    <p>Below is all ngos, which have registered at registered at our site. You can view details and donate to ngo by clicking on view.</p>
                </div>
            </div>
    <Categories onDataReceived={handleDataReceived}></Categories>
      <NgoList category= {cat}/>
      <Box style={{backgroundColor:"#c4cccc",height:"4px",width:"60%",marginInline:"20%",marginBlock:"5%"}}></Box>
      
      
    </>
  )
}

export default Ngos;