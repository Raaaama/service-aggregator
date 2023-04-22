import {
  StyleSheet,
  FlatList,
  Dimensions,
  Modal,
  StatusBar,
  View,
  Text,
  TextInput,
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
    providers, setProviders,
    serviceTypeTitle,
  } = useContext(LogInContext);

  const [filterText, setFilterText] = useState();

  function filterProviders(text) {
    setFilterText(text);
    text = text.toLowerCase();
    for (let i = 0; i < providers.length; i++) {
      // && airports[i].apName.toLowerCase().search(text) == -1 && airports[i].apCode.toLowerCase().search(text) == -1
      if (providers[i].name.toLowerCase().search(text) == -1) {
        providers[i].shown = false;
      }
      else {
        providers[i].shown = true;
      }
    }
    () => setProviders(providers)
  }

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
        <TextInput
          // autoFocus={true}
          placeholder='Поиск'
          style={styles.searchInput}
          placeholderTextColor='#808080'
          onChangeText={(text) => filterProviders(text)}
        ></TextInput>
        <FlatList
          contentContainerStyle={styles.subcategoriesList}
          data={providers}
          extraData={filterText}
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
  searchInput: {
    backgroundColor: 'black',
    color: "white",
    fontSize: 25,
    textAlign: "center",
    fontFamily: 'Manrope',
    width: '100%',
    padding: "5%",
    margin: "4%"
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
    // marginTop: "60%",
  },
});

export default ProvidersModal;
