import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { userService } from "../../services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [apiError, setApiError] = useState("");
  const [userProfile, setUserProfile] = useState({}); //thông tin người dùng
  const [userPhotos, setUserPhotos] = useState([]); //array hình người đó đăng
  const [userVideos, setUserVideos] = useState([]);// array video người đó đăng

  useEffect(() => {
    AsyncStorage.getItem("userInfo")
    .then((value) => {
      const payload = {
        userID: JSON.parse(value).user,
      };
      //lấy thông tin người dùng
      userService
        .getProfile(payload)
        .then((res) => {
          setUserProfile(res);
        })
        .catch((err) => {
          if (err === 400) setApiError("Load fail!!!");
          else setApiError(err.message);
        });

        //Lấy ảnh, video mà user đó đã đăng
      userService
        .getPhotos(payload)
        .then((res) => {
          const resultPhoto = res.filter((item) => {
            if(item.originalName.split(".")[1] !== 'mp4')
              return true;
            return false;
          })
          const resultVideo = res.filter((item) => {
            if(item.originalName.split(".")[1] === 'mp4')
              return true;
            return false;
          })
          setUserPhotos(resultPhoto.reverse());
          setUserVideos(resultVideo.reverse())
        })
        .catch((err) => {
          if (err === 400) setApiError("Not found any photo!!!");
          else setApiError(err.message);
        });
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
  }, []);

  

  return (
    <View>
      <Text>This is profile screens</Text>
      <Text>Tạo màn hình profile ở đây</Text>
      {/* đăng nhập tài khoản test@gmail.com, pass: 123 */}
      {/* link avatar của user  */}
      <Text>{userProfile.profilePhoto}</Text>
      <Text>test commit</Text>
      
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
