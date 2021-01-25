import React, { useRef } from 'react';
import { Camera } from './Camera';
import { useModal, Modal } from 'react-morphing-modal';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

const CameraModal = (props) => {
  const {onCapture} = props
  const { modalProps, open } = useModal();
  return (
    <div>
      <Button openModal={open} />
      <Modal {...modalProps} padding={false} >
        <Camera onClear={(photo) => { console.log('TODO') }} onCapture={onCapture} />
      </Modal>
    </div>
  );
}

const Button = ({ openModal }) => {
  const btnRef = useRef(null);
  function handleClick() {
    openModal(btnRef);
  }

  return (
    <div ref={btnRef} onClick={handleClick}>
      <AddAPhotoRoundedIcon fontSize="large" color="primary" />
    </div>
  );
};

export default CameraModal;