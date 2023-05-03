import React, { useEffect, useState } from 'react';
import Maindata from './maindata';
import HomeNavBar from './navbar';
import Footer from './footer';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';




const Home = () => {
  const [sentence, setSentence] = useState('Empowering communities and transforming lives through collective action.');
  const [displayedSentence, setDisplayedSentence] = useState('');
   
  const [data, setData] = useState("Ngos");
  const handleDataReceived = (childData) => {
    setData(childData);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius:0,
    height:"260px",
    color: 'black',
  }));
 
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= sentence.length) {
        setDisplayedSentence(sentence.substring(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [sentence]);
  return (
    <>
    <HomeNavBar onDataReceived={handleDataReceived}></HomeNavBar>
    <div
        style={{
          backgroundImage: "url('/images/bg_7.jpg')",
          backgroundSize: "cover",
          height: "100vh",
          paddingTop: "64px", 
        }}
      >
   
     
        <Typography variant="h4" style={{ color: "rgb(76 248 255)", textAlign:'center',width:"50%",marginInline:"25%",marginTop:"15%"}}>{displayedSentence}</Typography>
    
  
      </div>
      <Box style={{ flexGrow: 1,marginInline:"8%",marginTop:"-5%" }}>
      <Grid container >
        <Grid item xs={5} >
          <Item style={{backgroundColor:"#129398",}}
          ><Typography variant='h4' gutterBottom>Served Over </Typography>
          <Typography variant='h2' gutterBottom>1,98,642</Typography>
          <Typography variant='h4'>People across the world</Typography></Item>
        </Grid>
        <Grid item xs={3}>
          <Item style={{backgroundColor:"#0ba0a5"}}>
            <Typography variant='h4' gutterBottom>Donate Money </Typography>
            
            <Typography variant='h6'>Donate to ngos and fundraiser for those who need.</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item style={{backgroundColor:"#08b9c0"}}>
          <Typography variant='h4' gutterBottom>Be a Volunteer</Typography>
            
            <Typography variant='h6'>Become a volunteer for events organised for various purpose.</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
    <Box style={{ flexGrow: 1,marginInline:"8%",marginTop:"8%",height:"200px",display:"flex",flexDirection:"row",marginBlockEnd:"3%"}}>
   
          
            <Box style={{display:"flex",flexDirection:"row",padding:"2%"}}>
              <VolunteerActivismOutlinedIcon fontSize='large' style={{fontSize:"80px",color:"darkcyan"}} />
              
              <Box style={{marginLeft:"4%"}}>
             
              <h3 class="heading">Make Donation</h3>
                <p>Donate to Ngos with variety of purpose or donate to Fundraiser for those who need with enhanced security.</p>
              </Box>
            </Box> 
            <Box style={{display:"flex",flexDirection:"row",padding:"2%"}}>
              <HandshakeOutlinedIcon fontSize='large' style={{fontSize:"80px",color:"darkcyan"}} />
              
              <Box style={{marginLeft:"4%"}}>
             
              <h3 class="heading">Become A Volunteer</h3>
                <p>Not every help need money you can also help by becoming a volunteer for events organised for various purpose.</p>
              </Box>
            </Box>      
         
            <Box style={{display:"flex",flexDirection:"row",padding:"2%"}}>
              <Diversity1OutlinedIcon fontSize='large' style={{fontSize:"60px",color:"darkcyan"}} />
              
              <Box style={{marginLeft:"4%"}}>
             
              <h3 class="heading">Sponsorship</h3>
                <p>Start collaborating with other ngos .</p>
              </Box>
            </Box> 
          
       
    </Box>
    <Box style={{backgroundColor:"#c4cccc",height:"4px",width:"60%",marginInline:"20%"}}></Box>
   
    <Maindata load={data} />
    <Footer />
    </>

  );
};

export default Home;