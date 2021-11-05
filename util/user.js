import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserStorage = () => {
  AsyncStorage.getItem('userInfo')
    .then((value) => {
      const userInfo = value;
      return JSON.parse(userInfo);
    })
    .catch((err) => {
      console.log(err);
      return {}
    })
}

const saveUserStorage = userInfo => {
  // Hàm này m check chjuwa?
  // check rooif
  
    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const getUserInfo = () => {
  const userStorage = getUserStorage();

  if (userStorage.accessToken) {
    const userParse = parseJwt(userStorage.accessToken);

    return {
      role: "admin",
      // firstName: userParse.firstName,
      // lastName: userParse.lastName,
      idToken: userStorage.accessToken,
      refreshToken: userStorage.refreshToken,
      exp: userParse.exp,
      email: userParse.user.email,
      status: userParse.user.status,
      id: userParse.user._id,
    };
  }
  return {};
};

const checkRememberMe = (e, checked) => {
    const date = moment();

    if (checked) {
      return AsyncStorage.setItem('rememberMe', JSON.stringify(date));
    }

    return AsyncStorage.removeItem('rememberMe');
};

const checkRememberMeExpired = () => {
    const dateRememberMe = AsyncStorage.getItem('rememberMe');
    const expiredTimeRememberMe = 5; // days
    let isRememberMeExpired = false;

    if (dateRememberMe) {
      const dateParse = JSON.parse(dateRememberMe);
      const nowDate = moment();
      isRememberMeExpired =
        nowDate.diff(dateParse, 'days', true) > expiredTimeRememberMe;
    }

    return { isRememberMeExpired, hasCheckRememberMe: !!dateRememberMe };
};

export const user = {
  getUserInfo,
  checkRememberMeExpired,
  checkRememberMe,
  saveUserStorage,
  getUserStorage
};
