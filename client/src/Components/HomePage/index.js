import React, { useState } from 'react';
import Maindata from './maindata';
import HomeNavBar from './navbar';



const Home = () => {
 
  const [data, setData] = useState("Ngos");
  const handleDataReceived = (childData) => {
    setData(childData);
  };

  return (
    <>
    <HomeNavBar onDataReceived={handleDataReceived}></HomeNavBar>
    <Maindata load={data} />
    </>

  );
};

export default Home;