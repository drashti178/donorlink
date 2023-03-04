import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@mui/material';
const ngos = [
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
    list:{
        display: "flex",
    flexDirection:" row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
       
    },
  root: {
    display: 'flex',
    minWidth:'200px',
    width: '20%',
    height: '210px',
    marginTop:"2%",
    marginLeft:"2%",
    borderRight:"2px solid darkcyan",
    borderBottom:"2px solid darkcyan",
    boxShadow:"3px 4px #888888"
    
  },
  media: {
   
    width: '100%',
    height: '100%',
  },
  
});

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const { name, image, description, price } = product;

  return (
    <>
    
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
        ><Typography gutterBottom variant="h6" sx={{display:"flex",
        flexDirection: "row-reverse"}}>
        {name}
      </Typography>
      </CardMedia>
      
     
    </Card>
   
    </>
  );
}

const Ngos = () => {
    const classes = useStyles();
  return (
   <>
   <div className={classes.list}>
    {ngos.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
    </div>
    </>
  )
}

export default Ngos;