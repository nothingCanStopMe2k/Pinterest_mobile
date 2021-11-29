import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Comment from "../../components/Comment";

const detail = ({ route, navigation }) => {
    const { item } = route.params; 
    //console.log("Chi tiết hình ảnh:", item) // chi tiết hình ảnh, làm xong thì xóa dòng này nha <3

  return (
    <View>
      <Text>This is detail screens</Text>

      <Comment postID={item._id}/>
    </View>
  );
};

export default detail;

const styles = StyleSheet.create({});