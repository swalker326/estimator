import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core/";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CameraModal from "./CameraModal";

const VehiclePhotos = (props) => {
  const { photos, setSelectedImage } = props;
  const updatePhotos = props.onCapture;
  const setPhotos = props.onPhotoChange;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const removePhoto = (photoName) => {
    // const photosArray = photos.filter((photo) => photoName !== photo);
    setPhotos(photos.filter((photo) => photoName !== photo));
  };

  const classes = useStyles();
  return (
    <Box display="flex" borderColor="black" className={classes.root}>
      <GridList
        cellHeight={300}
        className={classes.gridList}
        cols={matches ? 3 : 2}
      >
        <GridListTile key="add icon" className={classes.gridListTile} cols={1}>
          <div className={classes.addIconContainer}>
            <CameraModal loading={props.loading} onCapture={updatePhotos} />
            <span>Add Photos</span>
          </div>
        </GridListTile>
        {photos.map((photo, index) => (
          <GridListTile
            key={`damagePhoto_${index}`}
            className={classes.gridListTile}
            cols={1}
          >
            <span
              onClick={() => removePhoto(photo)}
              className={classes.closeButton}
            >
              X
            </span>
            <img onClick={() => setSelectedImage(photo)} src={photo} alt={`damageImage_${index}`} />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: "90vw",
    height: 450,
  },
  gridListTile: {
    borderRadius: "1rem",
    objectFit: "cover",
  },
  addIconContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    zIndex: 1,
    margin: "3px",
    left: "2%",
    top: "2%",
    textAlign: "center",
    textEmphasis: "bold",
    color: "black",
    position: "absolute",
    backgroundColor: "#fff",
    padding: "8px",
    borderRadius: "50%",
    cursor: "pointer",
  },
}));

export default VehiclePhotos;
