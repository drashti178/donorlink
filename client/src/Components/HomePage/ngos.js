import React, {useContext, useEffect,useState} from 'react';
import Categories from './categories';
import NgoList from './ngolist';
import Donors from './Donors';
import Events from './Events';
import { UserContext } from '../../Context/UserContext';


const Ngos = () => {
  const [cat, setCat] = useState("All");
  const context = useContext(UserContext);
  const handleDataReceived = (childData) => {
    setCat(childData);
  };
  
  return (
    <>
    <Categories onDataReceived={handleDataReceived}></Categories>
      <NgoList category= {cat}/>
      <Donors />
      { ((context.user && context.user.role === 'user') || context.user === null) &&  
      <Events />}
    </>
  )
}

export default Ngos;