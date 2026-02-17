import { useEffect } from "react";
import { router } from "expo-router";
import { View } from "react-native";

export default function Index() {
  useEffect(() => {
    // Redirect to onboarding when app opens
    router.replace("/onboarding");
  }, []);

  return <View />;
}
