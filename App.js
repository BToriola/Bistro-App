import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Feed from "./src/component/screens/Feed";
import Profile from "./src/component/screens/Profile";
import SignIn from "./src/component/screens/Signin";
import SignUp from "./src/component/screens/Signup";
import WelcomeScreen from "./src/component/screens/Welcome";
import Logout from "./src/component/screens/Logout";
import FeedDetails from "./src/component/screens/FeedDetails";
import DashboardScreen from "./src/component/screens/Dashboard";

import "firebase/firestore";

class App extends React.Component {
  state = {
    name: "Paulo"
  };

  render() {
    const { navigation } = this.props;
    return <AppContainer screenProps={{ name: this.state.name }} />;
  }
}

export default App;

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Feed,
    Profile,
    Logout
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
    Login: { screen: SignIn },
    Signup: {
      screen: SignUp
    },
    FeedDetails: { screen: FeedDetails }
  },

  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            name="md-menu"
            size={30}
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: DashboardStackNavigator },
  Logout
});

const AppSwitchNavigator = createSwitchNavigator({
  welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

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
