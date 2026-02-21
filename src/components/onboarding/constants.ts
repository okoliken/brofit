export const springConfig = { damping: 15, stiffness: 150 };
export const enterSpring = { damping: 20, stiffness: 120 };
export const STAGGER_MS = 120;

export const MARQUEE_IMAGES = [
  require("../../../assets/onboarding/gymember1.jpg"),
  require("../../../assets/onboarding/gymember2.jpg"),
  require("../../../assets/onboarding/gymember3.jpg"),
  require("../../../assets/onboarding/gymember4.jpg"),
  require("../../../assets/onboarding/gymember5.jpg"),
];

export const PATTERN_IMAGE = require("../../../assets/onboarding/patterns/pattern.png");

export interface OnboardingStepPageProps {
  pageIndex: number;
  currentPageIndex: number;
}
