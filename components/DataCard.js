import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TitleText from './fonts/TitleText';
import MetaDataText from './fonts/MetaDataText';
import Colors from '../constants/colors';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default DataCard = props => {
  return (
    <View key={props.keyIndex} style={styles.dataCard}>
      <TouchableOpacity
        onPress={props.cardLink}
        underlayColor={"rgba(0,0,0,.05)"}
      >
        <View style={styles.dataCardDetails}>
          <Image source={{ uri: props.data.photos }} style={styles.dataImg} />
          <View style={styles.dataDetails}>
            <TitleText>{props.data.title}</TitleText>
            <View style={styles.dataMeta}>
              <MetaDataText>{props.data.date}</MetaDataText>

              <MaterialCommunityIcons
                style={styles.metaData}
                name="checkbox-blank-circle"
                size={18}
                color={
                  props.data.status === "andamento"
                    ? Colors.accentLight
                    : Colors.green
                }
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.deleteLink}>
        <Ionicons name="md-trash" size={30} color={Colors.cancel} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dataCard: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataCardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    marginBottom: 20
  },
  dataDetails: {
    marginLeft: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderColor: '#C1C1C1',
    paddingBottom: 10
  },
  dataMeta: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  metaData: {
    marginLeft: 10
  },
  dataImg: {
    width: 75,
    height: 75,
    borderRadius: 100
  }
});