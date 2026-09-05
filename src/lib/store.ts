// Prototype demo state. Persisted locally so the judge demo survives page reloads.
// No backend is involved; everything here is simulated.
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { DocStatus } from "@/data/mock";

export type Role = "investor" | "officer" | "admin" | null;

export interface AssessmentProfile {
  projectName: string;
  companyName: string;
  orgType: string;
  projectType: string;
  district: string;
  taluka: string;
  estate: string;
  stage: string;
  sector: string;
  industry: string;
  subSector: string;
  product: string;
  activity: string;
  capacity: string;
  investment: number;
  landCost: number;
  plantMachinery: number;
  building: number;
  employment: number;
  water: number;
  power: number;
  waste: string;
  emission: string;
  hazardous: string;
  pollution: string;
  landOwnership: string;
  midcPlot: string;
  buildingStatus: string;
  constructionStage: string;
}

export const DEFAULT_PROFILE: AssessmentProfile = {
  projectName: "Integrated Food Processing Unit — Nashik",
  companyName: "Raj Foods Manufacturing Pvt. Ltd.",
  orgType: "Private Limited Company",
  projectType: "New Project",
  district: "Nashik",
  taluka: "Dindori",
  estate: "MIDC Vinchur (Wine Park)",
  stage: "Pre-establishment",
  sector: "Agro & Food Processing",
  industry: "Food Processing",
  subSector: "Fruit & Vegetable Processing",
  product: "Fruit pulp, concentrates and frozen vegetables",
  activity: "Manufacturing",
  capacity: "24,000 MT per annum",
  investment: 20,
  landCost: 3.2,
  plantMachinery: 11.5,
  building: 5.3,
  employment: 180,
  water: 180,
  power: 1450,
  waste: "Organic solid waste, treated effluent",
  emission: "Boiler flue gas (low)",
  hazardous: "No",
  pollution: "Orange",
  landOwnership: "Leasehold (MIDC)",
  midcPlot: "Yes",
  buildingStatus: "To be constructed",
  constructionStage: "Not started",
};

interface DemoState {
  role: Role;
  userName: string;
  selectedProjectId: string;
  profile: AssessmentProfile;
  wizardStep: number;
  assessmentGenerated: boolean;
  resolvedIssues: string[];
  docOverrides: Record<string, DocStatus>;
  uploadedFireSafety: boolean;
  readNotifications: string[];
  setRole: (role: Role) => void;
  setProject: (id: string) => void;
  updateProfile: (patch: Partial<AssessmentProfile>) => void;
  setWizardStep: (n: number) => void;
  setAssessmentGenerated: (v: boolean) => void;
  resolveIssue: (id: string) => void;
  setDocStatus: (id: string, status: DocStatus) => void;
  markFireSafetyUploaded: () => void;
  markRead: (id: string) => void;
  resetDemo: () => void;
}

const initial = {
  role: null as Role,
  userName: "Raj Foods Manufacturing Pvt. Ltd.",
  selectedProjectId: "PRJ-2026-0147",
  profile: DEFAULT_PROFILE,
  wizardStep: 0,
  assessmentGenerated: false,
  resolvedIssues: [] as string[],
  docOverrides: {} as Record<string, DocStatus>,
  uploadedFireSafety: false,
  readNotifications: [] as string[],
};

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      ...initial,
      setRole: (role) =>
        set({
          role,
          userName:
            role === "officer"
              ? "S. Kulkarni"
              : role === "admin"
                ? "R. Deshpande"
                : "Raj Foods Manufacturing Pvt. Ltd.",
        }),
      setProject: (id) => set({ selectedProjectId: id }),
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),
      setWizardStep: (n) => set({ wizardStep: n }),
      setAssessmentGenerated: (v) => set({ assessmentGenerated: v }),
      resolveIssue: (id) =>
        set((s) => ({
          resolvedIssues: s.resolvedIssues.includes(id) ? s.resolvedIssues : [...s.resolvedIssues, id],
        })),
      setDocStatus: (id, status) => set((s) => ({ docOverrides: { ...s.docOverrides, [id]: status } })),
      markFireSafetyUploaded: () =>
        set((s) => ({
          uploadedFireSafety: true,
          docOverrides: { ...s.docOverrides, "DOC-10": "Verified" },
          resolvedIssues: s.resolvedIssues.includes("fire") ? s.resolvedIssues : [...s.resolvedIssues, "fire"],
        })),
      markRead: (id) =>
        set((s) => ({
          readNotifications: s.readNotifications.includes(id) ? s.readNotifications : [...s.readNotifications, id],
        })),
      resetDemo: () => set({ ...initial }),
    }),
    {
      name: "maitri-intelligence-demo",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? window.localStorage : (undefined as unknown as Storage))),
      skipHydration: true,
    },
  ),
);

/** Readiness score derived from resolved issues (88% base → 96% when both demo issues are fixed). */
export function computeReadiness(resolved: string[]) {
  const base = 88;
  let score = base;
  if (resolved.includes("fire")) score += 5;
  if (resolved.includes("env")) score += 3;
  return score;
}
