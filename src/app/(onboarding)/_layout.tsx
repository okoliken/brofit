import { Slot } from 'expo-router';
import { View } from 'react-native';
import OnboardingProgress from "../../components/OnboardingProgress";


export default function OnboardingLayout() {
  return (
    <View className="flex-1 bg-black-1-900 items-center justify-center p-0">
      <Slot />
     <View className="p-6 absolute bottom-0 w-full"> 
      <OnboardingProgress currentStep={1} />
     </View>
    </View>
  );
}
