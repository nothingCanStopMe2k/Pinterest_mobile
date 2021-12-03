import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { fileService } from "../../services/file.service";
import { userService } from "../../services/user.service";

const Search = () => {
  const [dataRecommend, setDataRecommend] = useState([]);

  useEffect(() => {}, []);

  const start = () => {
    const recommendObject = {
      // lấy thông tin User đang đăng nhập gắn vào đây đây, do chưa có dữ liệu favTags nên lấy gtri mặc định
      id: "id",
      favTags: [
        "animes",
        "girl beautiful",
        "husky",
        "blue",
        "joker",
        "cat",
        "dragon",
      ],
    };
    userService
      .getRecommend(recommendObject)
      .then((res) => {
        setDataRecommend(res);
        console.log("DATA RECOMMEND: ", res);
      })
      .catch((err) => {
        console.log("ERR getRecommend: ", err);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => start()}>
        <Text>Bat dau algorithm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
