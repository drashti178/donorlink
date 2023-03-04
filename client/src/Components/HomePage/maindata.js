import React from 'react'

import NgoList from './ngos'
import Fundraisers from './fundraisers'
import Ngos from './ngos'

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
   
  
}

export default Maindata;