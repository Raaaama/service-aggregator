import { useState, useEffect, createContext, useContext } from "react";
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import LogInForm from "../molecules/LogInForm";
import LogInContext from "../../context/LogInContext";
import SignUpForm from "../molecules/SignUpForm";
import { Base64 } from "js-base64";

const SignUpModal = (props) => {
  const showAlert = () =>
    Alert.alert("Error", "Phone number must be unique", [
      { text: "OK", style: "cancel" },
    ]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [telNum, setTelNum] = useState(0);
  const [pw, setPw] = useState("");

  const { ip } = useContext(LogInContext);

  const SignUp = async () => {
    try {
      var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
      var theUrl = ip + "/api/users/";
      xmlhttp.onreadystatechange = (e) => {
        if (xmlhttp.readyState !== 4) {
          return;
        }
        if (xmlhttp.status === 200) {
          console.log("success", xmlhttp.responseText);
        } else {
          console.log(xmlhttp.responseText);
          showAlert();
        }
      };
      xmlhttp.open("POST", theUrl);
      xmlhttp.setRequestHeader(
        "Content-Type",
        "application/json;charset=UTF-8"
      );
      xmlhttp.send(
        JSON.stringify({
          emadress: email,
          username: name,
          password: Base64.encode(pw),
          telnum: telNum,
        })
      );
      props.handleSignUp(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={props.vb}
      presentationStyle={"fullScreen"}
      onRequestClose={() => props.handleSignUp(false)}
    >
      <StatusBar backgroundColor="white" />
      <View style={styles.container}>
        <SignUpForm
          handleSU={SignUp}
          setEmail={setEmail}
          setName={setName}
          setTelNum={setTelNum}
          setPw={setPw}
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
});

export default SignUpModal;
