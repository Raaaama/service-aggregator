import React, { Component, useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
} from 'react-native'
import { registerRootComponent } from 'expo';
import CategoriesList from "./src/components/molecules/CategoriesList"
import LogInModal from "./src/components/organisms/LogInModal"
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { AppProvider } from './src/context/LogInContext';

const fonts = () => Font.loadAsync({
  'Manrope': require('./src/assets/fonts/Manrope-Bold.ttf'),
  'Manrope-Medium': require('./src/assets/fonts/Manrope-Medium.ttf')
});

ip = "192.168.1.64"

const App = () => {
  const [font, setFont] = useState(false);
    if (font) {
      return (
        <AppProvider>
          <View style={styles.container}>
            {/* <StatusBar backgroundColor="black"/> */}
            <CategoriesList ip = {ip}/>
            <LogInModal ip={ip}/>
          </View>
        </AppProvider>
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
    //marginTop:"10%",
    flex: 1,
    backgroundColor: '#202124',
    alignItems: 'center',
  },
})

export default App;