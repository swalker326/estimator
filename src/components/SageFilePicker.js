import React, { useState, useEffect } from "react";
import { Box, Button, GridList, GridListTile } from "@material-ui/core";
import { useFilePicker, utils } from "react-sage";
import { ImageUpload } from "./ImageUpload";

//Styles
import { makeStyles } from "@material-ui/core/styles";

// Icons
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";

const SageFilePicker = (props) => {
  const { addSelectedImages, closeModal, loading } = props;
  const [selectedImage, setSelectedImage] = useState(false);
  const [dataUrls, setDataUrls] = useState([]);

  const {
    files,
    onClick: handleAddImages,
    errors,
    HiddenFileInput,
  } = useFilePicker({
    maxFileSize: "1000mb",
    maxImageWidth: 1000,
    imageQuality: 0.92,
    resizeImage: true,
  });
  const b64toBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };
  const saveImages = async (images) => {
    loading(true);
    const blobImages = await images.map((i) => b64toBlob(i));
    return Promise.all(blobImages.map((blob) => ImageUpload(blob)));
  };
  const handleAddToQuote = () => {
    saveImages(dataUrls).then((data) => addSelectedImages(data));
    setDataUrls([]);
    closeModal();
  };
  useEffect(() => {
    const getDataUrls = async () => {
      const data = await Promise.all(files.map(utils.loadFile));
      setDataUrls((dataUrls) => dataUrls.concat(data));
    };
    getDataUrls();
  }, [files]);

  const removePhoto = (photoUrl) => {
    setDataUrls(dataUrls.filter((url) => url !== photoUrl));
  };
  const classes = useStyles();
  return (
    <div className={classes.filePickerContainer}>
      {selectedImage ? (
        <div className={classes.selectedImageContainer} style={{}}>
          <div
            className={classes.selectedImageBackButton}
            onClick={(event) => setSelectedImage(null)}
          >
            <ArrowBackRoundedIcon />
          </div>
          <img
            className={classes.selectedImage}
            src={selectedImage}
            alt="selected"
          />
        </div>
      ) : (
        <div className={classes.photosWrapper}>
          <div>
            <HiddenFileInput accept=".jpg, .jpeg, .png" multiple={true} />
          </div>
          {dataUrls ? (
            <Box display="flex" borderColor="black" className={classes.root}>
              <GridList cellHeight={160} className={classes.gridList} cols={2}>
                <GridListTile
                  key="add image"
                  cols={1}
                  className={classes.gridListTile}
                >
                  <div className={classes.gridListTileUpload}>
                    <PhotoLibraryIcon
                      style={{ padding: "10px" }}
                      onClick={handleAddImages}
                      fontSize="large"
                    />
                    <span>Add Photos</span>
                  </div>
                </GridListTile>
                {dataUrls.map((url, index) => (
                  <GridListTile
                    key={url}
                    className={classes.gridListTile}
                    cols={1}
                  >
                    <span
                      onClick={() => removePhoto(url)}
                      className={classes.removeButton}
                    >
                      X
                    </span>
                    <img
                      src={url}
                      onClick={(e) => setSelectedImage(e.target.src)}
                      alt={`damageImage-${index}`}
                    />
                  </GridListTile>
                ))}
              </GridList>
            </Box>
          ) : null}
          <div className={classes.uploadButtonContainer}>
            <Button
              variant="contained"
              onClick={() => handleAddToQuote()}
              className={classes.button}
              disabled={dataUrls.length ? false : true}
              startIcon={<CloudUploadIcon />}
            >
              Add To Quote
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  filePickerContainer: {
    // marginTop: "3rem",
    backgroundColor: "rgba(0,0,0, 0.7)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  selectedImageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  selectedImageBackButton: {
    cursor: "pointer",
    padding: "1rem",
    top: "20px",
    left: "20px",
    position: "absolute",
    backgroundColor: "#fc0000",
    borderRadius: "50%",
  },
  selectedImage: {
    maxHeight: "100%",
    objectFit: "contain",
  },
  photosWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    color: "white",
    backgroundColor: "#FC0000",
  },
  thumbnailWrapper: {
    overflowY: "scroll",
    display: "flex",
    width: "100%",
    height: "50%",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "10rem",
    borderRadius: "2rem",
    paddingTop: "3rem",
    paddingBottom: "3rem",
  },
  thumbnailContainer: {
    width: "30%",
    marginLeft: "1rem",
    marginBottom: "1rem",
    borderRadius: "20px",
  },
  photoThumbnail: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  uploadButtonContainer: {
    marginTop: "3rem",
    paddingBottom: "3rem",
  },
  gridList: {
    width: "90vw",
    height: 450,
  },
  gridListTile: {
    borderRadius: "1rem",
    objectFit: "cover",
    marginTop: "2rem",
  },
  gridListTileUpload: {
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
  },
  removeButton: {
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

export default SageFilePicker;
