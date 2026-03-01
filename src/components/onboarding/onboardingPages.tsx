import type { OnboardingStepPageProps } from "./constants";
import GetStartedPage from "./GetStartedPage";
import ChooseGender from "./ChooseGender";
import ChooseAge from "./ChooseAge";

export const ONBOARDING_PAGES = [
  GetStartedPage,
  ChooseGender,
  ChooseAge,
] as const satisfies readonly ((props: OnboardingStepPageProps) => React.JSX.Element)[];

export const TOTAL_STEPS = ONBOARDING_PAGES.length;
