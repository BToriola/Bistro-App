import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  TextInput,
  Dimensions
} from "react-native";

import ShoppingcartIcon from "../reusables/shoppingCartIcon";

import { connect } from "react-redux";

import "firebase/firestore";
import { firebaseRef, db } from "../../services/Firebase";

class FeedDetails extends Component {
  state = {
    isLoading: true,
    item: {},
    key: "",
    count: 1,
    total: 0,
    cartNumber: 0
  };

  static navigationOptions = {
    title: "Food Details",
    headerRight: <ShoppingcartIcon />
  };

  componentDidMount() {
    const { navigation } = this.props;
    const ref = db
      .collection("foods")
      .doc(JSON.parse(navigation.getParam("itemkey")));
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          item: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
      this.setState({ total: this.state.item.price });
    });
  }

  incrementTotal = () => {
    let count = this.state.count;
    let price = this.state.item.price;
    let total = this.state.total;
    this.setState({ count: ++count });
    total = price * count;
    this.setState({ total });
  };

  decrementTotal = () => {
    let count = this.state.count;
    count > 1 ? this.setState({ count: --count }) : this.setState({ count: 1 });

    const price = this.state.item.price;
    let total = this.state.total;
    if (count > 1) {
      total = total - price;
      this.setState({ total });
    } else {
      this.setState({ total: price });
    }
  };

  render() {
    console.log(this.state.item);
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              paddingVertical: 10,
              paddingLeft: 10,
              fontSize: 15,
              fontWeight: "bold",
              color: "#333322",
              alignSelf: "flex-start"
            }}
          >
            {this.state.item.name}
          </Text>
          <View style={{ width: "100%", marginBottom: 20 }}>
            <Image
              source={{ uri: this.state.item.photo }}
              style={{ width: 400, height: 200 }}
            />
          </View>
          <View>
            <Text h5 style={{ color: "#333322" }}>
              {this.state.item.description}
            </Text>
          </View>
          <View style={styles.counter}>
            <View style={{ flex: 1 }}>
              <Button
                title="-"
                onPress={() => {
                  //let count = this.state.count;
                  this.decrementTotal();
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "center", lineHeight: 40 }}>
                {this.state.count}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="+"
                onPress={() => {
                  this.incrementTotal();
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.txtInput}>
              <Text
                style={{
                  textAlign: "justify",
                  alignSelf: "center",
                  justifyContent: "space-around",
                  color: "#333322",
                  lineHeight: 25,
                  padding: 5
                }}
                h4
              >
                N {this.state.total}
              </Text>
            </View>
            <View style={{ flex: 0.7 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#52A052",
                  width: "100%",
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginTop: 30,
                  justifyContent: "center",
                  flexDirection: "row"
                }}
                onPress={() => {
                  this.props.addItemToCart;
                }}
              >
                {this.state.loading && (
                  <ActivityIndicator color="#fff" size="small" />
                )}
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#ffffff"
                  }}
                >
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              fontSize: 5,
              alignItems: "flex-start",
              marginLeft: -20
            }}
          >
            <Button
              onPress={() => {
                this.props.navigation.navigate("Feed");
              }}
              title="<<< Continue Shopping"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default FeedDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  },
  activity: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  txtInput: {
    marginTop: 30,
    marginLeft: 5,
    alignSelf: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    flex: 0.3,
    borderWidth: 0.5,
    alignItems: "flex-start",
    height: 35,
    marginRight: 10
  },
  counter: {
    marginTop: 30,
    marginLeft: 5,
    alignSelf: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 50,
    flexDirection: "row",
    borderWidth: 0.5,
    width: "40%",
    alignItems: "flex-start",

    marginRight: 10,
    flexDirection: "row",
    paddingHorizontal: 30
  }
});
