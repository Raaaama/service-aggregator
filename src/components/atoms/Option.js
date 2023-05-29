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
    chosenServiceTypes,
    timeOptions,
    setTimeOptions,
    optionData, setOptionData
  } = useContext(LogInContext);

  const [buttonText, setButtonText] = useState("Опция");

  const options = props.item
  const {i, date, dateTxt, getTO} = props

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

    // console.log(chosenOptions)

    // console.log(i)
    // console.log(i,chosen.idoption,dateTxt,date)
    if (dateTxt != undefined) {
      getTO(i,chosen.idoption,dateTxt,date)
    }

    

    

    // console.log(dateTxt,date)

    // console.log(chosenServiceTypes)

    // console.log(options)
    // console.log(chosenOptions)
    // setOptionIsPicked(true);
    // setOptionPicked(options[index].idoption);
    // handleTimetable(options[index].idoption, undefined, undefined);
    // setTimeOptions(timeOptions)
  }

  let data = [];
  // console.log("---------------------------------------------------")
  // console.log(props)
  options.forEach((element) => {
    let temp = element.opt
    if (element.rating_number > 0) {
      temp = temp + " ★" + element.rating + "(" + element.rating_number + ")"
    }
    data.push(temp);
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
        alignSelf: "center",
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
});

export default Option;
