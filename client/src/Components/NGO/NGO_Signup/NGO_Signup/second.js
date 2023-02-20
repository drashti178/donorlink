import { React } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Button,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import FileUpload from '@mui/icons-material/FileUpload';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

const Second = (props) => {

  const country_list =
    ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

  const ibenabledstyle = {
    marginTop: "4%", width: "25%", marginRight: "2%", color: 'white', backgroundColor: "darkcyan", "&:hover": { backgroundColor: "darkcyan" }
  };
  const ibdisabledstyle = {

    marginTop: "4%", width: "25%", marginRight: "2%", color: 'white', backgroundColor: 'grey', "&:hover": { backgroundColor: "grey" }
  };
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


        <FormControl sx={{ width:"50%",  marginRight:2,marginTop: "25px" }} fullWidth required variant="outlined">
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="country"
            value={props.inputs.country}
            label="Country"
            onChange={props.changefun}
          >
            {country_list.map((country, key) => {
              return <MenuItem value={key + 1}>{country}</MenuItem>
            })};

          </Select>
        </FormControl>
        <TextField
          name="pincode"
          varient="outlined"
          label="Pincode"
          value={props.inputs.pincode}
          style={{ marginTop: "25px", width: "48%" }}
          onChange={props.changefun}

          required
        />
        <TextField
          name="weblink"
          varient="outlined"
          label="Website Link"
          value={props.inputs.weblink}
          style={{ marginTop: "25px", width: "50%", marginRight: "2%" }}
          onChange={props.changefun}
          fullWidth

        />
        <TextField
          name="mobile"
          varient="outlined"
          label="Contact No"
          value={props.inputs.mobile}
          style={{ marginTop: "25px", width: "48%" }}
          onChange={props.changefun}

          required
        />
        <FormControl style={{ marginTop: "3%", width: "50%" }}>
          <FormLabel id="demo-row-radio-buttons-group-label" style={{ display: 'flex' }}> Is 80-G Certified</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="has80G"
            value={props.inputs.has80G}
            onChange={props.changefun}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />

          </RadioGroup>
        </FormControl>

        <Button color="primary" aria-label="upload picture" component="label" style={props.inputs.has80G === 'no' ? ibdisabledstyle : ibenabledstyle} disabled={props.inputs.has80G === 'no'}>
          <input hidden accept="image/*" type="file" onChange={props.onFileUpload} />
          <FileUpload />
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

          <Button onClick={props.prevfun} variant="contained" sx={{
            "&:hover": { backgroundColor: "darkcyan" }, width: "20%",
            marginRight: "28%", marginLeft: "2%", marginTop: 1, align: "center", color: 'white', backgroundColor: "darkcyan"
          }} >
            Prev
          </Button>

          <Button onClick={props.nextfun} variant="contained" sx={{
            "&:hover": { backgroundColor: "darkcyan" }, width: "20%",
            marginLeft: "30%", marginTop: 1, align: "center", color: 'white', backgroundColor: "darkcyan"
          }} >
            Next
          </Button>

        </Grid>



      </form>

    </Grid>
  );
};
export default Second;