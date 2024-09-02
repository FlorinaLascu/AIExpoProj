import React, { FC, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Logo from "../../assets/logo.png";
import { CustomInput } from "../components/CustomInput";
import { apiUrl } from "../utils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignInScreenProps {
  navigation: any;
}

const SignInScreen: FC<SignInScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    // Handle sign-in logic here
    console.log("SignIn", { email, password });

    

    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      if (response.data.user) {
        // Assume a successful registration
        await AsyncStorage.setItem("sessionId", response.data.user.sessionId);
        navigation.navigate("Account");
      } else {
        Alert.alert("Error", response.data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
    // axios.post(`${apiUrl}/login`, {
    //   email,
    //   password,
    // }).then(response => {
    //   if (response.data.user) {
    //     // Assume a successful registration
    //     await AsyncStorage.setItem("sessionId", response.data.user.sessionId);
    //     Alert.alert("Success", "You have successfully registered!");
    //     navigation.navigate("Account");
    //   } else {
    //     Alert.alert("Error", response.data.error);
    //   }
    // });
  };

  const handleSignUpRedirect = () => {
    navigation.navigate("SignUp"); // Navigate to the SignUp screen
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />

      <CustomInput placeholder="Email" value={email} setValue={setEmail} />

      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        isPassword={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={handleSignUpRedirect} // Navigate to the SignUp screen when pressed
      >
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
  signUpButton: {
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

export default SignInScreen;
