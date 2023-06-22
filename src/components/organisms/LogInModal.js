import { useState, useEffect, createContext, useContext } from "react";
import {
  Text,
  StatusBar,
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LogInForm from "../molecules/LogInForm";
import LogInContext from "../../context/LogInContext";
import SignUpModal from "./SignUpModal";
import { Base64 } from 'js-base64';

const LogInModal = (props) => {

  const [LogInModalVisible, setLogInModalVisible] = useState(true);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);

  const { emadress, password, ip, setUid, getUserEnrollments } = useContext(LogInContext);

  const handleLogIn = async () => {
    try {
      const response = await fetch(
          ip +
          "/api/users?emadress=" +
          emadress +
          "&password=" +
          Base64.encode(password)
      );
      const json = await response.json();
      if (json[0] != undefined) {
        setUid(json[0].iduser)
        setLogInModalVisible(false);
        getUserEnrollments(json[0].iduser)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={LogInModalVisible}
      presentationStyle={"fullScreen"}
      // onRequestClose={() => setLogInModalVisible(false)}
    >
      <SignUpModal vb={signUpModalVisible} handleSignUp={setSignUpModalVisible}/>
      <StatusBar backgroundColor="white" />
      <View style={styles.container}>
        <LogInForm handleLogIn={handleLogIn} handleSignUp={() => setSignUpModalVisible()} />
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

export default LogInModal;
