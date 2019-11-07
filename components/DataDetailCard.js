import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import Colors from './../constants/colors';
import { Ionicons } from "@expo/vector-icons";

import TitleText from "./../components/fonts/TitleText";
import MetaDataText from "./../components/fonts/MetaDataText";
import BodyText from "./../components/fonts/BodyText";
import SubtitleText from "./../components/fonts/SubtitleText";

export default DataDetailCard = props => {
  const {
    anonimo,
    description,
    id,
    location,
    photos,
    title,
    date,
    status
  } = props.data;

  return (
    <View>
      <Image style={styles.dataImg} source={{ uri: photos }} />
      <View style={styles.dataDescription}>
        <View style={styles.dataDescriptionTitle}>
          <TitleText style={{ fontSize: 24 }}>{title}</TitleText>
          <TouchableOpacity onPress={props.onPressDelete}>
            <Ionicons name="md-trash" size={30} color={Colors.cancel} />
          </TouchableOpacity>
        </View>
        {anonimo && (
          <SubtitleText style={{ color: Colors.accentDark }}>
            Anônima
          </SubtitleText>
        )}
        <View style={styles.dataDescriptionText}>
          <BodyText style={{ lineHeight: 25 }}>{description}</BodyText>
        </View>
      </View>

      <View style={styles.dataStatus}>
        <View style={styles.dataStatusCircle}></View>
        <MetaDataText style={{ fontSize: 18 }}>
          {status === "andamento" ? "Em avaliação" : "Avaliado"}
        </MetaDataText>
      </View>
      <View style={styles.dataReply}>
        <SubtitleText style={{ color: Colors.accentDark }}>
          Resposta Denúncia
        </SubtitleText>
        <BodyText style={{ lineHeight: 25 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          commodo mattis faucibus. Ut convallis risus facilisis, luctus libero
          quis, lacinia est. Integer a velit vehicula, efficitur libero in,
          vulputate libero. Vestibulum varius urna quis nunc sagittis dictum.
          Nullam a ultricies metus.
        </BodyText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dataImg: {
    width: '100%',
    height: 200,
    overflow: "hidden",
  },
  dataDescription: {
    padding: 15
  },
  dataDescriptionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 15
  },
  dataDescriptionText: {
    marginTop: 10
  },
  dataStatus: {
    flexDirection: 'row',
    padding: 15
  },
  dataStatusCircle: {
    backgroundColor: Colors.accentLight,
    width: 20,
    height: 20,
    borderRadius: 25,
    marginRight: 10
  },
  dataReply: {
    padding: 15
  }
});