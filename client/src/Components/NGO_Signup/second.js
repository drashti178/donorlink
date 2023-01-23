import { React } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Button,
  FormControlLabel,
} from "@mui/material";
import UploadIcon from '@mui/icons-material/UploadFile';
import IconButton from "@mui/material/IconButton";
import FileUpload from '@mui/icons-material/FileUpload';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

const Second = (props) => {
  

 
  return (
    <Grid align="center">
     
        
        <form >
          <TextField
            name="address"
            varient="outlined"
            label="Address"
            value={props.inputs.address}
            style={{ marginTop: "25px" }}
            onChange={props.changefun}
            fullWidth
            required
          />
          
          
          <TextField
            name="country"
            varient="outlined"
            label="Country"
            value={props.inputs.country}
            style={{ marginTop: "25px" ,width:"50%",marginRight:"2%"}}
            onChange={props.changefun}
            
            required
          />
          <TextField
            name="pincode"
            varient="outlined"
            label="Pincode"
            value={props.inputs.pincode}
            style={{ marginTop: "25px" ,width:"48%"}}
            onChange={props.changefun}
            
            required
          />
          <TextField
            name="link"
            varient="outlined"
            label="Website Link"
            value={props.inputs.link}
            style={{ marginTop: "25px" ,width:"50%",marginRight:"2%"}}
            onChange={props.changefun}
            fullWidth
            
          />
          <TextField
            name="mobile"
            varient="outlined"
            label="Contact No"
            value={props.inputs.mobile}
            style={{ marginTop: "25px" ,width:"48%"}}
            onChange={props.changefun}
            
            required
          />
           <FormControl style={{ marginTop: "3%", width:"50%"}}>
      <FormLabel id="demo-row-radio-buttons-group-label" style={{  display: 'flex', marginRight: "auto", }}>Is 80-G Certified</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="certi"
        value={props.inputs.certi}
        onChange={props.changefun}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
       
      </RadioGroup>
    </FormControl>

          <IconButton color="primary" aria-label="upload picture" component="label" style={{ marginTop: "4%",width:"5%",marginRight:"2%", color: 'white', backgroundColor: '#1bbd7e',"&:hover" :{backgroundColor: "#14ae72"} }} onClick={props.onFileChange}>
            <input hidden accept="image/*" type="file" onChange={props.onFileChange}/>
              <FileUpload />
          </IconButton>
          <Button variant="contained" endIcon={<UploadIcon /> } style={{ marginTop: "4%",marginRight:"10%",width:"25%", color: 'white', backgroundColor: '#1bbd7e',"&:hover" :{backgroundColor: "#14ae72"} }} onClick={props.onFileUpload}>
          80G Certificate
          </Button>

         
          <Grid
            container
            spacing={2}
            style={{ marginTop: "20px" }}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            
            <Button onClick={props.prevfun} variant="contained" sx={{ "&:hover" :{backgroundColor: "#14ae72"}, width: "20%",
            marginRight:"28%",marginLeft:"2%", marginTop: 1, align: "center", color: 'white', backgroundColor: '#1bbd7e' }} >
              Prev
            </Button>
            
            <Button onClick={props.nextfun} variant="contained" sx={{ "&:hover" :{backgroundColor: "#14ae72"}, width: "20%",
            marginLeft:"30%", marginTop: 1, align: "center", color: 'white', backgroundColor: '#1bbd7e' }} >
              Next
            </Button>
            
          </Grid>
          
            

        </form>
      
    </Grid>
  );
};
export default Second;