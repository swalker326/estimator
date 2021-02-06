import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
//Local Impots

const SelectedImage = (props) => {
  const classes = useStyles();
  const { selectedImage, setSelectedImage } = props;

  return (
    <div className={classes.root}>
      <div className={classes.selectedImageContainer} style={{}}>
        <div className={classes.backButtonContainer}>
          <div
            className={classes.backButton}
            onClick={(event) => setSelectedImage(null)}
          >
            <ArrowBackRoundedIcon />
          </div>
        </div>
        <div className={classes.selectedImageWrapper}>
          <img
            className={classes.selectedImage}
            src={selectedImage}
            alt="selected"
          />
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "80%"
  },
  selectedImageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  selectedImageWrapper: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "3rem",
  },
  backButtonContainer: {
    cursor: "pointer",
    padding: "1rem",
    top: "20px",
    left: "20px",
    position: "sticky",
    borderRadius: "50%",
  },
  backButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "3rem",
    width: "3rem",
    backgroundColor: "#fc0000",
    borderRadius: "50%",
  },
  selectedImage: {
    maxHeight: "80%",
    objectFit: "contain",
  },
}));

export default SelectedImage;
