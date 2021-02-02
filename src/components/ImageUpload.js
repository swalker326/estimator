import firebase from 'firebase';
import uuid from 'react-uuid'

export const ImageUpload = async (file) => {
  let imageUrl = ''
  const filename = uuid();
  const storageRef = firebase.storage().ref().child(`images/${filename}`);
  return storageRef.put(file).then(snapshot => {
    return storageRef.getDownloadURL().then((url) => {
      imageUrl = url
      return imageUrl
    })
  });
}