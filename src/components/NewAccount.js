import React, { useState, useRef } from "react";
import { TextField, makeStyles, Button } from "@material-ui/core";
import { auth } from "../server/firestore";

const NewAccount = (props) => {
  const classes = useStyles();
  const emailAddressRef = useRef(null);
  const passwordRef = useRef(null);

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(false);
  const { setUser, setCreateAccount } = props;

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
        <div>
          <h2 style={{ textAlign: "center" }}>Create Account</h2>
          <form style={{ display: "flex", flexDirection: "column" }}>
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
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() => addNewUser()}
            >
              Create Account
            </Button>
            <Button
              className={classes.button}
              onClick={() => setCreateAccount(false)}
            >
              Back to Sign In
            </Button>
          </form>
        </div>
      </div>
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
}));

export default NewAccount;
