import { React,useState} from 'react';
import { Box } from '@mui/material';
import AddActivity from './Activity/addActivity';
import AddFundraiser from './Fundraiser/addFundraiser';
import AddEvent from './Events/AddEvent';
import Button from "@mui/material/Button";
import Data from './data';
import './css/ButtonDiv.css'

function ButtonDiv(props) {
  const clickFundraiser = (event) =>{
    props.onDataReceived("Fundraiser");
  
  }
  const clickActivity = (event) =>{
    props.onDataReceived("Activity");
  
  }
  const clickEvent = (event) =>{
    props.onDataReceived("Events");
  
  }
  
  return (
    <div className="button-div">
     <Box sx={{ width: "20%",marginLeft:"0%"}}><AddActivity/>
     <Button onClick={clickActivity}>Show Activities</Button></Box>
     <Box sx={{ width: "20%",  marginLeft:"4%" }}><AddFundraiser/>
     <Button onClick={clickFundraiser}>Show Fundraisers</Button></Box>
     <Box sx={{ width: "20%",   marginLeft:"4%"}}><AddEvent/>
     <Button onClick={clickEvent}>Show Events</Button></Box>
    </div>
  );
}

const ManageProfile = () => {
  const [data, setData] = useState("Activity");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  return (
    <>
    <ButtonDiv onDataReceived={handleDataReceived}></ButtonDiv>
    <Data load={data} />
    </>
   
  )
}

export default ManageProfile