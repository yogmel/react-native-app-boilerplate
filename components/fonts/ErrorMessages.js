import React from "react";
import { Text, StyleSheet } from "react-native";

export const CommonErrorMessage = props => {
  return (
    <Text style={styles.errorMessageCommon}>
      {props.children}
    </Text>
  );
}

export const HighlightErrorMessage = props => {
  return <Text style={styles.errorMessageHighlight}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  errorMessageCommon: {
    color: 'red',
    margin: 15,
  },
  errorMessageHighlight: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 18
  }
});
