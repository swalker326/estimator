import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../state/store";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SelectedImage from "./SelectedImage";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { useParams } from "react-router-dom";
import { db } from "../server/firestore";
import { useModal, Modal } from "react-morphing-modal";
import { Link } from "react-router-dom";

//styles
import "react-morphing-modal/dist/ReactMorphingModal.css";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

//Local Impots
const OpenModal = (props) => {
  const imgRef = useRef(null);
  const { openModal, setSelectedImage, selectedImage } = props;
  function handleClick() {
    // do some complicated stuff
    setSelectedImage(selectedImage);
    openModal(imgRef);
  }
  return (
    <img
      style={{ boxShadow: "5px 3px 5px 0px #898989" }}
      ref={imgRef}
      onClick={handleClick}
      {...props}
      alt="damage"
    />
  );
};

const Request = (props) => {
  const [state, dispatch] = useContext(Context);
  const requestId = useParams().request_id;
  const [requestData, setRequestData] = useState(false);
  const { modalProps, open } = useModal({
    background: "rgba(0,0,0,0.7)",
  });

  const getRequestData = () => {
    db.collection("requested")
      .doc(requestId)
      .get()
      .then((doc) => setRequestData(doc.data()));
  };
  useEffect(() => {
    getRequestData();
  }, [requestId]);

  const [selectedImage, setSelectedImage] = useState(false);

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {state.request}
      <div className={classes.closeIconContainer}>
        <Link to={`/profile/${state.shopId}`}>
          <CancelRoundedIcon
            className={classes.closeIcon}
            onClick={() =>
              dispatch({ type: "SET_REQUEST", currentRequest: "" })
            }
          />
        </Link>
      </div>
      <Modal {...modalProps} padding={false}>
        <SelectedImage
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          closeButton={false}
        />
      </Modal>
      <Container class={classes.requestContainer}>
        <div className={classes.contactContainer}>
          <div className={classes.avatarContainer}>
            <Avatar className={classes.requestAvatar}>
              {requestData ? (
                <span>
                  {requestData.first_name.charAt(0).toUpperCase()}
                  {requestData.last_name.charAt(0).toUpperCase()}
                </span>
              ) : null}
            </Avatar>
          </div>
          <div className={classes.contactDetailsWrapper}>
            <div>
              <h3 className={classes.contactDetails}>
                {requestData.first_name} {requestData.last_name}
              </h3>
              <h5 className={classes.contactDetails}>{requestData.email}</h5>
            </div>
            <div>
              <h3>Vehicle Details</h3>
              <h5 className={classes.contactDetails}>
                <span className={classes.carDataHeader}>Year:</span>{" "}
                {requestData.carYear}
              </h5>
              <h5 className={classes.contactDetails}>
                <span className={classes.carDataHeader}>Make:</span>{" "}
                {requestData.carMake}
              </h5>
              <h5 className={classes.contactDetails}>
                <span className={classes.carDataHeader}>Model:</span>{" "}
                {requestData.carModel}
              </h5>
            </div>
          </div>
        </div>
        <div className={classes.imageWrapper}>
          {requestData
            ? requestData.images.map((image) => (
                <OpenModal
                  setSelectedImage={setSelectedImage}
                  selectedImage={image}
                  openModal={open}
                  className={classes.image}
                  src={image}
                  alt="damage photo"
                />
              ))
            : null}
        </div>
      </Container>
    </Container>
  );
};

export default Request;

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    cursor: "pointer",
    padding: "10px",
    marginTop: "3rem",
    marginBottom: "3rem",
    fontSize: "60px",
    color: "rgba(0,0,0,0.3)",
  },
  carDataHeader: {
    color: "grey",
    fontWeight: 600,
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIconContainer: {
    fontWeight: "700",
    position: "absolute",
    top: "3rem",
    right: "5%",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginLeft: "1rem",
  },
  image: {
    maxWidth: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "48%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "31%",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "20%",
    },
    borderRadius: "6px",
    objectFit: "cover",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1rem",
  },
  requestContainer: {
    display: "flex",
    paddingTop: "5rem",
  },
  contactContainer: {
    display: "flex",
    paddingTop: "2rem",
    paddingRight: "2rem",
    flexDirection: "column",
    backgroundColor: "#eaeaea",
    borderRadius: "6px",
  },
  contactDetails: {
    textAlign: "left",
    marginTop: "8px",
    marginBottom: "8px",
    fontWeight: 600,
  },
  contactDetailsWrapper: {
    paddingLeft: "1rem",
  },
  requestAvatar: {
    fontSize: "36px",
    width: "100px",
    height: "100px",
    backgroundColor: deepPurple[500],
  },
}));
