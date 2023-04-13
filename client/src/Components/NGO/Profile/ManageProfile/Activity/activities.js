import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import base_url from '../../../../../api/bootapi';
import Activity from './activity';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ActivityContext } from '../../../../../Context/UserContext';





const Activities = () => {
  const [activities, setActivities] = useState([]);
  const { isAdded, setIsAdded } = useContext(ActivityContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllActivities();
  }, [isAdded]);
  const navigate = useNavigate();
  const getAllActivities = () => {
    setLoading(true);
    console.log("getactivities");
    const token = "Bearer " + localStorage.getItem("AccessToken");
    axios.get(`${base_url}/ngo/activities`, {
      headers: {
        'Authorization': token,
      }
    }).then(
      (response) => {
        setActivities(response.data);
        setLoading(false);
        console.log(response.data);

      },
      (error) => {
        console.log(error);
        console.log("Error");
      }
    )

  }
  return (
    <div>
      {!loading &&
        (activities.length === 0) ? <Typography variant="h6" gutterBottom style={{ marginTop: "3%", marginLeft: "20%" }}>You haven't added any Activity yet.</Typography> : <div> {activities.map((product) => (
          <Activity key={product.a_id} product={product} />
        ))}</div>
      }

    </div>

  )
}
export default Activities;


