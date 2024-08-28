import { Camera, CameraType } from "expo-camera/legacy";
import { useState, useRef, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import { apiUrl } from "../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CameraComponent = ({ navigation }: { navigation: any }) => {
  const [facing, setFacing] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [sessionId, setSessionId] = useState("");

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const convertUriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    console.log(blob);
    return blob;
  };

  const takePhoto = async () => {
    const sessionId = await getSessionId();
    console.log(sessionId);
    if (sessionId === "") {
      navigation.navigate("AccountNavigator", { screen: "SignIn" });

      return;
    }

    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
          skipProcessing: true,
        });
        setPhoto(photo);
        // console.log("Photo taken:", photo);

        const blob = await convertUriToBlob(photo.uri);
        // Create a FormData object to send the photo to the server
        const formData = new FormData();
        formData.append("image", blob, "image.jpg");
        formData.append("sessionId", sessionId);

        const response = await axios.post(`${apiUrl}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);
      } catch (error) {
        console.error("Failed to take photo:", error);
      }
    }
  };

  const getSessionId = async () => {
    const sessionId = await AsyncStorage.getItem("sessionId");

    return sessionId ? sessionId : "";
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <MaterialCommunityIcons name="camera-flip" color="#fff" size={45} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <MaterialCommunityIcons name="camera" color="#fff" size={45} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <MaterialCommunityIcons name="upload" color="#fff" size={45} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
