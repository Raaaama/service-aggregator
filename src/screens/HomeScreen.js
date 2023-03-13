import {
    StatusBar,
    View,
    StyleSheet,
} from "react-native";

import CategoriesList from "../components/molecules/CategoriesList";
import LogInModal from "../components/organisms/LogInModal";
import Footer from "../components/molecules/Footer";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" />
            <CategoriesList/>
            <LogInModal/>
            <Footer navigation={navigation} />
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
