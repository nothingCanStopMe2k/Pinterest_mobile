import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FONTS, COLORS } from "../../constants";
import { fileService } from "../../services/file.service";
import { userService } from "../../services/user.service";
import ModalPopUp from "../../components/Modal";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
  hideComment,
  showComment,
  hideLoading,
  showLoading,
} from "../../redux";
import { LinearGradient } from "expo-linear-gradient";

let item;
const userReducer = (state) => state.userReducer;

const Detail = ({ route, navigation }) => {
  item = route.params.item;
  const [numberLike, setNumberLike] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [allComment, setAllComment] = useState([]);

  useEffect(() => {
    setNumberLike(item.count);
    fileService
      .getAllCommentById(item._id)
      .then((res) => {
        setAllComment(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const increaseLike = async () => {
    setIsLike(!isLike);
    setNumberLike(!isLike ? numberLike + 1 : numberLike - 1);
    let post = {
      postID: item._id,
      count: !isLike ? item.count + 1 : item.count,
      views: item.views + 1,
    };

    await fileService
      .updateFileById(post)
      .then((res) => {
        console.log("RES: OK LIKE SUCCESS! ");
      })
      .catch((err) => {
        console.log("Something Wrong: ", err);
      });
  };

  return (
    <View>
      <ModalComment allComment={allComment} setAllComment={setAllComment} />
      <DetailImage navigation={navigation} />
      <Divider width={1} orientation="vertical" />
      <DetailHeader
        isLike={isLike}
        increaseLike={increaseLike}
        numberLike={numberLike}
      />
    </View>
  );
};

const DetailImage = (props) => (
  <View
    style={{
      width: "100%",
      height: "75%",
      position: "relative",
    }}
  >
    <Image
      source={{ uri: `${item.link}` }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
    <TouchableOpacity
      onPress={() => props.navigation.goBack()}
      style={styles.icon0}
    >
      <LinearGradient
        colors={["#000", "transparent"]}
        start={{
          x: 0.5,
          y: 0,
        }}
        end={{
          x: 0.5,
          y: 1,
        }}
        style={{
          height: 30,
          width: "100%",
          position: "absolute",
        }}
      />
      <AntDesign name="left" size={24} color="white" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.icon4}>
      <AntDesign name="ellipsis1" size={24} color="white" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.icon5}>
      <MaterialIcons name="image-search" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

const DetailHeader = (props) => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        height: "25%",
        padding: 10,
        position: "relative",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={styles.story}
          />
          <View>
            <Text style={{ fontWeight: "500" }}>{item.photoOfUser}</Text>
            <Text style={{ fontWeight: "300" }}>{item.originalName}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text>Theo dõi</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 25,
        }}
      >
        {item.status}
      </Text>

      <TouchableOpacity
        onPress={() => dispatch(showComment())}
        style={styles.icon2}
      >
        <Ionicons name="chatbubble" size={40} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon3}>
        <Text
          style={{
            ...FONTS.h3,
            color: "white",
            textAlign: "center",
          }}
        >
          Lưu
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.increaseLike} style={styles.icon1}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              ...FONTS.h1,
              paddingRight: 5,
            }}
          >
            {props.numberLike}
          </Text>
          {!props.isLike ? (
            <AntDesign name="heart" size={40} color="#d3d3d3" />
          ) : (
            <AntDesign name="heart" size={40} color="black" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ModalComment = (props) => {
  const visibleProp = (state) => state.commentReducer.visible;
  const dispatch = useDispatch();
  const visible = useSelector(visibleProp);
  const userCurrent = useSelector(userReducer);
  let commentArray = props.allComment;
  const [userProfile, setUserProfile] = useState({}); //thông tin người dùng
  const [comment, setComment] = useState();
  let textInput = useRef(); //Dung de clear textInput sau khi comment

  useEffect(() => {
    const payLoad = {
      userID: userCurrent.userID,
    };

    //lấy thông tin người dùng
    userService
      .getProfile(payLoad)
      .then((res) => {
        setUserProfile(res);
      })
      .catch((err) => {
        console.log("ERROR GET PROFILE USER: ", err);
      });
  }, []);

  const handlePostComment = async () => {
    if (!comment) return;
    else {
      dispatch(showLoading());
      let today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let data = {
        userID: userProfile._id,
        postID: item._id,
        ownerName: userProfile.firstName + " " + userProfile.lastName,
        linkAvatar: userProfile.profilePhoto,
        content: comment,
        createdAt: date,
      };

      await userService
        .postComment(data)
        .then((res) => {
          console.log("OK COMMENT SUCCESS!");
        })
        .catch((err) => {
          console.log("ERR POST COMMENT: ", err);
        });

      dispatch(hideLoading());
      textInput.clear();
      props.setAllComment([...props.allComment, data]);
    }
  };

  return (
    <ModalPopUp visible={visible}>
      <View
        style={{
          height: "95%",
          width: "100%",
          padding: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => dispatch(hideComment())}
            style={{ position: "absolute", left: 0, top: -2 }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Nhận xét</Text>
        </View>
        <Divider width={5} orientation="vertical" />

        <ScrollView showsHorizontalScrollIndicator={false}>
          {commentArray.map((item, _id) => {
            return (
              <View key={_id}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: `${item.linkAvatar}`,
                      }}
                      style={styles.story}
                    />

                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontWeight: "500",
                          marginRight: 10,
                          fontWeight: "700",
                        }}
                      >
                        {item.ownerName}
                      </Text>
                      <Text style={{ fontWeight: "300", color: "gray" }}>
                        {item.createdAt != undefined
                          ? item.createdAt.slice(0, 10)
                          : ""}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    paddingLeft: 20,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 16,
                      marginTop: 0,
                      marginLeft: 20,
                    }}
                  >
                    {item.content}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <Divider width={1} orientation="vertical" />
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: `${userProfile.profilePhoto}` }}
              style={styles.story}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.btn1}>
                <TextInput
                  ref={(input) => {
                    textInput = input;
                  }}
                  placeholder="Add comment"
                  style={{
                    ...FONTS.h3,
                  }}
                  onChangeText={(text) => setComment(text)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handlePostComment()}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="QQ" size={45} color="black" />
        </TouchableOpacity>
      </View>
    </ModalPopUp>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1.6,
    borderColor: "#ff8501",
    marginRight: 5,
  },
  btn: {
    backgroundColor: "#d3d3d3",
    borderRadius: 18,
    padding: 10,
  },
  icon0: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  icon4: {
    position: "absolute",
    top: 20,
    right: 10,
  },
  icon1: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  icon2: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  icon3: {
    backgroundColor: "#EC255A",
    borderRadius: 18,
    width: 100,
    padding: 10,
    position: "absolute",
    textAlign: "center",
    bottom: 10,
    left: "40%",
  },
  icon5: {
    position: "absolute",
    bottom: 20,
    right: 10,
  },
  mediaImageContainer: {
    width: 250,
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  btn1: {
    backgroundColor: "#d3d3d3",
    borderRadius: 15,
    padding: 8,
    width: "90%",
  },
});
export default Detail;
