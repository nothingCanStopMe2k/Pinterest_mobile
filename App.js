import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { signIn, signUp, home } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"signIn"}
      >
        <Stack.Screen name="signUp" component={signUp} />
        <Stack.Screen name="signIn" component={signIn} />
        <Stack.Screen
          name="home"
          options={{
            headerShown: true,
            title: "Home",
            headerTitleAlign: "center",
          }}
          component={home}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
