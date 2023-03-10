import { React, useContext, useEffect, useState } from 'react';
import NavBar from '../../Navbar';
import './ButtonDiv.css';
import { Box, Button } from '@mui/material';
import Datacomponent from './datacomponent';
import AddActivity from './addActivity';
import AddFundraiser from './addFundraiser';
import AddRequest from './addRequest';
import { UserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import base_url from '../../../api/bootapi';

function ButtonDiv() {

  return (
    <div className="button-div">
      <Box sx={{ width: "20%", marginLeft: "0%" }}><AddActivity /></Box>
      <Box sx={{ width: "20%", marginLeft: "4%" }}><AddFundraiser /></Box>
      <Box sx={{ width: "20%", marginLeft: "4%" }}><AddRequest /></Box>
    </div>
  );
}

const NgoProfile = () => {
  const [data, setData] = useState("Activities");
  const handleDataReceived = (childData) => {
    setData(childData);
  };

  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("AccessToken") == null) {
      setTimeout(() => {
        alert('Log in First');
      }, 100);
      navigate('/ngo/login');
    }
    else {
      if (context.user == null) {
        const token = "Bearer " + localStorage.getItem("AccessToken");
        axios.get(`${base_url}/user/profile`, {
          headers: {
            'Authorization': token,
          }
        }).then(
          (response) => {
            console.log(response.data);
            context.setUser(response.data);
          },
          (error) => {
            console.log(error);
          }
        )
      }
      else {
        if (context.user.role == 'user') {
          navigate('/user/profile');
        }
      }
    }
  }, [context.user]);

  return (
    <>
      <NavBar type="ngoprofile" onDataReceived={handleDataReceived} />
      <ButtonDiv></ButtonDiv>
      <Datacomponent load={data}></Datacomponent>

    </>

  );
};

export default NgoProfile;