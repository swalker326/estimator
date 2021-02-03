import React, { useState, useEffect } from "react";
import { Axios, db } from "../server/firestore";
import Submitted from "./Submitted";
import { getMakes, getModels } from "../server/carData";
import {
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Backdrop,
  makeStyles,
  Fab,
} from "@material-ui/core";
import Years from "../years.json";

// Icons
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import DriveEtaRoundedIcon from "@material-ui/icons/DriveEtaRounded";
import PermContactCalendarRoundedIcon from "@material-ui/icons/PermContactCalendarRounded";

//Local Imports
import VehiclePhotos from "./VehiclePhotos";

const EstimateForm = () => {
  const classes = useStyles();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState(true);
  const [formData, setFormData] = useState({});
  const [carYear, setCarYear] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setFormData({
      ...formData,
      photos: [...photos],
    });
  }, [photos]);

  const updatePhotos = (newPhotos) => {
    setPhotos((photos) => {
      setFormData({
        ...formData,
        photos: [...photos, ...newPhotos],
      });
      return [...photos, ...newPhotos];
    });
    setTimeout(() => setLoading(false), 1000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const sendEmail = () => {
    Axios.post(
      "https://us-central1-estimator-68282.cloudfunctions.net/sendMessage",
      formData
    );
  };
  const addUser = (e) => {
    e.preventDefault();
    sendEmail();
    db.settings({
      timestampsInSnapshots: true,
    });
    // eslint-disable-next-line no-unused-vars
    const userRef = db
      .collection("requested")
      .add({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.emailAddress,
        images: photos,
        carYear,
        carMake,
        carModel,
      })
      .finally(() => {
        setDisplayForm(false);
      });
  };
  const handleYearChange = (year) => {
    setCarYear(parseInt(year));
    setLoading(true);
    getMakes().then((makes) => {
      setMakeOptions([...makes]);
      hideLoading();
    });
  };
  const validateField = (e) => {
    const name = e.target.name;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (e.target.value < 2) {
      setErrors(errors => [...errors, name])
    } else setErrors(errors.filter((errorName) => errorName !== name ))
    if (name === 'emailAddress' && !emailRegex.test(e.target.value)) {
      setErrors(errors => [...errors, name])
    } else setErrors(errors.filter((errorName) => errorName !== name ))
  };
  const handleMakechange = (make) => {
    setCarMake(make);
    setLoading(true);
    getModels(carYear, make).then((models) => {
      setModelOptions([...models]);
      hideLoading();
    });
  };
  const hideLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress className={classes.loadingIcon} />
      </Backdrop>
      {displayForm ? (
        <div>
          <form
            id="EstimateForm"
            className={classes.form}
            onSubmit={addUser}
            noValidate
            autoComplete="off"
          >
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <div className={classes.headerRow}>
                  <PermContactCalendarRoundedIcon fontSize="large" />
                  <h3>Contact Info</h3>
                </div>
                <TextField
                  name="firstName"
                  className={classes.textField}
                  id="outlined-basic"
                  error={errors.includes('firstName')}
                  onBlur={(e) => validateField(e)}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  label="First Name"
                  variant="outlined"
                />
                <TextField
                  name="lastName"
                  className={classes.textField}
                  id="outlined-basic"
                  error={errors.includes('lastName')}
                  onBlur={(e) => validateField(e)}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  label="Last Name"
                  variant="outlined"
                />
                <TextField
                  name="emailAddress"
                  className={classes.textField}
                  id="outlined-basic"
                  error={errors.includes('emailAddress')}
                  onBlur={(e) => validateField(e)}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  label="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <div className={classes.headerRow}>
                  <DriveEtaRoundedIcon fontSize="large" />
                  <h3>Vehicle Info</h3>
                </div>
                <TextField
                  value={carYear}
                  select
                  name="carYear"
                  error={errors.includes('carYear')}
                  onBlur={(e) => validateField(e)}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleYearChange(e.target.value);
                  }}
                  helperText="Select Vehicle Year"
                  className={classes.textField}
                  id="outlined-basic"
                  label="Year"
                  variant="outlined"
                >
                  {Years.years.map((option, index) => (
                    <MenuItem
                      style={{ maxHeight: "20px" }}
                      key={index}
                      value={option}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  value={carMake}
                  select
                  name="carMake"
                  disabled={makeOptions.length > 1 ? false : true}
                  error={errors.includes('carMake')}
                  onBlur={(e) => validateField(e)}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleMakechange(e.target.value);
                  }}
                  helperText="Select Vehicle Make"
                  className={classes.textField}
                  id="outlined-basic"
                  label="Make"
                  variant="outlined"
                >
                  {makeOptions.map((make, index) => (
                    <MenuItem
                      style={{ maxHeight: "20px" }}
                      key={index}
                      value={make}
                    >
                      {make}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  value={carModel}
                  select
                  name="carModel"
                  disabled={modelOptions.length > 1 ? false : true}
                  error={errors.includes('carModel')}
                  onBlur={(e) => validateField(e)}
                  onChange={(e) => {
                    handleInputChange(e);
                    setCarModel(e.target.value);
                  }}
                  helperText="Select Vehicle Model"
                  className={classes.textField}
                  id="outlined-basic"
                  label="Model"
                  variant="outlined"
                >
                  {modelOptions.map((make, index) => (
                    <MenuItem
                      style={{ maxHeight: "20px" }}
                      key={index}
                      value={make}
                    >
                      {make}
                    </MenuItem>
                  ))}
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
            <VehiclePhotos
              loading={setLoading}
              photos={photos}
              onPhotoChange={setPhotos}
              onCapture={updatePhotos}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <Fab
              style={{ color: "white", backgroundColor: "black" }}
              size="large"
              form="EstimateForm"
              type="submit"
              variant="extended"
              aria-label="add"
            >
              Submit
            </Fab>
          </div>
        </div>
      ) : (
        <Submitted />
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  loadingIcon: {
    color: "white",
  },
  backdrop: {
    zIndex: 100,
  },
  form: {
    marginLeft: theme.spacing(6),
    marginTop: theme.spacing(6),
  },
  vehiclePhotos: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: "25ch",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
  },
  buttonWrapper: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    display: "flex",
    width: "100%",
    paddingRight: "4%",
    marginBottom: "4%",
    justifyContent: "flex-end",
  },
}));

export default EstimateForm;
