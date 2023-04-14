import React,{useContext} from 'react'
import Fundraisers from './fundraisers'
import Ngos from './ngos'
import ViewProfile from '../User/ViewProfile';
import ViewDonations from '../User/ViewDonations';
import Events from './Events';

import Donors from './Donors';
import { UserContext } from '../../Context/UserContext';
import { Box } from '@mui/material';
import Collaborations from './collaborations';
import NgoCollaborations from '../NGO/Home/collaborations';




const Maindata = (props) => {
  const context = useContext(UserContext);

    if(props.load==="Ngos")
    {
        return (
            <>
          <Ngos />
          <Donors />
      <Box style={{backgroundColor:"#c4cccc",height:"4px",width:"60%",marginInline:"20%",marginBlock:"5%"}}></Box>
      { ((context.user && context.user.role === 'user') || context.user === null) &&  
    <Events />}
            </>
            
          )
    }
    
    if(props.load==="Fundraisers")
    {
        return (
            <>
            <Fundraisers></Fundraisers>
            <Box style={{backgroundColor:"#c4cccc",height:"4px",width:"60%",marginInline:"20%",marginBlock:"5%"}}></Box>
            <Donors />
      <Box style={{backgroundColor:"#c4cccc",height:"4px",width:"60%",marginInline:"20%",marginBlock:"5%"}}></Box>
      { ((context.user && context.user.role === 'user') || context.user === null) &&  
    <Events />}
            </>
            
          )
    }

    if(props.load==="Collaborations")
    {
        return (
            <>
            { ((context.user && context.user.role === 'user') || context.user === null) ?<Collaborations />:<NgoCollaborations />
    }
     <Box style={{backgroundColor:"#c4cccc",height:"4px",width:"60%",marginInline:"20%",marginBlock:"5%"}}></Box>
              
              <Donors />
      <Box style={{backgroundColor:"#c4cccc",height:"4px",width:"60%",marginInline:"20%",marginBlock:"5%"}}></Box>
      { ((context.user && context.user.role === 'user') || context.user === null) &&  
    <Events />}
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