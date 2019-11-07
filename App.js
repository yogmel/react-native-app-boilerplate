import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import MinhasDenunciasNavigator from './navigation/MinhasDenunciasNavigator';

console.disableYellowBox = true;

const fetchFonts = () => {
  return Font.loadAsync({
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-bold-italic": require("./assets/fonts/Roboto-BoldItalic.ttf")
  });
};

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);


  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoaded(true);
        }}
        onError={err => console.log(err)}
      />
    );
  }

  return <MinhasDenunciasNavigator />
}