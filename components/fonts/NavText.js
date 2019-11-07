import React from "react";
import { Text, StyleSheet } from "react-native";
import Colors from './../../constants/colors';

const NavText = props => {
  return (
    <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    color: Colors.greyDark
  }
});

export default NavText;