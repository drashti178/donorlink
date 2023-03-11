import { React,useState} from 'react';
import Navbar from './navbar';
import Datacomponent from './datacomponent';







const NgoProfile = () => {
  const [data, setData] = useState("Donations");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  
  
  return (

    <>
    
    <Navbar onDataReceived={handleDataReceived}/>
    
    <Datacomponent load={data}></Datacomponent>
   
    </>
   
  );
};

export default NgoProfile;