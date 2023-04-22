import { StyleSheet, FlatList, Dimensions, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Category from "../atoms/Category";
import { FlashList } from "@shopify/flash-list";
import LogInContext from "../../context/LogInContext";
import { useContext } from "react";
import { ExpandableListView } from "react-native-expandable-listview";

var width = Dimensions.get("window").width;

const CategoriesList = (props) => {
  const { ip, categories, setCategories, subcategories, getSubcategories, getServiceTypes, setServiceTypeModalVisible, setSubcategoryTitle } =
    useContext(LogInContext);

  // function handleItemClick({ index }) {
  //   console.log(index);
  // }

  function handleInnerItem(item) {
    getServiceTypes(item.idsubcategory);
    setSubcategoryTitle(item.name);
    setServiceTypeModalVisible(true);
  }

  const CONTENT = [];

  categories.forEach((obj) =>
    CONTENT.push({
      id: obj.idcategory.toString(),
      categoryName: obj.name,
      subCategory: [],
    })
  );

  for (let i = 0; i < CONTENT.length; i++) {
    for (let j = 0; j < subcategories.length; j++) {
      if (CONTENT[i].id == subcategories[j].idcat) {
        CONTENT[i].subCategory.push({
          id: subcategories[j].idsubcategory,
          name: subcategories[j].name,
          customInnerItem: (
            <TouchableOpacity onPress={() => handleInnerItem(subcategories[j])} style={styles.subcategory}>
              <Text style={{color: "white", alignSelf:"center", fontSize: 20,}}>{subcategories[j].name}</Text>
            </TouchableOpacity>
          ),
        });
      }
    }
  }

  const getCategories = async () => {
    try {
      const response = await fetch(ip + "/api/categories");
      const json = await response.json();
      setCategories(json);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCategories();
    getSubcategories();
  }, []);

  return (
    <View style={styles.categoriesList}>
      <ExpandableListView
        data={CONTENT}
        itemContainerStyle={styles.category}
        itemLabelStyle={styles.category}
        chevronColor="white"
        animated={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesList: {
    width: width,
    marginTop: "50%",
  },
  category: {
    fontFamily: "Manrope",
    fontSize: 30,
    color: "white",
    backgroundColor: "black",

    padding: 15,
    margin: 7,
    textAlign: "center",

    borderRadius: 5,
  },
  subcategory: {
    width: width * 0.9,

    fontFamily: "Manrope",
    backgroundColor: "black",

    padding: 15, 
    margin: 3,
    alignSelf:"center",

    borderRadius: 5,
  }
});

export default CategoriesList;
