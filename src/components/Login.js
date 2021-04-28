import React, { useState, useRef, useContext, useEffect } from "react";
import { Context } from "../state/store";
import { TextField, makeStyles, Button } from "@material-ui/core";
import { auth } from "../server/firestore";
import NewAccount from "./NewAccount";
import { Redirect } from "react-router";

const Login = (props) => {
  const [state, dispatch] = useContext(Context);
  const [errors, setErrors] = useState([]);
  const [forgotPassword, setForgotPassword] = useState(false);

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
  const signUserIn = (event) => {
    event.preventDefault();
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

  useEffect(() => {
    auth.onAuthStateChanged( user => {
        if (user) {
            setUser(user)
            setAuth(true);
        } else {
            setAuth(false);
        }
    })

  }, []);

  if (forgotPassword) return <Redirect to="/password_reset" />;

  return (
    <div className="Login">
      {createAccount ? (
        <NewAccount setCreateAccount={setCreateAccount} setUser={setUser} />
      ) : (
        <div className={classes.createAccountContainer}>
          <div>
            <h2 className={classes.formHeader}> Sign In</h2>
            <div className={classes.error}>
              {state.loginError ? "Incorrect username or password" : ""}
            </div>
            <form className={classes.form} onSubmit={(e) => signUserIn(e)}>
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
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign In
              </Button>
              <Button
                className={classes.buttonOutline}
                variant="outlined"
                color="primary"
                onClick={() => setCreateAccount(true)}
              >
                Create Account
              </Button>
              <Button
                className={classes.buttonOutline}
                variant="outlined"
                color="primary"
                onClick={() => setForgotPassword(true)}
              >
                Forgot Password
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
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formHeader: {
    textAlign: "center",
  },
  createAccountContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  buttonOutline: {
    marginTop: ".5rem",
  },
  error: {
    color: "red",
    padding: "12px",
    height: "20px",
  },
}));

export default Login;
