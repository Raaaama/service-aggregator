import HomeIcon from "../atoms/HomeIcon";
import { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SearchIcon from "../atoms/SearchIcon";
import UserIcon from "../atoms/UserIcon";

import LogInContext from "../../context/LogInContext";

const Footer = ({ navigation }) => {
    const size = 40;

    const { SetProfileChosen, SetHomeChosen, SetSearchChosen } = useContext(LogInContext);

    const SearchPressed = () => {
        requestAnimationFrame(() => {
            navigation.navigate("Search", {});
            SetSearchChosen(true);
            SetHomeChosen(false);
            SetProfileChosen(false);
        });
    }

    const HomePressed = () => {
        requestAnimationFrame(() => {
            navigation.navigate("Home", {});
            SetHomeChosen(true);
            SetProfileChosen(false);
            SetSearchChosen(false);
        });
    };

    const ProfilePressed = () => {
        requestAnimationFrame(() => {
            navigation.navigate("Profile", {});
            SetHomeChosen(false);
            SetProfileChosen(true);
            SetSearchChosen(false);
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={SearchPressed}>
                <SearchIcon size={size} />
            </TouchableOpacity>
            <TouchableOpacity onPress={HomePressed}>
                <HomeIcon size={size} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ProfilePressed}>
                <UserIcon size={size} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        bottom: 0,
        width: "100%",
        backgroundColor: "#0e0e0f",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
    },
});

export default Footer;
