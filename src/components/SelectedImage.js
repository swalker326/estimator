import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
//Local Impots

const SelectedImage = (props) => {
  const classes = useStyles();
  const { selectedImage, setSelectedImage, closeButton, fontSize } = props;

  return (
    <div className={classes.root}>
      <div className={classes.selectedImageContainer} style={{}}>
        <div className={classes.selectedImageWrapper}>
          <div
            className={classes.backButtonContainer}
            style={
              closeButton
                ? { display: "flex", justifyContent: "flex-end" }
                : null
            }
          >
            <div className={classes.backButton}>
              {closeButton ? (
                <CancelIcon
                  style={{ fontSize: fontSize || "40px" }}
                  onClick={(event) => setSelectedImage(null)}
                />
              ) : (
                null
              )}
            </div>
          </div>
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
    height: "100%"
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
    flexDirection: "column",
    height:"100%",
  },
  backButtonContainer: {
    // padding: "1rem",
    right: "1rem",
    // position: "absolute",
    borderRadius: "50%",
  },
  backButton: {
    cursor: "pointer",
  },
  selectedImage: {
    maxWidth: "100%",
    maxHeight: "50%",
    alignSelf: "center",
    objectFit: "contain",
  },
}));

export default SelectedImage;
