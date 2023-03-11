import React from 'react'
import Activities from './Activity/activities'
import Fundraisers from './Fundraiser/fundraisers'
import Requests from './Request/requests'


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
    if(props.load==="Request")
    {
        return (
            <>
            <Requests />
            </>
            
          )
    }
 
}

export default Data
