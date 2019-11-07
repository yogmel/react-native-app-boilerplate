import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MyMapView = props => {
  return (
    <MapView
      style={styles.mapview}
      region={props.region}
      showsUserLocation={true}
      // onRegionChange={reg => props.onRegionChange(reg)}
    >
      <Marker coordinate={props.region} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapview: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MyMapView;
