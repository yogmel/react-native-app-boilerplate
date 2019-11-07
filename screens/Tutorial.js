import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from './../constants/colors';

import TitleText from './../components/fonts/TitleText';
import BodyText from './../components/fonts/BodyText';
import { Ionicons } from '@expo/vector-icons';
import { retrieveLocalIdData } from './../db/helpers/asyncHelpers';


const slides = [
  {
    key: '1',
    title: 'Step 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel aliquet nibh. Nunc ut ante ligula. Suspendisse mattis posuere tellus, et mattis augue consectetur cursus. Quisque risus libero, dignissim a feugiat et, laoreet nec ipsum. In accumsan hendrerit semper. '
  },
  {
    key: '2',
    title: 'Step 2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel aliquet nibh. Nunc ut ante ligula. Suspendisse mattis posuere tellus, et mattis augue consectetur cursus. Quisque risus libero, dignissim a feugiat et, laoreet nec ipsum. In accumsan hendrerit semper. '
  },
  {
    key: '3',
    title: 'Step 3',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel aliquet nibh. Nunc ut ante ligula. Suspendisse mattis posuere tellus, et mattis augue consectetur cursus. Quisque risus libero, dignissim a feugiat et, laoreet nec ipsum. In accumsan hendrerit semper. '
  }
];

export default class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false
    };
  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.tutorialContainer}>
        <View style={styles.tutorialModal}>
          <TitleText style={styles.tutorialTitle}>{item.title}</TitleText>
          <BodyText style={styles.tutorialDescription}>{item.text}</BodyText>
        </View>
      </View>
    );
  }

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  _onDone = async () => {
    this.props.navigation.navigate("Login");
    const localId = await retrieveLocalIdData();
    if (localId !== undefined) {
      this.props.navigation.navigate("InputDataScreen");
    }
  }

  render() {
    if (this.state.showRealApp) {
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides}
          onDone={this._onDone}
          renderNextButton={this._renderNextButton}
          renderDoneButton={this._renderDoneButton}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialContainer: {
    flex: 1,
    backgroundColor: Colors.greyLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialModal: {
    height: 300,
    width: '90%',
    backgroundColor: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    padding: 30
  },
  tutorialTitle: {
    fontSize: 24,
    marginBottom: 15
  },
  tutorialDescription: {
    textAlign: 'center',
    lineHeight: 24
  }
})