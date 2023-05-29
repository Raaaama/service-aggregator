import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import Svg, { Path } from "react-native-svg";
import LogInContext from "../../context/LogInContext";
import Option from "./Option";

const OptionItem = (props) => {
  const {
    setProviderPageModalVisible,
    getImages,
    currentServiceType,
    providerInfo,
    getProviderInfo,
    getProviderServices,
    getOptions,
    timeOptions,
    chosenDates
  } = useContext(LogInContext);

  const { date, dateTxt, getTO, item, index } = props;

  // console.log(timeOptions)

  function addZero(a) {
    if (a < 10) {
      a = "0" + a
    }
    return a
  }
  let shownDate = "";

  // console.log(index)
  if (chosenDates[index] != undefined) {
    shownDate = new Date(chosenDates[index]+'T10:20:30Z')
    shownDate = addZero(shownDate.getDate())+ "." + addZero((shownDate.getMonth() + 1))
  // shownDate = index
  }

  // + " " + shownDate
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{item.options[0].name}</Text>
      <Option date={date} dateTxt={dateTxt} getTO={getTO} item={item.options} i={index} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "space-between",
    // backgroundColor: "blue",
    // height: "100%",
    // alignItems: "center",
    margin: 4
  },
  txt: {
    fontSize: 18,
    color: "white",
    fontFamily: "Manrope",
    alignSelf: "center",
    margin: 10,
  },
});

export default OptionItem;
