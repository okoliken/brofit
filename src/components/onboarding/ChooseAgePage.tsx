import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import GenderFemale from "../icons/GenderFemale";
import GenderMale from "../icons/GenderMale";
import GenderNotDefine from "../icons/GenderNotDefine";
import type { OnboardingStore } from "../../stores/onboardingStore";
import { useOnboardingStore } from "../../stores/onboardingStore";
import GenderOptionRow from "./GenderOptionRow";
import { enterSpring, PATTERN_IMAGE, STAGGER_MS, type OnboardingStepPageProps } from "./constants";

export default function ChooseAgePage({
  pageIndex,
  currentPageIndex,
}: OnboardingStepPageProps) {
  const gender = useOnboardingStore((s: OnboardingStore) => s.gender);
  const setGender = useOnboardingStore((s: OnboardingStore) => s.setGender);
  const isActive = currentPageIndex === pageIndex;

  const titleProgress = useSharedValue(0);
  const opt1Progress = useSharedValue(0);
  const opt2Progress = useSharedValue(0);
  const opt3Progress = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      titleProgress.value = withDelay(60, withSpring(1, enterSpring));
      opt1Progress.value = withDelay(220, withSpring(1, enterSpring));
      opt2Progress.value = withDelay(220 + STAGGER_MS, withSpring(1, enterSpring));
      opt3Progress.value = withDelay(220 + STAGGER_MS * 2, withSpring(1, enterSpring));
    } else {
      titleProgress.value = withTiming(0, { duration: 0 });
      opt1Progress.value = withTiming(0, { duration: 0 });
      opt2Progress.value = withTiming(0, { duration: 0 });
      opt3Progress.value = withTiming(0, { duration: 0 });
    }
  }, [isActive, titleProgress, opt1Progress, opt2Progress, opt3Progress]);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleProgress.value,
    transform: [{ translateX: (1 - titleProgress.value) * -40 }],
  }));
  const opt1Style = useAnimatedStyle(() => ({
    opacity: opt1Progress.value,
    transform: [{ translateY: (1 - opt1Progress.value) * 28 }],
  }));
  const opt2Style = useAnimatedStyle(() => ({
    opacity: opt2Progress.value,
    transform: [{ translateY: (1 - opt2Progress.value) * 28 }],
  }));
  const opt3Style = useAnimatedStyle(() => ({
    opacity: opt3Progress.value,
    transform: [{ translateY: (1 - opt3Progress.value) * 28 }],
  }));

  return (
    <View className="flex-1 bg-black-1-900 items-center justify-center px-8">
      <Image
        source={PATTERN_IMAGE}
        style={{
          position: "absolute",
          top: 0,
          left: 10,
          width: 280,
          height: 280,
        }}
        resizeMode="contain"
      />
      <View className="flex-1 items-center justify-center gap-7 w-full">
        <Animated.View style={titleStyle}>
          <Text className="text-[32px] tracking-[-0.04em] font-bebas text-white uppercase">
            choose your gender
          </Text>
        </Animated.View>

        <View className="w-full gap-3">
          <Animated.View style={opt1Style}>
            <GenderOptionRow
              Icon={GenderMale}
              label="Male"
              value="male"
              selected={gender === "male"}
              onSelect={() => setGender("male")}
            />
          </Animated.View>
          <Animated.View style={opt2Style}>
            <GenderOptionRow
              Icon={GenderFemale}
              label="Female"
              value="female"
              selected={gender === "female"}
              onSelect={() => setGender("female")}
            />
          </Animated.View>
          <Animated.View style={opt3Style}>
            <GenderOptionRow
              Icon={GenderNotDefine}
              label="not define"
              value="not_define"
              selected={gender === "not_define"}
              onSelect={() => setGender("not_define")}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
