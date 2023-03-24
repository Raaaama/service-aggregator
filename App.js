import React, { Component, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
} from "react-native";

import { registerRootComponent } from "expo";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppProvider } from "./src/context/LogInContext";
import { enableScreens } from "react-native-screens";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SearchScreen from "./src/screens/SearchScreen";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const fonts = () =>
  Font.loadAsync({
    Manrope: require("./src/assets/fonts/Manrope-Bold.ttf"),
    "Manrope-Medium": require("./src/assets/fonts/Manrope-Medium.ttf"),
  });

// ip = "https://1e54-2-135-26-114.eu.ngrok.io/";
//ip = "192.168.1.64";
//ip = "192.168.137.135"

enableScreens();
const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

const App = () => {
  const [font, setFont] = useState(false);
  if (font) {
    return (
      <AppProvider>
        <NavigationContainer>
          <Tab.Navigator 
          initialRouteName="HomeScreen"
          backBehavior="initialRoute"
          screenOptions={{
             tabBarLabelStyle: { fontSize: 18, fontFamily:"Manrope" },
             tabBarStyle: { backgroundColor: 'black', },
             tabBarActiveTintColor: 'white',
             tabBarPressColor: 'white',
          }}>
            <Tab.Screen name="Поиск" component={SearchScreen} />
            <Tab.Screen name="Запись" component={HomeScreen} />
            <Tab.Screen name="Профиль" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </AppProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setFont(true)}
        onError={console.error}
      />
    );
  }
};

export default App;
