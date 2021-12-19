import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { scrollDownHome } from "../redux";
import { View, StyleSheet, Animated, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES } from "../constants/index";
import { Entypo } from "@expo/vector-icons";
export default function BottomSheet({
  children,
  height,
  isSlideUp,
  setSlideDown,
}) {
  const [bottom_sheet_translate_y, setTranslateY] = useState(
    new Animated.Value(SIZES.height)
  );
  const dispatch = useDispatch();

  const slideUp = () => {
    Animated.timing(bottom_sheet_translate_y, {
      toValue: SIZES.height - height,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    dispatch(scrollDownHome(0, 1));
    setSlideDown(false);
    Animated.timing(bottom_sheet_translate_y, {
      toValue: SIZES.height,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (isSlideUp) slideUp();
    else slideDown();
  }, [isSlideUp]);
  const onScroll = (evt) => {
    console.log("I am moving");
    slideDown();
  };
  return (
    <Animated.View
      style={[
        styles.BottomSheetContainer,
        {
          height: height,
          transform: [{ translateY: bottom_sheet_translate_y }],
        },
      ]}
    >
      {/* <View
        style={{ height: 40 }}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={onScroll}
      >
        <View style={styles.gesture}></View>
      </View> */}
      <TouchableOpacity
        style={styles.gesture}
        onPress={() => slideDown()}
      ></TouchableOpacity>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  BottomSheetContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    left: 0,
    right: 0,
    // bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 10,
    paddingTop: 0,
    zIndex: 1000,
    alignItems: "center",
  },
  gesture: {
    height: 4,
    width: 60,
    backgroundColor: "#CCC",
    borderRadius: 20,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
  },
  closeButton: {
    // position: "absolute",
    // zIndex: 1002,
  },
});
