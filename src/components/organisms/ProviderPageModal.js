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
  ScrollView,
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
    timeOptions,
    chosenDates, setChosenDates
  } = useContext(LogInContext);

  const width = Dimensions.get("window").width;

  function handleF(id) {
    // console.log(providerInfo)
    setEnrollmentModalVisible(true);
    chosenOptions.length = chosenServiceTypes.length;
    timeOptions.length = chosenServiceTypes.length;
    chosenDates.length = chosenServiceTypes.length
    // getOptions(id)
    // console.log(options)
  }

  const AddServiceButton = () => {
    return (
      <TouchableOpacity
        style={styles.addServiceButton}
        onPress={() => {
          setAddServiceModalVisible(true);
        }}
      >
        <Text style={styles.enrollText}>Добавить услугу</Text>
      </TouchableOpacity>
    );
  };

  const ProviderInfo = () => {
    return (
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
    );
  };

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
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
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
          <ProviderInfo />

          {chosenServiceTypes.map((e, i) => {
            return <ChosenService key={i} number={i} st={e} />;
          })}
        </View>

        <AddServiceButton />
        <TouchableOpacity
          style={styles.enrollButton}
          onPress={() => handleF(providerInfo.idservices)}
        >
          <Text style={styles.enrollText}>Записаться</Text>
        </TouchableOpacity>
      </ScrollView>
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
    // backgroundColor: "green",
    // flex: 1
  },
  list: {
    top: "2%",
  },
  providerInfo: {
    backgroundColor: "black",
    width: "100%",
    padding: 20,
    borderRadius: 5,
    // marginBottom: "30%",
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
    width: "90%",
    backgroundColor: "black",
    height: 50,

    margin: 10,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  enrollButton: {
    width: "90%",
    backgroundColor: "black",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: "2%",
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
