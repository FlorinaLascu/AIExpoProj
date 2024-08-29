import React, { FC, useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { apiUrl } from "../utils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { CameraComponent } from "../components/Camera";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  

  return (
    <SafeAreaView style={styles.container}>
      <CameraComponent navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  camera: {
    width: 300,
    height: 300,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  cameraButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    marginBottom: 20,
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4AAF51",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
    width: "70%",
  },
  uploadButton: {
    backgroundColor: "#4AAF51",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    width: "70%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
