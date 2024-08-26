import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const StackScreen = () => {
  return (
    <View>
      <Text style={styles.stackscreen}>Stack Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stackscreen: {
    fontSize: 30,
    textAlign: "center",
    marginTop: "20%",
  },
});

export default StackScreen;
