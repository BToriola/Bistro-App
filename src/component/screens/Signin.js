import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import "firebase/firestore";
import * as firebase from "firebase";
import { firebaseRef } from "../../services/Firebase";
import { Facebook } from "expo";

export default class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log(user);
      }
    });
  }

  async logInFB() {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "333483097306388",
        {
          permissions: ["public_profile"]
        }
      );
      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(() => {
            this.props.navigation.navigate("Feed");
          })
          .catch(error => {
            console.log(error);
          });
        // Get the user's name using Facebook's Graph API
        //const response = await fetch(
        //`https://graph.facebook.com/me?access_token=${token}`
        //);
      } else {
        type === "cancel";
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  onButtonPress = () => {
    this.setState({
      error: "",
      loading: true
    });
    const { email, password } = this.state;
    firebaseRef
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess())
      .then(() => {
        this.props.navigation.navigate("Feed");
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          this.onLoginFailure("Weak password!");
        } else {
          this.onLoginFailure(errorMessage);
        }
      });
  };
  onLoginSuccess = () => {
    this.setState({
      email: "",
      password: "",
      error: "",
      loading: false
    });
  };
  onLoginFailure = errorMessage => {
    this.setState({ error: errorMessage, loading: false });
  };

  renderSignInButton = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#52A052",
          width: "80%",
          paddingVertical: 10,
          borderRadius: 50,
          marginTop: 30,
          alignSelf: "center",
          alignItems: "center",

          justifyContent: "center",
          flexDirection: "row"
        }}
        onPress={() => {
          this.onButtonPress();
        }}
      >
        {this.state.loading && <ActivityIndicator color="#fff" size="small" />}
        <Text
          style={{
            color: "white",
            textAlign: "center",
            paddingLeft: 10,
            alignSelf: "center"
          }}
        >
          Log In
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: 20,
            marginBottom: 30,
            color: "#52A052",
            fontSize: 25,
            fontWeight: "bold",
            padding: 15
          }}
        >
          Sign In
        </Text>

        <View style={{ width: "100%" }}>
          <TextInput
            name="email"
            placeholder="Enter your email"
            style={(style = styles.textInput)}
            underlineColorAndroid={"transparent"}
            autoCapitalize="none"
            maxLength={30}
            onChangeText={email => this.setState({ email })}
            autoCorrect={false}
          />

          <TextInput
            name="password"
            placeholder="Enter your password"
            style={styles.textInput}
            underlineColorAndroid={"transparent"}
            autoCapitalize="none"
            maxLength={30}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            autoCorrect={false}
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          {this.renderSignInButton()}
          <Text style={{ textAlign: "center", fontWeight: "bold", margin: 20 }}>
            OR
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#4267B2",
              width: "80%",
              paddingVertical: 10,
              borderRadius: 50,
              borderColor: "#999999",
              alignSelf: "center"
            }}
            onPress={() => {
              this.logInFB();
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Facebook Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

{
  /* <TouchableOpacity
          onPress={() => navigation.goBack(null)}
          title="Go back"
        >
          <Text> Go Back from here</Text>
        </TouchableOpacity> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
  textInput: {
    height: 40,
    backgroundColor: "#ffffff",
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "#999999",
    alignSelf: "center",
    margin: 10
  },
  button: {
    marginTop: 30
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center"
  }
});
