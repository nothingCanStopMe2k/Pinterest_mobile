import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./home";
import Profile from "./profile";
import Search from "./search";
import Chat from "./chat";
import TabBar from "../../components/TabBar";
import { icons, COLORS } from "../../constants";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="chat" component={Chat} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Main = () => {
  return <Tabs />;
};

export default Main;
