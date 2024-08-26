import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Heloo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});

export default AccountScreen;
