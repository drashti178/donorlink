import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Backdrop, Button, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import base_url from '../../api/bootapi';

const useStyles = makeStyles({
  list: {
    display: "flex",
    flexDirection: " row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"

  },
  root: {
    display: 'flex',
    minWidth: '200px',
    width: '80%',
    height: '10%',
    marginLeft: "auto",
    marginRight:"auto",
    borderRight: "0.5px dashed darkcyan",
    borderBottom: "0.5px dashed darkcyan",
    boxShadow: "-8px -8px 5px #888888"

  },
  media: {

    width: '35%',
    height: '100%',
  },
  typo: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    textAlign:"center",
    margin:"auto",
    fontFamily:"Inter, sans-serif",
    fontSize:"2.5em",
    fontWeight:"600"
  },
  titleFont: {
    fontFamily: 'Dosis, sans-serif;',
  },

});

const CollaborationCard = (props) => {
  const classes = useStyles();

  return (
    <>
      {console.log(props)}
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          image={`/images/ngoprofileImgs/${props.collab.ngo1.profileImgName}`}
        >
        </CardMedia>
        <Typography className={classes.typo} gutterBottom variant="h4">
          {props.collab.ngo1.ngoname} has collaborated with {props.collab.ngo2.ngoname}
        </Typography>
        <CardMedia
          className={classes.media}
          component="img"
          image={`/images/ngoprofileImgs/${props.collab.ngo2.profileImgName}`}
        >
        </CardMedia>
      </Card>
    </>
  );
}

const Collaborations = () => {
  const classes = useStyles();
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${base_url}/home/findApprovedCollab`).then(
      (response) => {
        // console.log(response.data);
        setCollabs(response.data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    )
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {loading === false && (
        collabs.length === 0 ? <Typography variant="h6" gutterBottom style={{ marginTop: "3%", marginLeft: "1%" }}>No Collaboration found!! </Typography> : <>
          <div className="row justify-content-center" style={{ marginTop: "4%", marginBottom: "3%" }}>
            <div className="col-md-7 text-center">
              <h1 className={classes.titleFont}>Collaboration List</h1>
              <p>Below are that ngos' who has collaborated using our platform for various purposes.</p>
            </div>
          </div>
          <Grid
            display="flex"
            spacing={10}
            style={{ backgroundColor: "#efefef", marginBottom: "2%",marginTop:"1%", paddingBottom:"5%"}}
            justifyContent="center"
            alignItems="center"
            container
          >
            {collabs.map((collab, index) => (
              <>
                <Grid sx={{width:"100%"}} item>
                  <CollaborationCard key={collab.reqId} collab={collab} />
                </Grid>
              </>
            ))}
          </Grid>
        </>
      )}
    </>
  )
}

export default Collaborations;