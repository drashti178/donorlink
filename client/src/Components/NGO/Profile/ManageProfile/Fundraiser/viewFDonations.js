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
import { FundraiserContext } from '../../../../../Context/UserContext';

const ViewFDonations = (props) => {
    const context = useContext(FundraiserContext);
    const [open, setOpen] = useState(false);
    const handleSubmit =  (e) => {
        e.preventDefault();
        stopFundraiser(props.fr_id);
        console.log(props);
    };
 
    const handleClickOpen = () => {
      
      setOpen(true);
    };
  
    const handleClose = () => {
      context.setIsFAdded(!context.isFAdded);
      setOpen(false);
    };
    const stopFundraiser = (id) =>{
       
        const token = "Bearer " + localStorage.getItem("AccessToken");
         axios.delete(`${base_url}/ngo/stopFundraiser/${id}`, {
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
        sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', },marginLeft:"100%", marginTop:"2%",width: "20%", backgroundColor: 'darkcyan' ,color:"white"}} onClick={handleClickOpen}>Stop</Button>
   <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
     
     <DialogContent>
     <form onSubmit={handleSubmit}>
     <DialogTitle id="form-dialog-title"  sx={{display:"flex",marginLeft:"auto", color: 'darkcyan', width:"80%" }}>Stop Fundraiser</DialogTitle>
     <DialogContent id="form-dialog-content">Sure you want to stop this Fundraiser?</DialogContent>
     
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

export default ViewFDonations