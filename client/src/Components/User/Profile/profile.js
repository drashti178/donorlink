import { React,useState} from 'react';
import Navbar from './navbar';
import Maindata from './maindata';



const UserProfile = () => {
  const [data, setData] = useState("Home");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  
  
  return (
    <>
   <Navbar onDataReceived={handleDataReceived}/>
    <Maindata load={data} />
    </>
   
  );
};

export default UserProfile;