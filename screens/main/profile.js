import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { userService } from "../../services/user.service";
import { user } from "../../util/user"; //
import { requestService }  from "../../services/request.service";
import { fileService } from "../../services/file.service";

const Profile = () => {
  const [apiError, setApiError] = useState("");
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    //Lấy ảnh đại diện
    console.log("PROFILE");
    userService
      .getProfile()
      .then((res) => {
        console.log(res)
        setUserProfile(res);
      })
      .catch((err) => {
        if (err === 400) setApiError("Load fail!!!");
        else setApiError(err.message);
      });

    //Lấy ảnh, video mà user đó đã đăng
    // userService
    //   .getPhotos()
    //   .then((res) => {
    //     const resultPhoto = res.filter((item) => {
    //       if(item.originalName.split(".")[1] !== 'mp4')
    //         return true;
    //       return false;
    //     })
    //     const resultVideo = res.filter((item) => {
    //       if(item.originalName.split(".")[1] === 'mp4')
    //         return true;
    //       return false;
    //     })
    //     setUserPhotos(resultPhoto.reverse());
    //     setUserVideos(resultVideo.reverse())
    //   })
    //   .catch((err) => {
    //     if (err === 400) setApiError("Not found any photo!!!");
    //     else setApiError(err.message);
    //   });
    }, []);

    const out = () => {
      const userInfo = user.getUserStorage();
      console.log(userInfo);
    }

  return (
    <View>
      <Text>This is profile screens</Text>
      <Text>Tạo màn hình profile ở đây</Text>
      <TouchableOpacity onPress={out}><Text>Đăng xuất</Text></TouchableOpacity>
      <Image
            source={userProfile.profilePhoto}
            style={{
              height: 150,
              width: 150,
            }}
          />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
