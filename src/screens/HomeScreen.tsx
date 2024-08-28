import React, { FC, useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
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
  // const handleChoosePhoto = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setPhoto(result.assets[0]);
  //   }
  // };

  // const handleTakePhoto = async () => {
  //   if (cameraRef.current) {
  //     const photo = await cameraRef.current.takePictureAsync({
  //       quality: 1,
  //       base64: true,
  //       skipProcessing: true,
  //     });
  //     setPhoto(photo);
  //   }
  // };

  // const handleUpload = async () => {
  //   if (!photo) {
  //     Alert.alert("Error", "Please select or take a photo first.");
  //     return;
  //   }

  //   const sessionId = await AsyncStorage.getItem("sessionId");

  //   if (!sessionId) {
  //     Alert.alert("Error", "You must be signed in to upload a photo.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("sessionId", sessionId);
  //   formData.append("file", {
  //     uri: photo.uri,
  //     type: 'image/jpeg', // Assuming the selected image is JPEG
  //     name: photo.uri.split('/').pop(),
  //   });

  //   try {
  //     const response = await axios.post(`${apiUrl}/upload`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (response.data.message) {
  //       // Navigate to LesionResultScreen with the lesion data
  //       navigation.navigate("LesionResult", {
  //         lesionData: response.data.lesion,
  //         recommendations: response.data.recommendations,
  //       });
  //     } else {
  //       Alert.alert("Error", response.data.error || "Upload failed.");
  //     }
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     Alert.alert("Error", "Something went wrong. Please try again later.");
  //   }
  // };

  // if (hasPermission === null) {
  //   return <View />;
  // } else if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <CameraComponent navigation={navigation} />
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
