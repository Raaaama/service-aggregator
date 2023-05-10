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
  ScrollView
} from "react-native";
import LogInContext from "../context/LogInContext";

var width = Dimensions.get("window").width;

const Approved = (props) => {
  if (props.approved == 2) {
    return <Text style={[styles.approved,{color: "red"}]}>Заявка отклонена</Text>;
  } else if (props.approved == 0) {
    return <Text style={[styles.approved,{color: "orange"}]}>Заявка отправлена</Text>;
  } else if (props.approved == 1) {
    return <Text style={[styles.approved,{color: "green"}]}>Заявка принята</Text>;
  }
};

const ProfileScreen = ({ navigation }) => {
  const { uid, userEnrollments, getUserEnrollments } = useContext(LogInContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log(uid)
    getUserEnrollments(uid);
    setRefreshing(false);
  }, []);

  if (userEnrollments.length > 0)
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />

      <FlatList
        contentContainerStyle={styles.enrollments}
        data={userEnrollments}
        scrollEnabled={true}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  else {
    return(
      <View style={[styles.container, {height: "100%"}]}>
        <StatusBar backgroundColor="black" />
        <Text style={styles.noEnrollments}>У Вас еще нет записей</Text>
        <FlatList
        contentContainerStyle={styles.enrollments}
        data={userEnrollments}
        scrollEnabled={true}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
    )
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
    top: "30%"
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
