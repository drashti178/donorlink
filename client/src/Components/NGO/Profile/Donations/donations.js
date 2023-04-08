import React, { useEffect, useState } from 'react'
import base_url from '../../../../api/bootapi';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Typography } from '@mui/material';
import DonationRow from './DonationRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Donations = () => {

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const token = "Bearer " + localStorage.getItem("AccessToken");
    axios.get(`${base_url}/donation/getAllByNgo`, {
      headers: {
        "Authorization": token,
      }
    }).then(
      (response) => {
        console.log(response);
        setDonations(response.data);
      },
      (error) => {
        console.log(error);
      }
    )
  }, [])

  return (
    <>
      {
        (donations.length == 0) ? <Typography variant="h6" gutterBottom style={{ marginTop: "3%", marginLeft: "1%" }}>Donation History not found!! </Typography> :
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, marginTop:"5%",}} aria-label="customized table">
              <TableHead >
                <TableRow >
                  <StyledTableCell >Donation Id</StyledTableCell>
                  <StyledTableCell align="center">Donor Name</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                  <StyledTableCell align="center">Date & Time</StyledTableCell>
                  <StyledTableCell align="center">Tax Deduction Certificate</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations.map((donation,index) => (
                  <DonationRow donation={donation} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      }
    </>
  )
}
export default Donations;
