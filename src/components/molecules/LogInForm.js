import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Input from "../atoms/Input";
import { useContext } from "react";
import LogInContext from "../../context/LogInContext";

const LogInForm = (props) => {
  const { setEmadress, setPassword } = useContext(LogInContext);

  return (
    <View style={styles.form}>
      <Input handle={setEmadress} secured={false} placeholder={"Логин"} />
      <Input handle={setPassword} secured={true} placeholder={"Пароль"} />
      <TouchableOpacity
        style={styles.LogInButton}
        onPress={() => props.handleLogIn()}>
        <Text style={styles.LogInButtonTxt}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.LogInButton}
        onPress={() => props.handleSignUp(true)}>
        <Text style={styles.LogInButtonTxt}>Регистрация</Text>
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
    borderColor: 'white',
  },
  LogInButtonTxt: {
    fontSize: 25,
    fontFamily: "Manrope",
    padding: 10,
    color: "white",
    textAlign: "center",
  },
});

export default LogInForm;
