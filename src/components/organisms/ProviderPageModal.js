import { useState, useEffect, createContext, useContext } from "react";
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LogInForm from "../molecules/LogInForm";
import LogInContext from "../../context/LogInContext";
import SignUpForm from "../molecules/SignUpForm";
import Carousel from "react-native-reanimated-carousel";


const ProviderPageModal = (props) => {

  const { providerPageModalVisible, setProviderPageModalVisible, images } = useContext(LogInContext);

  const width = Dimensions.get("window").width;

  return (
    <Modal
      animationType="slide"
      visible={providerPageModalVisible}
      presentationStyle={"fullScreen"}
      onRequestClose={() => setProviderPageModalVisible(false)}
    >
      <StatusBar backgroundColor="white" />
      <View style={styles.container}>
      <GestureHandlerRootView> 
        <Carousel
          loop
          width={width}
          height={width / 1.5}
          //   autoPlay={true}
          data={images}
          snapEnabled={true}
          mode='parallax'
          //   scrollAnimationDuration={1000}
          //   onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ index }) => (
            <Image
                style={styles.img}
                source={{
                uri: images[index],
                }}
            />
          )}
        />
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop:"10%",
    flex: 1,
    backgroundColor: "#202124",
    alignItems: "center",
  },
  img: {
    height: "100%",
    borderRadius: 10,
  },
});

export default ProviderPageModal;
