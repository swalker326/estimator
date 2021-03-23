import React, { useState } from "react";
import { TextField, makeStyles, Button } from "@material-ui/core";
import { auth } from "../server/firestore";
import { Link } from "react-router-dom";

//Local Impots

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const classes = useStyles();

  const validateField = () => {};
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const forgotPassword = () => {
    auth
      .sendPasswordResetEmail(formData.emailAddress)
      .then((res) => {
        setEmailSent(true);
      })
      .catch((err) => {
        console.log("error", error); // eslint-disable-line
      });
  };

  return (
    <div className="ForgotPassword">
      {emailSent ? (
        <div className={classes.succuss}>
          <h3>
            Check your email, you should have a link to reset your password.
          </h3>
          <Button variant="outlined" color="primary">
            <Link to="/login">Back to Login</Link>
          </Button>
        </div>
      ) : (
        <div className={classes.formWrapper}>
          <form className={classes.form}>
            <TextField
              name="emailAddress"
              className={classes.textField}
              error={errors.includes("emailAddress")}
              onBlur={(e) => validateField(e.target)}
              onChange={(e) => {
                handleInputChange(e);
              }}
              label="Email Address"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => forgotPassword()}
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: "25ch",
  },
  button: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  error: {
    color: "red",
    padding: "12px",
    height: "20px",
  },
  form: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
  },
  formWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  succuss: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));

export default ForgotPassword;
