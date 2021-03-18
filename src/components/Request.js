import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SelectedImage from "./SelectedImage";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { useParams } from "react-router-dom";
import { db } from "../server/firestore";
import { useModal, Modal } from "react-morphing-modal";
import {Context} from '../state/store';

//styles
import "react-morphing-modal/dist/ReactMorphingModal.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//Local Impots
const OpenModal = (props) => {
  const imgRef = useRef(null);
  const { openModal, setSelectedImage, selectedImage } = props;
  function handleClick() {
    // do some complicated stuff
    setSelectedImage(selectedImage)
    openModal(imgRef);
  }
  return <img ref={imgRef} onClick={handleClick} {...props} alt="damage" />;
};

const Request = (props) => {
  const { request } = props;
  const requestID = useParams();
  const [requestData, setRequestData] = useState(false);
  const { modalProps, open } = useModal({
    background: 'rgba(0,0,0,0.7)',
  });

  const getRequestData = () => {
    db.collection("requested")
      .doc(requestID.id)
      .get()
      .then((doc) => setRequestData(doc.data()));
  };
  useEffect(() => {
    getRequestData();
  }, [requestID]);

  const [selectedImage, setSelectedImage] = useState(false);

  const classes = useStyles();

  return (
    <div className="Request">
      {props.currentReq}
      <div className={classes.backIconContainer} >
        <ArrowBackIcon onClick={() => props.setRequest('') } /> <span>Back</span>
      </div>
      <Modal {...modalProps} padding={false}>
        <SelectedImage
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          closeButton = {false}
        />
      </Modal>
      <div>
        <div className={classes.contactContainer}>
          <div className={classes.avatarContainer}>
            <Avatar className={classes.purple}>OP</Avatar>
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
                {requestData.carYear} {requestData.carMake}
              </h5>
              {/* <h5 className={classes.contactDetails}>{request.carMake}</h5> */}
              <h5 className={classes.contactDetails}>{requestData.carModel}</h5>
            </div>
          </div>
        </div>
        <div className={classes.imageWrapper}>
          {requestData
            ? requestData.images.map((image) => (
                <OpenModal
                  // onClick={() => setSelectedImage(image)}
                  setSelectedImage={setSelectedImage}
                  selectedImage ={image}
                  openModal={open}
                  className={classes.image}
                  src={image}
                  alt="damage_photo"
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Request;

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    display: "flex",
    paddingTop: "1rem",
    paddingLeft: "2rem",
  },
  backIconContainer: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "2rem",
    cursor: "pointer",
    fontWeight: "700",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "2rem",
  },
  image: {
    maxWidth: "20%",
    borderRadius: "6px",
    objectFit: "cover",
    marginLeft: "1rem",
    marginRight: "1rem",
    marginBottom: "1rem",
  },
  contactContainer: {
    display: "flex",
  },
  contactDetails: {
    textAlign: "left",
    marginTop: "8px",
    marginBottom: "8px",
  },
  contactDetailsWrapper: {
    paddingLeft: "1rem",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
