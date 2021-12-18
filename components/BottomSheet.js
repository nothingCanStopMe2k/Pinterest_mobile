import React, { useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES } from "../constants/index";
export default function BottomSheet({ children, height, getAnimation }) {
  const bottom_sheet_translate_y = useRef(new Animated.Value(SIZES.height));
  return (
    <View style={[styles.BottomSheetContainer, { height: height }]}>
      <View style={styles.gesture}></View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  BottomSheetContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    left: 0,
    right: 0,
    bottom: 0,
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
