import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
  
root: {
  
  width:'340px',
  marginTop:"2%",
  marginLeft:"2%",
  
},
media: {
   
 
  height: "240px",
},


});

export default function Ngocard({ product }) {
  const navigate = useNavigate();
  
  const classes = useStyles();
  const { ngoId, ngoname, profileImgName, tagline } = product;
  const profilePath = "/images/ngoprofileImgs/";
  return (
    <Card sx={{ maxWidth: 345 }} className={classes.root}>
      <CardMedia
        className={classes.media}
        component="img"
        alt="green iguana"
        height="140"
        image={profilePath + profileImgName}
      />
      <div style={{ display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <CardContent sx={{padding:"6px"}}>
        <Typography gutterBottom variant="h5" component="div">
        {ngoname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {tagline}
        </Typography>
        
      </CardContent>
      <CardActions >
        <Button sx={{backgroundColor:"#075456",color:"white","&:hover": { backgroundColor: "darkcyan", color: 'white', },flexGrow:1}} onClick={() => {
          //  localStorage.setItem("ngoId",ngoId);
           console.log("clicked");
                    setTimeout(() => {
                      navigate('/ngopage',{state:ngoId});
                    }, 100);}}>
        View</Button>
       
      </CardActions>
      </div>
      
      
    </Card>
  );
}