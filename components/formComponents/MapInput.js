import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from './../../constants/colors';
import { API_KEY } from './../../db/key';

function MapInput(props){
  return (
    <GooglePlacesAutocomplete
    styles={{
      container: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 0
      },
      textInputContainer: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth:0
      },
      textInput: {
        marginLeft: 0,
        marginRight: 0,
        color: '#5d5d5d',
        fontSize: 16,
        height: 50,
        width: '100%',
        padding: 15,
        marginVertical: 15,
        borderRadius: 30,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        color: Colors.greyLight,
        backgroundColor: 'white'
      },
      listView: {
        marginTop: 15 
      }  
    }}
      placeholder="Enter Location"
      minLength={2}
      returnKeyType={"search"}
      listViewDisplayed={false}
      fetchDetails={true}
      onPress={(data, details = null) => {
        props.notifyChange(details.geometry.location);
      }}
      query={{
        key: API_KEY,
        language: "en"
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={300}
    />
  );
}


export default MapInput;
