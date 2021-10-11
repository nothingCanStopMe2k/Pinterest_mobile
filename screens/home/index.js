import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/configure";

const Home = ({ navigation }) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Signed out");
        navigation.replace("signIn");
      })
      .catch(() => console.log("Error"));
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: auth.currentUser.photoURL }} />
      <Text style={styles.text}>Tên: {auth.currentUser.displayName}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.text}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 50,
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#ccc",
    padding: 10,
    marginVertical: 20,
  },
});
export default Home;
