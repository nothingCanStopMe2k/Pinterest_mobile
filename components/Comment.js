import React from "react";
import { useSelector } from "react-redux";
import { useForm, useController } from "react-hook-form";

import { StyleSheet, Text, View } from "react-native";

import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";

import { fileService } from "../services/file.service";
import { userService } from "../services/user.service";

const Comment = ({ postID }) => {
    const [allCommentOfPhoto, setAllCommentOfPhoto] = React.useState([]);
    const user = useSelector(state => state.userReducer.user);
    const { control, handleSubmit } = useForm();

    React.useEffect(() => {
        fileService.getAllCommentById(postID)
          .then(res => setAllCommentOfPhoto(res))
          .catch(err => console.log("ERR: ", err.message));
    }, []);

    //console.log("Tất cả bình luận", allCommentOfPhoto); // bình luận, làm xong xóa giúp nha <3

    const onSubmit = async (data) => {
      const formData = {
        userID: user._id,
        postID: postID,
        ownerName: user.firstName + " " + user.lastName,
        linkAvatar: user.profilePhoto,
        content: data.content
      }

      await userService.postComment(formData)
      .then(() => {
        console.log("thành công")
      })
      .catch(err => {
        console.log("fail")
      });
    };

  return (
    <View>
      <Text>This is Comment</Text>
      
      {/* ô nhập bình luận */}
      <AppTextInput
          placeholder="Write your comment"
          autoCapitalize="none"
          autoCorrect={false}
          name="content" //tên giá trị nhập
          control={control} //láy giá trị nhập
        />

      <AppButton
          title="Send"
          bgcolor="red"
          tcolor="white1"
          onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});