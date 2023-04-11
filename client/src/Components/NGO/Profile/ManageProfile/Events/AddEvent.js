import React, { useContext, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import dayjs from 'dayjs';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Snackbar, Stack, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import base_url from '../../../../../api/bootapi';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { ActivityContext, EventContext } from '../../../../../Context/UserContext';

const AddRequest = () => {
  
  const context = useContext(ActivityContext);
  const [inputs, setInputs] = useState({
    "eventname": '',
    "venue": '',
    "cause": '',
    "purpose": '',
    "requirement": ''
  })

  const [msg, setMsg] = useState('required');

  const handleToastClick = () => {
    setTOpen(true);
  };

  const [topen, setTOpen] = useState(false);

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setTOpen(false);
  };

  const [tmsg, setTMsg] = useState("");
  // const [severity,setSeverity] = useState("error");
  const [date, setDate] = useState(dayjs('2023-05-30T15:30'));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setInputs("");
    setOpen(false);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.eventname.trim() === '' || inputs.requirement.trim() === '' || inputs.venue.trim() === '' || !date) {
      setMsg('Please fill required field.')
    }
    else {
      const token = "Bearer " + localStorage.getItem("AccessToken");
      inputs.date = date;
      axios.post(`${base_url}/event/add`, inputs, {
        headers: {
          'Authorization': token,
        }
      }).then(
        (response) => {
          console.log(response);
          setTMsg("Event Added Successfully");
          context.setIsAdded(!context.isAdded);
          handleClose();
          handleToastClick();
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={topen} autoHideDuration={4000} onClose={handleToastClose}>
          <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
            {tmsg}
          </Alert>
        </Snackbar>
      </Stack>
      <Button sx={{
        width: "100%", textTransform: "capitalize", backgroundColor: "darkcyan", color: "white", "&:hover": { backgroundColor: "darkcyan", color: 'white', },
        fontSize: "110%"
      }} onClick={handleClickOpen}>Announce Event</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title" sx={{ display: "flex", marginLeft: "auto", color: 'darkcyan', marginRight: "auto", width: "50%" }}>Event Announcement</DialogTitle>
            <p style={{ color: "red" }}>*{msg}</p>
            <TextField
              name="eventname"
              varient="outlined"
              label="Event Name"
              value={inputs.eventname}
              style={{ marginTop: "-3px" }}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="venue"
              varient="outlined"
              label="Venue"
              value={inputs.venue}
              style={{ marginTop: "10px" }}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="cause"
              varient="outlined"
              label="Cause"
              value={inputs.cause}
              style={{ marginTop: "10px" }}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="purpose"
              varient="outlined"
              label="Event Purpode"
              value={inputs.purpose}
              style={{ marginTop: "10px" }}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="requirement"
              varient="outlined"
              label="Requirement"
              value={inputs.requirement}
              style={{ marginTop: "10px" }}
              onChange={handleChange}
              fullWidth
              required
            />

            <LocalizationProvider
              dateAdapter={AdapterDayjs} >
              <DemoContainer components={['DateTimePicker']} required>
                <DateTimePicker
                  label="Date/Time"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}

                />
              </DemoContainer>
            </LocalizationProvider>

            <Grid
              container
              spacing={2}
              style={{ marginTop: "20px" }}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >

              <Button
                onClick={handleClose}
                sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', }, marginLeft: "5%", marginTop: "2%", width: "40%", backgroundColor: 'darkcyan', color: "white" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                sx={{ "&:hover": { backgroundColor: "darkcyan", color: 'white', }, marginLeft: "5%", marginTop: "2%", width: "40%", backgroundColor: 'darkcyan', color: "white" }}
              >
                Add
              </Button>

            </Grid>
          </form>
        </DialogContent>

      </Dialog>
    </>
  );
}
export default AddRequest;