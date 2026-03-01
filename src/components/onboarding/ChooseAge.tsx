import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  interpolate,
  interpolateColor,
  Extrapolation,
  scrollTo,
  runOnUI,
} from "react-native-reanimated";
import {
  enterSpring,
  PATTERN2_IMAGE,
  type OnboardingStepPageProps,
} from "./constants";
import { useOnboardingStore } from "../../stores/onboardingStore";

const ITEM_HEIGHT = 108; // snap interval
const AGES = Array.from({ length: 65 }, (_, i) => i + 16); // 16–80
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const PADDING = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;
const DEFAULT_AGE = 25;
const DEFAULT_SCROLL_Y = (DEFAULT_AGE - 16) * ITEM_HEIGHT;

type AgeItemProps = {
  age: number;
  index: number;
  scrollY: SharedValue<number>;
};

const PILL_BG_SELECTED = "rgba(252, 217, 255, 0.95)"; // card-pink
const PILL_BG_TRANSPARENT = "rgba(252, 217, 255, 0)";
const TEXT_SELECTED = "#1a1a1a";
const TEXT_UNSELECTED = "#ffffff";

const SNAP_OFFSETS = AGES.map((_, i) => i * ITEM_HEIGHT);

function AgeItem({ age, index, scrollY }: AgeItemProps) {
  const cardStyle = useAnimatedStyle(() => {
    const itemCenter = PADDING + index * ITEM_HEIGHT + ITEM_HEIGHT / 2;
    const viewCenter = scrollY.value + PICKER_HEIGHT / 2;
    const distance = Math.abs(viewCenter - itemCenter) * 0.65;
    const opacity = interpolate(
      distance,
      [0, ITEM_HEIGHT, ITEM_HEIGHT * 1.5],
      [1, 0.5, 0.12],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      distance,
      [0, ITEM_HEIGHT, ITEM_HEIGHT * 1.5],
      [1, 0.82, 0.6],
      Extrapolation.CLAMP,
    );
    const backgroundColor = interpolateColor(
      distance,
      [0, ITEM_HEIGHT * 0.4],
      [PILL_BG_SELECTED, PILL_BG_TRANSPARENT],
    );
    return {
      opacity,
      backgroundColor,
      transform: [{ scale }],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const itemCenter = PADDING + index * ITEM_HEIGHT + ITEM_HEIGHT / 2;
    const viewCenter = scrollY.value + PICKER_HEIGHT / 2;
    const distance = Math.abs(viewCenter - itemCenter) * 0.65;
    // tight range — only the snapped center item goes dark
    const color = interpolateColor(
      distance,
      [0, ITEM_HEIGHT * 0.12],
      [TEXT_SELECTED, TEXT_UNSELECTED],
    );
    const fontSize = interpolate(
      distance,
      [0, ITEM_HEIGHT, ITEM_HEIGHT * 1.5],
      [96, 72, 52],
      Extrapolation.CLAMP,
    );
    return { color, fontSize };
  });

  return (
    // Static slot — defines the snap interval, never re-renders
    <View
      style={{ height: ITEM_HEIGHT, alignItems: "center", justifyContent: "center" }}
    >
      {/* Animated card — visual pill that changes per scroll position */}
      <Animated.View
        style={[
          {
            height: 172,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            paddingTop: 12,
            paddingRight: 50,
            paddingLeft: 40,
          },
          cardStyle,
        ]}
      >
        <Animated.Text
          style={[{ fontFamily: "BebasNeue", letterSpacing: -0.02 * 16 }, textStyle]}
        >
          {age}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

export default function ChooseAge({
  pageIndex,
  currentPageIndex,
}: OnboardingStepPageProps) {
  const isActive = currentPageIndex === pageIndex;
  const setAge = useOnboardingStore((s) => s.setAge);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(DEFAULT_SCROLL_Y);

  const titleProgress = useSharedValue(0);
  const pickerProgress = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      titleProgress.value = withDelay(60, withSpring(1, enterSpring));
      pickerProgress.value = withDelay(200, withSpring(1, enterSpring));
      runOnUI(() => {
        scrollTo(scrollRef, 0, DEFAULT_SCROLL_Y, false);
      })();
    } else {
      titleProgress.value = withTiming(0, { duration: 0 });
      pickerProgress.value = withTiming(0, { duration: 0 });
    }
  }, [isActive]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const handleScrollEnd = (e: {
    nativeEvent: { contentOffset: { y: number } };
  }) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    setAge(AGES[Math.max(0, Math.min(AGES.length - 1, index))]);
  };

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleProgress.value,
    transform: [{ translateX: (1 - titleProgress.value) * -40 }],
  }));

  const pickerStyle = useAnimatedStyle(() => ({
    opacity: pickerProgress.value,
    transform: [{ translateY: (1 - pickerProgress.value) * 32 }],
  }));

  return (
    <View className="flex-1 bg-black-1-900 items-center justify-center px-8">
      <Image
        source={PATTERN2_IMAGE}
        style={{
          position: "absolute",
          width: 560,
          height: 700,
        }}
        resizeMode="contain"
      />

      <View className="flex-1 items-center justify-center gap-7 w-full">
        <Animated.View style={titleStyle}>
          <Text className="text-[32px] tracking-[-0.04em] font-bebas text-white uppercase">
            what's your age?
          </Text>
        </Animated.View>

        <Animated.View
          style={[{ width: "100%", alignItems: "center" }, pickerStyle]}
        >
          <Animated.ScrollView
            ref={scrollRef}
            style={{ height: PICKER_HEIGHT }}
            contentContainerStyle={{ paddingVertical: PADDING }}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            snapToOffsets={SNAP_OFFSETS}
            snapToAlignment="start"
            decelerationRate="fast"
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            onMomentumScrollEnd={handleScrollEnd}
            onScrollEndDrag={handleScrollEnd}
          >
            {AGES.map((a, i) => (
              <AgeItem key={a} age={a} index={i} scrollY={scrollY} />
            ))}
          </Animated.ScrollView>
        </Animated.View>
      </View>
    </View>
  );
}
