import React from 'react'
import Fundraisers from './fundraisers'
import Ngos from './ngos'
import ViewProfile from '../User/ViewProfile';
import ViewDonations from '../User/ViewDonations';
import Events from './Events';

const Maindata = (props) => {
    if(props.load==="Ngos")
    {
        return (
            <>
          <Ngos />
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
    if(props.load==="Events")
    {
        return (
            <>
            <Events></Events>
            </>
            
          )
    }

    if(props.load === "My Profile")
    {
      return (
        <>
          <ViewProfile />
        </>
      )
    }

    if(props.load === "My Donations")
    {
      return (
        <>
          <ViewDonations />
        </>
      )
    }
}

export default Maindata;