import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { auth } from "../../services/firebase/configure";
import { adminService } from "../../services/admin.service";

const Home = ({ navigation }) => {
  const [datasForHeader,setDatasForHeader] = useState([]);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Signed out");
        navigation.replace("signIn");
      })
      .catch(() => console.log("Error"));
  };
  // uri: auth.currentUser.photoURL
  // auth.currentUser.displayName

  // Giao diện:
  useEffect(() => {
    adminService.getAllUser().then((res) => {
      setDatasForHeader(res.slice(3,11))
    });
  },[]);

  const OnlineUser = (props) => {
    const photoUri = props.data.profilePhoto
    const name = (props.data.firstName? props.data.firstName:'') + ' ' + (props.data.lastName? props.data.lastName:'')
    return (
      <View style={styles.onlineUserContainer}>
        <TouchableOpacity style={styles.onlineUser}>
          <Image
            style={styles.onlineUserImg}
            source={{
              uri: photoUri,
            }}
          ></Image>
          <View style={styles.greenDot}></View>
        </TouchableOpacity>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.onlineUserName}>{name}</Text>
      </View>
    );
  };
  
  const Header = (props) => {
    console.log(props.datas)
    return (
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerContentFont, styles.headerContentAll]}>
            Tất cả
          </Text>
          <View style={styles.headerContentDiv}></View>
          <Text style={styles.headerContentFont}>Sự kiện</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.userList}
        >
          {props.datas.map((data, index) => (
            <OnlineUser data={data} key={index}></OnlineUser>
          ))}
        </ScrollView>
      </View>
    );
  };

  const marsoryLayout = () => {
    return (
      <View style={{ flexGrow: 2.5 }}>
        <Text>This is a marsoryLayout</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header datas={datasForHeader} />
      {marsoryLayout()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    paddingLeft: 20,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContentFont: {
    fontSize: 15,
    fontWeight: "bold",
  },
  headerContentAll: {
    color: "#fff",
    backgroundColor: "#000",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 40,
  },
  headerContentDiv: {
    width: 5,
    height: "60%",
    backgroundColor: "#000",
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  userList: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 0,
  },
  onlineUserContainer:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginRight: 20
  },
  onlineUser: {
    width: 60,
    height: 60,
  },
  onlineUserImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderColor:'#c3c3c3',
    borderWidth:1,
  },
  onlineUserName:{ 
    width:60,
    textAlign:'center',
    fontSize:15
  },
  greenDot: {
    width: 15,
    height: 15,
    backgroundColor: "#00FF00",
    borderRadius: 20,
    position: "absolute",
    top: 2,
    right: 2,
  },
});
export default Home;
