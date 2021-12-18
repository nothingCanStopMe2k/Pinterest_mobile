import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES } from "../constants/index";
export default function BottomSheet({
  children,
  height,
  isSlideUp,
  setSlideDown,
}) {
  const bottom_sheet_translate_y = useRef(
    new Animated.Value(SIZES.height)
  ).current;

  const slideUp = () => {
    Animated.timing(bottom_sheet_translate_y, {
      toValue: SIZES.height - height,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
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
      <View style={styles.gesture}></View>
      <TouchableOpacity onPress={() => slideDown()}>
        <Text>TẮT</Text>
      </TouchableOpacity>
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
    zIndex: 1000,
    alignItems: "center",
  },
  gesture: {
    height: 4,
    width: 50,
    backgroundColor: "#CCC",
    borderRadius: 20,
    marginBottom: 15,
  },
});
