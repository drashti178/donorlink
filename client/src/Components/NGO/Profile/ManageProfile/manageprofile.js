import { React,useState} from 'react';
import { Box } from '@mui/material';
import AddActivity from './Activity/addActivity';
import AddFundraiser from './Fundraiser/addFundraiser';
import AddRequest from './Request/addRequest';
import Button from "@mui/material/Button";
import Data from './data';

function ButtonDiv(props) {
  const clickFundraiser = (event) =>{
    props.onDataReceived("Fundraiser");
  
  }
  const clickActivity = (event) =>{
    props.onDataReceived("Activity");
  
  }
  const clickRequest = (event) =>{
    props.onDataReceived("Request");
  
  }
  return (
    <div className="button-div">
     <Box sx={{ width: "20%",marginLeft:"0%"}}><AddActivity/>
     <Button onClick={clickActivity}>Show Activities</Button></Box>
     <Box sx={{ width: "20%",  marginLeft:"4%" }}><AddFundraiser/>
     <Button onClick={clickFundraiser}>Show Fundraisers</Button></Box>
     <Box sx={{ width: "20%",   marginLeft:"4%"}}><AddRequest/>
     <Button onClick={clickRequest}>Show Requests</Button></Box>
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