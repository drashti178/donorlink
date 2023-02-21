import { React,useState} from 'react';
import NavBar from '../../Navbar';
import './ButtonDiv.css';
import { Button } from '@mui/material';
import Datacomponent from './datacomponent';

function ButtonDiv() {
  return (
    <div className="button-div">
     <Button to="/ngo/signup"
              sx={{ width: "20%", marginLeft:"2%" ,textTransform: "capitalize", backgroundColor: "darkcyan",color:"white",fontSize:"110%"}}>Add Activity</Button>
     <Button to="/ngo/signup"
              sx={{ width: "20%",  marginLeft:"10%" ,textTransform: "capitalize", backgroundColor: "darkcyan",color:"white",
              fontSize:"110%"}}>Add FundRaiser</Button>
     <Button to="/ngo/signup"
              sx={{ width: "20%",  marginLeft:"10%" ,textTransform: "capitalize", backgroundColor: "darkcyan",color:"white",
              fontSize:"110%"}}>Add Request</Button>
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