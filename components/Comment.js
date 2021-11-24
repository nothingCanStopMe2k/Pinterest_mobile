import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { fileService } from "../services/file.service";

const Comment = ({ postID }) => {
    const [allCommentOfPhoto, setAllCommentOfPhoto] = React.useState([]);

    React.useEffect(() => {
        fileService.getAllCommentById(postID)
          .then(res => setAllCommentOfPhoto(res))
          .catch(err => console.log("ERR: ", err.message));
    }, []);

    console.log("Tất cả bình luận", allCommentOfPhoto); // bình luận, làm xong xóa giúp nha <3

  return (
    <View>
      <Text>This is Comment</Text>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});