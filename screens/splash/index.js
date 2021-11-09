import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { images, COLORS, FONTS } from "../../constants";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   withDelay,
// } from "react-native-reanimated";

const widthLogo = 250,
  heightLogo = 250,
  speedAnimation = 0.8;
export default function splash({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      delay: 3 * speedAnimation * 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(scale, {
      toValue: 1,
      delay: 3 * speedAnimation * 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: widthLogo,
          height: heightLogo,
        }}
      >
        <LottieView
          source={images.splash}
          autoPlay
          loop={false}
          speed={speedAnimation}
          onAnimationFinish={() => navigation.navigate("signIn")}
        />
      </View>
      <Animated.View
        style={[
          styled.logo,
          {
            opacity: opacity,
            transform: [{ scale: scale }],
          },
        ]}
      >
        <Text style={[styled.title, { transform: [{ translateX: -20 }] }]}>
          N
        </Text>
        <Text style={[styled.title, { transform: [{ translateX: 25 }] }]}>
          24
        </Text>
      </Animated.View>
    </View>
  );
}

const styled = StyleSheet.create({
  logo: {
    position: "absolute",
    textAlign: "center",
  },
  title: {
    color: "#fff",
    ...FONTS.h1,
  },
});
