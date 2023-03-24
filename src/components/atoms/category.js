import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import LogInContext from "../../context/LogInContext";
import {ExpandableListView} from 'react-native-expandable-listview';



function Category(props) {
  const { categories, setIdCat, getSubcategories, setSubcategoriesModalVisible } = useContext(LogInContext);

  function showSubcategory() {
    setIdCat(props.id);
    getSubcategories(props.id);
    setSubcategoriesModalVisible(true);

  }
  
  return (
    <TouchableOpacity onPress={showSubcategory}>
      <Text style={styles.category}>{props.name}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  category: {
    fontFamily: "Manrope",
    fontSize: 30,
    color: "white",
    backgroundColor: "black",

    padding: 15,
    margin: 7,
    textAlign: "center",

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default Category;