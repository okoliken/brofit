import { View } from "react-native";
import Button from "./Button";
import ArrowRight from "./icons/ArrowRight";

const TOTAL_STEPS = 8;

const OnboardingProgressItem = ({
  isActive,
}: {
  isActive: boolean;
}) => {
  return (
    <View
      className={`rounded-full ${isActive ? "bg-primary-500 h-3 w-9" : "bg-[#24222C] h-3 w-3"}`}
    />
  );
};

export interface OnboardingProgressProps {
  currentStep?: number;
  onContinue?: () => void;
}

const OnboardingProgress = ({
  currentStep = 1,
  onContinue,
}: OnboardingProgressProps) => {
  return (
    <View className="flex-row items-center justify-between w-full">
      <View className="flex-row items-center gap-1">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <OnboardingProgressItem
            key={i}
            isActive={i === currentStep - 1}
          />
        ))}
      </View>
      <Button
        variant="primary"
        size="small"
        onPress={onContinue}
        trailingIcon={<ArrowRight size={16} color="white" />}
      >
        Get started
      </Button>
    </View>
  );
};

export default OnboardingProgress;
