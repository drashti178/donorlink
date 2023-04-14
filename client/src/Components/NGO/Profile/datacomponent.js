import React from 'react'
import Donations from './Donations/donations'
import ManageProfile from './ManageProfile/manageprofile'

const Datacomponent = (props) => {
    
    if(props.load==="Donations")
    {
        return (
            <>
            <Donations />
            </>
            
          )
    }
    if(props.load==="ManageProfile")
    {
        return (
            <>
            <ManageProfile />
            </>
            
          )
    }
  
}

export default Datacomponent