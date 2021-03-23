import React, { useState, useRef, useContext } from "react";
import { Context } from "../state/store";
import { TextField, makeStyles, Button } from "@material-ui/core";
import { auth } from "../server/firestore";
import NewAccount from "./NewAccount";

const Login = (props) => {
  const [state, dispatch] = useContext(Context);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);

  const emailAddressRef = useRef(null);
  const passwordRef = useRef(null);
  const classes = useStyles();

  const setLoginError = (value) => {
    dispatch({ type: "SET_ERROR", loginError: value });
  };
  const setUser = (user) => {
    dispatch({ type: "SET_USER", user: user });
  };
  const setAuth = (auth) => {
    dispatch({ type: "SET_AUTH", auth: auth });
  };

  const validateField = () => {};
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setLoginError(false);
  };
  const signUserIn = () => {
    auth
      .signInWithEmailAndPassword(formData.emailAddress, formData.password)
      .then((userCred) => {
        setUser(userCred.user);
        setAuth(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode) {
          setLoginError(true);
        }
        console.error("errorCode", errorCode); // eslint-disable-line
        console.error("errorMessage", errorMessage); // eslint-disable-line
      });
  };
  return (
    <div className="Login">
      {createAccount ? (
        <NewAccount setCreateAccount={setCreateAccount} setUser={setUser} />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <h2 style={{ textAlign: "center" }}> Sign In</h2>
            <div className={classes.error}>
              {state.loginError ? "Incorrect username or password" : ""}
            </div>
            <form style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                name="emailAddress"
                ref={emailAddressRef}
                className={classes.textField}
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
                onClick={() => signUserIn()}
              >
                Sign In
              </Button>
              <Button onClick={() => setCreateAccount(true)}>
                Create Account
              </Button>
            </form>
          </div>
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
}));

export default Login;
