import React, { useContext, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import {  
    Grid,
} from "@mui/material";
import base_url from '../../../../../api/bootapi';
import { ActivityContext } from '../../../../../Context/UserContext';

const DeleteActivity = (props) => {
   const context = useContext(ActivityContext);
    const [open, setOpen] = useState(false);
    const handleSubmit =  (e) => {
        e.preventDefault();
        deleteActivity(props.act_id);
        console.log(props);
    };
 
    const handleClickOpen = () => {
      
      setOpen(true);
    };
  
    const handleClose = () => {
      context.setIsAdded(!context.isAdded);
      setOpen(false);
    };
    const deleteActivity = (id) =>{
        console.log("activity deleted");
        const token = "Bearer " + localStorage.getItem("AccessToken");
         axios.delete(`${base_url}/ngo/deleteActivity/${id}`, {
          headers: {
            'Authorization': token,
          }
        }).then(
          (response) => {
            console.log(response.data);
            handleClose();
          },
          (error) => {
            console.log(error);
            
          }
        )
    
      }
  return (
    <div>
    <Button 
        variant="contained"
        sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', },marginLeft:"100%", marginTop:"2%",width: "20%", backgroundColor: 'darkcyan' ,color:"white"}} onClick={handleClickOpen}>Delete</Button>
   <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
     
     <DialogContent>
     <form onSubmit={handleSubmit}>
     <DialogTitle id="form-dialog-title"  sx={{display:"flex",marginLeft:"auto", color: 'darkcyan', width:"80%" }}>Delete Activity</DialogTitle>
     <DialogContent id="form-dialog-content">Sure you want to delete this Activity?</DialogContent>
     
     <Grid
       container
       spacing={2}
       style={{ marginTop: "20px" }}
       direction="row"
       justifyContent="space-around"
       alignItems="center"
     >
      
       <Button
         onClick={handleClose}
         sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', },marginLeft:"5%",marginTop:"2%", width: "40%",  backgroundColor: 'darkcyan',color:"white" }}
       >
         Cancel
       </Button>
       <Button
        type="submit"
        onClick={handleSubmit}
        variant="contained"
        sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white' }, marginTop:"2%",width: "40%", backgroundColor: 'darkcyan',color:"white" }}
       >
         Delete
       </Button>
       
       </Grid>
       </form>
     </DialogContent>
    
   </Dialog>
 </div>
  )
}

export default DeleteActivity