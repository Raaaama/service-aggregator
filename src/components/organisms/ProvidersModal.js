import {
  StyleSheet,
  FlatList,
  Dimensions,
  Modal,
  StatusBar,
  View,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import Category from "../atoms/Category";
import { FlashList } from "@shopify/flash-list";
import LogInContext from "../../context/LogInContext";
import { useContext } from "react";
import ProviderCard from "../atoms/ProviderCard";

var width = Dimensions.get("window").width;

const ProvidersModal = (props) => {
  const {
    providersModalVisible,
    setProvidersModalVisible,
    providers,
    serviceTypeTitle,
  } = useContext(LogInContext);

  return (
    <Modal
      animationType="slide"
      visible={providersModalVisible}
      presentationStyle={"fullScreen"}
      onRequestClose={() => setProvidersModalVisible(false)}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="black" />
        <View style={styles.textView}>
          <Text style={styles.serviceTypeTitle}>{serviceTypeTitle}</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.subcategoriesList}
          data={providers}
          //extraData={fromFilter}
          renderItem={({ item }) => (
            <ProviderCard key={item.idprovider} {...item} />
            //   <Text key={item.idprovider}>{item.name}</Text>
          )}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
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
  textView: {
    backgroundColor:"black", 
    width:"100%", 
    padding: 15
  },
  serviceTypeTitle: {
    alignSelf: "center",
    fontFamily: "Manrope",
    color: "white",
    fontSize: 20,
    paddingTop: 10,
  },
  subcategoriesList: {
    width: width,
    marginTop: "60%",
  },
});

export default ProvidersModal;
