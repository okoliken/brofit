import { create } from "zustand";

export type GenderOption = "male" | "female" | "not_define";

export interface OnboardingState {
  /** Selected gender on "choose your gender" step */
  gender: GenderOption | null;
  /** Selected age on "choose your age" step */
  age: number;
}

export interface OnboardingActions {
  setGender: (gender: GenderOption | null) => void;
  setAge: (age: number) => void;
  reset: () => void;
}

const initialState: OnboardingState = {
  gender: null,
  age: 25,
};

export type OnboardingStore = OnboardingState & OnboardingActions;

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  ...initialState,
  setGender: (gender) => set({ gender }),
  setAge: (age) => set({ age }),
  reset: () => set(initialState),
}));
