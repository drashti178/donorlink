import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import base_url from '../../api/bootapi';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../Context/UserContext';
import { Backdrop, Box, Button, CircularProgress, Paper, Snackbar, Stack } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Tab, Typography } from '@material-ui/core';
import List from './List';
import ActivitiesList from './activitiesList';
import ActivityCard from './ActivityCard';
import FundraiserCard from './FundraiserCard';
import MuiAlert from '@mui/material/Alert';


const useStyles = makeStyles({
  fund: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "4%"
  },
  act: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",

    overflowX: "auto",
    marginBlock: "8%"

  },
  root: {
    flexGrow: 1,
    backgroundColor: "#efefef"
  },
  paper: {
    padding: 0,
    margin: 0,
    marginBottom: "3%",
    borderRadius: 0,
  },
  image: {
    alignContent: "center",
    width: "40%",
    marginInline: "5%",
    marginBlock: "1%",
    objectFit: "cover",
    border: "solid white"
  },

  second: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },

  img: {

    objectFit: "cover",
    width: "100%"

  },
  details: {
    backgroundColor: "#075456",
    width: "100%"

  },
  font: {
    fontFamily: 'Inter, sans-serif'
  }
})

const useStyles1 = makeStyles({
  titleFont: {
    fontFamily: 'Dosis, sans-serif;',
  },
});

