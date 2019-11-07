import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NavText from './../components/fonts/NavText';
import Colors from './../constants/colors';

export default LoginTab = (props) => {  
  return (
    <View style={styles.header}>
      {/* <Image
        source={require("Your Logo URI")}
        resizeMode="cover"
      /> */}
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate({ routeName: "Login" });
          }}
        >
          <NavText
            style={props.navigation.state.index === 0 ? styles.navActive : ""}
          >
            Login
          </NavText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate({ routeName: "Signup" });
          }}
        >
          <NavText
            style={props.navigation.state.index === 1 ? styles.navActive : ""}
          >
            Registration
          </NavText>
        </TouchableOpacity>
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
    width: 150
  },
  navActive: {
    color: Colors.accentLight,
    borderBottomColor: Colors.accentLight,
    paddingBottom: 10,
    borderBottomWidth: 1
  }
});
