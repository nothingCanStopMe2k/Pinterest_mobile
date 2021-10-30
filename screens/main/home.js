import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { auth } from "../../services/firebase/configure";
import { fileService } from "../../services/file.service";
import Marsonry from "../../components/Marsonry";
import Animated, {
  call,
  Extrapolate,
  useAnimatedScrollHandler,
  useCode,
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  diffClamp,
  add,
} from "react-native-reanimated";
import Pin from "../../components/Pin";
import { COLORS, SIZES } from "../../constants";

// Margin của thanh tabBottomNavigation, bao gồm: height+marginBottom
const containerHeight = 90;

const Home = ({ navigation }) => {
  const [dataFromDB, setDataFromDB] = useState([]);
  const translateY = useSharedValue(0);
  const offSetAnim = useSharedValue(0);

  const clampedScroll = diffClamp(
    add(
      interpolate(translateY.va, [0, 1], [0, 1], {
        extrapolateLeft: Extrapolate.CLAMP,
      }),
      offSetAnim
    ),
    0,
    containerHeight
  );

  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;
  useEffect(() => {
    useCode(() => {
      return call([translateY], (translateY) => {
        const diff = translateY - _scrollValue;
        _scrollValue = translateY;
        _clampedScrollValue = Math.min(
          Math.max(_clampedScrollValue * diff, 0),
          containerHeight
        );
      });
    }, [translateY]);

    useCode(() => {
      return call([offSetAnim], (offSetAnim) => {
        _offsetValue = offSetAnim;
      });
    }, [offSetAnim]);
  }, []);

  const bottomTabTranslate = interpolate(
    clampedScroll.value,
    [0, containerHeight],
    [0, containerHeight * 2],
    Extrapolate.CLAMP
  );

  useEffect(() => {
    fileService.getAllFile().then((res) => {
      setDataFromDB(res.slice(0, 20));
    });
  }, []);

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
      <View style={{ flexGrow: 1 }}>
        <Text>Header</Text>
      </View>
    );
  };

  const marsoryLayout = () => {
    return (
      <View style={{ flexGrow: 2.5 }}>
        <Marsonry
          style={{ alignSelf: "stretch" }}
          contentContainerStyle={{
            padding: 10,
            alignSelf: "stretch",
          }}
          // innerRef={scrollRef}
          onScroll={scrollHandler}
          numColumns={2}
          data={dataFromDB}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, i }) => (
            <Pin key={i.toString()} index={i} item={item} />
          )}
        />
      </View>
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
