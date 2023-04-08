import React, { useContext, useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';

import axios from "axios";
import Table from 'react-bootstrap/Table';
import base_url from '../../../../../api/bootapi';
import { Box, IconButton,Typography } from '@material-ui/core';
import FDonationTable from './FDonationTable';


const ViewFDonations = (props) => {
  
    const [open, setOpen] = useState(false);
    const [fdonations, setFDonations] = useState([]);
    let fd_id=props.fr_id;
    const handleSubmit =  (e) => {
        e.preventDefault();
        
        console.log(props);
    };
    useEffect(() => {
     
      fetchFDonations(fd_id);
  }, []);
 
    const handleClickOpen = () => {
      
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const fetchFDonations = (fd_id) => {
      const token = "Bearer " + localStorage.getItem("AccessToken");

      axios.get(`${base_url}/ngo/fundraiser/donation/${fd_id}`, {
          headers: {
              'Authorization': token,
          }
      }).then(
          (response) => {
              console.log(response.data);
              setFDonations(response.data);
             
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
        sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', },marginLeft:"100%", marginTop:"2%",width: "80%", backgroundColor: 'darkcyan' ,color:"white"}} onClick={handleClickOpen}>Donations</Button>
   <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen>
   <DialogTitle id="id">
         <Box display="flex" alignItems="center">
                <Box flexGrow={1} sx={{display:"flex",marginLeft:"auto", color: 'darkcyan', width:"80%" }}>View Fundraiser Donation</Box>
                <Box>
                    <IconButton onClick={handleClose}>
                          <CloseIcon sx={{ color: 'darkcyan', width:"200" }}/>
                    </IconButton>
                </Box>
          </Box>
  </DialogTitle>
     
     <DialogContent>
     {
                (fdonations.length === 0) ? <Typography variant="h6" gutterBottom style={{marginTop:"3%",marginLeft:"1%"}}>You haven't donated in any Fundraiser yet!!</Typography> :
                <Table bordered hover style={{ marginTop: "4%" }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Fundraiser Name</th>
                            <th>Ngo Name</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {fdonations.map((i, index) => (
                            
                            <FDonationTable i={i} index={index}/>
                        ))}
                    </tbody>
                </Table>
            }
     </DialogContent>
    
   </Dialog>
 </div>
  )
}

export default ViewFDonations