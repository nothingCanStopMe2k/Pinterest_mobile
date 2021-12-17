import React, { useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  // TouchableOpacity,
  navigation,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { SIZES, icons, FONTS, COLORS } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const DURATION = 400;

const Pin = (props) => {
  const { index, item, navigation, scrollY } = props;
  const randomNumber = Math.random();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("detail", {
          item: item,
        });
      }}
    >
      <Animatable.View animation="fadeInUp" delay={DURATION + index * 100}>
        <View
          style={{
            flex: 1,
            margin: 5,
            marginBottom: 24,
            height: randomNumber <= 0.45 ? 200 : randomNumber < 0.9 ? 300 : 120,
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
                  numberOfLines={1}
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
          <View
            style={{
              width: "100%",
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                position: "absolute",
                right: 5,
              }}
              source={icons.dots}
            />
          </View>
        </View>
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

export default Pin;

const styles = StyleSheet.create({});
