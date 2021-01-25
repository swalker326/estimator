import React, { useState} from 'react';
import Fab from '@material-ui/core/Fab';
import firebase from "firebase";
// eslint-disable-next-line no-unused-vars
import firestore from '../server/firestore';
import { Grid, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import PermContactCalendarRoundedIcon from '@material-ui/icons/PermContactCalendarRounded';
import VehiclePhotos from './VehiclePhotos';

const EstimateForm = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photos, setPhotos] = useState([
    {
      name: 'photo1',
      img: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
  ]);

  const updatePhotos = (photo) => {
    const newImg = { name: Date.now(), img: URL.createObjectURL(photo) }
    setPhotos([...photos, newImg]);
    console.log("photos", photos); // eslint-disable-line
  }

  const addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    // eslint-disable-next-line no-unused-vars
    const userRef = db.collection("requested").add({
      first_name: firstName,
      last_name: lastName,
      email,
      images: photos
    });
  };

  // const [displayCamera, setDisplayCamera] = useState(false);

  return (
    <div className={classes.root} >
      <form id="EstimateForm" className={classes.form} onSubmit={addUser} noValidate autoComplete="off">
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <div className={classes.headerRow}>
              <PermContactCalendarRoundedIcon fontSize="large" color="primary" />
              <h3>Contact Info</h3>
            </div>
            <TextField className={classes.textField} id="outlined-basic" onChange={(e) => setFirstName(e.target.value)} label="First Name" variant="outlined" />
            <TextField className={classes.textField} id="outlined-basic" onChange={(e) => setLastName(e.target.value)} label="Last Name" variant="outlined" />
            <TextField className={classes.textField} id="outlined-basic" onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" />
          </Grid>
          <Grid item>
            <div className={classes.headerRow}>
              <DriveEtaRoundedIcon fontSize="large" color="primary" />
              <h3>Vehicle Info</h3>
            </div>
            <TextField className={classes.textField} id="outlined-basic" label="Make" variant="outlined" />
            <TextField className={classes.textField} id="outlined-basic" label="Model" variant="outlined" />
            <TextField className={classes.textField} id="outlined-basic" label="Color" variant="outlined" />
          </Grid>
          <Grid xs={3} item>
            <div className={classes.headerRow}>
              <PhotoCameraRoundedIcon fontSize="large" color="primary" />
              <h3>Photos</h3>
            </div>
          </Grid>
        </Grid>
      </form>
      <div className={classes.vehiclePhotos}>
        <VehiclePhotos photos={photos} onChange={setPhotos} onCapture={updatePhotos} />
      </div>
      <div className={classes.buttonWrapper}>
        <Fab color="primary" size="large" form="EstimateForm" type="submit" variant="extended" aria-label="add">
          Submit
        </Fab>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  form: {
    marginLeft: theme.spacing(6),
    marginTop: theme.spacing(6),
  },
  vehiclePhotos: {
    // margin: '0 3rem',
    display:'flex',
    width: '100%',
    justifyContent: 'center',
  },
  // floatingButton: {
  //   margin: 0,
  //   top: 'auto',
  //   right: 20,
  //   bottom: 20,
  //   left: 'auto',
  //   position: 'fixed',
  // },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: '25ch',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonWrapper: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    display: 'flex',
    width: '100%',
    paddingRight: '4%',
    marginBottom: '4%',
    justifyContent: 'flex-end'
  },
}));

export default EstimateForm