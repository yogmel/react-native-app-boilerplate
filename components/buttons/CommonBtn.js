import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from './../../constants/colors';

const CommonBtn = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={{...styles.button}}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 9,
    marginVertical: 20,
    width: '100%',
  },
  confirm: {
    backgroundColor: Colors.accentLight
  },
  cancel: {
    backgroundColor: Colors.cancel
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'roboto-bold',
    color: Colors.greyLight,
    textAlign: 'center'
  }
});

export default CommonBtn;
