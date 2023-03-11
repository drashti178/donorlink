import React from 'react'
import ViewDonation from './Donation/ViewDonations'

const Maindata = (props) => {
    if(props.load==="Home")
    {
        return (
            <>
            home
            </>
            
          )
    }
    if(props.load==="Donations")
    {
        return (
            <>
            <ViewDonation />
            </>
            
          )
    }
}

export default Maindata