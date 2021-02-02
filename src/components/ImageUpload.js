import firebase from 'firebase';

export const ImageUpload = async (file) => {
  let imageUrl = ''
  const filename = Date.now();
  const photo = new File([file], filename);
  const storageRef = firebase.storage().ref().child(`images/${filename}`);
  return storageRef.put(photo).then(snapshot => {
    return storageRef.getDownloadURL().then((url) => {
      imageUrl = url
      return imageUrl
    })
  });
}