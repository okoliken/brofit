import { Text, View } from "react-native";
import { router } from "expo-router";
import OnboardingProgress from "../../components/OnboardingProgress";

export default function OnboardingScreen() {
  return (
    <View className="flex-1 bg-black-1-900 items-center justify-center">
      <View className="p-6 absolute bottom-0 gap-6">
        <Text className="text-7xl font-bebas text-white tracking-wide">
          start your journey with brofit
        </Text>

        <OnboardingProgress
          currentStep={1}
          onContinue={() => router.push("/onboarding/screen2")}
        />
      </View>
    </View>
  );
}
