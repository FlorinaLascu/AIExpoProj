import React, { useEffect, useState } from "react";

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
import Logo from "../../assets/logo.png";
import { CustomInput } from "../components/CustomInput";
import { apiUrl } from "../utils";

interface SignUpScreenProps {
  navigation: any;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      // Make the API request to register the user
      const response = await axios.post(`${apiUrl}/register`, {
        name,
        email,
        password,
      });

      console.log(response.data);
      if (response.data.user) {
        // Assume a successful registration
        await AsyncStorage.setItem("sessionId", response.data.user.sessionId);
        navigation.navigate("Account");
      } else {
        Alert.alert("Error", response.data.error);
      }
    } catch (error: any) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />

      <CustomInput placeholder="Name" value={name} setValue={setName} />

      <CustomInput placeholder="Email" value={email} setValue={setEmail} />

      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        isPassword={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  button: {
    backgroundColor: "#4AAF51",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    width: "55%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
