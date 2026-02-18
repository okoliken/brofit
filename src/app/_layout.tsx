import "../global.css";

import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
}
