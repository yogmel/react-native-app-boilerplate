import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions
} from "react-native"; 
import NavText from './../../components/fonts/NavText';

import Colors from './../../constants/colors';
import { Ionicons } from "@expo/vector-icons";
 
export default ImagePickerContainer = props => {
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.imageBox} onPress={props.onPress}>
          {!props.pickedImage ? (
            <View style={styles.imageIcons}>
              {props.isVideo ? (
                <Ionicons name="md-videocam" size={30} color={"white"} />
              ) : (
                <Ionicons name="md-images" size={30} color={"white"} />
              )}
              <Ionicons name="ios-add" size={30} color={"white"} />
            </View>
          ) : (
            <Image style={styles.image} source={{ uri: props.pickedImage }} />
          )}
        </TouchableOpacity>
        <NavText style={{ textAlign: "center", marginTop: 10 }}>
          {props.title}
        </NavText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  },
  imageIcons: {
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderRadius: 20
  },
  imageContainer: {
    width: Dimensions.get('window').width / 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageBox: {
    backgroundColor: Colors.greyLight,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderRadius: 20
  },
});
