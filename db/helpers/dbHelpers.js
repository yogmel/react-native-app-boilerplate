import FirebaseClient from './../firebaseApp';

const deleteData = (userId, key) => {
  FirebaseClient.database()
    .ref("users/" + userId)
    .child("denuncias")
    .child(key)
    .remove();
}

const handleBlobImage = uri => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
}

const fetchImageUrl = (localId, date, id) => {
  let uri = "denuncias-media/" + localId + '/' + date + "/denuncias-" + id + "?alt=media";
  uri = uri.replace(/\//g, '%2F');
  uri = uri.replace(/\:/g, '%3A');
  return ("https://firebasestorage.googleapis.com/v0/b/olhos-abertos-2019.appspot.com/o/" + uri);
}

const writeImageStorage = (id, localId, date) => {
  return FirebaseClient
  .storage()
  .ref('denuncias-media')
  .child(localId + "/" + date + "/denuncias-" + id);
}

const writeDataDatabase = (data, currUser, navigation) => {
  const { title, description, anonimo, location, status, date, imgUri, imagensURLs } = data;
  
  FirebaseClient.database().ref('users/' + currUser).child('denuncias').push().set({
    title,
    description,
    anonimo,
    location,
    status,
    date,
    imgUri,
    imagensURLs
  }, function(error) {
    if (error) {
      console.log(error);
    } else {
      setTimeout(function(){  navigation.navigate("HomeScreen") }, 250);
    }
  })
}

export { deleteData, handleBlobImage, writeImageStorage, fetchImageUrl, writeDataDatabase }