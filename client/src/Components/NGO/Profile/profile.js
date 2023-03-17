import { React,useMemo,useState} from 'react';
import Navbar from './navbar';
import Datacomponent from './datacomponent';
import { ActivityContext } from '../../../Context/UserContext';







const NgoProfile = () => {
  const [data, setData] = useState("ManageProfile");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  const [isAdded,setIsAdded] = useState(false);
  const value = useMemo(() => ({isAdded,setIsAdded}), [isAdded,setIsAdded]);

  
  return (

    <> 
    <ActivityContext.Provider value={value}>
    <Navbar onDataReceived={handleDataReceived}/>
    
    <Datacomponent load={data}></Datacomponent>
    </ActivityContext.Provider>
    </>
   
  );
};

export default NgoProfile;