import React, { useState, useRef } from "react";
import { TextField, makeStyles, Button } from "@material-ui/core";
import { auth, db } from "../server/firestore";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const NewAccount = (props) => {
  const classes = useStyles();
  const emailAddressRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const shopNameRef = useRef(null);
  const shopWebsiteRef = useRef(null);

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(false);
  const { setUser, setCreateAccount } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const validateField = () => {};
  const addNewUser = () => {
    auth
      .createUserWithEmailAndPassword(formData.emailAddress, formData.password)
      .then((userCred) => {
        setUser(userCred.user);
        if (value === 1) {
          db.collection("shops").add({
            first_name: formData.first_name,
            last_name: formData.last_name,
            shop_name: formData.shop_name,
            shop_email: formData.emailAddress,
            shop_website: formData.shop_website,
            email: formData.emailAddress,
            user: userCred.user.uid
          });
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errorCode", errorCode); // eslint-disable-line
        console.log("errorMessage", errorMessage); // eslint-disable-line
      });
  };
  return (
    <div className="NewAccount">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={classes.container}>
          <h2 style={{ textAlign: "center" }}>Create Account</h2>
          <Paper className={classes.paper} elevation={3}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
            >
              <Tab label="Customer Account" {...a11yProps(0)} />
              <Tab label="Shop Account" {...a11yProps(1)} />
            </Tabs>
          </Paper>

          <TabPanel value={value} index={0}>
            <form className={classes.form}>
              <h4 className={classes.h4}>Account Details</h4>
              <TextField
                name="emailAddress"
                ref={emailAddressRef}
                className={classes.textField}
                // id="outlined-basic"
                error={errors.includes("emailAddress")}
                onBlur={(e) => validateField(e.target)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                label="Email Address"
                variant="outlined"
              />
              <TextField
                name="password"
                ref={passwordRef}
                className={classes.textField}
                // id="outlined-basic"
                type="password"
                error={errors.includes("password")}
                onBlur={(e) => validateField(e.target)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                label="Password"
                variant="outlined"
              />
              <h4 className={classes.h4}>Contact Info</h4>
              <TextField
                name="first_name"
                ref={firstNameRef}
                className={classes.textField}
                // id="outlined-basic"
                type="text"
                error={errors.includes("first_name")}
                onBlur={(e) => validateField(e.target)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                label="First Name"
                variant="outlined"
              />
              <TextField
                name="last_name"
                ref={lastNameRef}
                className={classes.textField}
                // id="outlined-basic"
                type="text"
                error={errors.includes("last_name")}
                onBlur={(e) => validateField(e.target)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                label="Last Name"
                variant="outlined"
              />
            </form>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <form className={classes.form}>
              <h4 className={classes.h4}>Account Details</h4>
              <TextField
                name="emailAddress"
                ref={emailAddressRef}
                className={classes.textField}
                // id="outlined-basic"
                error={errors.includes("emailAddress")}
                onBlur={(e) => validateField(e.target)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                label="Email Address"
                variant="outlined"
              />
              <TextField
                name="password"
                ref={passwordRef}
                className={classes.textField}
                // id="outlined-basic"
                type="password"
                error={errors.includes("password")}
                onBlur={(e) => validateField(e.target)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                label="Password"
                variant="outlined"
              />
              <h4 className={classes.h4}>Contact Info</h4>
              <TextField
                name="first_name"
                ref={firstNameRef}
                className={classes.textField}
                // id="outlined-basic"
                type="text"
                error={errors.includes("first_name")}
                onBlur={(e) => validateField(e.target)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                label="First Name"
                variant="outlined"
              />
              <TextField
                name="last_name"
                ref={lastNameRef}
                className={classes.textField}
                // id="outlined-basic"
                type="text"
                error={errors.includes("last_name")}
                onBlur={(e) => validateField(e.target)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                label="Last Name"
                variant="outlined"
              />
              <h4 className={classes.h4}>Shop Details</h4>
              <TextField
                name="shop_name"
                ref={shopNameRef}
                className={classes.textField}
                // id="outlined-basic"
                type="text"
                error={errors.includes("shop_name")}
                onBlur={(e) => validateField(e.target)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                label="Shop Name"
                variant="outlined"
              />
              <TextField
                name="shop_website"
                ref={shopWebsiteRef}
                className={classes.textField}
                // id="outlined-basic"
                type="text"
                error={errors.includes("shop_website")}
                onBlur={(e) => validateField(e.target)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                label="Shop Website"
                variant="outlined"
              />
            </form>
          </TabPanel>
          <div className={classes.buttonGroup}>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => setCreateAccount(false)}
            >
              Back to Sign In
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => addNewUser()}
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1),
    width: "45%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    marginRight: "12px",
    marginLeft: "12px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
  },
  h4: {
    width: "100%",
  },
  container: {
    width: "60%",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    width: "340px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    marginLeft: "8px",
    marginRight: "8px",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
}));

export default NewAccount;
