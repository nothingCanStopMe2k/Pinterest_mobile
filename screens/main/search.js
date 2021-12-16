import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Marsonry from "../../components/Marsonry";
import { fileService } from "../../services/file.service";
import { userService } from "../../services/user.service";
import Pin from "../../components/Pin";
import Animated from "react-native-reanimated";

const Tag = ({ tagName, onPress }) => {
  return (
    <View>
      <TouchableOpacity style={styles.tag__wrapper} onPress={onPress}>
        <Text style={styles.tag}>{tagName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Search = ({ navigation }) => {
  const [dataRecommend, setDataRecommend] = useState([]);
  const [dataFile, setDataFile] = useState([]);
  const [keyword, setKeyword] = useState("");
  const refs = useRef();
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

  useEffect(() => {
    // console.log(refs);
    userService
      .getRecommend(recommendObject)
      .then((res) => {
        setDataRecommend(res);
        // console.log("DATA RECOMMEND: ", res);
      })
      .catch((err) => {
        console.log("ERR getRecommend: ", err);
      });
    let promiseArr = [];
    for (let data of dataRecommend) {
      promiseArr.push(fileService.getFileById(data.id));
    }
    Promise.all(promiseArr)
      .then((data) => {
        // console.log(data);
        if (data) setDataFile(data.flat());
      })
      .catch((err) => {
        console.log(err);
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
      <View style={styles.tag__container}>
        <Text style={styles.recommendText}>Tags</Text>
        <ScrollView style={styles.tags__scroll} horizontal={true}>
          {recommendObject.favTags.map((item, index) => (
            <Tag key={index} tagName={item} onPress={() => setKeyword(item)} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.favorite}>
        <Text style={styles.favorite__title}>Yêu thích</Text>
        <Animated.View style={{ flexGrow: 2.5 }}>
          <Marsonry
            style={{ alignSelf: "stretch" }}
            contentContainerStyle={{
              // padding: 10,
              alignSelf: "stretch",
            }}
            // innerRef={scrollRef}
            // onScroll={Animated.event(
            //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            //   { useNativeDriver: true }
            // )}
            // onMomentumScrollBegin={onMomentumScrollBegin}
            // onMomentumScrollEnd={onMomentumScrollEnd}
            // onScrollEndDrag={onScrollEndDrag}
            numColumns={2}
            data={dataFile}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, i }) => (
              <Pin
                key={i.toString()}
                index={i}
                // scrollY={scrollY}
                item={item}
                navigation={navigation}
              />
            )}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 10,
    flex: 1,
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
  tag__container: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  recommendText: {
    fontWeight: "500",
  },
  tags__scroll: {
    marginLeft: 7,
  },
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
  favorite: {
    marginTop: 20,
    flex: 1,
  },
  favorite__title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
