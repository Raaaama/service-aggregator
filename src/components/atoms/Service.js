import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import Svg, { Path } from 'react-native-svg';
import LogInContext from "../../context/LogInContext";

const Service = (props) => {

  const {
    setProviderPageModalVisible, getImages, currentServiceType, providerInfo, getProviderInfo, getProviderServices, setChosenServiceTypes, setAddServiceModalVisible, getOptions
  } = useContext(LogInContext);

  function handleF(idst, idservices) {
    setChosenServiceTypes(current => [...current, idst])
    getOptions(idservices)
    setAddServiceModalVisible(false)
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => handleF(props.idst, props.idservices)}>
      <View style={styles.info}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.timeAndPrice}>
          <View style={styles.time}>
            <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
              <Path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </Svg>
            <Text style={styles.timePerService}>{props.timePerService} минут</Text>
          </View>
          <View style={{flexDirection: "row"}}>
          {/* <Text style={styles.from}>от</Text> */}
          <Text style={styles.price}>{props.price}₸</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "black",
    padding: 20,
    // flexDirection: "row",
    borderRadius: 10,
  },
  info: {
    // paddingLeft: 20,
    color: "white",
    flex: 1
  },
  name: {
    fontSize: 30,
    color: "white",
    fontFamily: "Manrope",
  },
  adress: {
    paddingTop: 5,
    fontSize: 12,
    color: "white",
    fontFamily: "Manrope",
  },
  timeAndPrice: {
    flex: 1,
    flexDirection: "row",
    verticalAlign: "center",
    paddingTop: 5,
    justifyContent: 'space-between',
    // backgroundColor: "blue",
  },
  time: {
    flexDirection: "row",
    paddingTop: 10,
    textAlignVertical: 'center',
    // backgroundColor: 'green',
  },
  timePerService: {
    fontSize: 12,
    color: "white",
    fontFamily: "Manrope",
  },
  from: {
    fontSize: 10,
    color: "white",
    fontFamily: "Manrope",
    alignSelf: "flex-end",
    marginRight: 5,
    marginBottom: 5
  },
  price: {
    fontSize: 25,
    color: "white",
    fontFamily: "Manrope",
    // backgroundColor: "green",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default Service;
