import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Input from "../atoms/Input";
import { useContext } from "react";
import LogInContext from "../../context/LogInContext";
import { useState } from "react";

const SignUpForm = (props) => {
    return (
        <View style={styles.form}>
            <Input handle={props.setEmail} secured={false} placeholder={"email"} />
            <Input handle={props.setName} secured={false} placeholder={"name"} />
            <Input handle={props.setTelNum} secured={false} placeholder={"phone number"} />
            <Input handle={props.setPw} secured={false} placeholder={"password"} />
            <TouchableOpacity
                style={styles.LogInButton}
                onPress={() => props.handleSU()}
            >
                <Text style={styles.LogInButtonTxt}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        marginTop: "60%",
        width: "80%",
    },
    LogInButton: {
        justifyContent: "center",
        height: 80,
        backgroundColor: "#0e0e0f",
        borderWidth: 1,
        borderColor: "white",
    },
    LogInButtonTxt: {
        fontSize: 25,
        fontFamily: "Manrope",
        padding: 10,
        color: "white",
        textAlign: "center",
    },
});

export default SignUpForm;
