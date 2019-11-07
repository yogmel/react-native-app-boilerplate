import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default Container = props => {
  return (
    <View style={styles.container}>
      <View style={{...styles.boxStyle, ...props.boxStyle}}>
        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={props.extraHeight}>
          <ScrollView contentContainerStyle={{...styles.containerStyle, ...props.containerStyle}}>
            {props.children}
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative'
  },
  denunciasBox: {
    flex: 1,
    flexGrow: 1,
    padding: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: 'white',
    width: '100%'
  },
  containerStyle: {
    width: '100%',
    paddingBottom: 50
  },
});
