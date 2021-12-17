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

const signUp = ({ navigation }) => {
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidUser, setisValidUser] = useState("");
  const [isValidPassword, setisValidPassword] = useState("");
  const [visiblePop, setVisiblePop] = useState(false);
  const [visiblePopForgotPass, setVisiblePopForgotPass] = useState(false);

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

  const handleForgotPassword = async () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      dispatch(showLoading());
      await authService
        .forgotPassword({ email: email })
        .then(() => {})
        .catch((err) => {
          console.log("Error ForgotPassword: ", err);
        });
      dispatch(hideLoading());
      setVisiblePopForgotPass(false);
    }
  };

  const handleSignUp = () => {
    setVisiblePop(false);
  };

  const onSubmit = async (data) => {
    if (isValidUser && isValidPassword) {
      return;
    } else {
      setisValidUser("");
      setisValidPassword("");
      dispatch(showLoading());
      await authService
        .login(data)
        .then((res) => {
          user.saveUserStorage(res.token);
          dispatch(hideLoading());
          dispatch(addCurrentUser(res.token.accessToken, res.token.user));
          navigation.navigate("main");
        })
        .catch((err) => {
          dispatch(hideLoading());
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
          Opps, Email hoặc password bạn nhập không chính xác. Đăng ký luôn nhé?
        </Text>
        <Button title="OK" color={COLORS.blue} onPress={handleSignUp} />
      </ModalPopUp>
      <ModalPopUp visible={visiblePopForgotPass}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.headerPopUp}>
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => setVisiblePopForgotPass(false), 200);
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
          <Text
            style={{
              marginBottom: 20,
              fontSize: 20,
              textAlign: "center",
              ...FONTS.h2,
              color: COLORS.dark,
            }}
          >
            Chúng tôi sẽ gửi mật khẩu mới qua email của bạn. Vui lòng nhập đúng
            email:
          </Text>
        </View>
        <TextInput
          style={{
            borderColor: COLORS.black,
            height: 50,
            borderRadius: 10,
            borderStyle: "solid",
            borderWidth: 1,
            paddingHorizontal: 10,
            ...FONTS.h3,
          }}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: "50%",
              marginTop: 20,
            }}
          >
            <Button
              title="OK"
              color={COLORS.blue}
              onPress={handleForgotPassword}
            />
          </View>
        </View>
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

        <Text style={{ ...styles.text, margin: 30 }}>Hoặc</Text>

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
            title="Đăng nhập"
            bgcolor="red"
            tcolor="white1"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <TouchableWithoutFeedback onPress={() => setVisiblePopForgotPass(true)}>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              textDecorationLine: "underline",
              marginVertical: 10,
              ...FONTS.h4,
            }}
          >
            Quên mật khẩu?
          </Text>
        </TouchableWithoutFeedback>
      </Screen>
    </>
  );
};

export default signUp;

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
