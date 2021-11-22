import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { onSignInWithGoogleAsync } from "../../services/firebase/signInWithGoogle";
import { auth } from "../../services/firebase/configure";
import { icons, images, SIZES, COLORS, FONTS } from "../../constants";
import { showLoading, addCurrentUser } from "../../redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signIn = ({ navigation }) => {
  const dispatch = useDispatch();

  const dummyData = [
    {
      id: 1,
      title1: "Chia sẻ hình ảnh ",
      title2: "yêu thích của bạn với cộng đồng",
      subTitle: "Kho thư viện hình ảnh trên khắp thế giới",
      image: images.fea3,
      bg: images.bg1,
    },
    {
      id: 2,
      title1: "Kết bạn giao lưu",
      title2: "với những người cùng sở thích",
      subTitle: "Tìm kiếm chân ái của đời mình",
      image: images.fea2,
      bg: images.bg2,
    },
    {
      id: 3,
      title1: "Khơi nguồn cảm hứng",
      title2: "thoải mái tha hồ sáng tạo",
      subTitle: "...",
      image: images.fea3,
      bg: images.bg3,
    },
    {
      id: 4,
      title1: "Cân bằng hài hòa",
      title2: "yếu tố bên trong và bên ngoài",
      subTitle: "...",
      image: images.fea4,
      bg: images.bg1,
    },
  ];

  const newFeatureScrollX = useRef(new Animated.Value(0)).current;
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Nếu người dùng đăng nhập bằng tài khoản google.
      if (user) {
        navigation.navigate("main");
        dispatch(addCurrentUser("GOOGLE", user.email));
      }
      // Nếu người dùng đăng nhập bằng tài khoản email bình thường.
      else {
        AsyncStorage.getItem("userInfo")
          .then((value) => {
            if (value) {
              navigation.navigate("main");
              dispatch(
                addCurrentUser(
                  JSON.parse(value).accessToken,
                  JSON.parse(value).user
                )
              );
            }
          })
          .catch(console.log("No user"));
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
        snapToInterval={SIZES.width}
        data={dummyData}
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
                width: SIZES.width,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              source={item.bg}
            >
              <View
                style={{
                  width: SIZES.width,
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
    const dotPosition = Animated.divide(newFeatureScrollX, SIZES.width);

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 48,
        }}
      >
        {dummyData.map((item, index) => {
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
            outputRange: ["#444", COLORS.red, "#444"],
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
          <Text style={[styles.text, { color: "#fff" }]}>
            Đăng kí với Email
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.buttonGoogle}
          onPress={() => onSignInWithGoogleAsync(setGoogleSubmitting)}
        >
          <Image
            source={icons.google}
            style={{
              width: 30,
              height: 30,
              position: "absolute",
              left: 10,
            }}
          />
          {!googleSubmitting ? (
            <Text style={styles.text}>Tiếp tục bằng Google</Text>
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
    width: SIZES.width,
    height: SIZES.height,
    flex: 1,
  },
  buttonEmail: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: COLORS.red,
    width: "80%",
    height: 50,
    marginHorizontal: "10%",
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
  },
  buttonGoogle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
    width: "80%",
    height: 50,
    marginHorizontal: "10%",
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
  },
  text: {
    color: "#000",
    textAlign: "center",
    ...FONTS.h3,
  },
});
