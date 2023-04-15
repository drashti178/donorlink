import { Box, Button } from '@mui/material';
import React from 'react'

const Categories = (props) => {
  const clickAll = (event) =>
  {
    props.onDataReceived("All");
   
  }
  const clickStudy = (event) =>
  {
    props.onDataReceived("Education");
   
  }
  const clickEnviroment = (event) =>{
    props.onDataReceived("Enviroment");
   
  }
  const clickOrphan = (event) =>
  {
    props.onDataReceived("Orphan");
   
  }
  const clickWomenEmpowerment = (event) =>{
    props.onDataReceived("WomenEmpowerment");
   
  }
  const clickHealth = (event) =>{
    props.onDataReceived("Health");
   
  }
 
    const categories = [{"cr":"All","event":clickAll},{"cr":"Education","event":clickStudy}, {"cr":"Enviroment","event":clickEnviroment},{"cr":"Orphan","event":clickOrphan},{"cr":"WomenEmpowerment","event":clickWomenEmpowerment},{"cr":"Health","event":clickHealth}];
  return (
    <>

    <Box sx={{ flexGrow: 1,alignItems:"center" ,display: { xs: 'none', md: 'flex' } ,ml:"30%"}}>
            {categories.map((c) => (
              <Button
                key={c.cr}
                onClick={c.event}
                sx={{ "&:hover": { backgroundColor: "#075456", color: 'white', },alignItems:"center" ,mr:"8px",ml:"8px",my: 2, backgroundColor:"#075456", color: 'white', display: 'block' }}
              >
                {c.cr}
              </Button>
            ))}
          </Box>
    </>
    
  )
}

export default Categories;