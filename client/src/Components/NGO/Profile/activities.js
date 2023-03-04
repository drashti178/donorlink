import React from 'react'
// import ActivitiesTable from './ActivitiesTable';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Button, Grid } from '@mui/material';
import EditActivity from './editActivity';
const activities = [
  {
    id: 1,
    name: 'Activity 1',
    description: 'This is activity 1',
    participants: '100',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Activity 2',
    description: 'This is activity 2',
    price: '100',
    image: 'https://via.placeholder.com/150',
  },
 
];


const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '60%',
    height: '240px',
    marginTop:"2%",
    marginLeft:"20%",
    borderRight:"2px solid darkcyan",
    borderBottom:"2px solid darkcyan",
    boxShadow:"3px 4px #888888"
    
  },
  media: {
    width: '40%',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width:"60%",
    backgroundColor:"darkcyan"
  }
});

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const { name, image, description, price } = product;
  const deleteActivity = () =>{
    console.log("activity deleted");

  }


  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="p">
          ${price}
        </Typography>
        <Grid
            container
            spacing={1}
            
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Box sx={{ width: "20%",marginLeft:"0%"}}>
              <EditActivity />
            </Box>
           
            <Button
             type="submit"
             variant="contained"
             onClick={deleteActivity}
             sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', },marginLeft:"1%", marginTop:"1%",width: "20%", backgroundColor: 'darkcyan' ,color:"white" }}
            >
              Delete
            </Button>
            
            </Grid>
      </CardContent>
    </Card>
  );
}
const Activities = () => {
  return (
    <div>
    {activities.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
    </div>
    // <ActivitiesTable Activities={activities}></ActivitiesTable>
  )
}
export default Activities;


