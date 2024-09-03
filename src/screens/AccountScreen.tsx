import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { apiUrl, baseUrl } from "../utils";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountScreen = ({ navigation }: { navigation: any }) => {
  const [history, setHistory] = useState([]);

  const handleLogout = async () => {
    try {
      // Clear session ID from AsyncStorage
      await AsyncStorage.removeItem("sessionId");
      setHistory([]);

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

  const renderHistory = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.recommendationItem}
        onPress={() => {
          navigation.push("Recommandation", { lesion: item });
        }}
        activeOpacity={0.7} // Controls the opacity when pressed
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{ uri: baseUrl + item.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.recommendationText}>{item.name}</Text>
        </View>

        <MaterialCommunityIcons name="arrow-right" color="#000" size={25} />

        <></>
      </TouchableOpacity>
    );
  };

  const getHistory = async () => {
    const sessionId = await AsyncStorage.getItem("sessionId");

    if (sessionId !== "") {
      const response = await axios.post(`${apiUrl}/history`, { sessionId });

      if (response.data.history) {
        setHistory(response.data.history);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getHistory();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to your account!</Text>
      {history.length === 0 && (
        <View>
          <Text>You don't have any history lesions</Text>
        </View>
      )}
      {/* Display the lesion name */}
      <FlatList
        data={history}
        renderItem={renderHistory}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.recommendationList}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    width: 75,
    height: 75,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4AAF51",
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
    marginBottom: 15,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  recommendationList: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 16,
  },
  recommendationItem: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: "#555",
  },
});

export default AccountScreen;
