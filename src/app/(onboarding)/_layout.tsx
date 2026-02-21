import { Slot } from "expo-router";
import { View } from "react-native";

export default function OnboardingLayout() {
  return (
    <View className="flex-1 bg-black-1-900 items-center justify-center p-0">
      <Slot />
    </View>
  );
}
