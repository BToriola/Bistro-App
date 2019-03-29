import React, { Component } from "react";
import { Text, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

export default class Logout extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Logout",
      headerLeft: (
        <Icon
          name="md-menu"
          size={30}
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.openDrawer()}
        />
      )
    };
  };

  render() {
    return (
      <View>
        <Text> Click to Logout </Text>
      </View>
    );
  }
}
