import { AsyncStorage } from 'react-native';

async function retrieveLocalIdData() {
  try {
    const localId = await AsyncStorage.getItem('localId');
    if (localId !== null) {
      return localId;
    }
  } catch (error) {
    console.log(error)
  }
};

async function writeLocalIdData(localId) {
  try {
    await AsyncStorage.setItem('localId', localId);
  } catch (error) {
    console.log(error)
  }
};

async function writeLocationData(location) {
  try {
    await AsyncStorage.setItem('location', location);
  } catch (error) {
    console.log(error)
  }
};

async function retrieveLocationData() {
  try {
    let location = await AsyncStorage.getItem('location');
    if (location !== null) {
      location = location.split(',');
      return location;
    }
  } catch (error) {
    console.log(error)
  }
};

async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(exception) {
    return false;
  }
}

async function writeUserIdData(userId) {
  try {
    await AsyncStorage.setItem('userId', userId);
  } catch (error) {
    console.log(error)
  }
};


export { retrieveLocalIdData, writeLocalIdData, writeUserIdData, writeLocationData, retrieveLocationData, removeData }