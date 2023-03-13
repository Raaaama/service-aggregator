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

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SearchScreen from "./src/screens/SearchScreen";

const fonts = () =>
    Font.loadAsync({
        Manrope: require("./src/assets/fonts/Manrope-Bold.ttf"),
        "Manrope-Medium": require("./src/assets/fonts/Manrope-Medium.ttf"),
    });


ip = "https://3da3-2-135-26-114.eu.ngrok.io";
//ip = "192.168.1.64";
//ip = "192.168.137.135"

const Stack = createNativeStackNavigator();

const App = () => {
    const [font, setFont] = useState(false);
    if (font) {
        return (
            <AppProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                headerTitle: "",
                                headerTransparent: true,
                                animation:'none',
                            }}
                        />
                        <Stack.Screen
                            name="Search"
                            component={SearchScreen}
                            options={{
                                headerTitle: "",
                                headerTransparent: true,
                                animation:'none',
                            }}
                            header={{
                                back: false,
                            }}
                        />
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{
                                headerTitle: "",
                                headerTransparent: true,
                                animation:'none',
                            }}
                        />
                    </Stack.Navigator>
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
