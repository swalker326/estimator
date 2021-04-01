import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { blue } from "@material-ui/core/colors";



function SimpleDialog(props) {
  const [deleteRequest, setDeleteRequest] = useState(false);
  const classes = useStyles();
  const { onClose, open, deleteCurrentRequest, setOpen } = props;

  const handleClose = () => {
    
  };

  useEffect(() => {
    if (deleteRequest) {
      deleteCurrentRequest();
      onClose();
    } else {
      setOpen(false);
    }
    setOpen(false)
  },[deleteRequest])

  return (
    <Dialog
      onClose={() => setOpen(false)}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Confirm Request</DialogTitle>
      <div className={classes.root}>
        <div>Are you sure you would like to delete the request</div>
        <div className={classes.buttonGroup}>
          <Button variant="outlined" onClick={() => setOpen(false)} color="primary">
            No Go Back
          </Button>
          <Button variant="contained" onClick={() => setDeleteRequest(true)} color="secondary">
            Yes Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    props.onClose();
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{<props.icon style={{color: `${props.iconColor}`}}/>}</Button>
      <SimpleDialog open={open} deleteCurrentRequest={props.deleteRequest} setOpen={setOpen} onClose={handleClose} setOpen={setOpen}  />
    </div>
  );
}

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  root: {
    marginRight: "2rem",
    marginBottom: "2rem",
    marginLeft: "2rem",
  },
  buttonGroup: {
    display: "flex",
    marginTop: "2rem",
    justifyContent: "space-between",
  },
});
