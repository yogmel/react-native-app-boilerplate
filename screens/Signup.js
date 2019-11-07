import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import BodyText from './../components/fonts/BodyText'; 
import Container from './../components/Container';
import { writeSignUp, insertUserDb } from './../db/helpers/authHelpers';
import { CommonInput, PasswordInput } from './../components/buttons/Inputs';
import { CommonErrorMessage, HighlightErrorMessage } from './../components/fonts/ErrorMessages';
import SubmitBtn from './../components/buttons/SubmitBtn';

import { emailRegex } from './../constants/regex';

export default Signup = props => {
  const [email, onEmailChange] = useState('');
  const [password, onPasswordChange] = useState('');
  const [name, onNameChange] = useState('');
  const [address, onAddressChange] = useState('');

  const [errorMessages, setErrorMessages] = useState({
    message: false,
    name: false,
    address: false,
    password: false,
    email: false,
    signup: false
  });

  const [valid, onValidChange] = useState(false);

  function checkInputs() {
    checkEmailInput();
    checkInput(name, 'name');
    checkInput(address, 'address');
    checkInput(password, 'password');
  }

  async function showErrorMessage(response) {
    const resData = await response.json();
    setErrorMessages({...errorMessages, signup: true});
    throw new Error(resData.error.message);
  }

  async function handleSubmit() {
    checkInputs();
    if (valid) {
      const response = await writeSignUp(email, password, name);
      if (!response.ok)
        showErrorMessage(response);
      const resData = await response.json();
      if (resData)
        handleInsertUserDb(resData.localId);
    } else {
      checkInputs();
    }
  }

  async function handleInsertUserDb(localId) {
      const response = await insertUserDb(name, email, address, localId);
      if (!response.ok) {
        showErrorMessage(response);
      }
  
      const resData = await response.json();
      props.navigation.navigate("HomeScreen", {
        localId: resData.localId
      });
  }

  const handleEmailErrorMessage = (valid, emailInput) => {
    if (valid) {
      setErrorMessages({...errorMessages, email: false});
      onValidChange(true);
    } else {
      setErrorMessages({...errorMessages, email: true});
      onValidChange(false)
    }
    onEmailChange(emailInput);
  }

  const checkEmailInput = () => {
    const handleEmailRegex = emailRegex;
    const emailInput = email.trim();
    if (!handleEmailRegex.test(email.toLowerCase())) {
      handleEmailErrorMessage(false, emailInput)
      return;
    }
    handleEmailErrorMessage(true, emailInput);
  }

  const checkInput = (input, type) => {
    if (input.trim() === '') {
      switch(type) {
        case 'name':
          setErrorMessages({...errorMessages, name: true});
          onValidChange(false);
          break;
        case 'address':
          setErrorMessages({...errorMessages, address: true});
          onValidChange(false);
          break;
        case 'password':
          setErrorMessages({...errorMessages, password: true});
          onValidChange(false);
          break;
        default:
          return;
      }
      return;
    }
    setErrorMessages({name: false, address: false, password: false});
    onValidChange(true);
  }

  return (
    <Container extraHeight={180}>
      <BodyText style={styles.textoSuporte}>
        Fill the form below to sign up
      </BodyText>
      <View style={styles.inputContainer}>
        <CommonInput
          value={email}
          onChangeText={email => onEmailChange(email)}
          placeholder="Email"
          onBlur={checkEmailInput}
        />
        {errorMessages.email && (
          <CommonErrorMessage>
            Please insert a valid email
          </CommonErrorMessage>
        )}

        <CommonInput
          value={name}
          onChangeText={name => onNameChange(name)}
          placeholder="Name"
          onBlur={a => checkInput(name, "name")}
        />
        {errorMessages.name && (
          <CommonErrorMessage>
            Please insert your name
          </CommonErrorMessage>
        )}

        <CommonInput
          value={address}
          onChangeText={address => onAddressChange(address)}
          placeholder="Address"
          onBlur={a => checkInput(address, "address")}
        />
        {errorMessages.address && (
          <CommonErrorMessage>
            Please insert your address
          </CommonErrorMessage>
        )}

        <PasswordInput
          password={password}
          onChangeText={password => onPasswordChange(password)}
        />
        {errorMessages.password && (
          <CommonErrorMessage>
            Please insert a valid password (greater than 6 characters)
          </CommonErrorMessage>
        )}
      </View>
      {errorMessages.signup && (
        <HighlightErrorMessage>
          Person already signed up
        </HighlightErrorMessage>
      )}
      <SubmitBtn onPress={handleSubmit}>SIGN UP</SubmitBtn>
    </Container>
  );
}

const styles = StyleSheet.create({
  textoSuporte: {
    textAlign: 'center'
  },
  inputContainer: {
    width: '100%',
    padding: 15
  }
});
