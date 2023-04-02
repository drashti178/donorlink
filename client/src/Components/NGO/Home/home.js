import { React,useState} from 'react';
import Maindata from './maindata';
import Navbar from './navbar';

const NgoHome = () => {
  const [data, setData] = useState("Ngos");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  
  
  return (
    <>
    <Navbar onDataReeceived={handleDataReceived}/>
    <Maindata load={data} />
    
    
    </>
   
  );
};

export default NgoHome;

