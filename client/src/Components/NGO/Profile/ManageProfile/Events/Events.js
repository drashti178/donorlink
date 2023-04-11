import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import { ActivityContext, EventContext, UserContext } from '../../../../../Context/UserContext';
import { Grid } from '@mui/material';
import base_url from '../../../../../api/bootapi';

const Events = () => {

  const [events, setEvents] = useState([]);
  
  const { isAdded,setIsAdded } = useContext(ActivityContext);
  const useStyles = makeStyles({
    titleFont: {
      fontFamily: 'Dosis, sans-serif;',
    },
  });
  const context = useContext(UserContext);
  useEffect(() => {
    const token = "Bearer " + localStorage.getItem("AccessToken");
    console.log(context.user);
    axios.get(`${base_url}/event/getAllByNgo`, {
      headers: {
        'Authorization': token
      }
    }).then(
      (response) => {
        console.log(response);
        setEvents(response.data);
      },
      (error) => {
        console.log(error);
      }
    )
  }, [isAdded]);

  const sty = useStyles();

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    const changeFormat = (date) => {
      const d = new Date(date);
      return (d.toUTCString()).split("GMT");
    }

    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="center">{row.event_id}</TableCell>
          <TableCell align="center">{row.eventname}</TableCell>
          <TableCell align="center">{changeFormat((row.date).split('.')[0])}</TableCell>
          <TableCell align="center">{row.venue}</TableCell>
          <TableCell align="center">{row.donors.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {row.donors.length === 0 ? <Typography variant="h6" gutterBottom style={{ marginTop: "3%", marginLeft: "1%" }}>No Volunteers found!!</Typography> : <>
                  <Typography variant="h6" gutterBottom component="div">
                    Volunteers List
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" sx={{ fontFamily: 'Inter, sans-serif;' }}>Donor Name</TableCell>
                        <TableCell align="center" sx={{ fontFamily: 'Inter, sans-serif;' }}>Email</TableCell>
                        <TableCell align="center" sx={{ fontFamily: 'Inter, sans-serif;' }}>Contact no</TableCell>
                        <TableCell align="center" sx={{ fontFamily: 'Inter, sans-serif;' }}>Total Donation amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.donors.map((donor, index) => (
                        <TableRow key={donor.id}>
                          <TableCell component="th" scope="row" align="center">{donor.name}</TableCell>
                          <TableCell align="center">{donor.email}</TableCell>
                          <TableCell align="center">{donor.contactno}</TableCell>
                          <TableCell align="center">{donor.totaldonation}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
                }
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }


  return (
    <>{
      (events.length == 0) ? <Typography variant="h6" gutterBottom style={{ marginTop: "3%", marginLeft: "19%" }}>Events not found!! </Typography> : <>

        <div className="row justify-content-center" style={{  marginTop: "3%", marginBottom: "3%" }}>
          <div className="col-md-7 text-center">
            <h1 className={sty.titleFont}>Your Events list</h1>
            <p>Have a look on your events and list of volunteers.</p>
          </div>
        </div>
        <Grid display="flex"
          spacing={2}
          style={{ backgroundColor: "#efefef", marginBottom: "2%", padding: "3%" }}
          justifyContent="center"
          container>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center" sx={{ fontFamily: 'Inter, sans-serif;' }}>Event ID</TableCell>
                  <TableCell align="center" sx={{ fontFamily: 'Inter, sans-serif;' }}>Name</TableCell>
                  <TableCell align="center" sx={{ fontFamily: 'Inter, sans-serif;' }}>Date of event</TableCell>
                  <TableCell align="center" sx={{ fontFamily: 'Inter, sans-serif;' }}>Venue</TableCell>
                  <TableCell align="center" sx={{ fontFamily: 'Inter, sans-serif;' }}>Volunteers Strength</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event, index) => (
                  <Row key={event.id} row={event} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid></>}
    </>
  )
}
export default Events;
