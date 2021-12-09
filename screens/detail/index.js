import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FONTS } from "../../constants";
import { fileService } from "../../services/file.service";

let item;

const Detail = ({ route, navigation }) => {
  item = route.params.item;
  const [numberLike, setNumberLike] = useState(0);
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    setNumberLike(item.count);
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
      <DetailImage />
      <Divider width={1} orientation="vertical" />
      <DetailHeader
        isLike={isLike}
        increaseLike={increaseLike}
        numberLike={numberLike}
      />
    </View>
  );
};

const DetailImage = () => (
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
    <TouchableOpacity style={styles.icon0}>
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

      <TouchableOpacity style={styles.icon2}>
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
});
export default Detail;
