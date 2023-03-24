import {
  StyleSheet,
  FlatList,
  Dimensions,
  Modal,
  StatusBar,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { useState, useEffect } from "react";
import Category from "../atoms/Category";
import { FlashList } from "@shopify/flash-list";
import LogInContext from "../../context/LogInContext";
import { useContext } from "react";
import { useEvent } from "react-native-reanimated";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

var width = Dimensions.get("window").width;

const ServiceTypeModal = (props) => {
  const { serviceTypeModalVisible, setServiceTypeModalVisible, serviceTypes, subcategoryTitle, getProviders, setProvidersModalVisible, setServiceTypeTitle } =
    useContext(LogInContext);

  function handleServiceType(item) {
    getProviders(item.idservice_type);
    setServiceTypeTitle(item.name);
    setProvidersModalVisible(true);
  }
    
  return (
    <Modal
      animationType="slide"
      visible={serviceTypeModalVisible}
      presentationStyle={"fullScreen"}
      onRequestClose={() => setServiceTypeModalVisible(false)}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="black"/>
        <View style={styles.textView}>
          <Text style={styles.subcategoryTitle}>{subcategoryTitle}</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.serviceTypes}
          data={serviceTypes}
          //extraData={fromFilter}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleServiceType(item)}>
              <Text style={styles.serviceType}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop:"10%",
    flex: 1,
    backgroundColor: "#202124",
    alignItems: "center",
  },
  serviceTypes: {
    width: width,
    marginTop: "60%",
  },
  subcategoryTitle: {
    alignSelf: "center",
    fontFamily: "Manrope",
    color: "white",
    fontSize: 20,
    paddingTop: 10,
  },
  textView: {
    backgroundColor:"black", 
    width:"100%", 
    padding: 15
  },
  serviceType: {
    fontFamily: "Manrope",
    fontSize: 30,
    color: "white",
    backgroundColor: "black",

    padding: 15,
    margin: 7,
    textAlign: "center",

    borderRadius: 5,
  },
});

export default ServiceTypeModal;
