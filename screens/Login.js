import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import BodyText from './../components/fonts/BodyText';
import Container from './../components/Container';
import SubmitBtn from './../components/buttons/SubmitBtn';
import { emailRegex } from './../constants/regex';

import { EmailInput, PasswordInput } from './../components/buttons/Inputs';
import { validateLogin } from './../db/helpers/authHelpers';
import { retrieveLocalIdData, writeLocalIdData } from './../db/helpers/asyncHelpers';

import Colors from './../constants/colors';

export default Login = props => {
  const [email, onEmailChange] = useState('');
  const [password, onPasswordChange] = useState('');
  const [errorMessage, onErrorMessageChange] = useState(false);
  const [errorMessageEmail, onErrorMessageEmailChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onAppStart() {
    const localId = await retrieveLocalIdData();
    if (localId !== undefined) {
      props.navigation.navigate("InputDataScreen");
    }
  }

  onAppStart();

  async function handleSubmit() {
    setIsLoading(true);
    const response = await validateLogin(email, password);
    if (!response.ok)
      await showErrorMessage(response);
    await handleSuccessfulLogin(response)
  }

  async function showErrorMessage(response) {
    onErrorMessageEmailChange(true);
    setIsLoading(false);
    const resData = await response.json();
    throw new Error(resData.error.message);
  }

  async function handleSuccessfulLogin(response) {
    onErrorMessageEmailChange(false);
    const resData = await response.json();

    writeLocalIdData(resData.localId);

    props.navigation.navigate("InputDataScreen");
    setIsLoading(false);
  }

  function resetErrorMessages() {
    onErrorMessageEmailChange(false);
    onErrorMessageChange(false);
  }

  function checkEmailInput() {
    const handleEmailRegex = emailRegex;
    const emailInput = email.trim();

    if (!handleEmailRegex.test(email.toLowerCase())) {
      onErrorMessageChange(true);
      return;
    }
    resetErrorMessages()
    onEmailChange(emailInput)
  }

  return (
    <Container extraHeight={100}>
      <BodyText style={styles.textoSuporte}>
        Fill the information below to start
      </BodyText>
      <View style={styles.inputContainer}>
        <EmailInput
          onChangeText={text => onEmailChange(text)}
          email={email}
          checkEmailInput={checkEmailInput}
        />
        {errorMessage && (
          <Text style={styles.errorMessage}>
            Please insert a valid email
          </Text>
        )}
        <PasswordInput
          password={password}
          onChangeText={password => onPasswordChange(password)}
        />
      </View>
      {errorMessageEmail && (
        <Text style={styles.errorMessageEmail}>
          Invalid email or password
        </Text>
      )}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SubmitBtn onPress={handleSubmit}>START</SubmitBtn>
      )}
      <TouchableOpacity activeOpacity={0.6} style={styles.buttonBox}>
        <View>
          <Text style={styles.buttonArmazenar}>I forgot my password</Text>
        </View>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  textoSuporte: {
    textAlign: "center"
  },
  inputContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: "white"
  },
  errorMessage: {
    color: "red",
    margin: 15
  },
  errorMessageEmail: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 18
  },
  buttonArmazenar: {
    fontSize: 18,
    fontFamily: "roboto-bold",
    color: Colors.greyLight,
    textAlign: "center"
  }
});
