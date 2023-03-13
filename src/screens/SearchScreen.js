import {
    Text,
    StatusBar,
    View,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Footer from "../components/molecules/Footer";

const SearchScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar/>
            <Text style={styles.txt}>Поиск</Text>
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
    txt: {
        fontSize: 25,
        fontFamily: "Manrope",
        padding: 10,
        color: "white",
    }
});

export default SearchScreen;
