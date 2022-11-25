import { useState, useEffect, createContext } from "react";
import { Text, StatusBar, View, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native";
import LogInForm from "../molecules/LogInForm";

const LogInModal = (props) => {
  const [LogInModalVisible, setLogInModalVisible] = useState(true);
  const [emadress, changeEmadress] = useState("");
  const [password, changePassword] = useState("");

  const handleClick = async(val) => {
    try {
        const response = await fetch('http://' + props.ip + ':8082/api/users?emadress=' + emadress + '&password=' + password + '');
        const json = await response.json();
        if (json[0]['count(username)'] == 1) {
            setLogInModalVisible(false);
        }
      } catch (error) {
        console.error(error);
      }
  };

  const handleEmadressChange = val => {
    changeEmadress(val);
  };

  const handlePasswordChange = val => {
    changePassword(val);
  };

  return (
    <Modal
      animationType="slide"
      visible={LogInModalVisible}
      presentationStyle={"fullScreen"}
      //onRequestClose={() => clearFilter(0)}
    >
        <StatusBar backgroundColor="white"/>
        <View style={styles.container}>
            <LogInForm 
            handleClick={handleClick} 
            handleEmadressChange={handleEmadressChange} 
            handlePasswordChange={handlePasswordChange}
            emadress={emadress} password={password}/>
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
