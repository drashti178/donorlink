import React, { useContext, useState } from 'react';

import Maindata from './maindata';
// import NavBar from '../Navbar';
// import HomeNavBar from './navbar';
import Carouseldiv from './carousel';
import NavBar from '../Navbar';

const Home = () => {
 
  let images = [  
    'images/home1.jpg',
    'images/home2.jpg'
  ]
  const [data, setData] = useState("Ngos");
  const handleDataReceived = (childData) => {
    setData(childData);
  };

  
  
  
  return (
    <>
     {/* <HomeNavBar onDataReceived={handleDataReceived}></HomeNavBar> */}
     <NavBar type="home" onDataReceived={handleDataReceived} />
   
    <div>
    <Carouseldiv images={images}/>
    </div>
      <Maindata load={data} />
    </>

  );
};

export default Home;