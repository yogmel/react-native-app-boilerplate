import firebaseconfig from './../firebaseconfig';

async function fetchUserId(localId) {
  const response = await fetch(
    firebaseconfig.usersURI
  );

  const resData = await response.json();
  const result = Object.entries(resData).filter(user => {
    if (localId === user[1].localId) {
      return user;
    }
  });
  return result[0][0];
}

export { fetchUserId }