const NgoPage = () => {
  const classes = useStyles();
  const location = useLocation();

  const id = location.state;
  // console.log(id);
  const [ngo, setNgo] = useState({});
  const [activities, setActivities] = useState([]);
  const [fundraisers, setFundraisers] = useState([]);
  const sty = useStyles1();
  const context = useContext(UserContext);
  const [login, setLogin] = useState();
  const [requested, setRequested] = useState(false);
  const [buttonmsg, setButtonMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [cols, setCols] = useState([]);
  const country_list =
    ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

  const [msg, setMsg] = useState("");

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (context.user == null && localStorage.getItem("AccessToken") != null) {
    setLogin(true);
    const token = "Bearer " + localStorage.getItem("AccessToken");
    axios.get(`${base_url}/user/profile`, {
      headers: {
        'Authorization': token,
      }
    }).then(
      (response) => {
        console.log(response.data);
        setLogin(true);
        context.setUser(response.data);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  const navigate = useNavigate();


  useEffect(() => {
    setTimeout(() => {
      if (context.user) {
        setLogin(true);
        localStorage.setItem("role", context.user.role);
      }
    }, 100);
  }, [context.user]);

  const DonateToNgo = () => {
    navigate("/user/payment", { state: id })
  }

  useEffect(() => {
    axios.get(`${base_url}/home/getngoById/${id}`).then(
      (response) => {
        console.log(response.data);
        setNgo(response.data);
      },
      (error) => {
        console.log(error);
        console.log("Error");
      }
    )
    axios.get(`${base_url}/home/activities/${id}`).then(
      (response) => {
        console.log(response.data);
        setActivities(response.data);
      },
      (error) => {
        console.log(error);
        console.log("Error");
      }
    )
    axios.get(`${base_url}/home/fundrisers/${id}`).then(
      (response) => {
        console.log(response.data);
        setFundraisers(response.data);
        setTimeout(() => {
          setLoading(false);
        },1000)
      },
      (error) => {
        console.log(error);
        console.log("Error");
      }
    )

  }, [id]);

  useEffect(() => {
    if (localStorage.getItem("role") === "ngo") {
      const token = "Bearer " + localStorage.getItem("AccessToken");
      axios.get(`${base_url}/ngo/findAllCollab`, {
        headers: {
          'Authorization': token
        }
      }).then(
        (res) => {
          
          setLoading(false);
         
          if (res.data.filter(e => (e.ngo1.ngoId === ngo.ngoId) && (e.ngo2.ngoId === context.user.ngoId) && (e.approved)).length > 0) {
            setRequested(true);
            setButtonMsg("Collaborated Ngo");
          }
          else if (res.data.filter(e => (e.ngo2.ngoId === ngo.ngoId) && (e.ngo1.ngoId === context.user.ngoId) && (e.approved)).length > 0) {
            setRequested(true);
            setButtonMsg("Collaborated Ngo");
          }
          else if (res.data.filter(e => ((e.ngo1.ngoId === ngo.ngoId) && (e.ngo2.ngoId === context.user.ngoId) && (!e.approved))).length > 0) {
            setRequested(true);
            setButtonMsg("Collaboration request pending");
          }
          else if (res.data.filter(e => ((e.ngo2.ngoId === ngo.ngoId) && (e.ngo1.ngoId === context.user.ngoId) && (!e.approved))).length > 0) {
            setRequested(true);
            setButtonMsg("Ngo has sended Collaboration request.")
          }
          else{
            setButtonMsg("Collaborate");
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }, [ngo.ngoname]);

  const onCollaborate = (ngoId) => {
    const token = 'Bearer ' + localStorage.getItem("AccessToken");
    axios.put(`${base_url}/ngo/addRequest/${ngoId}`, {}, {
      headers: {
        'Authorization': token,
      }
    }).then(
      (response) => {
        console.log(response);
        setButtonMsg("Requested");
        setSeverity("success");
        setMsg(response.data);
        setRequested(true);
        handleClick();
      },
      (error) => {
        console.log(error);
        setSeverity("error");
        setMsg(error.response.data);
        handleClick();
      },
    )
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!loading && <>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
              {msg}
            </Alert>
          </Snackbar>
        </Stack>
        <div className={classes.root}>
          <Grid container xs={12} md={12} style={{ backgroundColor: "#efefef" }}>
            <Grid xs={12} md={12} >
              <Typography variant="h3" style={{ height: "10%", backgroundColor: "#075456", color: "white", textAlign: "center", border: "solid", marginBottom: "5%", boxShadow: "1px 1px 7px black", fontFamily: "Merriweather, serif", textShadow: "1px 1px 5px black" }}>
                {ngo.ngoname}
              </Typography>
              <Paper className={classes.paper} elevation={10} style={{ backgroundColor: "white", margin: "3%",paddingBottom:"1.5%" }}>

                <div style={{ display: "flex", flexDirection: 'row', marginTop: "3%", position: "relative" }}>
                  <img
                    src={`/images/ngoprofileImgs/${ngo.profileImgName}`}
                    alt="Product"
                    className={classes.image}
                  />
                  <div style={{ width: "50%" }}>

                    <Typography className={classes.font} variant="h6" style={{ color: "black", textAlign: "center", borderBottom: "groove", marginTop: "12%", fontSize: "2rem", fontFamily: 'Inter, sans-serif' }}>Tagline : {ngo.tagline}<br />
                    </Typography>
                    <Typography variant="body1" className={classes.font} style={{ color: "black", textAlign: "left", borderBottom: "groove", fontSize: "1.5rem" }} gutterBottom>
                      Founder :{ngo.founder} <br /> Area of Work : {ngo.areaofwork}<br />
                    </Typography>
                    <Typography variant="body1" className={classes.font} style={{ color: "black", textAlign: "left", borderBottom: "groove", fontSize: "1.5rem" }}>Website : <Link>{ngo.weblink}</Link>
                      <br />
                      Email : {ngo.email}<br />

                      Contact No : {ngo.mobile}<br />
                    </Typography>
                    <Typography variant="body1" className={classes.font} style={{ color: "black", textAlign: "left", fontSize: "1.5rem" }}>
                      Address : {ngo.address}<br />
                      Country : {country_list[ngo.country]}<br />
                    </Typography>
                    {(!login || (login && localStorage.getItem("role") === "user")) ?
                      <Box sx={{ flexGrow: 1, display: 'flex', mt: "5%", marginLeft: "31%" }}>
                        <Button variant="contained" style={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, width: "50%", backgroundColor: '#075456', marginRight: "3%" }} onClick={DonateToNgo}>Donate</Button>
                      </Box> :
                      <Box sx={{ flexGrow: 1, display: 'flex', mt: "5%", marginLeft: "31%" }}>
                        <Button variant="contained" sx={{ "&:hover": { backgroundColor: '#075456', color: 'white', }, width: "50%", backgroundColor: '#075456' }} disabled={requested} onClick={() => onCollaborate(ngo.ngoId)}>{buttonmsg}</Button>
                      </Box>}
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <Box style={{backgroundColor:"#c4cccc",height:"4px",width:"60%",marginInline:"20%",marginBlock:"1%"}}></Box>

        {activities.length > 0 && <div className={classes.second}>
          <div className="row justify-content-center" style={{ marginTop: "5%" }}>
            <div className="col-md-7 text-center">
              <h1 className={sty.titleFont}>Activities</h1>
              <p>Below are activities running by this NGO. Have a look on these and understand the work done by this NGO.</p>
            </div>
          </div>

          <Box className={classes.act}>
            {activities.map((product) => (
              <ActivityCard key={product.a_id} activity={product} />

            ))}
          </Box>
        </div>}
        <Box style={{backgroundColor:"#c4cccc",height:"4px",width:"60%",marginInline:"20%",marginBlock:"1%"}}></Box>

        {fundraisers.length > 0 && <div className={classes.fund}>
          <div className="row justify-content-center" style={{ marginTop: "5%" }}>
            <div className="col-md-7 text-center">
              <h1 className={sty.titleFont}>Fundraisers</h1>
              <p>Below are funraisers started by this NGOs.</p>
            </div>
          </div>
          {fundraisers.map((product) => (
            <FundraiserCard key={product.fun_id} fundraiser={product} />
          ))}
        </div>} </>}
    </>



  )
}

export default NgoPage