import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SIZES, COLORS, icons } from "../constants";
import { useSelector } from "react-redux";

const translateY = (state) => state.tabBarBottomReducers.translateY;
const opacity = (state) => state.tabBarBottomReducers.opacity;

const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState("home");
  const translateYAnim = useSelector(translateY);
  const opacityAnim = useSelector(opacity);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { opacity: opacityAnim, transform: [{ translateY: translateYAnim }] },
      ]}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            setSelected("home");
            navigation.navigate("home");
          }}
          style={styles.iconContainer}
        >
          <Image
            source={icons.home}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: selected == "home" ? COLORS.black : COLORS.gray,
            }}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setSelected("search");
            navigation.navigate("search");
          }}
          style={styles.iconContainer}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: selected == "search" ? COLORS.black : COLORS.gray,
            }}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setSelected("chat");
            navigation.navigate("chat");
          }}
          style={styles.iconContainer}
        >
          <Image
            source={icons.chat}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: selected == "chat" ? COLORS.black : COLORS.gray,
            }}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setSelected("profile");
            navigation.navigate("profile");
          }}
          style={styles.iconContainer}
        >
          <Image
            source={icons.circle}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: selected == "profile" ? COLORS.black : COLORS.gray,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
    </Animated.View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderRadius: 50,
    height: 55,
    elevation: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 10,
  },
  iconContainer: {},
});
