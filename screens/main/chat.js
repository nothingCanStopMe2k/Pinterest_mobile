import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES } from "../../constants";

const Chat = () => {
  const [notificationsData, setNotificationData] = useState([
    { id: 0 },
    { id: 1 },
  ]);
  const [topUserData, setTopUserData] = useState([{ id: 0 }, { id: 1 }]);

  const ElementNotifications = (item, index) => {
    return (
      <View
        key={index}
        style={{
          flex: 1,
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={{
            uri: "https://drive.google.com/uc?id=1o_ojm-1kUlEr-mjQAk-YPyk0I64twPFI",
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
          }}
        />
        <View
          style={{
            paddingLeft: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              width: 250,
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              Alex Mahone
            </Text>
            <Text style={{ ...FONTS.h3_thin }}>
              {" "}
              gần đây đã bình luận về ảnh của bạn trong nhóm
            </Text>
          </Text>
          <Text style={{ opacity: 0.5 }}>1 giờ trước</Text>
        </View>
      </View>
    );
  };

  const ElementTopUser = (item, index) => {
    return (
      <View
        key={index}
        style={{
          flex: 1,
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ ...FONTS.h1, marginRight: 10 }}>{index + 1}</Text>
        <Image
          source={{
            uri: "https://drive.google.com/uc?id=1o_ojm-1kUlEr-mjQAk-YPyk0I64twPFI",
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
          }}
        />
        <View>
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Alex Mahone
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          >
            <TouchableWithoutFeedback
              style={{
                backgroundColor: COLORS.blue,
                width: 100,
                height: 35,
                borderRadius: 5,
                opacity: 0.8,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5,
              }}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.black }}>Thêm bạn</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={{
                backgroundColor: COLORS.gray,
                width: 100,
                height: 35,
                borderRadius: 5,
                opacity: 0.8,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5,
              }}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.black }}>Xóa</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <View
        style={{
          height: SIZES.height / 2.5,
        }}
      >
        <Text
          style={{
            ...FONTS.h1,
            marginHorizontal: 10,
          }}
        >
          Thông báo
        </Text>
        <ScrollView horizontal={false}>
          {notificationsData.map((item, index) => {
            return ElementNotifications(item, index);
          })}
        </ScrollView>
      </View>
      <Text
        style={{
          ...FONTS.h1,
          marginHorizontal: 10,
        }}
      >
        Top người cùng sở thích
      </Text>
      <ScrollView horizontal={false}>
        {topUserData.map((item, index) => {
          return ElementTopUser(item, index);
        })}
      </ScrollView>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({});
