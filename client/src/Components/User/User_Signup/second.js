import { React } from "react";
import {
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  
} from "@mui/material";



const Second = (props) => {
 

  return (
    <Grid align="center">
      <Typography variant="overline" sx={{lineHeight:4.66}} >
        Account Details
      </Typography>
      <List>
        <ListItem>
          <ListItemText
          primary="Name"
          secondary={props.inputs.name}>

          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
          primary="Username"
          secondary={props.inputs.username}>

          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
          primary="Email"
          secondary={props.inputs.email}>

          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
          primary="Country"
          secondary={props.inputs.country}>

          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
          primary="Contact No"
          secondary={props.inputs.contactno}>

          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
          primary="Adhar Number"
          secondary={props.inputs.adharno}>

          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
          primary="Profession"
          secondary={props.inputs.profession}>

          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
          primary="Type"
          secondary={props.inputs.type}>

          </ListItemText>
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
            <Button onClick={props.prevfun} variant="contained" sx={{ "&:hover" :{backgroundColor: "#9C7875"}, width: "20%",marginLeft:"8px", marginTop: 1, align: "center", color: 'white', backgroundColor: '#9C7875' }} >
              Prev
            </Button>
            
            <Button type="submit" onClick={props.submitfun} variant="contained" sx={{ "&:hover" :{backgroundColor: "#9C7875"}, width: "20%",
            marginLeft:"30%", marginTop: 1, align: "center", color: 'white', backgroundColor: '#9C7875' }} >
              Submit
            </Button>
            
          </Grid>
          
            

        </form>
     
    </Grid>
  );
};
export default Second;