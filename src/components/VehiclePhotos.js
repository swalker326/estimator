import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core/';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CameraModal from './CameraModal';

const VehiclePhotos = (props) => {
  // const { photos } = props;
  const updatePhotos = props.onCapture;
  const setPhotos = props.onChange;
  const photos = props.photos; 
  console.log("vehicle photos", photos); // eslint-disable-line

  const removePhoto = (photoName) => {
    const photosArray = photos.filter((photo) => photoName !== photo.name);
    setPhotos(photosArray);
  }

  const classes = useStyles();
  return (
    <Box display='flex' borderColor='primary' className={classes.root} >
      <GridList cellHeight={160} className={classes.gridList} cols={6}>
        <GridListTile key='add icon' className={classes.gridListTile} cols={2}>
          <div className={classes.addIconContainer}>
            <CameraModal onCapture={updatePhotos} />
          </div>
        </GridListTile>
        {photos.map((photo, index) => (
          <GridListTile key={photo.name} className={classes.gridListTile} cols={2}>
            <span onClick={() => removePhoto(photo.name)} className={classes.closeButton}>X</span>
            <img src={photo.img} alt={`damageImage-${index}`} />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: '90vw',
    height: 450,
  },
  gridListTile: {
    borderRadius: '1rem',
    objectFit: 'cover',
  },
  addIconContainer: {
    height: '100%',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    zIndex: 1,
    margin: '3px',
    left: '2%',
    top: '2%',
    textAlign: 'center',
    textEmphasis: 'bold',
    color: 'primary',
    position: 'absolute',
    backgroundColor: '#fff',
    padding: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
  }
}));

export default VehiclePhotos
