import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Platform,
  ScrollView,
  Keyboard,
  Animated,
  Easing,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Marsonry from "../../components/Marsonry";
import { fileService } from "../../services/file.service";
import { userService } from "../../services/user.service";
import { adminService } from "../../services/admin.service";
import Pin from "../../components/Pin";
import { SIZES, COLORS } from "../../constants";
import { DefaultTheme } from "@react-navigation/native";
import { SearchItem, Tag } from "../../components/SearchItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const Search = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.user);
  // console.log(user);
  const [dataFile, setDataFile] = useState([]);
  const [recommendKeyword, setRecommendKeyword] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [historySearch, setHistorySearch] = useState([]);
  const [keyword, setKeyword] = useState({ key: "", isShow: false });
  const [isFocus, setFocus] = useState(false);
  const [isShowResult, setShowResult] = useState(false);
  const search_recommend_translate_y = useRef(
    new Animated.Value(SIZES.height)
  ).current;
  // const search_result_translate_y = useRef(
  //   new Animated.Value(SIZES.height)
  // ).current;
  const refs = useRef();
  const recommendObject = {
    // lấy thông tin User đang đăng nhập gắn vào đây đây, do chưa có dữ liệu favTags nên lấy gtri mặc định
    id: user._id,
    favTags: [...user.favTags],
  };
  useEffect(() => {
    // console.log(refs);
    adminService
      .getAllTags()
      .then((tags) => {
        setAllTags(tags);
      })
      .catch((err) => console.log(err));
    userService
      .getRecommend(recommendObject)
      .then((res) => {
        // setDataRecommend(res);
        let promiseArr = [];
        for (let data of res) {
          promiseArr.push(fileService.getFileById(data.id));
        }
        return Promise.all(promiseArr);
        // console.log("DATA RECOMMEND: ", res);
      })
      .then((data) => {
        // console.log(data);
        if (data) setDataFile(data.flat());
      })
      .catch((err) => {
        console.log("ERR getRecommend: ", err);
      });
    AsyncStorage.getItem("History_Search")
      .then((data) => {
        if (data) setHistorySearch(JSON.parse(data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(JSON.stringify(historySearch));
    if (!historySearch.length) setShowResult(false);
  }, [historySearch]);

  useEffect(() => {
    handleChangeRecommendKeyword(keyword.key);
  }, [keyword]);

  //===================== Event Handler =====================//
  const handleClearPress = () => {
    setKeyword({ key: "", isShow: false });
  };

  const handleFocus = () => {
    setFocus(true);
    const translateAnimConfig = {
      toValue: 100,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    };
    Animated.timing(search_recommend_translate_y, translateAnimConfig).start();
  };

  const handleBackInput = () => {
    Keyboard.dismiss();
    setFocus(false);
    setKeyword({ key: "", isShow: false });
    const translateAnimConfig = {
      toValue: SIZES.height,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    };
    Animated.timing(search_recommend_translate_y, translateAnimConfig).start();
  };

  const handleChangeRecommendKeyword = (value) => {
    const temp = allTags.filter((tag) => {
      return !tag.indexOf(value.trim().toLowerCase());
    });
    setRecommendKeyword(temp.slice(0, 10));
    setShowResult(keyword.isShow);
  };

  const handleChangeText = (value) => {
    setKeyword({ key: value, isShow: false });
    // console.log(temp);
    // handleChangeRecommendKeyword(value);
  };

  const handlePressItem = (type) => {
    return (item) => {
      // alert(item);
      if (!type && !historySearch.includes(item))
        setHistorySearch([...historySearch, item]);
      setShowResult(true);
      setKeyword({ key: item, isShow: true });
      Keyboard.dismiss();
    };
  };

  const handleDeleteItem = (index) => {
    alert("Delete " + historySearch[index]);
    setHistorySearch([
      ...historySearch.slice(0, index),
      ...historySearch.slice(index + 1, historySearch.length),
    ]);
  };
  //===================== Event Handler =====================//
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isFocus && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBackInput}
            style={styles.blurIcon}
          >
            <Image source={require("../../assets/images/arrow.png")} />
          </TouchableOpacity>
        )}
        <View style={styles.searchBar}>
          {!isFocus && (
            <Image
              source={require("../../assets/icons/search2.png")}
              style={styles.searchIcon}
            />
          )}
          <TextInput
            ref={refs}
            placeholder="Tìm kiếm"
            clearButtonMode="always"
            value={keyword.key}
            onFocus={handleFocus}
            onChangeText={handleChangeText}
            style={styles.input}
            blurOnSubmit={false}
          />
          {keyword.key !== "" && Platform.OS === "android" && (
            <TouchableOpacity activeOpacity="0.7" onPress={handleClearPress}>
              <Image
                source={require("./assets/close.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.tag__container}>
        <Text style={styles.recommendText}>Tags</Text>
        <ScrollView style={styles.tags__scroll} horizontal={true}>
          {recommendObject.favTags.map((item, index) => (
            <Tag
              key={index}
              tagName={item}
              onPress={() => {
                setKeyword({ key: item, isShow: false });
                refs.current.focus();
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.favorite}>
        <Text style={styles.favorite__title}>Yêu thích</Text>
        <Animated.View style={{ flexGrow: 2.5 }}>
          <Marsonry
            style={{ alignSelf: "stretch" }}
            contentContainerStyle={{
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
      <Animated.View
        style={[
          styles.searchRecommend,
          { transform: [{ translateY: search_recommend_translate_y }] },
        ]}
      >
        <View style={styles.seperator}></View>
        {isShowResult ? (
          <View>
            <Text>Ket qua tim kiem</Text>
          </View>
        ) : keyword.key.trim() ? (
          <ScrollView>
            {recommendKeyword.length > 0 ? (
              recommendKeyword.map((key, index) => (
                <SearchItem
                  key={index}
                  keyword={key}
                  onPress={handlePressItem(0)}
                />
              ))
            ) : (
              <View style={styles.NoResultContainer}>
                <Image source={require("../../assets/icons/magnify.png")} />
                <Text style={styles.NoResultText}>
                  Không tìm thấy kết quả cho {keyword.key}
                </Text>
              </View>
            )}
          </ScrollView>
        ) : historySearch.length > 0 ? (
          <View>
            <Text style={styles.recentTitle}>Tìm kiếm gần đây</Text>
            {historySearch.map((key, index) => (
              <SearchItem
                key={index}
                index={index}
                keyword={key}
                onPress={handlePressItem(1)}
                onDelete={handleDeleteItem}
                deleteAction
              />
            ))}
          </View>
        ) : (
          <Image
            style={styles.searchIllustration}
            source={require("../../assets/icons/SearchIllustration.png")}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 5,
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  blurIcon: {
    marginRight: 15,
  },
  searchBar: {
    flexDirection: "row",
    flex: 1,
    height: 40,
    backgroundColor: "#e4e6eb",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginLeft: 7,
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
    paddingHorizontal: 10,
  },
  recommendText: {
    fontWeight: "500",
  },
  tags__scroll: {
    marginLeft: 7,
  },
  favorite: {
    marginTop: 20,
    flex: 1,
  },
  favorite__title: {
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  searchRecommend: {
    width: SIZES.width,
    height: SIZES.height,
    position: "absolute",
    backgroundColor: DefaultTheme.colors.background,
  },
  seperator: {
    height: 1.5,
    backgroundColor: "#CCC",
  },
  searchIllustration: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 150,
  },
  recentTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  NoResultContainer: {
    alignItems: "center",
    marginTop: 150,
  },
  NoResultText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
