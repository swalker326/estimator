import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../state/store";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import SelectedImage from "./SelectedImage";
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
  const [primaryImage, setPrimaryImage] = useState(null);

  const { modalProps, open } = useModal({
    background: "rgba(0,0,0,0.7)",
  });

  const getRequestData = () => {
    db.collection("requested")
      .doc(requestId)
      .get()
      .then((doc) => {
        setRequestData(doc.data());
        setPrimaryImage(doc.data().images[0]);
      });
  };
  useEffect(() => {
    getRequestData();
  }, [requestId]);

  const [selectedImage, setSelectedImage] = useState(false);

  const classes = useStyles();

  return (
    <Container className={`Request ${classes.root}`}>
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
          <div className={classes.contactDetailsContainer}>
            <div className={` ${classes.contactDetails} customer`}>
            <h2>Contact Details</h2>
              <h3 className={classes.contactDetail}>
              {requestData.first_name} {requestData.last_name}
              </h3>
              <h5 className={classes.contactDetail}><span className={classes.carDataHeader}>Email:</span>{" "}{requestData.email}</h5>
            </div>
            <div className={` ${classes.contactDetails} ${classes.vehicle}`}>
              <h2>Vehicle Details</h2>
              <h5 className={classes.contactDetail}>
                <span className={classes.carDataHeader}>Year:</span>{" "}
                {requestData.carYear}
              </h5>
              <h5 className={classes.contactDetail}>
                <span className={classes.carDataHeader}>Make:</span>{" "}
                {requestData.carMake}
              </h5>
              <h5 className={classes.contactDetail}>
                <span className={classes.carDataHeader}>Model:</span>{" "}
                {requestData.carModel}
              </h5>
            </div>
          </div>
        </div>
        <div className={classes.imageWrapper}>
          <div className={classes.primaryImageContainer}>
            <img
              className={classes.primaryImage}
              src={primaryImage}
              alt="primary damage"
            />
          </div>
          <div className={classes.thumbnailContainer}>
            {requestData
              ? requestData.images.map((image, index) =>
                  index !== 0 ? (
                    <OpenModal
                      setSelectedImage={setSelectedImage}
                      selectedImage={image}
                      openModal={open}
                      className={classes.image}
                      position={index}
                      src={image}
                      alt="damage"
                    />
                  ) : null
                )
              : null}
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Request;

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    cursor: "pointer",
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
    paddingTop: "12px",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  primaryImageContainer: {
    maxWidth: "100%",
    height: "500px",
    [theme.breakpoints.up("md")]: {
      maxWidth: "30%",
    },
  },
  primaryImage: {
    width: "100%",
    objectFit: "cover",
    height: "100%",
    borderRadius: "6px",
    marginBottom: "12px",
  },
  thumbnailContainer: {
    display: "flex",
    height: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    maxWidth: "100%",
    paddingTop: "12px",
    [theme.breakpoints.up("md")]: {
      maxWidth: "60%",
      justifyContent: "flex-start",
      paddingTop: 0,
    },
  },
  image: {
    width: "100%",
    borderRadius: "6px",
    objectFit: "cover",
    marginLeft: "6px",
    marginRight: "6px",
    marginBottom: "8px",
    marginTop: "12px",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "45%",
      marginTop: 0,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "31%",
    },
  },
  requestContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "4rem",
  },
  contactContainer: {
    display: "flex",
    paddingTop: "2rem",
    paddingRight: "2rem",
    borderRadius: "6px",
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  contactDetails: {
    marginLeft: "50px",
    marginBottom: "20px",
  },
  'vehicle': {
    marginLeft: "70px",
  },
  contactDetail: {
    textAlign: "left",
    marginTop: "8px",
    marginBottom: "8px",
    fontWeight: 600,
  },
  contactDetailsContainer: {
    display: "flex",
    justifyContent: "flex-start",
  },
  requestAvatar: {
    fontSize: "36px",
    width: "100px",
    height: "100px",
    backgroundColor: deepPurple[500],
  },
}));
