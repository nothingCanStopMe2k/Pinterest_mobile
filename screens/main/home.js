import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Button,
  TouchableWithoutFeedback,
  Animated,
  MaskedViewBase,
} from "react-native";

import { auth } from "../../services/firebase/configure";
import { fileService } from "../../services/file.service";
import { scrollDownHome } from "../../redux";
import Marsonry from "../../components/Marsonry";

import Pin from "../../components/Pin";
import { COLORS, SIZES } from "../../constants";

// Margin của thanh tabBottomNavigation, bao gồm: height+marginBottom
const containerHeight = 90;

const Home = ({ navigation }) => {
  const [dataFromDB, setDataFromDB] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const offSetAnim = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offSetAnim
    ),
    0,
    containerHeight
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, (SIZES.width * 2) / 5],
    outputRange: [(SIZES.width * 2) / 5, 0],
    extrapolate: "clamp",
  });

  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;

  useEffect(() => {
    fileService.getAllFile().then((res) => {
      setDataFromDB(res.slice(0, 20));
    });

    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue * diff, 0),
        containerHeight
      );
    });

    offSetAnim.addListener(({ value }) => {
      _offsetValue = value;
    });
  }, []);
  useEffect(() => {
    const bottomTabTranslate = clampedScroll.interpolate({
      inputRange: [0, containerHeight],
      outputRange: [0, containerHeight * 2],
      extrapolate: "clamp",
    });
    const bottomTabOpacity = clampedScroll.interpolate({
      inputRange: [0, containerHeight],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    headerCollapseAnim = clampedScroll.interpolate({
      inputRange: [0, (SIZES.height * 2) / 5],
      outputRange: [0, -(SIZES.height * 2) / 5],
      extrapolate: "clamp",
    });

    dispatch(scrollDownHome(bottomTabTranslate, bottomTabOpacity));
  }, [clampedScroll]);

  var scrollEndTimer = null;
  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };
  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > containerHeight &&
      _clampedScrollValue > containerHeight / 2
        ? _offsetValue + containerHeight
        : _offsetValue - containerHeight;

    Animated.timing(offSetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Signed out");
        navigation.replace("signIn");
      })
      .catch(() => console.log("Error"));
  };
  // uri: auth.currentUser.photoURL
  // auth.currentUser.displayName

  // Giao diện:
  const header = () => {
    return (
      <Animated.View style={{ flex: 1 }}>
        <Text>Header</Text>
      </Animated.View>
    );
  };

  const marsoryLayout = () => {
    return (
      <Animated.View style={{ flexGrow: 2.5 }}>
        <Marsonry
          style={{ alignSelf: "stretch" }}
          contentContainerStyle={{
            padding: 10,
            alignSelf: "stretch",
          }}
          // innerRef={scrollRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          numColumns={2}
          data={dataFromDB}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, i }) => (
            <Pin key={i.toString()} index={i} item={item} />
          )}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      {header()}
      {marsoryLayout()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Home;
