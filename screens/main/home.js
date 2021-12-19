import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Button,
  TouchableWithoutFeedback,
  Animated,
  MaskedViewBase,
  ScrollView,
  RefreshControl,
} from "react-native";

import { auth } from "../../services/firebase/configure";
import { fileService } from "../../services/file.service";
import { hideLoading, scrollDownHome, showLoading } from "../../redux";
import Marsonry from "../../components/Marsonry";

import Pin from "../../components/Pin";
import { COLORS, SIZES, icons, FONTS } from "../../constants";
import { adminService } from "../../services/admin.service";
import { userService } from "../../services/user.service";
import { getCurrentUser } from "../../redux/user/userAction";

// Margin của thanh tabBottomNavigation, bao gồm: height+marginBottom
const containerHeight = 90;
let index = 1;

const Home = ({ navigation }) => {
  const [dataFromDB, setDataFromDB] = useState([]);
  const [datasForHeader, setDatasForHeader] = useState([]);
  const [refreshing, setRefresing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const offSetAnim = useRef(new Animated.Value(0)).current;
  const uid = useSelector((state) => state.userReducer.userID); //lấy userId trên redux

  const dispatch = useDispatch();

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offSetAnim
    ),
    0,
    containerHeight
  );
  //Header - Animation translate value
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 160],
    outputRange: [0, -160],
    extrapolate: "clamp",
  });
  //Header - Animation opacity value
  const opacityValue = Animated.multiply(
    headerTranslate,
    new Animated.Value(-1)
  ).interpolate({
    inputRange: [0, 160],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Pin - opacity value
  // const pinOpacity = scrollY.interpolate

  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;

  useEffect(() => {
    fileService.getAllFile().then((res) => {
      setDataFromDB(res.reverse().slice(0, 15));
      // console.log(res.slice(0, 20));
    });

    adminService.getAllUser().then((res) => {
      setDatasForHeader(res.slice(3, 11));
    });

    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue * diff, 0),
        containerHeight
      );
    });

    offSetAnim.addListener(({ value }) => {
      _offsetValue = value;
    });
  }, []);
  useEffect(() => {
    const bottomTabTranslate = clampedScroll.interpolate({
      inputRange: [0, containerHeight],
      outputRange: [0, containerHeight * 2],
      extrapolate: "clamp",
    });
    const bottomTabOpacity = clampedScroll.interpolate({
      inputRange: [0, containerHeight],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    dispatch(scrollDownHome(bottomTabTranslate, bottomTabOpacity));
  }, [clampedScroll]);

  //get profile tại home rồi dispatch lên redux
  useEffect(() => {
    userService
      .getProfile({ userID: uid })
      .then((res) => {
        dispatch(getCurrentUser(res));
      })
      .catch((err) => {
        console.log("fail get profile");
      });
  }, [uid]);

  var scrollEndTimer = null;
  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };
  const onMomentumScrollEnd = async (e) => {
    const toValue =
      _scrollValue > containerHeight &&
      _clampedScrollValue > containerHeight / 2
        ? _offsetValue + containerHeight
        : _offsetValue - containerHeight;

    Animated.timing(offSetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Handle infinity scroll
    if (e) {
      const scrollPosition = e.nativeEvent.contentOffset.y;
      const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
      const contentHeight = e.nativeEvent.contentSize.height;
      const isScrollToBottom = scrollViewHeight + scrollPosition;

      if (isScrollToBottom >= contentHeight - 50) {
        dispatch(showLoading());
        await fileService.getAllFile().then((res) => {
          const newData = res
            .reverse()
            .slice(15 * index + 1, 15 * (index * 2) + 1);
          setDataFromDB([...dataFromDB, ...newData]);
          index = index + 1;
        });
        dispatch(hideLoading());
      }
    }
  };
  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };
  const onRefresh = async () => {
    dispatch(showLoading());
    setRefresing(true);
    await fileService.getAllFile().then((res) => {
      let data = res
        .reverse()
        .slice(0, 20)
        .sort(() => {
          return 0.5 - Math.random();
        });
      setDataFromDB(data);
      dispatch(hideLoading());
    });
    setRefresing(false);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Signed out");
        navigation.replace("signIn");
      })
      .catch(() => console.log("Error"));
  };
  // uri: auth.currentUser.photoURL
  // auth.currentUser.displayName
  const OnlineUser = (props) => {
    const photoUri = props.data.profilePhoto;
    const name =
      (props.data.firstName ? props.data.firstName : "") +
      " " +
      (props.data.lastName ? props.data.lastName : "");
    return (
      <View style={styles.onlineUserContainer}>
        <TouchableOpacity style={styles.onlineUser}>
          <Image
            style={styles.onlineUserImg}
            source={{
              uri: photoUri,
            }}
          ></Image>
          <View style={styles.greenDot}></View>
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={styles.onlineUserName}
        >
          {name}
        </Text>
      </View>
    );
  };

  // Giao diện:
  const header = (props) => {
    return (
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslate }],
            opacity: opacityValue,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <Text style={[styles.headerContentFont, styles.headerContentAll]}>
            Tất cả
          </Text>
          <View style={styles.headerContentDiv}></View>
          <Text style={styles.headerContentFont}>Sự kiện</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("chat")}
          style={{
            position: "absolute",
            height: "50%",
            right: 15,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.red,
              borderRadius: 100,
              position: "absolute",
              zIndex: 100,
              right: 0,
              height: 15,
              width: 15,
            }}
          ></View>
          <Image
            source={icons.notification}
            style={{
              width: 35,
              height: 35,
            }}
          />
        </TouchableOpacity>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.userList}
        >
          {props.map((data, index) => (
            <OnlineUser data={data} key={index}></OnlineUser>
          ))}
        </ScrollView>
      </Animated.View>
    );
  };

  const marsoryLayout = () => {
    return (
      <Animated.View style={{ flexGrow: 2.5 }}>
        <Marsonry
          style={{ alignSelf: "stretch" }}
          contentContainerStyle={{
            padding: 10,
            alignSelf: "stretch",
            paddingTop: 160,
          }}
          // innerRef={scrollRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          numColumns={2}
          data={dataFromDB}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, i }) => (
            <Pin
              key={i.toString()}
              index={i}
              scrollY={scrollY}
              item={item}
              navigation={navigation}
            />
          )}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      {header(datasForHeader)}
      {marsoryLayout()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    flex: 1,
    paddingLeft: 20,
    zIndex: 10,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContentFont: {
    fontSize: 15,
    fontWeight: "bold",
  },
  headerContentAll: {
    color: "#fff",
    backgroundColor: "#000",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 40,
  },
  headerContentDiv: {
    width: 5,
    height: "60%",
    backgroundColor: "#000",
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  userList: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 0,
  },
  onlineUserContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  onlineUser: {
    width: 60,
    height: 60,
  },
  onlineUserImg: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    borderColor: "#c3c3c3",
    borderWidth: 1,
  },
  onlineUserName: {
    width: 60,
    textAlign: "center",
    fontSize: 15,
  },
  greenDot: {
    width: 15,
    height: 15,
    backgroundColor: "#00FF00",
    borderRadius: 20,
    position: "absolute",
    top: 2,
    right: 2,
  },
});
export default Home;
