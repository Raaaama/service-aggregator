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
import Svg, { Path } from "react-native-svg";

const ChosenService = (props) => {
  const { chosenServiceTypes, setChosenServiceTypes, providerServices, chosenOptions, setChosenOptions, options, setOptions } = useContext(LogInContext);

  //   console.log("chosenServiceTypes");
  //   console.log(chosenServiceTypes);
  //   console.log("providerServices");
  //   console.log(providerServices);
  let st = props.st, number = props.number;
//   console.log(st)

  let service = {};

  for (let i = 0; i < providerServices.length; i++) {
    if ((st == providerServices[i].idst)) {
      service = providerServices[i];
    //   console.log(st, providerServices[i].idst)
      break;
    }
  }

  function deleteChosenService() {
    setChosenServiceTypes(chosenServiceTypes.filter(item => item !== st))
    for (let i = 0; i < options.length; i++) {
      if (options[i][0].idservice_type === st) {
        console.log(options.filter(item => item !== options[i]))
        let temp = options.filter(item => item !== options[i])
        setOptions(temp)
        // console.log(temp)
        // console.log("------------------------------------")
        break
      }
      // console.log("-----")
    }
  }


  return (
    <View style={styles.serviceInfo}>
      <View style={styles.titleContainer}>
        <Text style={styles.infoTitle}>{"#" + (number + 1)}</Text>
        <Text style={styles.infoTitle}>{service.name}</Text>
        <TouchableOpacity style={styles.infoTitleBtn} onPress={() => deleteChosenService()}>
          <Text style={styles.infoTitle}>x</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timePerServiceView}>
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
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Svg>
        <Text style={styles.timePerService}>
          Время оказания: {service.timePerService} минут
        </Text>
      </View>
      <View style={styles.priceView}>
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
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Svg>
        <Text style={styles.price}>Цена: {service.price}₸</Text>
      </View>
      {service.description ? (
        <View>
          <View style={styles.descriptionView}>
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
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </Svg>
            <Text style={styles.description}>Описание:</Text>
          </View>
          <Text style={styles.description}>{service.description}</Text>
        </View>
      ) : (
        <View style={styles.descriptionView}>
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
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </Svg>
          <Text style={styles.description}>Описание отсутствует</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  serviceInfo: {
    // marginTop: 30,
    backgroundColor: "black",
    width: "100%",
    padding: 20,
    borderRadius: 5,
    marginTop: "2%"
  },
  titleContainer: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  infoTitleBtn: {
    // backgroundColor: "green",
    borderRadius: 40,
    width: "10%",
    // aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 20,
    color: "white",
    fontFamily: "Manrope",
    // alignSelf: "center",
  },
  timePerServiceView: {
    flexDirection: "row",
  },
  timePerService: {
    fontSize: 20,
    color: "white",
    fontFamily: "Manrope",
    marginLeft: 5,
  },
  priceView: {
    flexDirection: "row",
  },
  price: {
    fontSize: 20,
    color: "white",
    fontFamily: "Manrope",
    marginLeft: 5,
  },
  descriptionView: {
    flexDirection: "row",
  },
  description: {
    fontSize: 20,
    color: "white",
    fontFamily: "Manrope",
    marginLeft: 5,
  },
});

export default ChosenService;
