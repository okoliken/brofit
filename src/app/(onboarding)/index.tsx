import { useRef, useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingProgress from "../../components/OnboardingProgress";
import { ONBOARDING_PAGES, TOTAL_STEPS } from "../../components/onboarding/onboardingPages";

export default function OnboardingScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleContinue = () => {
    const next = currentPageIndex + 1;
    if (next < TOTAL_STEPS) {
      pagerRef.current?.setPage(next);
      setCurrentPageIndex(next);
    }
  };

  return (
    <SafeAreaView className="h-full flex flex-col bg-black-1-900">
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setCurrentPageIndex(e.nativeEvent.position)}
      >
        {ONBOARDING_PAGES.map((PageComponent, i) => (
          <View key={i} style={{ flex: 1 }}>
            <PageComponent pageIndex={i} currentPageIndex={currentPageIndex} />
          </View>
        ))}
      </PagerView>
      <View className="p-6">
        <OnboardingProgress
          currentStep={currentPageIndex + 1}
          totalSteps={TOTAL_STEPS}
          onContinue={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}
