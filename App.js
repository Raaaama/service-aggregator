import React, { Component, useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
} from 'react-native'
import { registerRootComponent } from 'expo';
import CategoriesList from "./src/components/molecules/CategoriesList"
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fonts = () => Font.loadAsync({
  'Manrope': require('./src/assets/fonts/Manrope-Bold.ttf'),
  'Manrope-Medium': require('./src/assets/fonts/Manrope-Medium.ttf')
});

const App = () => {
  const [font, setFont] = useState(false);

    if (font) {
      return (
        <SafeAreaView style={styles.container}>
          <CategoriesList />
        </SafeAreaView>
      )
    }
    else {
      return (
        <AppLoading 
          startAsync={fonts} 
          onFinish={() => setFont(true)}
          onError = {console.error}
        />
      );
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop:"10%",
    flex: 1,
    backgroundColor: '#202124',
    alignItems: 'center',
  },
})

export default App;