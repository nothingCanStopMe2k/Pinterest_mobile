import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm, useController } from "react-hook-form";

import { COLORS, FONTS } from "./../constants/theme";

function AppTextInput({ icon, name, control, ...otherProps }) {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  }); //giá trị mặc định khi nhập

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {icon && (
          <MaterialCommunityIcons name={icon} size={25} color={COLORS.medium} />
        )}
      </View>
      <TextInput
        placeholderTextColor={COLORS.medium}
        style={{
          color: COLORS.dark,
          width: 200,
          ...FONTS.h3,
        }}
        {...otherProps}
        onChangeText={field.onChange} //lấy giá trị nhập
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    borderRadius: 100,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    marginVertical: 10,
  },
  icon: {
    marginLeft: 10,
    marginRight: 20,
  },
});

export default AppTextInput;
