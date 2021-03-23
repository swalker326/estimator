import React, { useContext, useState, useEffect } from "react";
import { Context } from "../state/store";
import { Button } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import { TextField, makeStyles } from "@material-ui/core";
import { useFilePicker, utils } from "react-sage";
import EditIcon from "@material-ui/icons/Edit";
import { ImageUpload } from "./ImageUpload";
import { db } from "../server/firestore";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "5rem",
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
    top: "50%",
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
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },
  bannerImageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  bannerImage: {
    maxHeight: "150px",
  },
  editIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    cursor: "pointer",
  },
}));

const Settings = (props) => {
  console.log("Settings Rendered"); // eslint-disable-line
  const classes = useStyles();
  const b64toBlob = (dataURI) => {
    console.log("dataURI", dataURI); // eslint-disable-line
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
  const { url } = useRouteMatch();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSettingsSave = () => {
    console.log("handleSettings fired"); // eslint-disable-line
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
    <div className="Settings">
      <div>
        <HiddenFileInput accept=".jpg, .jpeg, .png" multiple={false} />
      </div>
      <div style={{ display: "none" }}>Shop ID: {state.shopData.shop_id}</div>
      <form className={classes.form} onSubmit={(e) => updateUserDetails(e)}>
        <div className={classes.editIconContainer}>
          <Button
            className={classes.editButton}
            onClick={() => setEditing(!editing)}
            variant="contained"
            color="secondary"
            endIcon={<EditIcon />}
          >
            {editing ? "Editing..." : "Edit"}
          </Button>
        </div>
        <div className={classes.bannerContainer}>
          <h3>Banner</h3>
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
        </div>
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
        <div className={classes.buttonGroup}>
          <Button variant="outlined" className={classes.button}>
            <Link to={`/profile/form/${state.shopId}`}>Preview Form</Link>
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
    </div>
  );
};

export default Settings;
