import { AutoFocus, Camera, CameraType } from "expo-camera/legacy";
import { useState, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { apiUrl } from "../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CameraComponent = ({ navigation }: { navigation: any }) => {
  const [facing, setFacing] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [focusDepth, setFocusDepth] = useState(0);
  const [imageUri, setImageUri] = useState("");
  const [base64Image, setBase64Image] = useState("");

  function toggleCameraFacing() {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    const sessionId = await getSessionId();

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
      } catch (error) {
        console.error("Failed to take photo:", error);
      }
    }
  };

  const redoPhoto = () => {
    setPhoto(null);
  };

  const getSessionId = async () => {
    const sessionId = await AsyncStorage.getItem("sessionId");

    return sessionId ? sessionId : "";
  };

  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      convertImageToBase64(result.assets[0].uri);
    }
  };

  const uploadAPI = async (base64: string) => {
    const sessionId = await getSessionId();

    const response = await axios.post(
      `${apiUrl}/upload`,
      {
        sessionId: sessionId,
        file: base64,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    navigation.push("Recommandation", { lesion: response.data.lesion });
    setPhoto(null);
  };

  const convertImageToBase64 = async (uri: string) => {
    const sessionId = await getSessionId();
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setBase64Image(base64);

      await uploadAPI(base64);
    } catch (error) {
      console.log("Error converting image to Base64:", error);
    }
  };

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  return (
    <View style={styles.container}>
      {!permission?.granted ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{}}
            onPress={() => {
              requestPermission();
            }}
          >
            <Text style={{ color: "#fff", fontSize: 30 }}>
              Requst camera permission
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          {photo && (
            <View style={{ flex: 1 }}>
              <Image source={{ uri: photo?.uri }} style={{ flex: 1 }} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={redoPhoto}>
                  <MaterialCommunityIcons
                    name="refresh"
                    color="#fff"
                    size={45}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    uploadAPI(photo.base64);
                  }}
                >
                  <MaterialCommunityIcons name="send" color="#fff" size={45} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {!photo && (
            <View style={{ flex: 1 }}>
              <Camera style={styles.camera} type={facing} ref={cameraRef} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleCameraFacing}
                >
                  <MaterialCommunityIcons
                    name="camera-flip"
                    color="#fff"
                    size={45}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                  <MaterialCommunityIcons
                    name="camera"
                    color="#fff"
                    size={45}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={pickImage}>
                  <MaterialCommunityIcons
                    name="upload"
                    color="#fff"
                    size={45}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    position: "absolute",
    bottom: 0,
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
