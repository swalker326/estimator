import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from "firebase";
import { Axios, db } from '../server/firestore'
import Submitted from './Submitted';
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
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [displayForm, setDisplayForm] = useState(true);

  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState({});


  const [carYear, setCarYear] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");


  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  const [photos, setPhotos] = useState([]);

  const updatePhotos = (photo) => {
    const newImg = { name: Date.now(), img: photo }
    setPhotos([...photos, newImg]);
    setFormData({ ...formData, photos: photos });
  }

  const updateInput = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const sendEmail = () => {
    Axios.post(
      'https://us-central1-estimator-68282.cloudfunctions.net/sendMessage',
      formData
    )
  }
  const addUser = e => {
    setFormErrors([]);
    e.preventDefault();
    validateForm().then((data) => {
      sendEmail();
      if (formErrors.length > 0) {
        console.log("show Errors"); // eslint-disable-line
      } else {
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
        }).finally(() => {
          setDisplayForm(false);
        })
      }
    })
  };
  const validateForm = async () => {
    await validateNameField('First Name', firstName, setFirstNameError);
    await validateNameField('Last Name', lastName, setLastNameError);
    await validateEmail(email);
    await validateDropdowns();

  }
  const validateNameField = async (fieldName, fieldValue, errorSetter) => {
    if (fieldValue.trim() === '') {
      setFormErrors(...formErrors, `${fieldName} is required`);
      errorSetter(true);
    }
    if (/[^a-zA-Z -]/.test(fieldValue)) {
      setFormErrors(...formErrors, `Invalid caracters in your ${fieldName}`);
      errorSetter(true);
    }
    if (fieldValue.trim().length < 3) {
      setFormErrors(...formErrors, `${fieldName} needs to be at least three characters`);
      errorSetter(true);
    } else errorSetter(false);
  };
  const validateEmail = async emailAddress => {
    if (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailAddress)
    ) setEmailError(false);
    if (emailAddress.trim() === '' || !emailAddress) {
      setFormErrors(...formErrors, `Email is required`);
      setEmailError(true);
    }
    return 'Please enter a valid email';
  };
  const validateDropdowns = async () => {
    const dropdownErrors = []
    if (!carYear) dropdownErrors.push('Please fill out vehicle Year');
    else if (!carMake) dropdownErrors.push('Please fill out vehicle Make');
    else if (!carModel) dropdownErrors.push('Please fill out vehicle Model');
    setFormErrors(...formErrors, dropdownErrors);
  }
  const handleYearChange = (year) => {
    setCarYear(parseInt(year));
    setLoading(true);
    getMakes().then((makes) => {
      setMakeOptions([...makes]);
      hideLoading();
    });
  }
  const handleMakechange = (make) => {
    setCarMake(make);
    setLoading(true);
    getModels(carYear, make).then((models) => {
      setModelOptions([...models]);
      hideLoading();
    });
  }
  const hideLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }


  return (
    <div className={classes.root} >
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {displayForm ?
        <div>
          <form id="EstimateForm" className={classes.form} onSubmit={addUser} noValidate autoComplete="off">
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <div className={classes.headerRow}>
                  <PermContactCalendarRoundedIcon fontSize="large" />
                  <h3>Contact Info</h3>
                </div>
                <TextField name="FirstName" error={firstNameError ? true : false} className={classes.textField} id="outlined-basic" onChange={(e) => { updateInput(e); setFirstName(e.target.value) }} label="First Name" variant="outlined" />
                <TextField name="LastName" error={lastNameError ? true : false} className={classes.textField} id="outlined-basic" onChange={(e) => { updateInput(e); setLastName(e.target.value) }} label="Last Name" variant="outlined" />
                <TextField name="emailAddress" error={emailError ? true : false} className={classes.textField} id="outlined-basic" onChange={(e) => { updateInput(e); setEmail(e.target.value) }} label="Email" variant="outlined" />
              </Grid>
              <Grid item>
                <div className={classes.headerRow}>
                  <DriveEtaRoundedIcon fontSize="large" />
                  <h3>Vehicle Info</h3>
                </div>
                <TextField value={carYear} select name="carYear" onChange={(e) => { updateInput(e); handleYearChange(e.target.value) }} helperText='Select Vehicle Year' className={classes.textField} id="outlined-basic" label="Year" variant="outlined">
                  {Years.years.map((option, index) => <MenuItem style={{ maxHeight: "20px" }} key={index} value={option}>{option}</MenuItem>)}
                </TextField>
                <TextField value={carMake} select name="carMake" disabled={makeOptions.length > 1 ? false : true} onChange={(e) => { updateInput(e); handleMakechange(e.target.value) }} helperText='Select Vehicle Make' className={classes.textField} id="outlined-basic" label="Make" variant="outlined">
                  {makeOptions.map((make, index) => <MenuItem style={{ maxHeight: "20px" }} key={index} value={make}>{make}</MenuItem>)}
                </TextField>
                <TextField value={carModel} select name="carModel" disabled={modelOptions.length > 1 ? false : true} onChange={(e) => { updateInput(e); setCarModel(e.target.value) }} helperText='Select Vehicle Model' className={classes.textField} id="outlined-basic" label="Model" variant="outlined">
                  {modelOptions.map((make, index) => <MenuItem style={{ maxHeight: "20px" }} key={index} value={make}>{make}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid xs={12} item>
                <div className={classes.headerRow}>
                  <PhotoCameraRoundedIcon fontSize="large" />
                  <h3>Photos</h3>
                </div>
              </Grid>
            </Grid>
          </form>
          <div className={classes.vehiclePhotos}>
            <VehiclePhotos photos={photos} onChange={setPhotos} onCapture={updatePhotos} />
          </div>
          <div className={classes.buttonWrapper}>
            <Fab style={{color: 'white', backgroundColor:'black'}} size="large" form="EstimateForm" type="submit" variant="extended" aria-label="add">
              Submit
        </Fab>
          </div>
        </div> : <Submitted />}
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