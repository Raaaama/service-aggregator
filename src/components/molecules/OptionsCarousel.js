import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Input from "../atoms/Input";
import { useContext } from "react";
import LogInContext from "../../context/LogInContext";
import { useState } from "react";
import OptionItem from "../atoms/OptionItem";
import Option from "../atoms/Option";
import ListFooter from "../atoms/ListFooter";

const OptionsCarousel = (props) => {
  const { options, timeOptions, optionData, currentIndex, setCurrentIndex, chosenOptions, chosenDates } = useContext(LogInContext);
  const { width } = useWindowDimensions();
  

  const { date, dateTxt, getTO, itemChosen, ed, handleTimetable, setMarkedDates } = props;

  const data = [];

  for (let i = 0; i < Object.keys(options).length; i++) {
    data.push({
      options: options[i],
      timeOptions: timeOptions[i],
    });
  }

  function onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentIndex(pageNum);
    // handleTimetable(optionData[0],optionData[1],dateTxt,date)
    // console.log(chosenOptions)

    // console.log(chosenOptions)

    
    // if (chosenOptions[pageNum] != undefined) {
    //   getTO(pageNum,chosenOptions[pageNum].idoption,dateTxt,date)
    // }

    // console.log(timeOptions)


    // console.log(pageNum)
    // console.log(chosenDates[pageNum])
    // let day = {
    //   dateString: chosenDates[pageNum]
    // }
    // console.log(day)
    setMarkedDates({
      [chosenDates[pageNum]]: {
        selected: true,
        color: "#807d7d",
      },
    });
  }

  // console.log("00000000000000")
  // console.log(data[0].timeOptions)
  // console.log("11111111111111")
  // console.log(data[1].timeOptions)

  return (
    <View style={[styles.container, { width: props.width }]}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.list}
        data={data}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item, index }) => (
          <View style={[styles.allOptionsContainer, { width: width }]}>
            <OptionItem
              item={item}
              date={date}
              dateTxt={dateTxt}
              getTO={getTO}
              index={index}
            />
            {item.timeOptions != undefined ? 
              item.timeOptions.length > 0 ?
                <FlatList
                contentContainerStyle={styles.timeOptionsContainer}
                // style={{width:"90%"}}
                data={item.timeOptions}
                key={index}
                numColumns={5}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
                extraData={[data, ed]}
                renderItem={({ item }) => (
                  <TouchableOpacity style={item.chosen ? styles.timeOptionChosen : styles.timeOption} onPress={()=> itemChosen(index, item)}>
                    <Text key={item.time} style={item.chosen ? styles.timeOptionChosenTxt : styles.timeOptionTxt}>{item.time}</Text>
                  </TouchableOpacity>
                  // :
                  // <Text>Нет доступного времени на запись</Text>
                )}
              /> :
                  <Text style={styles.txt}>Нет доступного времени для записи</Text>

             :
            <Text style={styles.txt}>Выберите дату и доступную опцию</Text>}
            
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
      {options.length > 1 ? 
      <ListFooter len={options.length} currentIndex={currentIndex} /> :
      null
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    // backgroundColor: "green",
    // height: "100%",
    // alignItems: "center",
  },
  list: {
    // backgroundColor: "blue",
    height: 600,
    // flex: 1
  },
  allOptionsContainer: {
    // alignItems: "center",
    // backgroundColor: "green",
    flex: 1
  },
  timeOptionsContainer: {
    // backgroundColor: "orange",
    alignItems: "center",
  },
  timeOptionChosen: {
    backgroundColor: "white",
    padding: 12,
    margin: 6,
    borderRadius: 5
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
    fontFamily: "Manrope"
  },
  timeOptionTxt: {
    fontSize: 16,
    color: "white",
    fontFamily: "Manrope"
  },
  txt: {
    fontSize: 18,
    color: "white",
    fontFamily: "Manrope",
    marginTop: "20%",
    alignSelf: "center"
  },
});

export default OptionsCarousel;
