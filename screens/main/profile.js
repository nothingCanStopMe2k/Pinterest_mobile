import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { scrollDownHome } from "../../redux";

import { userService } from "../../services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "./../../util/user";
import { FONTS } from "../../constants";
import { auth } from "../../services/firebase/configure";
import AppButton from "../../components/AppButton";

// Margin của thanh tabBottomNavigation, bao gồm: height+marginBottom
const containerHeight = 90;
const userReducer = (state) => state.userReducer;

const Profile = ({ navigation }) => {
  const [apiError, setApiError] = useState("");
  const [userProfile, setUserProfile] = useState({}); //thông tin người dùng
  const [userPhotos, setUserPhotos] = useState([]); //array hình người đó đăng
  const [userVideos, setUserVideos] = useState([]); // array video người đó đăng
  const [mounted, setMounted] = useState(false);

  const userCurrent = useSelector(userReducer);
  // console.log(userCurrent);

  // const scrollY = useRef(new Animated.Value(0)).current;
  // const offSetAnim = useRef(new Animated.Value(0)).current;

  // const dispatch = useDispatch();

  // const clampedScroll = Animated.diffClamp(
  //   Animated.add(
  //     scrollY.interpolate({
  //       inputRange: [0, 1],
  //       outputRange: [0, 1],
  //       extrapolateLeft: "clamp",
  //     }),
  //     offSetAnim
  //   ),
  //   0,
  //   containerHeight
  // );
  // useEffect(() => {
  //   const bottomTabTranslate = clampedScroll.interpolate({
  //     inputRange: [0, containerHeight],
  //     outputRange: [0, containerHeight * 2],
  //     extrapolate: "clamp",
  //   });
  //   const bottomTabOpacity = clampedScroll.interpolate({
  //     inputRange: [0, containerHeight],
  //     outputRange: [1, 0],
  //     extrapolate: "clamp",
  //   });

  //   dispatch(scrollDownHome(bottomTabTranslate, bottomTabOpacity));
  // }, [clampedScroll]);

  if (!mounted) {
    const payLoad = {
      userID: userCurrent.userID,
    };

    //lấy thông tin người dùng
    userService
      .getProfile(payLoad)
      .then((res) => {
        setUserProfile(res);
      })
      .catch((err) => {
        if (err === 400) setApiError("Load fail!!!");
        else setApiError(err.message);
      });

    //Lấy ảnh, video mà user đó đã đăng
    userService
      .getPhotos(payLoad)
      .then((res) => {
        const resultPhoto = res.filter((item) => {
          if (item.originalName.split(".")[1] !== "mp4") return true;
          return false;
        });
        const resultVideo = res.filter((item) => {
          if (item.originalName.split(".")[1] === "mp4") return true;
          return false;
        });
        setUserPhotos(resultPhoto.reverse());
        setUserVideos(resultVideo.reverse());
      })
      .catch((err) => {
        if (err === 400) setApiError("Not found any photo!!!");
        else setApiError(err.message);
      });
  }

  useEffect(() => {
    setMounted(true);

    // auth
    //   .signOut()
    //   .then(() => {
    //     console.log("Signed out");
    //     navigation.replace("signIn");
    //   })
    //   .catch(() => console.log("Error"));
    // AsyncStorage.removeItem("userInfo");
    // AsyncStorage.getItem("userInfo").then((res) =>
    //   console.log("User current: ", res["user"])
    // );
  }, []);

  const logout = () => {
    if (userCurrent.accessToken == "GOOGLE") {
      auth
        .signOut()
        .then(() => {
          navigation.navigate("signIn");
        })
        .catch(() => console.log("Error"));
    } else {
      AsyncStorage.clear();
      navigation.navigate("signIn");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        //   { useNativeDriver: true }
        // )}
      >
        <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: userProfile.profilePhoto }}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            {userProfile?.firstName} {userProfile?.lastName}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            {userProfile?.email}
          </Text>
          <AppButton
            title="Đăng Xuất"
            bgcolor="red"
            tcolor="white1"
            onPress={logout}
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>
              {userPhotos.length}
            </Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <View
            style={{
              height: 200,
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {userPhotos &&
                userPhotos.map((img) => {
                  return (
                    <View key={img._id} style={styles.mediaImageContainer}>
                      <Image
                        source={{ uri: img.link }}
                        style={styles.image}
                        resizeMode="cover"
                      ></Image>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
          <View style={styles.mediaCount}>
            <Text
              style={[
                styles.text,
                { fontSize: 24, color: "#DFD8C8", fontWeight: "300" },
              ]}
            >
              {userPhotos.length}
            </Text>
            <Text
              style={[
                styles.text,
                { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" },
              ]}
            >
              Media
            </Text>
          </View>
        </View>
        <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and{" "}
                <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    ...FONTS.h2,
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
