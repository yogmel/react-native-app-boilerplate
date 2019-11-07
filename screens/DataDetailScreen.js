import React, { useState } from "react";
import DataDetailCard from "../components/DataDetailCard";
import TabDataDetails from './../components/TabDataDetails';
import { fetchUserId } from './../db/helpers/userHelpers';
import { deleteData } from './../db/helpers/dbHelpers';
import { retrieveLocalIdData } from './../db/helpers/asyncHelpers';

const TabNav = (props) => {
  return <TabDataDetails
      onPressReturn={() => {
        props.navigation.navigate("HomeScreen");
      }}
    />
}

DataDetailScreen.navigationOptions = () => {
  return { header: TabNav };
};

export default function DataDetailScreen (props) {
  const [localId, setLocalId] = useState('');

  const { id } = props.navigation.state.params.data;

  initApp = async () => {
    const localId = await retrieveLocalIdData();
    if (localId) {
      setLocalId(localId)
    }
  };

  initApp();

  async function handleDataDelete(key) {
    const userId = await fetchUserId(localId);
    deleteData(userId, key);
    props.navigation.navigate("HomeScreen");
  }

  return (
    <Container
      boxStyle={{elevation: 0, shadowColor: "transparent"}}
    >
      <DataDetailCard
        data={props.navigation.state.params.data}
        onPressDelete={() => handleDataDelete(id)}
      />
    </Container>
  );
}