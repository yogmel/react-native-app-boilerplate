import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NavText from './../components/fonts/NavText';
import Colors from './../constants/colors';

export default TabBar = props => {
  return (
    <View style={styles.header}>
      {/* <Image
        source={require("Your Logo URI")}
        resizeMode="cover"
      /> */}
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("HomeScreen");
          }}
        >
          <NavText
            style={props.navigation.state.index === 0 ? styles.navActive : ""}
          >
            My Data
          </NavText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("InputDataScreen");
          }}
        >
          <NavText
            style={props.navigation.state.index === 1 ? styles.navActive : ""}
          >
            Input Data
          </NavText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 300
  },
  navActive: {
    color: Colors.accentLight,
    borderBottomColor: Colors.accentLight,
    paddingBottom: 10,
    borderBottomWidth: 1
  }
});
