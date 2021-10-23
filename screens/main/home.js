import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { auth } from "../../services/firebase/configure";

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
  // uri: auth.currentUser.photoURL
  // auth.currentUser.displayName

  // Giao diện:
  const header = () => {
    return (
      <View style={{ flexGrow: 1 }}>
        <Text>This is a header</Text>
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
      {header()}
      {marsoryLayout()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Home;
