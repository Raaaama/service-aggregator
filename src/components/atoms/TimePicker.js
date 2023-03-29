import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import SelectDropdown from "react-native-select-dropdown";

const TimePicker = (props) => {
  if (props.optionIsPicked && props.dayIsPicked) {
    return (
      <SelectDropdown
        data={props.timeOptions}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
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
        defaultButtonText={"Время"}
        buttonStyle={{
          width: "80%",
          marginTop: "20%",
          backgroundColor: "black",
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
  } else {
    return <Text style={styles.txt}>Выберите дату и доступную опцию</Text>;
  }
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 18,
    color: "white",
    fontFamily: "Manrope",
    marginTop: "20%",
  },
});

export default TimePicker;
