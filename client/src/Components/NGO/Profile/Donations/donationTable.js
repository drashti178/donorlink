import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  large: {
    width: 100,
    height: 100,
  },
});

const DonationTable = ({ Donations }) => {
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
              {Donations.map((donation) => (
                <TableRow key={donation.id}>
                  
                  <TableCell>{donation.name}</TableCell>
                  <TableCell>{donation.description}</TableCell>
                  <TableCell>{donation.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default DonationTable;
