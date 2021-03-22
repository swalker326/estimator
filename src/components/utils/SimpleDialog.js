import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { blue } from "@material-ui/core/colors";

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
    justifyContent: "space-between"
  }
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Confirm Request</DialogTitle>
      <div className= {classes.root}>
        <div>Are you sure you would like to delete the request</div>
        <div className={classes.buttonGroup}>
          <Button variant= "outlined" color="primary">No Go Back</Button>
          <Button variant= "contained" onClick={handleClose} color="secondary">Yes Delete</Button>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
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
      <Button onClick={handleClickOpen}>
        {<props.icon />}
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
