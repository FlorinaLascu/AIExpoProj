import React, { FC, useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { baseUrl } from "../utils";

interface RecommandationScreenProps {
  navigation: any;
  route: any;
}

const RecommandationScreen: FC<RecommandationScreenProps> = ({
  navigation,
  route,
}) => {
  const [lesionData, setLesionData] = useState<any>("");
  console.log(lesionData);

  useEffect(() => {
    if (route.params && route.params.lesion) {
      setLesionData(route.params.lesion);
    } else {
      console.warn("Lesion data is not available");
    }
  }, [route]);

  const renderRecommendation = ({ item }: { item: string }) => (
    <View style={styles.recommendationItem}>
      <Text style={styles.recommendationText}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {!lesionData ? (
        <Text style={styles.loadingText}>Loading recommendations...</Text>
      ) : (
        <View style={styles.content}>
          {/* Display the image */}
          {lesionData.image && (
            <Image
              source={{ uri: baseUrl + lesionData.image }}
              style={styles.image}
              resizeMode="contain"
            />
          )}

          {/* Display the lesion name */}
          <Text style={styles.lesionName}>{lesionData.name}</Text>

          {/* Display the recommendations */}
          <FlatList
            data={lesionData.recommendations}
            renderItem={renderRecommendation}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.recommendationList}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
  },
  content: {
    alignItems: "center",
    paddingBottom: 24,
  },
  image: {
    marginTop: 24,
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4AAF51",
  },
  lesionName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  recommendationList: {
    width: "100%",
    marginTop: 10,
  },
  recommendationItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  recommendationText: {
    fontSize: 16,
    color: "#555",
  },
});
export default RecommandationScreen;
