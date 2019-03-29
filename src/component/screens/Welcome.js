import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";

import FadeInView from "../reusables/fadeinview";

import "firebase/firestore";

export default class WelcomeScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <FadeInView style={styles.logo}>
          <View>
            <Image source={require("../../../assets/logo.png")} />
          </View>
        </FadeInView>

        <FadeInView style={styles.text}>
          <Text
            style={{
              color: "#52A052",
              fontSize: 25,
              fontWeight: "bold",
              padding: 15
            }}
          >
            Welcome to Bistro
          </Text>
          <Text
            style={{
              color: "#888888",
              textAlign: "center"
            }}
          >
            Check out our menus, order food and make reservations
          </Text>
        </FadeInView>
        <View style={styles.button}>
          <TouchableOpacity
            style={{
              backgroundColor: "#52A052",
              paddingHorizontal: 90,
              paddingVertical: 10,
              borderRadius: 50,
              marginBottom: 10,
              alignItems: "center"
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "white" }}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#ffffff",
              paddingHorizontal: 90,
              paddingVertical: 10,
              borderRadius: 50,
              borderWidth: 0.5,
              borderColor: "#999999",
              alignSelf: "center"
            }}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={{ color: "black", backgroundColor: "white" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column"
  },
  logo: {
    flex: 1,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
    marginBottom: 20
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20
  },
  button: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: -30
  }
});
