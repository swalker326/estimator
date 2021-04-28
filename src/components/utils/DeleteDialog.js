import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

function DeleteDialog(props) {
  const [deleteRequest, setDeleteRequest] = useState(false);
  const classes = useStyles();
  const { onClose, open, deleteCurrentRequest, setOpen } = props;

  useEffect(() => {
    if (deleteRequest) {
      deleteCurrentRequest();
      onClose();
    } else {
      setOpen(false);
    }
    setOpen(false);
  }, [deleteRequest]);

  return (
    <Dialog
      onClose={() => setOpen(false)}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Confirm Delete</DialogTitle>
      <div className={classes.root}>
        <div>Are you sure you would like to delete this request?</div>
        <div className={classes.buttonGroup}>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            color="primary"
          >
            No Go Back
          </Button>
          <Button
            variant="contained"
            onClick={() => setDeleteRequest(true)}
            color="secondary"
          >
            Yes Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default function DeleteDialogComponent(props) {
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
        {<props.icon style={{ color: `${props.iconColor}` }} />}
      </Button>
      <DeleteDialog
        open={open}
        deleteCurrentRequest={props.deleteRequest}
        setOpen={setOpen}
        onClose={handleClose}
      />
    </div>
  );
}

const useStyles = makeStyles({
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
