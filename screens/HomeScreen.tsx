import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.homescreen}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homescreen: {
    fontSize: 30,
    textAlign: "center",
    marginTop: "20%",
  },
});

export default HomeScreen;
