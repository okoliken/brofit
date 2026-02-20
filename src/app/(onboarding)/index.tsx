import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Marquee from "../../components/Marquee";

const MARQUEE_IMAGES = [
  require("../../../assets/onboarding/gymember1.jpg"),
  require("../../../assets/onboarding/gymember2.jpg"),
  require("../../../assets/onboarding/gymember3.jpg"),
  require("../../../assets/onboarding/gymember4.jpg"),
  require("../../../assets/onboarding/gymember5.jpg"),
];

function ImageStrip() {
  return (
    <View className="flex-row gap-3">
      {MARQUEE_IMAGES.map((source, i) => (
        <View key={i} className="relative">
          <Image
            source={source}
            className="w-[110px] h-[110px] border-4 border-white"
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "black",
              opacity: 0.4,
            }}
          />
        </View>
      ))}
    </View>
  );
}

export default function OnboardingScreen() {
  return (
    <SafeAreaView className="h-full flex flex-col">
      <View className="gap-3 -mt-6">
        <Marquee duration={32000} reverse={false}>
          <ImageStrip />
        </Marquee>
        <Marquee duration={32000} reverse={true}>
          <ImageStrip />
        </Marquee>
        <Marquee duration={32000} reverse={false}>
          <ImageStrip />
        </Marquee>
      </View>
      <View className="px-4 mt-8">
        <Text className="text-7xl font-bebas text-white tracking-[-0.04em]">
          start your journey with brofit
        </Text>
      </View>
    </SafeAreaView>
  );
}
