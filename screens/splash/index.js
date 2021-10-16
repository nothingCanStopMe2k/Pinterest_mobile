import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { images, COLORS, FONTS } from "../../constants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from "react-native-reanimated";

const widthLogo = 250,
  heightLogo = 250,
  speedAnimation = 0.8;
export default function splash({ navigation }) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(3 * speedAnimation * 1000, withSpring(1));
    opacity.value = withDelay(3 * speedAnimation * 1000, withSpring(1));
  }, []);

  const rTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

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
      <Animated.View style={[styled.logo, rTextStyle]}>
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
