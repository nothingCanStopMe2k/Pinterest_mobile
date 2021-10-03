import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { authService } from "../../services/auth.service";

const signIn = () => {
  authService
    .register({
      email: "123456@gmail.com",
      password: "1234",
      confirmPassword: "1234",
    })
    .then((res) => console.log("RES: ", res))
    .catch((err) => console.log("ERR: ", err.message));

  return (
    <View>
      <Text>this is a signIn page</Text>
    </View>
  );
};

export default signIn;

const styles = StyleSheet.create({});
