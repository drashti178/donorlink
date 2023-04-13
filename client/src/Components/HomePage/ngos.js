import React, {useContext, useEffect,useState} from 'react';
import Categories from './categories';
import NgoList from './ngolist';
import Donors from './Donors';
import Events from './Events';
import { UserContext } from '../../Context/UserContext';
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
  const context = useContext(UserContext);
  const handleDataReceived = (childData) => {
    setCat(childData);
  };
  const classes = useStyles();
  
  return (
    <>
     <div className="row justify-content-center" style={{ marginTop: "5%" }}>
                <div className="col-md-7 text-center">
                    <h1 className={classes.titleFont}>Ngos</h1>
                    <p>Below is all ngos, which have registered at registered at our site. You can view details and donate to ngo by clicking on view.</p>
                </div>
            </div>
    <Categories onDataReceived={handleDataReceived}></Categories>
      <NgoList category= {cat}/>
      <Box sx={{backgroundColor:"darkcyan",height:"4px",width:"60%",marginInline:"20%",marginBlock:"5%"}}></Box>
      <Donors />
      <Box sx={{backgroundColor:"darkcyan",height:"4px",width:"60%",marginInline:"20%",marginBlock:"5%"}}></Box>
      { ((context.user && context.user.role === 'user') || context.user === null) &&  
    <Events />}
      
    </>
  )
}

export default Ngos;