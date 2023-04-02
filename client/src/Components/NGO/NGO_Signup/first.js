import { React, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";



const First = (props) => {
  let [showPassword, setShowPassword] = useState(false);


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword,
    );
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <Grid align="center">

      <form>

        <TextField
          name="ngoname"
          varient="outlined"
          label="NGO Name"
          value={props.inputs.ngoname}
          style={{ marginTop: "25px" }}
          onChange={props.changefun}
          fullWidth
          required
        />
        <TextField
          name="email"
          varient="outlined"
          label="Email"
          value={props.inputs.email}
          style={{ marginTop: "20px", width: "50%", marginRight: "2%" }}
          onChange={props.changefun}

          required
        />


        <FormControl sx={{ marginTop: "20px", width: "48%" }} required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={props.inputs.password}
            onChange={props.changefun}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"

            required
          />
        </FormControl>
        <Grid
          container
          spacing={2}
          style={{ marginTop: 0 }}
          direction="row"
          justifyContent="space-around"
          alignItems="center"

        >

          <Button color="primary" aria-label="upload picture" component="label" sx={{ display: "flex", marginLeft: "auto", color: 'white', backgroundColor: "darkcyan", width: "22%", marginTop: "21px", "&:hover": { backgroundColor: "darkcyan" } }}>

            <input hidden accept="image/*" type="file" onChange={props.onFileUpload} />
            <PhotoCamera style={{ marginRight: "10%" }} />
            Profile Photo
          </Button>

          <TextField
            name="founder"
            varient="outlined"
            label="Founder"

            value={props.inputs.founder}
            sx={{ display: "flex", marginLeft: "auto", width: "47%", marginTop: "20px" }}
            onChange={props.changefun}

            required
          />

        </Grid>




        <TextField
          name="tagline"
          varient="outlined"
          label="Tagline"
          value={props.inputs.tagline}
          style={{ marginTop: "20px" }}
          onChange={props.changefun}
          fullWidth

        />

        <TextField
          name="areaofwork"
          varient="outlined"
          label="Area Of Work"
          value={props.inputs.areaofwork}
          style={{ marginTop: "20px" }}
          onChange={props.changefun}
          fullWidth
          required
        />

        <Grid
          container
          // spacing={2}
          style={{ marginTop: "20px" }}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body2" gutterBottom>*Password must contain atleast one uppercase character,one lowercase character, two digits and one special character, and minimum length of 8 (without containing space).</Typography></Grid>
          <Grid item sx={{ width: "50%" }}>
            <Button onClick={props.nextfun} variant="contained" sx={{ "&:hover": { backgroundColor: "darkcyan" }, width: "50%", marginTop: 1, display: 'flex', marginLeft: "auto", color: 'white', backgroundColor: "darkcyan" }} >
              Next
            </Button></Grid>

        </Grid>



      </form>

      {/* </Paper> */}
    </Grid>
  );
};
export default First;