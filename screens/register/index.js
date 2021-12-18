import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import { useForm, useController } from "react-hook-form";
import Screen from "../../components/Screen";
import ModalPopUp from "../../components/Modal";
import { authService } from "../../services/auth.service";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { icons, FONTS, COLORS, SIZES, images } from "../../constants";
import { onSignInWithGoogleAsync } from "../../services/firebase/signInWithGoogle";
import { hideLoading, showLoading, addCurrentUser } from "../../redux";
import { user } from "../../util/user"; //

const register = ({ navigation }) => {
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidUser, setisValidUser] = useState("");
  const [isValidPassword, setisValidPassword] = useState("");
  const [visiblePop, setVisiblePop] = useState(false);
  const [apiErr, setApiErr] = useState("");

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  const handleValidUser = (val) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(val).toLowerCase())) {
      setisValidUser("*The email address is not valid");
    } else {
      setisValidUser("");
    }
  };

  const handleValidPassword = (val) => {
    if (val.length < 4) {
      setisValidPassword("*Password must be at least 4 characters");
    } else {
      setisValidPassword("");
    }
  };

  const onSubmit = async (data) => {
    if (isValidUser && isValidPassword) {
      return;
    } else {
      setisValidUser("");
      setisValidPassword("");
      dispatch(showLoading());
      await authService.register(data)
      .then(async () => {
        await authService
        .login(data)
        .then((res) => {
          user.saveUserStorage(res.token);
          dispatch(hideLoading());
          dispatch(addCurrentUser(res.token.accessToken, res.token.user));
          navigation.navigate("main")
        })
        .catch((err) => {
          dispatch(hideLoading());
          setVisiblePop(true);
        });
      }).catch(err => {
        dispatch(hideLoading());
        setApiErr(err.message)
        setVisiblePop(true);
      });
    }
  };
  return (
    <>
      <ModalPopUp visible={visiblePop}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.headerPopUp}>
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => setVisiblePop(false), 200);
              }}
            >
              <Image
                source={icons.close}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={images.opps}
            style={{
              height: 150,
              width: 150,
            }}
          />
        </View>
        <Text
          style={{
            marginVertical: 20,
            fontSize: 20,
            textAlign: "center",
            ...FONTS.h2,
            color: COLORS.danger,
          }}
        >
          Opps, {apiErr}
        </Text>
      </ModalPopUp>

      <View
        style={{
          height: 50,
        }}
      >
        <TouchableOpacity
          style={styles.header}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={icons.leftArrow}
            resizeMode="cover"
            style={{ height: 30, width: 30, left: 10, position: "absolute" }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.view} />

      <Screen>
        
        <Text style={{ ...styles.text, margin: 30 }}>Đăng ký ngay!</Text>

        <AppTextInput
          placeholder="Email"
          icon="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          textContentType="emailAddress"
          name="email" //tên giá trị nhập
          control={control} //láy giá trị nhập
        />
        {isValidUser == "" ? null : (
          <Text style={{ marginLeft: 15, ...FONTS.h4, color: COLORS.danger }}>
            {isValidUser}
          </Text>
        )}
        <AppTextInput
          placeholder="Mật khẩu"
          icon="lock"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
          textContentType="password"
          name="password" //tên giá trị nhập
          control={control} //lấy giá trị nhập
        />
        <AppTextInput
          placeholder="Nhập lại mật khẩu"
          icon="lock"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
          textContentType="password"
          name="confirmPassword" //tên giá trị nhập
          control={control} //lấy giá trị nhập
        />
        {isValidPassword == "" ? null : (
          <Text style={{ marginLeft: 15, ...FONTS.h4, color: COLORS.danger }}>
            {isValidPassword}
          </Text>
        )}
        <View
          style={{
            width: SIZES.width * 0.75,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <AppButton
            title="Đăng ký"
            bgcolor="red"
            tcolor="white1"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

      </Screen>
    </>
  );
};

export default register;

const styles = StyleSheet.create({
  view: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: "10%",
  },
  header: {
    display: "flex",
    width: SIZES.width,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    textAlign: "center",
    ...FONTS.h3,
  },
  button: {
    backgroundColor: COLORS.red,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  buttonGoogle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
    height: 50,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
    width: SIZES.width * 0.75,
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
  headerPopUp: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
});
