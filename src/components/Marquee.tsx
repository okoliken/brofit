import type { ReactNode } from "react";
import React, { useState } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from  "react-native-reanimated"

const GAP = 12;

const styles = StyleSheet.create({
  hidden: { opacity: 0, zIndex: -1 },
  row: { flexDirection: "row", overflow: "hidden", gap: GAP },
  translatedItem: { position: "absolute" as const },
});

interface MarqueeMeasurerProps {
  onLayout: (width: number) => void;
  children: ReactNode;
}

function MarqueeMeasurer({ onLayout, children }: MarqueeMeasurerProps) {
  return (
    <Animated.ScrollView
      horizontal
      style={styles.hidden}
      pointerEvents="box-none"
    >
      <View onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>
        {children}
      </View>
    </Animated.ScrollView>
  );
}

interface MarqueeTranslatedItemProps {
  index: number;
  step: number;
  offset: SharedValue<number>;
  children: ReactNode;
}

function MarqueeTranslatedItem({
  index,
  step,
  offset,
  children,
}: MarqueeTranslatedItemProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    left: (index - 1) * step,
    transform: [{ translateX: -offset.value }],
  }));
  return (
    <Animated.View style={[styles.translatedItem, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

interface MarqueeScrollerProps {
  duration: number;
  childrenWidth: number;
  parentWidth: number;
  reverse: boolean;
  children: ReactNode;
}

function MarqueeScroller({
  duration,
  childrenWidth,
  parentWidth,
  reverse,
  children,
}: MarqueeScrollerProps) {
  const offset = useSharedValue(0);
  const coeff = useSharedValue(reverse ? 1 : -1);

  React.useEffect(() => {
    coeff.value = reverse ? 1 : -1;
  }, [reverse, coeff]);

  const step = childrenWidth + GAP;
  useFrameCallback((frame) => {
    const dt = frame.timeSincePreviousFrame ?? 1;
    offset.value += (coeff.value * (dt * step)) / duration;
    offset.value = offset.value % step;
  }, true);

  const count = Math.round(parentWidth / step) + 2;
  const indices = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {indices.map((i) => (
        <MarqueeTranslatedItem
          key={`marquee-${i}`}
          index={i}
          step={step}
          offset={offset}
        >
          {children}
        </MarqueeTranslatedItem>
      ))}
    </>
  );
}

export interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  style?: ViewStyle;
  className?: string;
}

/**
 * Horizontal marquee that scrolls a repeated strip of content.
 * Measures the child width once, then clones and animates copies for seamless looping.
 */
const Marquee = ({
  children,
  duration = 12000,
  reverse = false,
  style,
}: MarqueeProps) => {
  const [parentWidth, setParentWidth] = useState(0);
  const [childrenWidth, setChildrenWidth] = useState(0);

  return (
    <View
      style={style}
      onLayout={(ev) => setParentWidth(ev.nativeEvent.layout.width)}
      pointerEvents="box-none"
    >
      <View style={styles.row} pointerEvents="box-none">
        <MarqueeMeasurer onLayout={setChildrenWidth}>{children}</MarqueeMeasurer>
        {childrenWidth > 0 && parentWidth > 0 && (
          <MarqueeScroller
            duration={duration}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            reverse={reverse}
          >
            {children}
          </MarqueeScroller>
        )}
      </View>
    </View>
  );
}

export default Marquee;
