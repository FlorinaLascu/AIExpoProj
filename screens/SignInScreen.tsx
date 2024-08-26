import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignInScreenProps {
  navigation: any;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      // Make the API request to log in the user
      const response = await axios.post("http://192.168.44.21:3000/api/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.sessionId) {
        // Assume a successful login and store the session ID
        await AsyncStorage.setItem("sessionId", response.data.sessionId);
        Alert.alert("Success", "You have successfully logged in!");
        navigation.navigate("Account");
      } else {
        Alert.alert("Error", "Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      console.error("Error during login:", error.response?.data || error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  const handleRegisterRedirect = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("/Users/florinalascu/Expo/AIExpoProj/assets/logo.png")}
        style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={handleRegisterRedirect}
      >
        <Text style={styles.buttonText}>Register</Text>
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
  image: {
    width: 220,
    height: 70,
    marginBottom: 20,
    resizeMode: "contain",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "slategray",
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4AAF51",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    width: "55%",
  },
  registerButton: {
    marginTop: 10, // Space between Sign In and Register buttons
    backgroundColor: "#4AAF51", // Same color as the Sign In button
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignInScreen;
