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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LogInForm from "../molecules/LogInForm";
import LogInContext from "../../context/LogInContext";
import SignUpForm from "../molecules/SignUpForm";
import Carousel from "react-native-reanimated-carousel";
import Svg, { Path } from 'react-native-svg';

const ProviderPageModal = (props) => {
  const {
    providerPageModalVisible,
    setProviderPageModalVisible,
    images,
    providerInfo,
    setEnrollmentModalVisible,
    getOptions
  } = useContext(LogInContext);

  const width = Dimensions.get("window").width;

  function handleF(id) {
    setEnrollmentModalVisible(true)
    getOptions(id)
  }

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
            mode="parallax"
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
        <View style={styles.infoContainer}>
          <View style={styles.providerInfo}>
            <Text style={styles.name}>{providerInfo.name}</Text>
            <View style={styles.adressView}>
              <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                <Path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <Path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </Svg>
              <Text style={styles.adress}>{providerInfo.adress}</Text>
            </View>
          </View>
          <View style={styles.serviceInfo}>
            <Text style={styles.infoTitle}>Информация об услуге</Text>
            <View style={styles.timePerServiceView}>
              <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                <Path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </Svg>
              <Text style={styles.timePerService}>Время оказания: {providerInfo.timePerService} минут</Text>
            </View>
            <View style={styles.priceView}>
              <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                <Path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </Svg>
              <Text style={styles.price}>Цена: от {providerInfo.price}₸</Text>
            </View>
            <View style={styles.descriptionView}>
              <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                <Path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </Svg>
              <Text style={styles.description}>Описание:</Text>
            </View>
            <Text style={styles.description}>{providerInfo.description}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.enrollButton} onPress={() => handleF(providerInfo.idservices)}>
          <Text style={styles.enrollText}>Записаться</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202124",
  },
  img: {
    height: "100%",
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: "5%",
    width: "90%"
  },
  providerInfo: {
    backgroundColor: "black",
    width: "100%",
    padding: 20,
    borderRadius: 5
  },
  name: {
    fontSize: 40,
    color: "white",
    fontFamily: "Manrope",
  },
  adressView: {
    flexDirection: "row"
  },
  adress: {
    fontSize: 18,
    color: "white",
    fontFamily: "Manrope",
    marginLeft: 5
  },
  serviceInfo: {
    marginTop: 30,
    backgroundColor: "black",
    width: "100%",
    padding: 20,
    borderRadius: 5
  },
  infoTitle: {
    fontSize: 20,
    color: "white",
    fontFamily: "Manrope",
    alignSelf: "center"
  },
  timePerServiceView: {
    flexDirection: "row"
  },
  timePerService: {
    fontSize: 20,
    color: "white",
    fontFamily: "Manrope",
    marginLeft: 5
  },
  priceView: {
    flexDirection: "row"
  },
  price: {
    fontSize: 20,
    color: "white",
    fontFamily: "Manrope",
    marginLeft: 5
  },
  descriptionView: {
    flexDirection: "row"
  },
  description: {
    fontSize: 20,
    color: "white",
    fontFamily: "Manrope",
    marginLeft: 5
  },
  enrollButton: {
    width: "80%",
    backgroundColor: "black",
    height: "8%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
    position: 'absolute',
    bottom: "4%",
  },
  enrollText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Manrope",
    alignSelf: "center"
  }
});

export default ProviderPageModal;
