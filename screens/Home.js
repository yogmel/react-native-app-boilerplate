import React from "react";
import {Text} from "react-native";
import Data from './../model/data';
import firebaseconfig from './../db/firebaseconfig';

import { fetchUserId } from './../db/helpers/userHelpers';
import { deleteData } from './../db/helpers/dbHelpers';
import DataCard from "../components/DataCard";
import Container from "./../components/Container";

import { retrieveLocalIdData, writeUserIdData } from './../db/helpers/asyncHelpers';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetching: true,
      isUpdating: true,
      localId: '',
      userId: ''
    };
  }

  async fetchProducts(localId, userId) {
    let loadedData = [];

    let result = "";
    if (localId === "") {
      result = userId;
    } else {
      result = await fetchUserId(localId);
    }
    const response2 = await fetch(
      `${firebaseconfig.userURL}${result}/denuncias.json`
    );

    const resData2 = await response2.json();
    for (const key in resData2) {
      loadedData.push(
        new Data(
          resData2[key].anonimo,
          resData2[key].description,
          key,
          resData2[key].location,
          resData2[key].imgUri,
          resData2[key].title,
          resData2[key].date,
          resData2[key].status
        )
      );
    }

    this.setState(() => ({
      data: loadedData,
      isUpdating: true
    }));
  }

  initApp = async () => {
    const localId = await retrieveLocalIdData();
    if (localId) {
      const userId = await fetchUserId(localId);
      writeUserIdData(userId);
      this.setState(() => ({ localId, userId }))
    }
  };

  componentDidMount() {
    this.initApp();

    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.fetchProducts(this.state.localId);
      }
    );
  }

  async handleDenunciaDelete(key) {
    deleteData(this.state.userId, key);
    this.setState(() => ({
      isUpdating: false
    }));
    this.fetchProducts("", this.state.userId);
  }

  render() {
    return (
      <Container
        boxStyle={{
          position: "absolute",
          top: -50,
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <Text>{this.state.string}</Text>
        {this.state.data.map((data, index) => (
          <DataCard
            key={index}
            keyIndex={index}
            cardLink={() => {
              this.props.navigation.navigate("DataDetailScreen", {
                data,
                localId: this.state.localId
              });
            }}
            deleteLink={() => this.handleDenunciaDelete(data.id)}
            data={data}
          />
        ))}
      </Container>
    );
  }
}

export default Home;