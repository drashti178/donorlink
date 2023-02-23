import { React,useState} from 'react';
import NavBar from '../../Navbar';
import './ButtonDiv.css';
import { Box, Button } from '@mui/material';
import Datacomponent from './datacomponent';
import AddActivity from './addActivity';
import AddFundraiser from './addFundraiser';
import AddRequest from './addRequest';

function ButtonDiv() {
  return (
    <div className="button-div">
     <Box sx={{ width: "20%",marginLeft:"0%"}}><AddActivity/></Box>
     <Box sx={{ width: "20%",  marginLeft:"4%" }}><AddFundraiser/></Box>
     <Box sx={{ width: "20%",   marginLeft:"4%"}}><AddRequest/></Box>
    </div>
  );
}




const NgoProfile = () => {
  const [data, setData] = useState("Activities");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  
  return (
    <>
    <NavBar type="ngoprofile" onDataReceived={handleDataReceived}/>
    <ButtonDiv></ButtonDiv>
    <Datacomponent  load={data}></Datacomponent>
    
    </>
   
  );
};

export default NgoProfile;