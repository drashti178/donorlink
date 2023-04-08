import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 2,
  },
  paper: {
    padding: 2,
    textAlign: "center",
    color: 'black',
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const ProductDetailsPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <img
              src="https://via.placeholder.com/500x500.png"
              alt="Product"
              className={classes.image}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              Product Title
            </Typography>
            <Typography variant="body1" gutterBottom>
              Product Description
            </Typography>
            <Typography variant="h6" gutterBottom>
              $9.99
            </Typography>
            <Typography variant="body2" color="textSecondary">
              SKU: 1234567890
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetailsPage;
