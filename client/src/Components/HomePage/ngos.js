import { React,useState} from 'react';
import Categories from './categories';
import NgoList from './ngolist';

const Ngos = () => {
  const [cat, setCat] = useState("All");
  const handleDataReceived = (childData) => {
    setCat(childData);
  };
  return (
    <>
    <Categories onDataReceived={handleDataReceived}></Categories>
    <NgoList category= {cat}/>
    
    </>
    
  )
}

export default Ngos;