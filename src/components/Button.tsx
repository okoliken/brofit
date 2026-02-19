import type { ReactNode } from "react";
import { type PressableProps, Pressable, Text, View } from "react-native";

const VARIANTS = {
  primary: {
    container: "bg-primary-500",
    text: "text-white",
  },
  secondary: {
    container: "bg-black-2-700",
    text: "text-white",
  },
  outline: {
    container: "bg-transparent border-2 border-primary-500",
    text: "text-primary-400",
  },
  ghost: {
    container: "bg-transparent",
    text: "text-white",
  },
  danger: {
    container: "bg-support-danger-500",
    text: "text-white",
  },
  "card-pink": {
    container: "bg-card-pink",
    text: "text-black-1-900",
  },
  "card-mint": {
    container: "bg-card-mint",
    text: "text-black-1-900",
  },
  "card-lime": {
    container: "bg-card-lime",
    text: "text-black-1-900",
  },
  "card-cream": {
    container: "bg-card-cream",
    text: "text-black-1-900",
  },
} as const;

const SIZES = {
  large: { height: 55, textSize: "text-2xl tracking-wide" },
  small: { height: 45, textSize: "text-2xl tracking-wide" },
} as const;

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

export interface ButtonProps extends Omit<PressableProps, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  uppercase?: boolean;
  children: string;
  /** Optional custom class for the outer container */
  className?: string;
  /** Optional custom class for the label */
  textClassName?: string;
  /** Optional icon to show after the label */
  trailingIcon?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "large",
  uppercase = true,
  children,
  className = "",
  textClassName = "",
  trailingIcon,
  disabled,
  style,
  ...pressableProps
}: ButtonProps) {
  const { container, text } = VARIANTS[variant];
  const { height, textSize } = SIZES[size];

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        {
          height,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
        },
        typeof style === "function" ? style({ pressed }) : style,
      ]}
      className={`${container} ${className}`}
      {...pressableProps}
    >
      <View className="flex-row items-center gap-2">
        <Text
          className={`font-bebas ${textSize} ${text} ${textClassName}`}
          style={{ textTransform: uppercase ? "uppercase" : "none" }}
        >
          {children}
        </Text>
        {trailingIcon}
      </View>
    </Pressable>
  )
}
