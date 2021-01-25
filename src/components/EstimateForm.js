import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import firebase from "firebase";
// eslint-disable-next-line no-unused-vars
import firestore from '../server/firestore';
import { getMakes, getModels } from '../server/carData';
import { Grid, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import PermContactCalendarRoundedIcon from '@material-ui/icons/PermContactCalendarRounded';
import VehiclePhotos from './VehiclePhotos';

import Years from '../years.json'

const EstimateForm = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  
  const [carYear, setCarYear] = useState(undefined);
  const [carMake, setCarMake] = useState(undefined);
  const [carModel, setCarModel] = useState(undefined);
  
  
  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  
  const [photos, setPhotos] = useState([]);
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
      images: photos,
      carYear,
      carMake,
      carModel,
    });
  };
  const handleYearChange = (year) => {
    setCarYear(parseInt(year));
    getMakes().then((makes) => setMakeOptions([...makes])); // eslint-disable-line)
  }
  const handleMakechange = (make) => {
    setCarMake(make);
    getModels(carYear,make).then((models) => {
      setModelOptions([...models])
    })
  }

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
            <TextField select onChange={(e) => handleYearChange(e.target.value)} helperText='Select Vehicle Year' className={classes.textField} id="outlined-basic" label="Year" variant="outlined">
              {Years.years.map((option, index) => <MenuItem style={{ maxHeight: "20px" }} key={index} value={option}>{option}</MenuItem>)}
            </TextField>
            <TextField select onChange ={(e) => handleMakechange(e.target.value)} helperText='Select Vehicle Make' className={classes.textField} id="outlined-basic" label="Make" variant="outlined">
              {makeOptions.map((make, index) => <MenuItem style={{ maxHeight: "20px" }} key={index} value={make}>{make}</MenuItem>)}
            </TextField>
            <TextField select onChange ={(e) => setCarModel(e.target.value)} helperText='Select Vehicle Model' className={classes.textField} id="outlined-basic" label="Model" variant="outlined">
              {modelOptions.map((make, index) => <MenuItem style={{ maxHeight: "20px" }} key={index} value={make}>{make}</MenuItem>)}
            </TextField>
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
    display: 'flex',
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