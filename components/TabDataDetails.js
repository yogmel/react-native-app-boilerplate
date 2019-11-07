import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Colors from './../constants/colors';
import NavText from "./../components/fonts/NavText";
import { Ionicons } from "@expo/vector-icons";

export default TabDataDetails = props => {
  return (
    <View style={styles.header}>
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={props.onPressReturn}>
          <NavText>
            <Ionicons name="ios-arrow-back" size={32} />
          </NavText>
        </TouchableOpacity>
        <View style={styles.navContainerNav}>
          <NavText style={{ color: Colors.accentDark, fontSize: 24 }}>
            My Data
          </NavText>
          <View style={styles.navHorizontalLine}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: 300
  },
  navContainerNav: {
    alignItems: 'flex-end'
  },
  navHorizontalLine: {
    backgroundColor: Colors.accentDark,
    width: 80,
    height: 2
  },
});
