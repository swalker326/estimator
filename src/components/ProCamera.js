import React, { useState, useRef } from "react";
import { Camera } from 'react-camera-pro';
import { ImageUpload } from './ImageUpload';

//Styles
import { makeStyles } from '@material-ui/core/styles';

// Icons
import CameraIcon from '@material-ui/icons/Camera';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

//Local Impots

const ProCamera = (props) => {
  const {onCapture} = props;
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const classes = useStyles();

  const b64toBlob = (dataURI) => {

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}

  const saveImage = () => {
    const blob = b64toBlob(image);
    ImageUpload(blob).then((data) => {
      console.log("data", data); // eslint-disable-line
      setImage(null);
      onCapture(data);
    });

  }

  return (
    <div className='cameraWrapper' style={{ width: '100%' }}>
      {image ?
        <img className={classes.cameraPreviewImage} src={image} alt='Previous' />
        :
        <Camera ref={camera} facingMode="environment" />
      }
      <div className={classes.cameraControls}>
        {image ? <SendIcon className={classes.cameraControlIcon} onClick={() => saveImage()}><span>Save</span></SendIcon> : null}
        <CameraIcon className={classes.cameraCaptureIcon} onClick={() => setImage(camera.current.takePhoto())}></CameraIcon>
        {image ? <CancelIcon className={classes.cameraControlIcon} onClick={() => setImage(null)}><span>Retake</span></CancelIcon> : null}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  cameraControls: {
    width: '100%',
    position: 'absolute',
    bottom: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  cameraControlIcon: {
    fontSize: 35,
    color: 'white',
  },
  cameraCaptureIcon: {
    fontSize: 55,
    color: 'white',
  },
  cameraPreviewImage: {
    width: '100%',
  }

}));

export default ProCamera