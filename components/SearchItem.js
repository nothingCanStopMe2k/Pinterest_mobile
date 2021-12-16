import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Tag = ({ tagName, onPress }) => {
  return (
    <View>
      <TouchableOpacity style={styles.tag__wrapper} onPress={onPress}>
        <Text style={styles.tag}>{tagName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SearchItem = ({ keyword }) => (
  <View style={styles.searchItem}>
    <Image
      style={styles.searchItem__Icon}
      source={require("../assets/icons/search2.png")}
    />
    <Text style={styles.searchItem__keyword}>{keyword}</Text>
    <TouchableOpacity>
      <Image
        style={styles.closeItem__Icon}
        source={require("../assets/icons/close.png")}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  tag__wrapper: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: "#000",
    marginHorizontal: 3,
    borderRadius: 20,
  },
  tag: {
    color: "white",
  },
  searchItem: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  searchItem__Icon: {
    width: 18,
    height: 18,
    opacity: 0.8,
  },
  searchItem__keyword: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  closeItem__Icon: {
    width: 12,
    height: 12,
    opacity: 0.8,
  },
});
