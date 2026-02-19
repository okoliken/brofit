import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function OnboardingScreen6() {
  return (
    <View className="flex-1 bg-black-1-900 items-center justify-center px-8">
      <StatusBar style="light" />
      <Text className="text-4xl font-bebas text-white mb-4">
        Screen 6
      </Text>
      <Text className="text-lg text-white/70 text-center mb-8 font-sans">
        Screen 6 of 8
      </Text>
    </View>
  );
}
