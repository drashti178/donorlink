import { React,useState} from 'react';
import { Button } from '@mui/material';
import NavBar from '../Navbar';
import Carouseldiv from '../carousel';
import Maindata from './maindata';

const Home = () => {
  
  let images = [
    
      'images/home1.jpg'
    ,
    
    'images/home2.jpg'
    
  ]
  const [data, setData] = useState("Ngos");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  
  
  return (
    <>
    <NavBar type="home" onDataReceived={handleDataReceived}/>
   
    <div>
    <Carouseldiv images={images}/>
    </div>
    <Maindata load={data} />
    </>
   
  );
};

export default Home;