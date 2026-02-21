import { create } from "zustand";

export type GenderOption = "male" | "female" | "not_define";

export interface OnboardingState {
  /** Selected gender on "choose your gender" step */
  gender: GenderOption | null;
  /** Add more flow fields as you add steps, e.g. age, goals, etc. */
  // age: number | null;
  // goals: string[];
}

export interface OnboardingActions {
  setGender: (gender: GenderOption | null) => void;
  reset: () => void;
}

const initialState: OnboardingState = {
  gender: null,
};

export type OnboardingStore = OnboardingState & OnboardingActions;

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  ...initialState,
  setGender: (gender) => set({ gender }),
  reset: () => set(initialState),
}));
