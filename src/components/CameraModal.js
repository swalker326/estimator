import React, { useRef } from "react";
import SageFilePicker from "./SageFilePicker";
import { useModal, Modal } from "react-morphing-modal";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import "react-morphing-modal/dist/ReactMorphingModal.css";

const CameraModal = (props) => {
  const { onCapture } = props;
  const { modalProps, open, close } = useModal();
  return (
    <div>
      <Button openModal={open} />
      <Modal {...modalProps} padding={false}>
        <SageFilePicker
          loading={props.loading}
          closeModal={close}
          addSelectedImages={onCapture}
        />
      </Modal>
    </div>
  );
};

const Button = ({ openModal }) => {
  const btnRef = useRef(null);
  function handleClick() {
    openModal(btnRef);
  }

  return (
    <div ref={btnRef} onClick={handleClick}>
      <AddAPhotoRoundedIcon fontSize="large" />
    </div>
  );
};

export default CameraModal;
