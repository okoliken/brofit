import "../global.css";

import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { View } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return <Slot />;
}
