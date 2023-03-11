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
import base_url from '../../../../../api/bootapi';
import axios from 'axios';



 
;
const AddActivity = () => {
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState({
        activityname: "",
        description: "",
        participation:"",
       
      });
      
      let [activityimg, setActivityimg] = useState(null);
      let onImageUpload = (event) => {
        setActivityimg(event.target.files[0]);
    }
    
      const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
      var formData = new FormData();
      formData.append("activityBody",JSON.stringify(inputs));
      formData.append("act_img",activityimg);
      const handleSubmit =  (e) => {
        e.preventDefault();
        
        postData(formData);
      };
     
     
        const postData =  (formData) => {
          const token = "Bearer " + localStorage.getItem("AccessToken");
          console.log(token);
         
           axios.post(`${base_url}/ngo/addActivity`, formData,{
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
        
      
     
   
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setInputs("");
      setOpen(false);
    };
  
    return (
      <div>
         <Button  sx={{ width: "100%",textTransform: "capitalize", backgroundColor: "darkcyan",color:"white","&:hover": { backgroundColor: "darkcyan", color: 'white', },
              fontSize:"110%"}} onClick={handleClickOpen}>Add Activity</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          
          <DialogContent>
          <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title"  sx={{display:"flex",marginLeft:"auto", color: 'darkcyan', marginRight:"55%", width:"40%" }}>Add Activity</DialogTitle>
          <Button color="primary" aria-label="upload picture" component="label" sx={{display:"flex", color: 'white', backgroundColor: "darkcyan",marginLeft:"55%",marginTop:"-10%", width:"40%", "&:hover" :{backgroundColor: "darkcyan"} }}>
            
            <input hidden accept="image/*" type="file" onChange={onImageUpload}/>
              <PhotoCamera style={{marginRight:"10%" }} />
              Activity Image
          </Button>
          <TextField
            name="activityname"
            varient="outlined"
            label="ActivityName"
            value={inputs.activityname}
            style={{ marginTop: "25px" }}
            onChange={handleChange}
            fullWidth
            required
          />

            <TextField
            name="description"
            varient="outlined"
            label="Description"
            value={inputs.description}
            style={{ marginTop: "25px" }}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="participation"
            varient="outlined"
            label="Participants"
            value={inputs.participation}
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
             onClick={handleSubmit}
             variant="contained"
             sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', },marginLeft:"5%", marginTop:"2%",width: "40%", backgroundColor: 'darkcyan' ,color:"white" }}
            >
              Add
            </Button>
            
            </Grid>
            </form>
          </DialogContent>
         
        </Dialog>
      </div>
    );
}

export default AddActivity;