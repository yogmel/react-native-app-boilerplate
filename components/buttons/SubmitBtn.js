import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from './../../constants/colors';

const SubmitBtn = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.buttonBox} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    marginTop: 40,
    width: '100%'
  },
  button: {
    backgroundColor: Colors.accentDark,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    marginVertical: 20,
    width: '100%',
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    padding: 10,
    fontFamily: 'roboto-bold',
    textAlign: 'center'
  }
});

export default SubmitBtn;
