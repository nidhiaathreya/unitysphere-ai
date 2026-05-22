import { create } from "zustand";
import type { AuthUser } from "@/lib/firebase/auth";
import type { Organization, CrisisAlert } from "@/types";

interface AppState {
  user: AuthUser | null;
  organization: Organization | null;
  crisisMode: boolean;
  activeCrisis: CrisisAlert | null;
  unityAIOpen: boolean;
  setUser: (user: AuthUser | null) => void;
  setOrganization: (org: Organization | null) => void;
  setCrisisMode: (active: boolean, crisis?: CrisisAlert | null) => void;
  setUnityAIOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  organization: null,
  crisisMode: false,
  activeCrisis: null,
  unityAIOpen: false,
  setUser: (user) => set({ user }),
  setOrganization: (organization) => set({ organization }),
  setCrisisMode: (crisisMode, activeCrisis = null) =>
    set({ crisisMode, activeCrisis }),
  setUnityAIOpen: (unityAIOpen) => set({ unityAIOpen }),
}));
