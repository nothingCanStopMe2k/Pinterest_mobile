import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { userService } from "../../services/user.service";
import { user } from "../../util/user"; //
import { requestService } from "../../services/request.service";
import { fileService } from "../../services/file.service";
import { auth } from "../../services/firebase/configure";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [apiError, setApiError] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [userPhotos, setUserPhotos] = useState([]);
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("userInfo")
    .then((value) => {
      const payload = {
        userID: JSON.parse(value).user,
      };

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

  const out = async () => {
    const userInfo = await user.getUserStorage;

    const payload = {
      userID: userInfo.user,
    };
    userService
      .getProfile(payload)
      .then((res) => {
        console.log("PROFILE INFO: ", res);
        setUserProfile(res);
      })
      .catch((err) => {
        if (err === 400) setApiError("Load fail!!!");
        else setApiError(err.message);
      });
  };

  return (
    <View>
      <Text>This is profile screens</Text>
      <Text>Tạo màn hình profile ở đây</Text>
      <TouchableOpacity onPress={out}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
