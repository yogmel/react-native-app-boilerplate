import key from './../key';
import firebaseconfig from './../firebaseconfig';

async function validateLogin(email, password) {
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    }),
  })
}

async function writeSignUp(email, password, name) {
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
      returnSecureToken: true
    }),
  })
}

async function insertUserDb(name, email, address, localId) {
  return fetch(firebaseconfig.usersURI, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      address,
      localId
    }),
  })
}

export { validateLogin, writeSignUp, insertUserDb }