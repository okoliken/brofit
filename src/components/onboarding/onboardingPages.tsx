import type { OnboardingStepPageProps } from "./constants";
import GetStartedPage from "./GetStartedPage";
import ChooseAgePage from "./ChooseAgePage";

export const ONBOARDING_PAGES = [
  GetStartedPage,
  ChooseAgePage,
] as const satisfies readonly ((props: OnboardingStepPageProps) => React.JSX.Element)[];

export const TOTAL_STEPS = ONBOARDING_PAGES.length;
