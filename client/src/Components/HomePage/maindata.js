import React from 'react'
import Fundraisers from './fundraisers'
import Ngos from './ngos'
import ViewProfile from '../User/ViewProfile';
import ViewDonations from '../User/ViewDonations';

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