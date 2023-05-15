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
import Service from "../atoms/Service";

const AddServiceModal = () => {
  const {
    addServiceModalVisible,setAddServiceModalVisible, chosenServiceTypes, providerServices
  } = useContext(LogInContext);

  let servicesToChoose = []

  for (let i = 0; i < providerServices.length; i++) {
    if (!chosenServiceTypes.includes(providerServices[i].idst)) {
        servicesToChoose.push(providerServices[i])
    }
  }

  // console.log(chosenServiceTypes)

  return (
    <Modal
      animationType="slide"
      visible={addServiceModalVisible}
      presentationStyle={"fullScreen"}
      onRequestClose={() => {
        setAddServiceModalVisible(false);
      }}
    >
      <StatusBar backgroundColor="white" />
      <View style={styles.container}>
        <FlatList
            contentContainerStyle={styles.list}
            data={servicesToChoose}
            // extraData={filterText}
            renderItem={({ item }) => (
               <Service {...item} />
            )}
            ItemSeparatorComponent={() => <View style={{height: "8%"}} />}
            />
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
  list: {
    top: "4%"
  }
});

export default AddServiceModal;
