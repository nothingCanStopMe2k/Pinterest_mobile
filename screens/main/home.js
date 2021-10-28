import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { auth } from "../../services/firebase/configure";
import { fileService } from "../../services/file.service";
import MasonryList from "@react-native-seoul/masonry-list";
import Pin from "../../components/Pin";

const Home = ({ navigation }) => {
  const [dataFromDB, setDataFromDB] = useState([]);

  useEffect(() => {
    fileService.getAllFile().then((res) => {
      setDataFromDB(res.slice(0, 20));
    });
  }, []);

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
        <Text>Header</Text>
      </View>
    );
  };

  const marsoryLayout = () => {
    return (
      <View style={{ flexGrow: 2.5 }}>
        <MasonryList
          style={{ alignSelf: "stretch" }}
          contentContainerStyle={{
            padding: 10,
            alignSelf: "stretch",
          }}
          numColumns={2}
          data={dataFromDB}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, i }) => (
            <Pin key={i.toString()} index={i} item={item} />
          )}
        />
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
