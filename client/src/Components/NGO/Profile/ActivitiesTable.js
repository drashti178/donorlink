import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  large: {
    width: 100,
    height: 100,
  },
});

const ActivitiesTable = ({ Activities }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Activities.map((Activity) => (
                <TableRow key={Activity.id}>
                  <TableCell>
                    <Avatar alt={Activity.name} src={Activity.image} className={classes.large} />
                  </TableCell>
                  <TableCell>{Activity.name}</TableCell>
                  <TableCell>{Activity.description}</TableCell>
                  <TableCell>{Activity.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ActivitiesTable;
