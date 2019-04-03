import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";

import "firebase/firestore";
import { firebaseRef, db } from "../../services/Firebase";
import FeedDetails from "./FeedDetails";

export default class Feed extends Component {
  state = {
    foodArray: [
      {
        foodId: "",
        foodName: "",
        foodPrice: "",
        foodcategory: "",
        foodPhoto:
          "http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png"
      }
    ]
  };

  componentDidMount() {
    db.collection("foods").onSnapshot(querySnapshot => {
      let foodArray = [];
      querySnapshot.forEach(doc => {
        if (doc.exists) {
          let foodStore = doc.data();

          //console.log(doc.id, " => ", doc.data(), doc.data().description);
          foodArray.push({
            key: doc.id,
            doc,
            foodCategory: foodStore.category,
            foodPrice: foodStore.price,
            foodPhoto: foodStore.photo,
            foodName: foodStore.name,
            foodId: foodStore.id
          });
        } else {
          console.log("No such document");
        }
      });
      this.setState({ foodArray });
    });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text
            style={{
              paddingVertical: 15,
              paddingLeft: 10,
              fontSize: 15,
              fontWeight: "bold",
              color: "#333322",
              alignSelf: "flex-start"
            }}
          >
            Most Popular
          </Text>
          {this.state.foodArray.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  this.props.navigation.navigate("FeedDetails", {
                    itemkey: `${JSON.stringify(item.key)}`
                  });
                }}
              >
                <View style={{ alignSelf: "flex-start" }}>
                  <View style={{ width: "100%" }}>
                    <Image
                      source={{ uri: item.foodPhoto }}
                      style={{ width: 400, height: 200 }}
                    />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ padding: 10, flex: 1 }}>
                      {item.foodName}
                    </Text>

                    <Text
                      style={{
                        padding: 10,
                        textAlign: "right",
                        flex: 1
                      }}
                    >
                      ${item.foodPrice}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  }
});
