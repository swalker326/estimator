import React, { useContext, useState, useEffect } from "react";
import { Context } from "../state/store";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Container, TextField, makeStyles } from "@material-ui/core";
import { useFilePicker, utils } from "react-sage";
import EditIcon from "@material-ui/icons/Edit";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ImageUpload } from "./ImageUpload";
import { db } from "../server/firestore";

const Settings = (props) => {
  const classes = useStyles();
  const b64toBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };
  const uploadBanner = async (image) => {
    const blobImage = b64toBlob(image);
    return ImageUpload(blobImage);
  };
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
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [state, dispatch] = useContext(Context);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSettingsSave = () => {
    db.collection("shops")
      .doc(state.shopId)
      .update({
        ...formData,
      });
  };
  const updateUserDetails = (e) => {
    e.preventDefault();
    handleSettingsSave();
    setEditing(false);
  };
  useEffect(() => {
    if (files[0]) {
      const p = utils.loadFile(files[0]).then((pp) => {
        uploadBanner(pp).then((photo) => {
          setFormData({
            ...formData,
            shop_banner: photo,
          });
        });
      });
    }
  }, [files]);
  return (
    <Container className="Settings">
      <div>
        <HiddenFileInput accept=".jpg, .jpeg, .png" multiple={false} />
      </div>
      <div style={{ display: "none" }}>Shop ID: {state.shopData.shop_id}</div>
      <form className={classes.form} onSubmit={(e) => updateUserDetails(e)}>
        <Container maxWidth="md" className={classes.bannerContainer}>
          <div className={classes.bannerHeaderContainer}>
            <h3>Banner</h3>
            <div className={classes.editIconContainer}>
              <EditIcon
                className={classes.editIcon}
                onClick={() => setEditing(!editing)}
              />
            </div>
          </div>
          <div className={classes.bannerImageContainer}>
            <img
              className={classes.bannerImage}
              src={
                files[0]
                  ? URL.createObjectURL(files[0])
                  : state.shopData.shop_banner
              }
              alt="Shop Banner"
            />
            {editing ? (
              <Button
                onClick={handleAddImages}
                className={`${classes.changeBannerButton} ${classes.button}`}
                variant="contained"
              >
                Change Image
              </Button>
            ) : null}
          </div>
        </Container>
        <TextField
          disabled={!editing}
          name="shop_name"
          label="Shop Name"
          id="outlined-basic"
          onChange={handleInputChange}
          className={classes.textField}
          value={
            formData.shop_name ? formData.shop_name : state.shopData.shop_name
          }
          variant="outlined"
        ></TextField>
        <TextField
          disabled={!editing}
          name="shop_email"
          onChange={handleInputChange}
          label="Shop Email"
          id="outlined-basic"
          className={classes.textField}
          value={
            formData.shop_email
              ? formData.shop_email
              : state.shopData.shop_email
          }
          variant="outlined"
        ></TextField>
        <TextField
          disabled={!editing}
          name="shop_website"
          label="Shop Website"
          id="outlined-basic"
          onChange={handleInputChange}
          className={classes.textField}
          value={
            formData.shop_website
              ? formData.shop_website
              : state.shopData.shop_website
          }
          variant="outlined"
        ></TextField>
        <div className={classes.buttonGroup}>
          <Button variant="outlined" className={classes.button}>
            <Link target="_blank" to={`/profile/form/${state.shopId}`}>
              Preview Form
            </Link>
          </Button>
          {editing ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              onClick={handleSettingsSave}
            >
              Save
            </Button>
          ) : null}
        </div>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  form: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: "10rem",
  },
  changeBannerButton: {
    position: "absolute",
    top: "40%",
    left: "50%",
  },
  editButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: "10rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  bannerContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },
  bannerImageContainer: {
    display: "flex",
    justifyContent: "center",
    maxHeight: "200px",
    overflow: "hidden",
    width: "100vw",
    marginLeft: "50%",
    transform: "translateX(-50%)",
  },
  bannerImage: {
    objectFit: "cover",
    flexShrink: 0,
  },
  bannerHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editIcon: {
    color: "#313131",
  },
  editIconContainer: {
    display: "flex",
    alignItems: "end",
    justifyContent: "flex-end",
    cursor: "pointer",
  },
}));

export default Settings;
