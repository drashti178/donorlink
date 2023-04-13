import { React } from "react";
import {
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  
} from "@mui/material";



const Third = (props) => {
 

  return (
    <Grid align="center">
      <Typography variant="overline" >
        Account Details
      </Typography>
      <List>
        <ListItem>
          <ListItemText
          primary="NGO Name"
          secondary={props.inputs.ngoname}>

          </ListItemText>
        </ListItem>
      
        <ListItem>
          <ListItemText
            primary="Email"
            secondary={props.inputs.email}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Founder"
            secondary={props.inputs.founder}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Tagline"
            secondary={props.inputs.tagline}
          />
          
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Profile Image"
            secondary={props.imageUrl}
          />
          
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Area Of Work"
            secondary={props.inputs.areaofwork}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Website Link"
            secondary={props.inputs.weblink}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="80-G Certificate"
            secondary={props.certiUrl}
          />
          
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Address"
            secondary={props.inputs.address}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Pincode"
            secondary={props.inputs.pincode}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Country"
            secondary={props.inputs.country}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Contact No."
            secondary={props.inputs.mobile}
          />
        </ListItem>
      </List>
        <form >
          
          <Grid
            container
            spacing={2}
            style={{ marginTop: "20px" }}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button onClick={props.prevfun} variant="contained" sx={{ "&:hover" :{backgroundColor: "darkcyan"}, width: "20%",
            marginRight:"28%",marginLeft:"2%", marginTop: 1, align: "center", color: 'white', backgroundColor: 'darkcyan' }} >
              Prev
            </Button>
            
            <Button type="submit" onClick={props.submitfun} variant="contained" sx={{ "&:hover" :{backgroundColor: "darkcyan"}, width: "20%",
            marginLeft:"30%", marginTop: 1, align: "center", color: 'white', backgroundColor: 'darkcyan' }} >
              Submit
            </Button>
            
          </Grid>
          
            

        </form>
     
    </Grid>
  );
};
export default Third;