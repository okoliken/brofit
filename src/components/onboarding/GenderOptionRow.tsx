import type { ComponentType } from "react";
import { Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import type { GenderOption } from "../../stores/onboardingStore";
import { springConfig } from "./constants";

export interface GenderOptionRowProps {
  Icon: ComponentType<{ size?: number }>;
  label: string;
  value: GenderOption;
  selected: boolean;
  onSelect: () => void;
}

const selectedBgClassMap: Record<GenderOption, string> = {
  male: "bg-card-lime",
  female: "bg-card-pink",
  not_define: "bg-card-mint",
};

export default function GenderOptionRow({
  Icon,
  label,
  value,
  selected,
  onSelect,
}: GenderOptionRowProps) {
  const scale = useSharedValue(1);
  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const selectedBgClass = selectedBgClassMap[value];

  return (
    <Pressable
      className={`rounded-full p-4 w-full flex flex-row items-center h-16 gap-4 border-2 border-transparent ${
        selected ? `border-primary-500 ${selectedBgClass}` : "bg-black-1-800"
      }`}
      onPress={onSelect}
      onPressIn={() => {
        scale.value = withSpring(0.92, springConfig);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, springConfig);
      }}
    >
      <Animated.View
        className="bg-[#282533] flex items-center justify-center rounded-full p-2"
        style={[{ width: 32, height: 32 }, animatedIconStyle]}
      >
        <Icon size={20} />
      </Animated.View>
      <Text
        className={`text-2xl tracking-[-0.04em] font-bebas text-white uppercase ${
          selected ? "text-black-1-600" : "text-white"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

