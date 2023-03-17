import { React, useState } from "react";
import {
    Grid,
    TextField,
    FormControl,
    FormControlLabel,
    Radio,
    FormLabel,
    RadioGroup,
    Button,
    Select,
    MenuItem
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FileInput from "./FileInput";



const First = (props) => {
    let [showPassword, setShowPassword] = useState(false);
    const country_list =
        ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword,
        );
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <Grid >

            <form>
                <FileInput nextfun={props.nextFun} changefun={props.changefun} inputs={props.inputs} onFileUpload={props.onFileUpload} profile={props.profile} imageUrl={props.imageUrl}  />
                <TextField
                    name="name"
                    varient="outlined"
                    label="Name"
                    value={props.inputs.name}
                    style={{ marginTop: "4%",width: "48%",marginRight:"2%"}}
                    onChange={props.changefun}
                    fullWidth
                    required
                />
                <TextField
                    name="username"
                    varient="outlined"
                    label="Username"
                    value={props.inputs.username}
                    style={{ marginTop: "4%",width: "48%",marginRight:"2%" }}
                    onChange={props.changefun}
                    fullWidth
                    required
                />
                <TextField
                    name="email"
                    varient="outlined"
                    label="Email"
                    value={props.inputs.email}
                    style={{ marginTop: "2%",width: "48%",marginRight:"2%" }}
                    onChange={props.changefun}
                    fullWidth
                    required
                />


                <FormControl  style={{ marginTop: "2%",width: "48%",marginRight:"2%" }} fullWidth required variant="outlined">
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
                    />
                </FormControl>
                <FormControl style={{ marginTop: "2%",width: "48%",marginRight:"2%" }} fullWidth required variant="outlined">
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
                    name="contactno"
                    varient="outlined"
                    label="Contact No"
                    value={props.inputs.contactno}
                    style={{ marginTop: "2%",width: "48%",marginRight:"2%" }}
                    onChange={props.changefun}
                    fullWidth
                    required
                />
                <TextField
                    name="adharno"
                    varient="outlined"
                    label="Adhar No"
                    value={props.inputs.adharno}
                    style={{ marginTop: "2%",width: "48%",marginRight:"2%" }}
                    onChange={props.changefun}
                    fullWidth
                    required
                />
                <TextField
                    name="profession"
                    varient="outlined"
                    label="Profession"
                    value={props.inputs.profession}
                    style={{ marginTop: "2%",width: "48%",marginRight:"2%" }}
                    onChange={props.changefun}
                    fullWidth
                    required
                />
                <FormControl sx={{ marginTop: "20px" }} fullWidth required variant="outlined">
                    <FormLabel sx={{display: 'flex',position:"absolute", marginRight: "auto",marginTop:1}} id="demo-row-radio-buttons-group-label">Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="type"
                        value={props.inputs.type}
                        onChange={props.changefun}
                    >
                        <FormControlLabel name = "type" sx={{marginLeft:7}} value="individual" control={<Radio />} label="Individual" />
                        <FormControlLabel name="type" value="company" control={<Radio />} label="Company" />
                    </RadioGroup>
                </FormControl>
               


                <Grid
                    container
                    spacing={2}
                    style={{ marginTop: "20px" }}
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                >

                </Grid>

                <Button onClick={props.nextfun} variant="contained" sx={{ "&:hover": { backgroundColor: "#9C7875" }, width: "20%", display: 'flex', marginLeft: "auto", color: 'white', backgroundColor: '#9C7875' }} >
                    Next
                </Button>



            </form>
        </Grid>
    );
};
export default First;
