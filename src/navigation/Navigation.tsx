import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import RecommandationScreen from "../screens/RecommandationScreen";

const AuthStack = createNativeStackNavigator();
const NativeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeNavigator() {
  return (
    <NativeStack.Navigator initialRouteName="Home">
      <NativeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <NativeStack.Screen
        name="Recommandation"
        component={RecommandationScreen}
        options={{ headerShown: true }}
      />
    </NativeStack.Navigator>
  );
}

function AccountNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("sessionId");
        console.log(value);

        setIsLoggedIn(value !== null);
      } catch (e) {
        console.error("Failed to fetch registration status", e);
      }
    };

    checkRegistrationStatus();
  }, []);

  if (isLoggedIn === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <AuthStack.Navigator initialRouteName={isLoggedIn ? "Account" : "SignIn"}>
      <AuthStack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: true }}
      />
      <AuthStack.Screen
        name="Recommandation"
        component={RecommandationScreen}
        options={{ headerShown: true }}
      />
    </AuthStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{
        tabBarActiveTintColor: "green",
      }}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-circle"
              color={color}
              size={45}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={45}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
