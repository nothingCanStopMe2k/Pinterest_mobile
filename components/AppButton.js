import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { FONTS, COLORS, SIZES } from "../constants";

function AppButton({ title, onPress, bgcolor, tcolor }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: COLORS[bgcolor] }]}
      onPress={onPress}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          ...FONTS.h3,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    backgroundColor: COLORS.red,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    width: "70%",
  },
});

export default AppButton;
