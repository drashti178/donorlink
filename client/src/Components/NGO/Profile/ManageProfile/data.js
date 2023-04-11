import React from 'react'
import Activities from './Activity/activities'
import Fundraisers from './Fundraiser/fundraisers'
import Events from './Events/Events'


const Data = (props) => {
  
    if(props.load==="Activity")
    {
        return (
            <>
            <Activities />
            </>
            
          )
    }
    if(props.load==="Fundraiser")
    {
        return (
            <>
            <Fundraisers />
            </>
            
          )
    }
    if(props.load==="Events")
    {
        return (
            <>
            <Events />
            </>
            
          )
    }
 
}

export default Data;
