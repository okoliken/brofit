import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function GetStartedPage() {
  return (
    <SafeAreaView className="flex-1 bg-black-1-900 items-center justify-center px-8">
      <StatusBar style="light" />
      <Text className="text-4xl font-bebas text-white mb-4">
        Get Started
      </Text>
      <Text style={{ fontFamily: 'BebasNeue', fontSize: 24, color: 'white' }}>Bebas Neue</Text>
    </SafeAreaView>
  );
}
