import React, { useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text } from "react-native";

const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const loadAssets = async () => {
    const images = [
      require("./assets/loginBg.jpeg"),
      "https://w7.pngwing.com/pngs/248/721/png-transparent-airbnb-rebrand-logo-online-marketplace-rebranding-airbnb-logo-text-service-trademark.png",
    ];
    const fonts = [Ionicons.font];
    const imagePromises = cacheImages(images);
    const fontPromises = cacheFonts(fonts)
    return Promise.all([...imagePromises, ...fontPromises]);
  };
  return isReady ? (
    <Text>I'm ready</Text>
  ) : (
    <AppLoading
      onError={console.error}
      onFinish={handleFinish}
      startAsync={loadAssets}
    />
  );
}
