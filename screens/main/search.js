import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Marsonry from "../../components/Marsonry";
import { fileService } from "../../services/file.service";
import { userService } from "../../services/user.service";

const Search = () => {
  const [dataRecommend, setDataRecommend] = useState([]);
  const [dataFile, setDataFile] = useState([]);
  const [keyword, setKeyword] = useState("");
  const refs = useRef();
  useEffect(() => {
    // console.log(refs);
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
        // console.log("DATA RECOMMEND: ", res);
      })
      .catch((err) => {
        console.log("ERR getRecommend: ", err);
      });
    // fileService
    //   .getFileById(dataRecommend[0])
    //   .then((file) => console.log(file))
    //   .catch((err) => console.log(err));
    fileService.getAllFile().then((res) => {
      console.log(res);
    });
  }, []);

  const handleClearPress = () => {
    setKeyword("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          source={require("./assets/search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          ref={refs}
          placeholder="Tìm kiếm"
          clearButtonMode="always"
          value={keyword}
          onChangeText={(value) => {
            setKeyword(value);
          }}
          style={styles.input}
        />
        {keyword !== "" && Platform.OS === "android" && (
          <TouchableOpacity activeOpacity="0.7" onPress={handleClearPress}>
            <Image
              source={require("./assets/close.png")}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.recommendText}>Gợi ý cho bạn</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    height: 40,
    backgroundColor: "#e4e6eb",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  searchIcon: {
    width: 16,
    height: 16,
    opacity: 0.7,
    marginHorizontal: 10,
  },
  closeIcon: {
    width: 12,
    height: 12,
    opacity: 0.7,
    marginHorizontal: 10,
  },
  recommendText: {
    marginTop: 15,
    fontWeight: "bold",
  },
});
