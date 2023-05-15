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
  FlatList,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LogInForm from "../molecules/LogInForm";
import LogInContext from "../../context/LogInContext";
import SignUpForm from "../molecules/SignUpForm";
import Carousel from "react-native-reanimated-carousel";
import Svg, { Path } from "react-native-svg";
import ChosenService from "../atoms/ChosenService";

const ProviderPageModal = (props) => {
  const {
    providerPageModalVisible,
    setProviderPageModalVisible,
    images,
    providerInfo,
    setProviderInfo,
    setEnrollmentModalVisible,
    options,
    getOptions,
    setAddServiceModalVisible,
    currentServiceType,
    chosenOptions,
    chosenServiceTypes,
    setChosenOptions,
    setChosenServiceTypes,
    providerServices,
  } = useContext(LogInContext);

  const width = Dimensions.get("window").width;

  function handleF(id) {
    // console.log(providerInfo)
    chosenOptions.length = chosenServiceTypes.length;
    setEnrollmentModalVisible(true);
    // getOptions(id)
    // console.log(options)
  }

  return (
    <Modal
      animationType="slide"
      visible={providerPageModalVisible}
      presentationStyle={"fullScreen"}
      onRequestClose={() => {
        setProviderInfo({});
        setChosenServiceTypes([currentServiceType]);
        getOptions(-1);
        setChosenOptions([-1]);
        setProviderPageModalVisible(false);
      }}
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
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                class="w-6 h-6"
              >
                <Path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <Path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </Svg>
              <Text style={styles.adress}>{providerInfo.adress}</Text>
            </View>
          </View>

          <FlatList
            // contentContainerStyle={styles.subcategoriesList}
            // style={{width:"90%"}}
            data={chosenServiceTypes}
            // horizontal={true}
            // numColumns={5}
            // directionalLockEnabled={true}
            // alwaysBounceVertical={false}
            //extraData={fromFilter}
            // extraData={[ed, timeOptions, ops]}
            ItemSeparatorComponent={() => <View style={{ height: "2%" }} />}
            renderItem={({ item }) => <ChosenService st={item} />}
          />
          <TouchableOpacity
            style={styles.addServiceButton}
            onPress={() => {
              setAddServiceModalVisible(true);
            }}
          >
            <Text style={styles.enrollText}>Добавить услугу</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.enrollButton}
            onPress={() => handleF(providerInfo.idservices)}
          >
            <Text style={styles.enrollText}>Записаться</Text>
          </TouchableOpacity>
        </View>
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
    width: "90%",
    backgroundColor: "green",
  },
  providerInfo: {
    backgroundColor: "black",
    width: "100%",
    padding: 20,
    borderRadius: 5,
    marginBottom: "4%",
  },
  name: {
    fontSize: 40,
    color: "white",
    fontFamily: "Manrope",
  },
  adressView: {
    flexDirection: "row",
  },
  adress: {
    fontSize: 18,
    color: "white",
    fontFamily: "Manrope",
    marginLeft: 5,
  },

  addServiceButton: {
    width: "100%",
    backgroundColor: "black",
    height: "10%",
    // margin: 10,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  enrollButton: {
    width: "80%",
    backgroundColor: "black",
    height: "8%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
    // position: 'absolute',
    // bottom: "4%",
  },
  enrollText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Manrope",
    alignSelf: "center",
  },
});

export default ProviderPageModal;
