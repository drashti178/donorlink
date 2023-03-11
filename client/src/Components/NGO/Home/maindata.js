import React from 'react'
import Colaborations from './colaborations';
import Ngos from '../../HomePage/ngos';
import Fundraisers from '../../HomePage/fundraisers';


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
    if(props.load==="Fundraisers")
    {
        return (
            <>
            <Fundraisers></Fundraisers>
            </>
            
          )
    }
   
  
}

export default Maindata;