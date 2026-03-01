import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Marquee from "../Marquee";
import ImageStrip from "./ImageStrip";
import { enterSpring, STAGGER_MS, type OnboardingStepPageProps } from "./constants";

const MARQUEE_DURATION = 32000;
const ROW_DELAYS = [280, 280 + STAGGER_MS, 280 + STAGGER_MS * 2];

export default function GetStartedPage({
  pageIndex,
  currentPageIndex,
}: OnboardingStepPageProps) {
  const isActive = currentPageIndex === pageIndex;
  const titleProgress = useSharedValue(0);
  const row1Progress = useSharedValue(0);
  const row2Progress = useSharedValue(0);
  const row3Progress = useSharedValue(0);

  const rowProgressValues = [row1Progress, row2Progress, row3Progress];

  useEffect(() => {
    if (isActive) {
      titleProgress.value = withDelay(80, withSpring(1, enterSpring));
      rowProgressValues.forEach((p, i) => {
        p.value = withDelay(ROW_DELAYS[i], withSpring(1, enterSpring));
      });
    } else {
      titleProgress.value = withTiming(0, { duration: 0 });
      rowProgressValues.forEach((p) => {
        p.value = withTiming(0, { duration: 0 });
      });
    }
  }, [isActive]);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleProgress.value,
    transform: [{ translateX: (1 - titleProgress.value) * -48 }],
  }));

  const row1Style = useAnimatedStyle(() => ({
    opacity: row1Progress.value,
    transform: [{ translateY: (1 - row1Progress.value) * 36 }],
  }));
  const row2Style = useAnimatedStyle(() => ({
    opacity: row2Progress.value,
    transform: [{ translateY: (1 - row2Progress.value) * 36 }],
  }));
  const row3Style = useAnimatedStyle(() => ({
    opacity: row3Progress.value,
    transform: [{ translateY: (1 - row3Progress.value) * 36 }],
  }));

  const rows = [
    { style: row1Style, reverse: false },
    { style: row2Style, reverse: true },
    { style: row3Style, reverse: false },
  ];

  return (
    <View className="flex-1 pt-6">
      <View className="gap-3 -mt-6">
        {rows.map(({ style, reverse }, i) => (
          <Animated.View key={i} style={style}>
            <Marquee duration={MARQUEE_DURATION} reverse={reverse}>
              <ImageStrip />
            </Marquee>
          </Animated.View>
        ))}
      </View>
      <Animated.View style={titleStyle} className="px-4 mt-8">
        <Text className="text-7xl font-bebas text-white tracking-[-0.04em] leading-tight">
          start your journey with brofit
        </Text>
      </Animated.View>
    </View>
  );
}
