import { useState, useContext, useEffect, useCallback } from "react";
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  RefreshControl,
  ScrollView,
  Alert,
} from "react-native";
import LogInContext from "../context/LogInContext";
import RateService from "../components/atoms/RateService";

var width = Dimensions.get("window").width;

const Approved = (props) => {
  if (props.approved == 2) {
    return (
      <Text style={[styles.approved, { color: "red" }]}>Заявка отклонена</Text>
    );
  } else if (props.approved == 0) {
    return (
      <Text style={[styles.approved, { color: "orange" }]}>
        Заявка отправлена
      </Text>
    );
  } else if (props.approved == 1) {
    return (
      <Text style={[styles.approved, { color: "green" }]}>Заявка принята</Text>
    );
  }
};

const ProfileScreen = ({ navigation }) => {
  const { ip, uid, userEnrollments, getUserEnrollments } =
    useContext(LogInContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // console.log(uid)
    setRefreshing(true);
    getUserEnrollments(uid);
    setRefreshing(false);
  };

  const showCancelEnrollmentAlert = (item) =>
    Alert.alert(
      "Внимание!",
      "Вы уверены, что хотите отменить заявку на запись?",
      [
        {
          text: "Отменить заявку",
          style: "default",
          onPress: () => {
            // console.log(item.idenrollment)
            var theUrl = ip + "/api/enrollments/delete/";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = (e) => {
              if (xmlhttp.readyState !== 4) {
                return;
              }
              if (xmlhttp.status === 200) {
                console.log("success", xmlhttp.responseText);
                getUserEnrollments(uid);
              } else {
                console.log(xmlhttp.responseText);
                showAlert();
              }
            };
            xmlhttp.open("POST", theUrl);
            xmlhttp.setRequestHeader(
              "Content-Type",
              "application/json;charset=UTF-8"
            );
            xmlhttp.send(
              JSON.stringify({
                id: item.idenrollment,
              })
            );
          },
        },
        { text: "Назад", style: "default", onPress: () => {} },
      ]
    );

  function cancelEnrollment(item) {
    // console.log(item)
    showCancelEnrollmentAlert(item);
  }

  const List = () => {
    return (
      <FlatList
        contentContainerStyle={styles.enrollments}
        data={userEnrollments}
        scrollEnabled={true}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.enrollment}>
            <View style={styles.dateAndCancel}>
              <Text style={styles.signUpDate}>{item.signUpDate}</Text>
              {item.approved == 0 ? (
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => cancelEnrollment(item)}
                >
                  <Text style={styles.cancel}>x</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {/* <Text style={styles.providerName}>{item.providerName}</Text> */}
            <Text style={styles.serviceTypeName}>
              {item.serviceTypeName} в {item.providerName}
            </Text>
            <Text style={styles.adress}>{item.adress}</Text>
            <Text style={styles.opt}>
              {item.optionname}: {item.opt}
            </Text>
            <Approved approved={item.approved} />
            {item.approved == 1 ? (
              <RateService
                getUserEnrollments={getUserEnrollments}
                item={item}
              />
            ) : null}
          </View>
        )}
      />
    );
  };

  if (userEnrollments.length > 0)
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" />
        <List />
      </View>
    );
  else {
    return (
      <View style={[styles.container, { height: "100%" }]}>
        <StatusBar backgroundColor="black" />
        <Text style={styles.noEnrollments}>У Вас еще нет записей</Text>
        <List />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    //marginTop:"10%",
    // flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#202124",
  },
  noEnrollments: {
    fontFamily: "Manrope",
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    top: "30%",
  },
  enrollments: {
    width: width,
    // height: "100%",
    // justifyContent: "center",
  },
  enrollment: {
    backgroundColor: "black",
    width: "90%",
    alignSelf: "center",
    marginTop: "2%",
    marginBottom: "2%",
    padding: "6%",
    borderRadius: 5,
  },
  dateAndCancel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    backgroundColor: "black",
    borderRadius: 40,
    width: "14%",
    // aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cancel: {
    fontFamily: "Manrope",
    color: "white",
    fontSize: 20,
  },
  signUpDate: {
    fontFamily: "Manrope",
    color: "white",
    fontSize: 20,
  },
  serviceTypeName: {
    fontFamily: "Manrope",
    color: "white",
    fontSize: 16,
  },
  adress: {
    fontFamily: "Manrope",
    color: "white",
    fontSize: 16,
  },
  opt: {
    fontFamily: "Manrope",
    color: "white",
    fontSize: 16,
  },
  approved: {
    fontFamily: "Manrope",
    fontSize: 16,
  },
});

export default ProfileScreen;
