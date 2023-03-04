import { React,useState} from 'react';
import NavBar from '../../Navbar';

const UserHome = () => {
  const [data, setData] = useState("Ngos");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  
  
  return (
    <>
    <NavBar type="ngohome" onDataReceived={handleDataReceived}/>
    users home page
    
    </>
   
  );
};

export default UserHome;

