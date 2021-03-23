import React, { useState, useEffect, useRef } from "react";
import { Axios, db } from "../server/firestore";
import Submitted from "./Submitted";
import { getMakes, getModels } from "../server/carData";
import SelectedImage from "./SelectedImage";
import {
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Backdrop,
  makeStyles,
  Fab,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Years from "../years.json";

// Icons
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import DriveEtaRoundedIcon from "@material-ui/icons/DriveEtaRounded";
import PermContactCalendarRoundedIcon from "@material-ui/icons/PermContactCalendarRounded";

//Local Imports
import VehiclePhotos from "./VehiclePhotos";
import Banner from "./Banner";

const EstimateForm = () => {
  const classes = useStyles();

  const formRef = useRef(null);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailAddressRef = useRef(null);
  const carYearRef = useRef(null);
  const carMakeRef = useRef(null);
  const carModelRef = useRef(null);
  const refs = [
    firstNameRef,
    lastNameRef,
    emailAddressRef,
    carYearRef,
    carMakeRef,
    carModelRef,
  ];

  const paramData = useParams();
  const shopId = paramData.shop_id;
  const [shopData, setShopData] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [blankForm, setBlankForm] = useState(true);
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

  useEffect(() => {
    if (shopId) getShopData();
  }, []);

  const getShopData = () => {
    db.collection("shops")
      .doc(shopId)
      .get()
      .then((doc) => {
        setShopData(doc.data());
      })
      .catch((err) => console.error(err));
  };
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
  const sendEmail = () => {
    Axios.post(
      "https://us-central1-estimator-68282.cloudfunctions.net/sendMessage",
      { ...formData, shop_email: shopData.shop_email }
    );
  };
  const addUser = () => {
    sendEmail();
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
        shopID: shopId,
      })
      .finally(() => {
        setDisplayForm(false);
      });
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

  const validateField = (e, email) => {
    const name = e.name;
    const value = e.value;
    setBlankForm(false);
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (value < 2) {
      setErrors((errors) => [...errors, name]);
    } else if (email) {
      !emailRegex.test(value)
        ? setErrors((errors) => [...errors, name])
        : setErrors(errors.filter((errorName) => errorName !== name));
    } else {
      setErrors(errors.filter((errorName) => errorName !== name));
    }
  };
  const handleMakechange = (make) => {
    setCarMake(make);
    setLoading(true);
    getModels(carYear, make).then((models) => {
      setModelOptions([...models]);
      hideLoading();
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    refs.forEach((field) => {
      validateField(field.current.querySelector("input"));
    });
    if (errors.length === 0 && !blankForm) {
      addUser();
    }
  };
  const hideLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className={classes.root}>
      <Banner banner={shopData.shop_banner} />
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress className={classes.loadingIcon} />
      </Backdrop>
      {displayForm ? (
        selectedImage ? (
          <SelectedImage
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
          />
        ) : (
          <div>
            <form
              id="EstimateForm"
              ref={formRef}
              className={classes.form}
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <div className={classes.headerRow}>
                    <PermContactCalendarRoundedIcon fontSize="large" />
                    <h3>Contact Info</h3>
                  </div>
                  <TextField
                    name="firstName"
                    ref={firstNameRef}
                    className={classes.textField}
                    id="outlined-basic"
                    error={errors.includes("firstName")}
                    onBlur={(e) => validateField(e.target)}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    label="First Name"
                    variant="outlined"
                  />
                  <TextField
                    name="lastName"
                    ref={lastNameRef}
                    className={classes.textField}
                    id="outlined-basic"
                    error={errors.includes("lastName")}
                    onBlur={(e) => validateField(e.target)}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    label="Last Name"
                    variant="outlined"
                  />
                  <TextField
                    name="emailAddress"
                    ref={emailAddressRef}
                    className={classes.textField}
                    id="outlined-basic"
                    error={errors.includes("emailAddress")}
                    onBlur={(e) => validateField(e.target, true)}
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
                    ref={carYearRef}
                    error={errors.includes("carYear")}
                    onBlur={(e) => validateField(e.target)}
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
                    ref={carMakeRef}
                    disabled={makeOptions.length > 1 ? false : true}
                    error={errors.includes("carMake")}
                    onBlur={(e) => validateField(e.target)}
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
                    ref={carModelRef}
                    disabled={modelOptions.length > 1 ? false : true}
                    error={errors.includes("carModel")}
                    onBlur={(e) => validateField(e.target)}
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
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
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
        )
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
    justifyContent: "center",
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
