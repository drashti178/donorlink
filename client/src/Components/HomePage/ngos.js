import React, {useEffect,useState} from 'react';
import Categories from './categories';
import NgoList from './ngolist';
import Donors from './Donors';


const Ngos = () => {
  const [cat, setCat] = useState("All");
  
  const handleDataReceived = (childData) => {
    setCat(childData);
  };
  

  
  
  return (
    <>
    <Categories onDataReceived={handleDataReceived}></Categories>
      <NgoList category= {cat}/>
      <Donors />
    </>
  )
}

export default Ngos;