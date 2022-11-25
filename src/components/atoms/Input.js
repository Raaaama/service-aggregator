import { TextInput, StyleSheet } from "react-native";
import { useState } from "react";

const Input = (props) => {
    return(
    <TextInput
        onChangeText={(text) => props.handle(text)}
        value={props.value}
        placeholder={props.placeholder}
        style={styles.input}
        placeholderTextColor='#bababa'
        cursorColor='white'
        selectionColor='black'
        secureTextEntry={props.secured}/>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 80,
        fontSize: 30,
        fontFamily: 'Manrope',
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        color: 'white',
        textAlign: 'center'
      },
});

export default Input;