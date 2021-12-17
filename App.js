import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { signIn, signUp, splash, detail, register } from "./screens";
import Main from "./screens/main";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Loading from "./components/loading";
import { Provider } from "react-redux";
import store from "./redux/store";

const Stack = createStackNavigator();
export default function App() {
  // Load fonts
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "RobotoCondensed-Light": require("./assets/fonts/RobotoCondensed-Light.ttf"),
  });
  if (!loaded) return null;
  //==========================
  return (
    <Provider store={store}>
      <Loading />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"splash"}
        >
          <Stack.Screen name="splash" component={splash} />
          <Stack.Screen name="signUp" component={signUp} />
          <Stack.Screen name="signIn" component={signIn} />
          <Stack.Screen name="main" component={Main} />
          <Stack.Screen name="detail" component={detail} />
          <Stack.Screen name="register" component={register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
