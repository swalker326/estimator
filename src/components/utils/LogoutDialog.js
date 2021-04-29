import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { findByLabelText } from "@testing-library/dom";

//Local Impots

function LogoutDialog(props) {

  const classes = useStyles();
  const [logUserOut, setLogUserOut] = useState(false);
  const { onClose, open, logout, setOpen } = props;
  useEffect(() => {
    if (logUserOut) {
      logout();
      onClose();
    } else {
      setOpen(false);
    }
    setOpen(false);
  }, [logUserOut]);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Confrim Logout</DialogTitle>
      <div className={classes.root}>
        <div>Are you sure you would like to logout?</div>
        <div class={classes.buttonGroup}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Go Back
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setLogUserOut(true)}
          >
            Log Me Out
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

LogoutDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default function LogoutDialogComponent(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    props.onClose();
  };

  const classes = useStyles();

  return (
    <div className={classes.triggerContainer}>
      <div className={classes.triggerButton}>
        <Button onClick={handleClickOpen}>
          {<props.icon style={{ color: `${props.iconColor}` }} />}
        </Button>
        <p className = {classes.triggerText}>Logout</p>
      </div>
      <LogoutDialog
        open={open}
        logout={props.logout}
        setOpen={setOpen}
        onClose={handleClose}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "2rem",
    marginBottom: "2rem",
    marginLeft: "2rem",
    width: "300px",
  },
  triggerContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  triggerButton: {
    width: "100%",
    display: "flex",
  },
  triggerText: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    }
  },
  buttonGroup: {
    display: "flex",
    width: '100%',
    marginTop: "2rem",
    justifyContent: "space-between",
  },
}));
