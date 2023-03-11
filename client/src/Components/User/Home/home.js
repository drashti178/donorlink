import { React,useState} from 'react';
import Navbar from './navbar';
import Maindata from '../../NGO/Home/maindata';

const UserHome = () => {
  const [data, setData] = useState("Ngos");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  
  
  return (
    <>
   <Navbar onDataReceived={handleDataReceived}/>
    <Maindata load={data}/>
    </>
   
  );
};

export default UserHome;

