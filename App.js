import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import Gate from "./components/Gate";
import { Provider } from "react-redux";
import store, {persistor} from "./redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";


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
      require("./assets/roomDefault.jpeg"),
      "https://w7.pngwing.com/pngs/248/721/png-transparent-airbnb-rebrand-logo-online-marketplace-rebranding-airbnb-logo-text-service-trademark.png",
    ];
    const fonts = [Ionicons.font];
    const imagePromises = cacheImages(images);
    const fontPromises = cacheFonts(fonts);
    return Promise.all([...imagePromises, ...fontPromises]);
  };
  return isReady ? (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
      <Gate />
      </PersistGate>
    </Provider>
  ) : (
    <AppLoading
      onError={console.error}
      onFinish={handleFinish}
      startAsync={loadAssets}
    />
  );
}
