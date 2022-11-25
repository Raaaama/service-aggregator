import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Input from "../atoms/Input"

const LogInForm = (props) => {
    return(
    <View style={styles.form}>
        <Input handle={props.handleEmadressChange} value={props.emadress} secured={false} placeholder={'email'}/>
        <Input handle={props.handlePasswordChange} value={props.password} secured={true} placeholder={'password'}/>
        <TouchableOpacity
        style={styles.LogInButton}
        onPress={() => props.handleClick(false)}>
            <Text style={styles.LogInButtonTxt}>Log In</Text>
        </TouchableOpacity>            
    </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: '60%',
        width: '80%',
    },
    LogInButton: {
        justifyContent: 'center',
        height: 80,
        backgroundColor: '#0e0e0f',
    },
    LogInButtonTxt: {
        fontSize: 25,
        fontFamily: 'Manrope',
        padding: 10,
        color: 'white',
        textAlign: 'center',
    }
});

export default LogInForm;