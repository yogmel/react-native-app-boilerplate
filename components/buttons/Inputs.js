import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from './../../constants/colors';

export const EmailInput = props => {
  return (
    <TextInput
      style={styles.commonInput}
      value={props.email}
      onChangeText={props.onChangeText}
      id="email"
      label="E-Mail"
      keyboardType="email-address"
      required
      autoCapitalize="none"
      initialValue=""
      clearTextOnFocus
      maxLength={300}
      placeholder="Seu email"
      textContentType="emailAddress"
      onBlur={props.checkEmailInput}
    />
  );
}

export const PasswordInput = props => {
  return (
    <TextInput
      secureTextEntry
      required
      id="password"
      label="Senha"
      style={styles.commonInput}
      value={props.password}
      onChangeText={props.onChangeText}
      textContentType="password"
      placeholder="Sua senha"
    />
  );
}

export const CommonInput = props => {
  return (
    <TextInput
      style={{...styles.commonInput,...props.style}}
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      onBlur={props.onBlur}
      numberOfLines={props.numberOfLines}
      multiline={props.multiline}
    />
  );
}

const styles = StyleSheet.create({
  commonInput: {
    padding: 15,
    marginTop: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    color: Colors.greyLight,
    backgroundColor: 'white'
  }
});
