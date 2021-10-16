import React from "react";
import { View, Text, Modal } from "react-native";
import LottieView from "lottie-react-native";
import { images, SIZES } from "../constants";
import { useSelector } from "react-redux";

const loading = (state) => state.loadingReducer.visible;

export default function Loading() {
  const isLoading = useSelector(loading);

  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      transparent
      visible={isLoading}
    >
      <View
        style={{
          opacity: 0.5,
          position: "absolute",
          width: SIZES.width,
          height: SIZES.height,
          backgroundColor: "#000",
          zIndex: 100,
        }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: SIZES.width,
          height: SIZES.height,
        }}
      >
        <LottieView
          style={{
            position: "absolute",
            width: 150,
            height: 150,
          }}
          source={images.loading}
          autoPlay
          loop={true}
          speed={1.5}
        />
      </View>
    </Modal>
  );
}
