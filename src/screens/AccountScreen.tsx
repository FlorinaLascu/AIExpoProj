import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = ({ navigation }: { navigation: any }) => {
  const handleLogout = async () => {
    try {
      // Clear session ID from AsyncStorage
      await AsyncStorage.removeItem("sessionId");

      // Optionally, you can display a confirmation alert
      Alert.alert("Logged Out", "You have been logged out successfully!");

      // Navigate back to the SignIn screen
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert(
        "Error",
        "An error occurred during logout. Please try again."
      );
    }
  };

  useEffect(() => {
    const getSessionId = async () => {
      const sessionId = await AsyncStorage.getItem("sessionId");

      console.log(sessionId);
      if (!sessionId) {
        navigation.navigate("SignIn");
      }
    };

    getSessionId();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to your account!</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#4AAF51",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    width: "55%",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AccountScreen;
