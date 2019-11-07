import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native"; 
import { CheckBox, Tooltip, Text } from "react-native-elements";
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import MapContainer from './../components/formComponents/MapContainer';
import Container from './../components/Container';
import { CommonInput } from './../components/buttons/Inputs';
import { CommonErrorMessage } from './../components/fonts/ErrorMessages';
import SubmitBtn from './../components/buttons/SubmitBtn';
import CommonBtn from './../components/buttons/CommonBtn';

import Colors from './../constants/colors';
import { Ionicons } from "@expo/vector-icons";

import { fetchUserId } from './../db/helpers/userHelpers';
import { handleBlobImage, writeImageStorage, fetchImageUrl, writeDataDatabase } from './../db/helpers/dbHelpers';
import { retrieveLocalIdData, retrieveLocationData } from './../db/helpers/asyncHelpers';
import ImagePickerContainer from "../components/formComponents/ImagePickerContainer";

export default function InputDataScreen(props) {
  const [title, onTitleChange] = useState('')
  const [description, onDescriptionChange] = useState('');
  const [anonimo, onAnonimoChange] = useState(false);
  const [pickedImages, setPickedImages] = useState({
    image1: '',
    image2: '',
    image3: '',
    video1: ''
  })

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    title: false,
    description: false
  })

  const uploadImage = async (uri, id, localId, date) => {
    console.log(uri);
    const blob = await handleBlobImage(uri);
    const ref = writeImageStorage(id, localId, date);
    const snapshot = await ref.put(blob);
    blob.close();
    return await snapshot.ref.getDownloadURL();
  }

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA,
      Permissions.AUDIO_RECORDING
    );
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async (id) => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    saveImage(id);
  };

  const saveImage = async (id) => {
    let image;
    if (id.includes('image')) {
      image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5
      });
    } else {
      image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0,
        durationLimit: 5,
      })
    }

    setPickedImages({...pickedImages, [id]: image.uri});
  }

  async function submitData() {
    setIsLoading(true);
    checkInput(description, "description");
    checkInput(title, "title");
    if ((title.trim() === '') || (description.trim() === '')) {
      setIsLoading(false);
      return;
    }

    const status = "ongoing";
    const date = moment().format('L, h:mm:ss a');
    const dateDb = moment().format();
    let imgUri = '';
    let imagensURLs = [];
    const location = await retrieveLocationData();
    const localId = await retrieveLocalIdData();
    const currUser = await fetchUserId(localId);

    for (const key in pickedImages) {
      if (pickedImages[key] !== '') {
        uploadImage(pickedImages[key], key, localId, dateDb);
        if (key.includes('image')) {
          imgUri = fetchImageUrl(localId, dateDb, key);
        }
        imagensURLs.push(fetchImageUrl(localId, dateDb, key))
      }
    }

    const data = {
      title,
      description,
      anonimo,
      location,
      status,
      date,
      imgUri,
      imagensURLs
    }

    writeDataDatabase(data, currUser, props.navigation);
    setTimeout(function(){  resetInputForms(); }, 1000);
  }

  const resetInputForms = () => {
    onTitleChange('');
    onDescriptionChange('');
    onAnonimoChange(false);
    setIsLoading(false);
  }

  const checkInput = (input, type) => {
    if (input.trim() === '') {
      switch(type) {
        case 'title':
          setErrorMessages({...errorMessages, title: true})
          break;
        case 'description':
          setErrorMessages({...errorMessages, description: true})
          break;
        default:
          return;
      }
      return;
    }
    setErrorMessages({title: false, description: false})
  }

  return (
    <Container extraHeight={150}>
      <View style={styles.imagePickerBox}>
        <ImagePickerContainer
          onPress={() => takeImageHandler('image1')}
          pickedImage={pickedImages.image1}
          title={"Image 1"}
        />
        <ImagePickerContainer
          onPress={() => takeImageHandler('image2')}
          pickedImage={pickedImages.image2}
          title={"Image 2"}
        />
      </View>
      <View style={styles.imagePickerBox}>
        <ImagePickerContainer
          onPress={() => takeImageHandler('image3')}
          pickedImage={pickedImages.image3}
          title={"Image 3"}
        />
        <ImagePickerContainer
          onPress={() => takeImageHandler('video1')}
          pickedImage={pickedImages.video1}
          title={"Video"}
          isVideo={true}
        />
      </View>
      <View style={styles.anonymousBox}>
        <CheckBox
          left
          containerStyle={styles.anonymousCheckbox}
          title="Anonymous"
          checked={anonimo}
          onPress={() => {
            onAnonimoChange(anonimo === true ? false : true);
          }}
        />
        <Tooltip
          popover={
            <Text style={{color: 'white'}}>
              Keep your privacy
            </Text>
          }
          height={100}
          backgroundColor={Colors.greyDark}
        >
          <Ionicons
            name="ios-information-circle-outline"
            size={25}
            color={Colors.greyDark}
          />
        </Tooltip>
      </View>
      <View style={styles.inputContainer}>
        <CommonInput
          value={title}
          onChangeText={text => onTitleChange(text)}
          placeholder="Title"
          onBlur={a => checkInput(title, "title")}
        />
        {errorMessages.title && (
          <CommonErrorMessage>Please insert a title</CommonErrorMessage>
        )}
        <CommonInput
          value={description}
          onChangeText={text => onDescriptionChange(text)}
          style={{ textAlignVertical: "top", width: '100%' }}
          numberOfLines={4}
          multiline={true}
          placeholder="Description"
          onBlur={a => checkInput(description, "description")}
        />
        {errorMessages.description && (
          <CommonErrorMessage>
            Please insert a description
          </CommonErrorMessage>
        )}

        <MapContainer />


      </View>
      {isLoading ? (
        <ActivityIndicator
          size={32}
          color={Colors.accentDark}
          style={styles.loadingIndicator}
        />
      ) : (
        <View>
          <SubmitBtn onPress={submitData}>SUBIT</SubmitBtn>
          <CommonBtn onPress={() => {}}>SAVE</CommonBtn>
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  imagePickerBox: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 15
  },
  anonymousBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  anonymousCheckbox: {
    borderWidth: 0,
    backgroundColor: 'white',
    margin: 0
  },
  loadingIndicator: {
    marginTop: 30
  },
});
