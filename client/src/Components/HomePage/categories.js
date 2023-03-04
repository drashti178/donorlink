import { Box, Button } from '@mui/material';
import React from 'react'

const Categories = (props) => {
  const clickStudy = (event) =>
  {
    props.onDataReceived("Study");
   
  }
  const clickEnviroment = (event) =>{
    props.onDataReceived("Enviroment");
   
  }
 
    const categories = [{"cr":"Study","event":clickStudy}, {"cr":"Enviroment","event":clickEnviroment}];
  return (
    <>
    <div>Categories</div>
    
    <Box sx={{ flexGrow: 1,alignItems:"center" ,display: { xs: 'none', md: 'flex' } }}>
            {categories.map((c) => (
              <Button
                key={c.cr}
                onClick={c.event}
                sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', },alignItems:"center" ,mr:"8px",ml:"8px",my: 2, backgroundColor:"darkcyan", color: 'white', display: 'block' }}
              >
                {c.cr}
              </Button>
            ))}
          </Box>
    </>
    
  )
}

export default Categories;