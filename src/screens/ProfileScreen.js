import { useState, useContext, useEffect } from "react";
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
} from "react-native";
import Footer from "../components/molecules/Footer";
import LogInContext from "../context/LogInContext";

var width = Dimensions.get("window").width;

const Approved = (props) => {
  if (props.approved == -1) {
    return <Text style={[styles.approved,{color: "red"}]}>Заявка отклонена</Text>;
  } else if (props.approved == 0) {
    return <Text style={[styles.approved,{color: "orange"}]}>Заявка отправлена</Text>;
  } else if (props.approved == 1) {
    return <Text style={[styles.approved,{color: "white"}]}>Заявка принята</Text>;
  }
};

const ProfileScreen = ({ navigation }) => {
  const { userEnrollments } = useContext(LogInContext);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <FlatList
        contentContainerStyle={styles.enrollments}
        data={userEnrollments}
        scrollEnabled={true}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        renderItem={({ item }) => (
          <View style={styles.enrollment}>
            <Text style={styles.signUpDate}>{item.signUpDate}</Text>
            {/* <Text style={styles.providerName}>{item.providerName}</Text> */}
            <Text style={styles.serviceTypeName}>{item.serviceTypeName} в {item.providerName}</Text>
            <Text style={styles.adress}>{item.adress}</Text>
            <Text style={styles.opt}>{item.optionname}: {item.opt}</Text>
            <Approved approved={item.approved}/>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop:"10%",
    // flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#202124",
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
    borderRadius: 5
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
  }
});

export default ProfileScreen;
