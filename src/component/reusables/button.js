import React, { Component } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";

class ButtonScreen extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#52A052",
            paddingHorizontal: 90,
            paddingVertical: 10,
            borderRadius: 50,
            marginBottom: 10
          }}
          onPress={this.props.onPress}
        >
          <View>
            <Text style={{ color: "white" }}>{this.props.logIn}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff",
            paddingHorizontal: 90,
            paddingVertical: 10,
            borderRadius: 50,
            borderWidth: 0.5,
            borderColor: "#999999"
          }}
        >
          <View>
            <Text style={{ color: "black", backgroundColor: "white" }}>
              {this.props.signUp}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ButtonScreen;
