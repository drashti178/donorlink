import React from 'react'
import ViewDonations from './ViewDonations'
import ViewProfile from './ViewProfile'

const Maindata = (props) => {
    
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