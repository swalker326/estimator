import React, { useState, useRef } from "react";
import Measure from "react-measure";
import { ImageUpload } from './ImageUpload';
import { useUserMedia } from "./hooks/useMediaStream";
import { useCardRatio } from "./hooks/useContainerRatio";
import { useOffsets } from "./hooks/useOffsets";
import CameraIcon from '@material-ui/icons/Camera';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import {
  Video,
  Canvas,
  Wrapper,
  Container,
  Flash,
  Overlay,
} from "./styles";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "environment" }
};

export const Camera = ({ onCapture, onClear }) => {
  const canvasRef = useRef();
  const videoRef = useRef();

  const classes = useStyles();

  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);


  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [aspectRatio, calculateRatio] = useCardRatio(1.586);
  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height
  );

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  const handleResize = (contentRect) => {
    setContainer({
      width: contentRect.bounds.width,
      height: Math.round(contentRect.bounds.width / aspectRatio)
    });
  }

  const handleCanPlay = () => {
    calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
    setIsVideoPlaying(true);
    videoRef.current.play();
  }

  const handleCapture = () => {
    const context = canvasRef.current.getContext("2d");

    context.drawImage(
      videoRef.current,
      0,
      0,
      container.width,
      container.height,
    );

    canvasRef.current.toBlob(blob => {
      setTempPhoto(blob);
    }, "image/jpeg", 1);
    setIsCanvasEmpty(false);
    setIsFlashing(true);
    setPhotoTaken(true);
  }

  const handleClear = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsCanvasEmpty(true);
    setPhotoTaken(false);
    onClear();
  }
  const handleSave = () => {
    ImageUpload(tempPhoto);
    onCapture(tempPhoto);
    setIsCanvasEmpty(true);
    handleClear();
  }

  if (!mediaStream) {
    return null;
  }

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <Wrapper>
          <Container
            ref={measureRef}
            maxHeight={videoRef.current && videoRef.current.videoHeight}
            maxWidth={videoRef.current && videoRef.current.videoWidth}
            style={{
              height: `${container.height}px`
            }}
          >
            <Video
              ref={videoRef}
              hidden={!isVideoPlaying}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
              muted
              style={{
                left: `-${offsets.x}px`
              }}
            />

            <Overlay hidden={!isVideoPlaying}>
            </Overlay>


            <Canvas
              ref={canvasRef}
              width={container.width}
              height={container.height}
              style={{
                left: `-${offsets.x}px`,
                height: "100vh"
              }}
            ></Canvas>


            <Flash
              flash={isFlashing}
              onAnimationEnd={() => setIsFlashing(false)}
            />
          </Container>

          <div className={classes.captureControlWrapper}>
            {photoTaken ? (
              <div className={classes.captureControlsSave}>
                <div className={classes.captureControlsGroup}>
                  <CancelIcon style={{ fontSize: 55, color: 'white' }} onClick={handleClear} />
                  <span className={classes.cameraIconLabel}>Retake</span>
                </div>
                <div className={classes.captureControlsGroup}>
                  <SendIcon style={{ fontSize: 55, color: 'white' }} onClick={handleSave} />
                  <span className={classes.cameraIconLabel}>Save</span>
                </div>
              </div>) : isVideoPlaying && (
                <CameraIcon style={{ fontSize: 55, color: 'white' }} onClick={isCanvasEmpty ? handleCapture : handleClear}>{isCanvasEmpty ? "Take a picture" : "Take another picture"}</CameraIcon>
              )}
          </div>
        </Wrapper>
      )}
    </Measure>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  captureControlWrapper: {
    position: 'absolute',
    bottom: '2.5rem',
    top: 'auto'
  },
  captureControlsSave: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100vw',
  },
  captureControlsGroup: {
    display:'flex',
    flexDirection: 'column',
  },
  cameraIconLabel: {
    color: "#fff",
    fontWeight: 800,
  },

}));
