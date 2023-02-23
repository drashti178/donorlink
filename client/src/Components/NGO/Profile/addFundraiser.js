import {React,useState} from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  
    Grid,
    TextField,
   
  } from "@mui/material";



 
;
const AddFundraiser = () => {
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState({
        fr_name: "",
        cause: "",
        target:"",
        
      });
      
    
      const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        
      };
  
      let [fr_img, setFr_img] = useState(null);
      let onImageUpload = (event) => {
        setFr_img(event.target.files[0]);
    }
   
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
         <Button  sx={{ width: "100%",textTransform: "capitalize", backgroundColor: "darkcyan",color:"white","&:hover": { backgroundColor: "darkcyan", color: 'white', },
              fontSize:"110%"}} onClick={handleClickOpen}>Start Fundraiser</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          
          <DialogContent>
          <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title"  sx={{display:"flex",marginLeft:"auto", color: 'darkcyan', marginRight:"55%", width:"40%" }}>Start Fundraiser</DialogTitle>
          <Button color="primary" aria-label="upload picture" component="label" sx={{display:"flex",marginLeft:"auto", color: 'white', backgroundColor: "darkcyan",marginLeft:"55%",marginTop:"-10%", width:"40%", "&:hover" :{backgroundColor: "darkcyan"} }}>
            
            <input hidden accept="image/*" type="file" onChange={onImageUpload}/>
              <PhotoCamera style={{marginRight:"10%" }} />
              Fundraiser Image
          </Button>
          <TextField
            name="fr_name"
            varient="outlined"
            label="FundraiserName"
            value={inputs.fr_name}
            style={{ marginTop: "25px" }}
            onChange={handleChange}
            fullWidth
            required
          />

            <TextField
            name="cause"
            varient="outlined"
            label="Cause"
            value={inputs.cause}
            style={{ marginTop: "25px" }}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="target"
            varient="outlined"
            label="Target Amount"
            value={inputs.target}
            style={{ marginTop: "25px" }}
            onChange={handleChange}
            fullWidth
            required
          />
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
             variant="contained"
             sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', },marginLeft:"5%", marginTop:"2%",width: "40%", backgroundColor: 'darkcyan' ,color:"white" }}
            >
              Start
            </Button>
            
            </Grid>
            </form>
          </DialogContent>
         
        </Dialog>
      </div>
    );
}

export default AddFundraiser;