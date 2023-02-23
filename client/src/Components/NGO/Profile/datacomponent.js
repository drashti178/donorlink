import React from 'react'
import Activities from './activities'
import Donations from './donations'
import Requests from './requests'

const Datacomponent = (props) => {
    if(props.load==="Activities")
    {
        return (
            <>
            <Activities></Activities>
            </>
            
          )
    }
    if(props.load==="Donations")
    {
        return (
            <>
            <Donations></Donations>
            </>
            
          )
    }
    if(props.load==="Requests")
    {
        return (
            <>
            <Requests></Requests>
            </>
            
          )
    }
  
}

export default Datacomponent