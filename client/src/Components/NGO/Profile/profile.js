import { React, useMemo, useState } from 'react';
import Navbar from './navbar';
import Datacomponent from './datacomponent';
import { ActivityContext, EventContext, FundraiserContext } from '../../../Context/UserContext';

const NgoProfile = () => {
  const [data, setData] = useState("ManageProfile");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  const [isAdded, setIsAdded] = useState(false);
  const [isFAdded, setIsFAdded] = useState(false);
  const [isEAdded, setIsEAdded] = useState(false);
  const value = useMemo(() => ({ isAdded, setIsAdded }), [isAdded, setIsAdded]);
  const value2 = useMemo(() => ({ isFAdded, setIsFAdded }), [isFAdded, setIsFAdded]);
  const value3 = useMemo(() => ({ isEAdded, setIsEAdded }), [isEAdded, setIsEAdded]);

  return (

    <>
      <ActivityContext.Provider value={value}>
        <FundraiserContext.Provider value={value2}>
          <EventContext.Provider value={value3}>
            <Navbar onDataReceived={handleDataReceived} />
          </EventContext.Provider>
        </FundraiserContext.Provider>


        <Datacomponent load={data}></Datacomponent>
      </ActivityContext.Provider>
    </>

  );
};

export default NgoProfile;