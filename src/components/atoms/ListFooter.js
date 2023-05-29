import { TextInput, StyleSheet, View, FlatList, Text } from "react-native";
import { useState } from "react";

const ListFooter = (props) => {
  let data = [...Array(props.len).keys()];
  let currentIndex = props.currentIndex;
  return (
    <FlatList
      contentContainerStyle={styles.listView}
      data={data}
      horizontal
      renderItem={({ item, index }) => (
        <View
          key={index}
          style={
            currentIndex == index
              ? [styles.dot, { backgroundColor: "white" }]
              : [styles.dot, { backgroundColor: "#696868" }]
          }
        ></View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listView: {
    // backgroundColor: "red",
    alignItems: "center",
    height: 20,
    width: "100%",
    justifyContent: "center",
    alignSelf: "flex-end",

    // top: 10
    // bottom: 20
    // marginBottom: "10%"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 44 / 2,
    margin: 4,
  },
});

export default ListFooter;
