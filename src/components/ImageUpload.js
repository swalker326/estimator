import firebase from 'firebase';

export const ImageUpload = (file) => {
  let imageUrl = ''  
  const filename = Date.now();
  const storageRef = firebase.storage().ref().child(`images/${filename}`);
  return storageRef.put(file).then(snapshot => {
    return storageRef.getDownloadURL().then((url) => {
      imageUrl = url
      return imageUrl
    })
  });
}