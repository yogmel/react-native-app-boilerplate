import React from 'react';
import { View } from 'react-native';
import MapInput from './MapInput';
import MyMapView from './MapView';
import { getLocation, geocodeLocationByName } from './location-service';
import { writeLocationData, removeData } from './../../db/helpers/asyncHelpers';

class MapContainer extends React.Component {
  state = {
    region: {}
  };

  componentDidMount() {
    this.getInitialState();
    removeData('location');
  }

  getInitialState() {
    getLocation().then(
      (data) => {
        this.setState({
          region: {
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
          }
        });
      }
    );
  }

  getCoordsFromName(loc) {
    this.setState({
      region: {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      }
    });
    
    const locationCoords = loc.lat + ',' + loc.lng

    writeLocationData(locationCoords);
    console.log('region', locationCoords);
  }

  onMapRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 20, justifyContent: 'center' }}>
        <View style={{ flex: 1 }}>
          <MapInput notifyChange={loc => this.getCoordsFromName(loc)} />
        </View>

        {this.state.region["latitude"] ? (
          <View style={{ flex: 1, marginTop: 20 }}>
            <MyMapView
              region={this.state.region}
              onRegionChange={reg => this.onMapRegionChange(reg)}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default MapContainer;