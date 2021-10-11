import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
  Animated,
  Image,
  // Animated,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

//import { authService } from "../../services/auth.service";
import features from "../../constants/features";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { onSignInWithGoogleAsync } from "../../firebase/signInWithGoogle";
import { auth } from "../../firebase/configure";

const { width, height } = Dimensions.get("window");

const signIn = ({ navigation }) => {
  const newFeatureScrollX = useRef(new Animated.Value(0)).current;
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  // authService
  //   .register({
  //     email: "123456@gmail.com",
  //     password: "1234",
  //     confirmPassword: "1234",
  //   })
  //   .then((res) => console.log("RES: ", res))
  //   .catch((err) => console.log("ERR: ", err.message));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("home");
      }
    });
    return unsubscribe;
  }, []);
  const renderFeatures = () => {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        snapToInterval={width}
        data={features}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 12,
        }}
        style={{
          flexGrow: 3,
        }}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: newFeatureScrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          return (
            <ImageBackground
              style={{
                width: width,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              source={item.bg}
            >
              <View
                style={{
                  width: width,
                  alignItems: "center",
                }}
              >
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 100,
                    marginBottom: 30,
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    width: "80%",
                    fontWeight: "bold",
                  }}
                >
                  {item.title1}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    width: "100%",
                    fontWeight: "bold",
                    marginBottom: 15,
                  }}
                >
                  {item.title2}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "80%",
                    fontSize: 15,
                  }}
                >
                  {item.subTitle}
                </Text>
              </View>
            </ImageBackground>
          );
        }}
      />
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(newFeatureScrollX, width);

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 48,
        }}
      >
        {features.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: "clamp",
          });
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: ["#444", "#FF002E", "#444"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                borderRadius: 12,
                marginHorizontal: 3,
                width: dotWidth,
                height: 6,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
      >
        <TouchableWithoutFeedback
          style={styles.buttonEmail}
          onPress={() => {
            navigation.navigate("signUp");
          }}
        >
          <Text style={styles.text}>Đăng kí với Email</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.buttonGoogle}
          onPress={() => onSignInWithGoogleAsync(setGoogleSubmitting)}
        >
          {!googleSubmitting ? (
            <Text style={styles.text}>Đăng nhập với Google</Text>
          ) : (
            <ActivityIndicator color="#fff" />
          )}
        </TouchableWithoutFeedback>
        <Text
          style={{
            textAlign: "center",
            width: "100%",
            textDecorationLine: "underline",
            marginVertical: 30,
          }}
        >
          Tìm hiểu chính sách của chúng tôi
        </Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar />
      <View style={styles.layout}>
        {renderFeatures()}
        {renderDots()}
        {renderButtons()}
      </View>
    </>
  );
};

export default signIn;

const styles = StyleSheet.create({
  layout: {
    width: width,
    height: height,
    flex: 1,
  },
  buttonEmail: {
    backgroundColor: "#FF002E",
    width: "85%",
    marginHorizontal: "7.5%",
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonGoogle: {
    backgroundColor: "red",
    width: "85%",
    marginHorizontal: "7.5%",
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});
