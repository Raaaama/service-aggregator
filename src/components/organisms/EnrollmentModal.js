import { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import LogInContext from "../../context/LogInContext";
import Svg, { Path } from "react-native-svg";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import SelectDropdown from "react-native-select-dropdown";
import TimePicker from "../atoms/TimePicker";

LocaleConfig.locales["ru"] = {
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв.",
    "Февр.",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Авг.",
    "Сент.",
    "Окт.",
    "Нояб.",
    "Дек.",
  ],
  dayNames: [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ],
  dayNamesShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  today: "Сегодня",
};
LocaleConfig.defaultLocale = "ru";

var width = Dimensions.get("window").width;

const EnrollmentModal = () => {
  const {
    enrollmentModalVisible,
    setEnrollmentModalVisible,
    options,
    getTimetable,
    timeOptions,
    getEnrollments,
    enrollments,
  } = useContext(LogInContext);

  const [markedDates, setMarkedDates] = useState({});
  const [current, setCurrent] = useState();
  const [defaultDateStyle, setDefaultDateStyle] = useState(true);
  const [dateTxt, setDateTxt] = useState(undefined);
  const [buttonText, setButtonText] = useState("Опция");
  const [optionIsPicked, setOptionIsPicked] = useState(false);
  const [dayIsPicked, setDayIsPicked] = useState(false);
  const [optionPicked, setOptionPicked] = useState();

  useEffect(() => {
    setButtonText(options[0].optionname);
  });

  let data = [];
  options.forEach((element) => {
    data.push(element.opt);
  });

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  function getCurrentDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    date = date;

    if (month.toString().length == 1) {
      month = "0" + month;
    }
    if (date.toString().length == 1) {
      date = "0" + date;
    }
    return year + "-" + month + "-" + date;
  }

  function getMaxDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    month = month + 1;

    if (month > 12) {
      month = month - 12;
      year = year + 1;
    }
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    if (date.toString().length == 1) {
      date = "0" + date;
    }

    return year + "-" + month + "-" + date;
  }

  function chooseDate(day) {
    setDefaultDateStyle(false);
    var dt = new Date(day.dateString);
    setDateTxt(dt.getDay() + 1);
    handleTimetable(undefined, dt.getDay() + 1);
  }

  function handleOption(index) {
    setOptionIsPicked(true);
    setOptionPicked(options[index].idoption);
    handleTimetable(options[index].idoption, undefined);
  }

  function handleTimetable(id, dt) {
    let ido, d;
    if (id == undefined) {
      ido = optionPicked;
    } else {
      ido = id;
    }
    if (dt == undefined) {
      d = dateTxt;
    } else {
      d = dt;
    }
    if (ido != undefined && d != undefined) {
      getEnrollments(current);
      getTimetable(ido, d);
    }
  }

  return (
    <Modal
      animationType="slide"
      visible={enrollmentModalVisible}
      presentationStyle={"fullScreen"}
      onRequestClose={() => {
        setEnrollmentModalVisible(false);
        setOptionIsPicked(false);
      }}
    >
      <StatusBar backgroundColor="white" />
      <View style={styles.container}>
        <Calendar
          style={{
            width: width,
          }}
          theme={{
            calendarBackground: "black",
            textDayFontFamily: "Manrope",
            textMonthFontFamily: "Manrope",
            textDayHeaderFontFamily: "Manrope",

            dayTextColor: "white",
            textDisabledColor: "#5c5c5c",
            monthTextColor: "white",
            textSectionTitleColor: "white",
            dayTextColor: "white",
            arrowColor: "white",
            todayTextColor: "white",

            textSectionTitleDisabledColor: "#d9e1e8",
            selectedDayBackgroundColor: "white",
            selectedDayTextColor: "black",

            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 12,
          }}
          onDayPress={(day) => {
            setMarkedDates({
              [day.dateString]: {
                selected: true,
                color: "#807d7d",
              },
            });
            chooseDate(day);
            setCurrent(day.dateString);
            setDayIsPicked(true);
          }}
          enableSwipeMonths={true}
          minDate={getCurrentDate()}
          maxDate={getMaxDate()}
          hideExtraDays={true}
          pastScrollRange={0}
          futureScrollRange={5}
          markedDates={markedDates}
          current={current}
        />
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
            width: "80%",
            marginTop: "30%",
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

        <TimePicker
          optionIsPicked={optionIsPicked}
          dayIsPicked={dayIsPicked}
          timeOptions={timeOptions}
        />

        <TouchableOpacity style={styles.enrollBtn}>
          <Text style={styles.enrollTxt}>Записаться</Text>
        </TouchableOpacity>
      </View>
    </Modal>
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
    marginTop: "20%",
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
});

export default EnrollmentModal;
