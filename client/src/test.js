import React from "react";
import { makeStyles } from '@mui/styles';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "center",
    // color: theme.palette.text.secondary,
  },
  header: {
    // padding: theme.spacing(2),
    textAlign: "center",
    // color: theme.palette.text.primary,
    // backgroundColor: theme.palette.primary.light,
  },
}));

export default function HomePageUI() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.header}>
            <Typography variant="h4">Welcome to Home Page</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Section 1</Typography>
            <Typography>Content of section 1</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Section 2</Typography>
            <Typography>Content of section 2</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Section 3</Typography>
            <Typography>Content of section 3</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Section 4</Typography>
            <Typography>Content of section 4</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
