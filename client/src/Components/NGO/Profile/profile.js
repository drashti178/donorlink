import { React,useMemo,useState} from 'react';
import Navbar from './navbar';
import Datacomponent from './datacomponent';
import { ActivityContext, FundraiserContext } from '../../../Context/UserContext';







const NgoProfile = () => {
  const [data, setData] = useState("ManageProfile");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  const [isAdded,setIsAdded] = useState(false);
  const [isFAdded,setIsFAdded] = useState(false);
  const value = useMemo(() => ({isAdded,setIsAdded}), [isAdded,setIsAdded]);
  const value2 = useMemo(() => ({isFAdded,setIsFAdded}), [isFAdded,setIsFAdded]);
  
  return (

    <> 
    <ActivityContext.Provider value={value}>
     <FundraiserContext.Provider value={value2}>
     <Navbar onDataReceived={handleDataReceived}/>
    </FundraiserContext.Provider> 
   
    
    <Datacomponent load={data}></Datacomponent>
    </ActivityContext.Provider>
    </>
   
  );
};

export default NgoProfile;