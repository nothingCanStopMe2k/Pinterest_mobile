import React, { useMemo } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, navigation } from "react-native";
import { SIZES, icons, FONTS, COLORS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const Pin = (props) => {
  const { index, item, navigation } = props;

  return (
    <TouchableOpacity onPress={() => { navigation.navigate("detail", {
      item: item
    }); }}>
    <View>
      <View
        style={{
          flex: 1,
          margin: 5,
          marginBottom: 2,
          height: Math.random() > 0.5 ? 200 : 280,
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
            width: "100%",
          }}
        >
          <View
            style={{
              marginBottom: -10,
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
            <Image
              source={icons.heartFill}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
                marginLeft: 3,
                fontWeight: "600",
              }}
            >
              {item.count}
            </Text>
          </View>
          {item.status ? (
            <LinearGradient
              colors={["transparent", "#000"]}
              start={{
                x: 0.5,
                y: 0,
              }}
              end={{
                x: 0.5,
                y: 1,
              }}
              style={{
                paddingLeft: 15,
                paddingTop: 15,
                paddingBottom: 5,
                borderRadius: 10,
                height: 50,
              }}
            >
              <Text
                style={{
                  ...FONTS.h4,
                  color: "#fff",
                }}
              >
                {item.status}
              </Text>
            </LinearGradient>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default Pin;

const styles = StyleSheet.create({});
