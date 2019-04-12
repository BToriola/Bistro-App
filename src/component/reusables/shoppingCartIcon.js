import React, { Component } from "react";
import { Text, View } from "react-native";

import Icon from "@expo/vector-icons/AntDesign";

const ShoppingcartIcon = props => {
  return (
    <View style={{ paddingRight: 15 }}>
      <View
        style={{
          position: "absolute",
          height: 25,
          width: 25,
          borderRadius: 15,
          backgroundColor: "rgba(95,197,123, 0.8)",
          right: 25,
          bottom: 15,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>{props.cart}</Text>
      </View>
      <Icon name="shoppingcart" size={30} />
    </View>
  );
};

export default ShoppingcartIcon;
