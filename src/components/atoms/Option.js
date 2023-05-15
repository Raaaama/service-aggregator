import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useState, useContext, useEffect } from "react";
import Svg, { Path } from "react-native-svg";
import LogInContext from "../../context/LogInContext";
import SelectDropdown from "react-native-select-dropdown";

const Option = (props) => {
  const {
    setProviderPageModalVisible,
    getImages,
    currentServiceType,
    providerInfo,
    getProviderInfo,
    getProviderServices,
    setChosenServiceTypes,
    setAddServiceModalVisible,
    chosenOptions,
    chosenServiceTypes
  } = useContext(LogInContext);

  const [buttonText, setButtonText] = useState("Опция");

  const options = props.item.item
  const i = props.item.index

  function handleF(idst) {
    setChosenServiceTypes((current) => [...current, idst]);
    setAddServiceModalVisible(false);
  }

  useEffect(() => {
    setButtonText(options[0].optionname);
  });

  function handleOption(index) {
    let chosen = options[index]
    chosenOptions[i] = chosen

    console.log(chosenServiceTypes)


    // console.log(options)
    // setOptionIsPicked(true);
    // setOptionPicked(options[index].idoption);
    // handleTimetable(options[index].idoption, undefined, undefined);
  }

  let data = [];
  // console.log("---------------------------------------------------")
  // console.log(props)
  options.forEach((element) => {
    data.push(element.opt);
  });

  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        handleOption(index);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
      defaultButtonText={buttonText}
      buttonStyle={{
        width: "60%",
        backgroundColor: "black",
        alignSelf: "center"
      }}
      buttonTextStyle={{
        fontFamily: "Manrope",
        color: "white",
        marginRight: 20,
      }}
      rowStyle={{ backgroundColor: "black" }}
      rowTextStyle={{ fontFamily: "Manrope", color: "white" }}
      dropdownStyle={{ backgroundColor: "black" }}
      renderDropdownIcon={() => {
        return (
          <Svg
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-6 h-6"
          >
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </Svg>
        );
      }}
      dropdownIconPosition={"left"}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "space-between",
    backgroundColor: "#202124",
    alignItems: "center",
  },
  calendar: {
    flex: 1,
    marginTop: "auto",
    backgroundColor: "white",
    borderTopColor: "black",
    borderTopWidth: 1,
  },
  selectTime: {
    flex: 1,
    width: "90%",

    backgroundColor: "green",
  },
  enrollBtn: {
    // marginTop: "20%",
    position: "absolute",
    bottom: "2%",
    backgroundColor: "black",
    width: "80%",
    height: "8%",
    justifyContent: "center",
    borderRadius: 10,
  },
  enrollTxt: {
    fontSize: 18,
    color: "white",
    fontFamily: "Manrope",
    alignSelf: "center",
  },
  timeOptionChosen: {
    backgroundColor: "white",
    padding: 12,
    margin: 6,
    borderRadius: 5,
  },
  timeOption: {
    backgroundColor: "black",
    padding: 12,
    margin: 6,
    borderRadius: 5,
  },
  timeOptionChosenTxt: {
    fontSize: 16,
    color: "black",
    fontFamily: "Manrope",
  },
  timeOptionTxt: {
    fontSize: 16,
    color: "white",
    fontFamily: "Manrope",
  },
});

export default Option;
