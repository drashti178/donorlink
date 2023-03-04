import React from 'react'
import Ngos from './ngos';
import Colaborations from './colaborations';


const Maindata = (props) => {
    if(props.load==="Ngos")
    {
        return (
            <>
            <Ngos />
            </>
            
          )
    }
    if(props.load==="Colaborations")
    {
        return (
            <>
           <Colaborations />
            </>
            
          )
    }
   
  
}

export default Maindata;