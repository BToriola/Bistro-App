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
import { firebaseRef } from "../../services/Firebase";

export default class SignUp extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    loading: false
  };

  registerUser = () => {
    this.setState({
      error: "",
      loading: true
    });
    const { email, password } = this.state;
    firebaseRef
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.registerUser();
        this.props.navigation.navigate("Dashboard");
        alert("Account Created Successfully");
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
  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }

  renderButton = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#4267B2",
          width: "80%",
          paddingVertical: 12,
          borderRadius: 50,
          borderColor: "#999999",
          alignSelf: "center",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          marginTop: 20,
          flexDirection: "row"
        }}
        onPress={() => {
          this.registerUser();
        }}
      >
        {this.state.loading && <ActivityIndicator color="#fff" size="small" />}
        <Text
          style={{
            color: "white",
            textAlign: "center",
            alignSelf: "center",
            paddingLeft: 10
          }}
        >
          Sign Up
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
          Create new account
        </Text>

        <View style={{ width: "100%" }}>
          <TextInput
            name="firstname"
            placeholder="firstname"
            style={(style = styles.textInput)}
            underlineColorAndroid={"transparent"}
            autoCapitalize="none"
            maxLength={20}
            onChangeText={firstname => this.setState({ firstname })}
            autoCorrect={false}
          />
          <TextInput
            name="lastname"
            placeholder="lastname"
            style={(style = styles.textInput)}
            underlineColorAndroid={"transparent"}
            autoCapitalize="none"
            maxLength={20}
            onChangeText={lastname => this.setState({ lastname })}
            autoCorrect={false}
          />
          <TextInput
            name="email"
            placeholder="email"
            style={(style = styles.textInput)}
            underlineColorAndroid={"transparent"}
            autoCapitalize="none"
            maxLength={40}
            onChangeText={email => this.setState({ email })}
            autoCorrect={false}
          />

          <TextInput
            name="password"
            placeholder="password"
            style={styles.textInput}
            underlineColorAndroid={"transparent"}
            autoCapitalize="none"
            maxLength={30}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            autoCorrect={false}
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButton()}
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
  },
  spinnerStyle: {
    //flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    //height: 10
  }
});
