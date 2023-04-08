import React, { useState } from 'react';
import Maindata from './maindata';
import HomeNavBar from './navbar';
import Footer from './footer';



const Home = () => {
 
  const [data, setData] = useState("Ngos");
  const handleDataReceived = (childData) => {
    setData(childData);
  };

  return (
    <>
    <HomeNavBar onDataReceived={handleDataReceived}></HomeNavBar>
    <Maindata load={data} />
    <Footer />
    </>

  );
};

export default Home;