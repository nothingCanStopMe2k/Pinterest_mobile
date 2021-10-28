import React, { useMemo } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SIZES, icons, FONTS, COLORS } from "../constants";

const Pin = (props) => {
  const { index, item } = props;

  return (
    <View
      style={{
        flex: 1,
        margin: 5,
        height: Math.random() > 0.5 ? 150 : 280,
      }}
    >
      <Image
        source={{ uri: item.link }}
        style={{
          height: "100%",
          borderRadius: 20,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.white,
            marginLeft: 15,
          }}
        >
          hi
        </Text>

        <View
          style={{
            marginBottom: 10,
            marginTop: 5,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            // opacity: 0.5,
            padding: 5,
            borderRadius: 10,
            flexDirection: "row",
            marginLeft: 10,
            width: 65,
          }}
        >
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.black,
              marginLeft: 3,
              fontWeight: "600",
            }}
          >
            {item.count}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Pin;

const styles = StyleSheet.create({});
