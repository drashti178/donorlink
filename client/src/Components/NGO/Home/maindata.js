import React from 'react'
import Collaboration from './collaborations';
import Ngos from '../../HomePage/ngos';
import Fundraisers from '../../HomePage/fundraisers';


const Maindata = (props) => {
    if(props.load === "Ngos")
    {
        return (
            <>
            <Ngos />
            </>
            
          )
    }
    if(props.load==="Collaborations")
    {
        return (
            <>
           <Collaboration />
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