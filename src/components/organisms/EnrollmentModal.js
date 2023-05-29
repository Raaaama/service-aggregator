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
  Alert,
  useWindowDimensions,
} from "react-native";
import LogInContext from "../../context/LogInContext";
import Svg, { Path } from "react-native-svg";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import SelectDropdown from "react-native-select-dropdown";
import TimePicker from "../atoms/TimePicker";
import Option from "../atoms/Option";
import OptionsCarousel from "../molecules/OptionsCarousel";

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
    setTimeOptions,
    getEnrollments,
    enroll,
    getTO,
    chooseMultiple,
    chosenOptions,
    optionData,
    currentIndex,
    setCurrentIndex,
    chosenDates,
    setChosenDates,
  } = useContext(LogInContext);

  const [markedDates, setMarkedDates] = useState({});
  const [current, setCurrent] = useState();
  const [defaultDateStyle, setDefaultDateStyle] = useState(true);
  const [dateTxt, setDateTxt] = useState(undefined);
  const [optionIsPicked, setOptionIsPicked] = useState(false);
  const [dayIsPicked, setDayIsPicked] = useState(false);
  const [optionPicked, setOptionPicked] = useState([]);
  const [enrollTimeChosen, chooseEnrollTime] = useState([]);
  const { width } = useWindowDimensions();

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
    // console.log(day)
    // console.log(new Date("2023-06-18".dateString))
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        color: "#807d7d",
      },
    });
    setDefaultDateStyle(false);
    var dt = new Date(day.dateString);
    setCurrent(day.dateString);
    setDateTxt(dt.getDay() + 1);
    handleTimetable(dt.getDay() + 1, dt);
  }

  function addZero(a) {
    if (a < 10) {
      a = "0" + a;
    }
    return a;
  }

  function handleTimetable(day, date) {
    if (day == undefined) {
      day = dateTxt;
    }
    if (date == undefined) {
      date = current;
    } else {
      date =
        date.getFullYear() +
        "-" +
        addZero(date.getMonth() + 1) +
        "-" +
        addZero(date.getDate());
    }

    if (chosenOptions[currentIndex] != undefined) {
      getTO(currentIndex, chosenOptions[currentIndex].idoption, day, date);
    }

    chosenDates[currentIndex] = date;
  }

  let ops = timeOptions;

  const [ed, setEd] = useState(1);
  function itemChosen(number, item) {
    // console.log(item)
    // console.log(ops)
    // console.log(number)
    let temp = ops[number].findIndex((el) => el.time == item.time);

    if (chooseMultiple == false) {
      for (let i = 0; i < ops[number].length; i++) {
        ops[number][i].chosen = false;
      }
    }

    ops[number][temp].chosen = !ops[number][temp].chosen;
    setTimeOptions(ops);
    setEd(ed + 1);
  }

  const showAlert = () =>
    Alert.alert(
      "Готово!",
      'Статус заявки (-ок) можно посмотреть во вкладке "Мои записи"',
      [{ text: "OK", style: "default" }]
    );

  const WarningAlert = () =>
    Alert.alert(
      "Внимание!",
      "Для отправки заявки необходимо выбрать дату, опцию и время!",
      [{ text: "OK", style: "default" }]
    );

  function handleEnroll() {
    if (
      ops.findIndex((e) => e == undefined) > 0 ||
      chosenDates.findIndex((e) => e == undefined) > 0 ||
      chosenOptions.findIndex((e) => e == undefined) > 0
    ) {
      WarningAlert();
      // console.log(ops, chosenDates, chosenOptions);
    } 
    else {
      let hasOpsChosen = true;
      for (let i = 0; i < ops.length; i++) {
        if (ops[i].findIndex((e) => e.chosen == true) < 0) {
          hasOpsChosen = false;
          break;
        }
      }

      if (hasOpsChosen) {
        showAlert();
        for (let i = 0; i < chosenOptions.length; i++) {
          enroll(ops[i], chosenDates[i], chosenOptions[i].idoption);
        }
        ops.length = 0;

        setCurrent(undefined);
        setMarkedDates({});
        setTimeOptions([]);
        ops = [];

        for (let i = 0; i < chosenOptions.length; i++) {
          chosenOptions[i] = undefined;
          timeOptions[i] = undefined;
          chosenDates[i] = undefined;
        }
      }
      else {
        WarningAlert();
      }
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
        setCurrent(undefined);
        setMarkedDates({});
        setTimeOptions([]);
        setCurrentIndex(0);
        for (let i = 0; i < chosenOptions.length; i++) {
          chosenOptions[i] = undefined;
          timeOptions[i] = undefined;
          chosenDates[i] = undefined;
        }
      }}
    >
      <StatusBar backgroundColor="white" />
      <View style={styles.container}>
        <Calendar
          style={{
            width: width,
          }}
          theme={styles.calendarTheme}
          onDayPress={(day) => {
            chooseDate(day);
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

        <OptionsCarousel
          date={current}
          dateTxt={dateTxt}
          getTO={getTO}
          itemChosen={itemChosen}
          ed={ed}
          handleTimetable={handleTimetable}
          setMarkedDates={setMarkedDates}
        />

        <TouchableOpacity
          style={styles.enrollBtn}
          onPress={() => handleEnroll()}
        >
          <Text style={styles.enrollTxt}>Отправить заявку</Text>
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
    height: "90%",
  },
  calendar: {
    // flex: 1,
    // marginTop: "auto",
    // backgroundColor: "white",
    // borderTopColor: "black",
    // borderTopWidth: 1,
  },
  selectTime: {
    flex: 1,
    width: "90%",

    backgroundColor: "green",
  },
  list: {
    top: "8%",
  },
  enrollBtn: {
    // marginTop: "20%",
    // position: "absolute",
    // bottom: "2%",
    marginBottom: "2%",
    backgroundColor: "black",
    width: "80%",
    height: 60,
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
  chooseAlert: {
    fontSize: 16,
    color: "white",
    fontFamily: "Manrope",
    bottom: "30%",
    // alignSelf: "center"
  },
  calendarTheme: {
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
  },
});

export default EnrollmentModal;
