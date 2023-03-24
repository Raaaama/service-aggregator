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

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" />
            {/* <Text style={styles.txt}>Мои записи</Text> */}
            {/* <Footer navigation={navigation} /> */}
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

export default ProfileScreen;
