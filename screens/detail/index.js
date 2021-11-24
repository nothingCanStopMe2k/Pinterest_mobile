import React from "react";
import { StyleSheet, Text, View } from "react-native";

const detail = ({ route, navigation }) => {
    const { item } = route.params; 
    console.log(item) // chi tiết hình ảnh

  return (
    <View>
      <Text>This is detail screens</Text>
    </View>
  );
};

export default detail;

const styles = StyleSheet.create({});