import { StatusBar, View, StyleSheet } from "react-native";

import CategoriesList from "../components/molecules/CategoriesList";
import LogInModal from "../components/organisms/LogInModal";
import ServiceTypeModal from "../components/organisms/ServiceTypeModal";
import ProvidersModal from "../components/organisms/ProvidersModal";
import ProviderPageModal from "../components/organisms/ProviderPageModal";
import EnrollmentModal from "../components/organisms/EnrollmentModal";
import AddServiceModal from "../components/organisms/AddServiceModal";
import { useState } from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <CategoriesList />
      <LogInModal />
      <ServiceTypeModal />
      <ProvidersModal />
      <ProviderPageModal/>
      <EnrollmentModal/>
      <AddServiceModal/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop:"10%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#202124",
    alignItems: "center",
  },
});

export default HomeScreen;
