// Deterministic prototype rules engine.
// Each rule carries a human-readable explanation. These are NOT real regulations —
// they are configured prototype rules used to demonstrate explainable applicability.
import { APPROVALS, APPROVAL_SUMMARY, type Approval } from "@/data/mock";
import type { AssessmentProfile } from "@/lib/store";

export interface RuleResult {
  ruleId: string;
  approvalId: string;
  outcome: "Required" | "Conditional" | "Not Required";
  explanation: string;
  confidence: number;
  reference: string;
}

interface Rule {
  id: string;
  approvalId: string;
  reference: string;
  evaluate: (p: AssessmentProfile) => { outcome: RuleResult["outcome"]; explanation: string; confidence: number } | null;
}

const FOOD_SECTORS = ["Agro & Food Processing"];

export const RULES: Rule[] = [
  {
    id: "EN-01", approvalId: "APR-02", reference: "Prototype Rule EN-01 — Consent applicability",
    evaluate: (p) => {
      const trig = p.pollution !== "White" || p.water > 50;
      return trig
        ? { outcome: "Required", explanation: `Pollution category "${p.pollution}" and water consumption of ${p.water} KLD exceed the configured consent threshold.`, confidence: 98 }
        : { outcome: "Not Required", explanation: "White-category unit with low water use falls outside the configured consent condition.", confidence: 90 };
    },
  },
  {
    id: "EN-04", approvalId: "APR-09", reference: "Prototype Rule EN-04 — Operating consent",
    evaluate: (p) => (p.pollution !== "White" ? { outcome: "Required", explanation: "Operating consent follows Consent to Establish for any non-White category unit.", confidence: 98 } : null),
  },
  {
    id: "EN-09", approvalId: "APR-15", reference: "Prototype Rule EN-09 — Hazardous waste",
    evaluate: (p) => (p.hazardous === "Yes"
      ? { outcome: "Required", explanation: "Declared hazardous materials trigger authorisation.", confidence: 95 }
      : { outcome: "Conditional", explanation: "No hazardous materials declared; applies only if listed waste streams (used oil, sludge) are generated.", confidence: 58 }),
  },
  {
    id: "FR-02", approvalId: "APR-01", reference: "Prototype Rule FR-02 — Fire Services applicability",
    evaluate: (p) => (p.buildingStatus !== "Existing (no change)" ? { outcome: "Required", explanation: "New industrial construction with stored processing material meets the configured fire-risk condition.", confidence: 96 } : null),
  },
  { id: "FR-05", approvalId: "APR-10", reference: "Prototype Rule FR-05", evaluate: () => ({ outcome: "Required", explanation: "Final NOC follows the provisional NOC after fire-fighting installation.", confidence: 93 }) },
  {
    id: "UD-04", approvalId: "APR-03", reference: "Prototype Rule UD-04 — Plan sanction",
    evaluate: (p) => (p.buildingStatus === "To be constructed" || p.buildingStatus === "Under construction"
      ? { outcome: "Required", explanation: `Building status "${p.buildingStatus}" requires plan sanction from the planning authority.`, confidence: 94 } : null),
  },
  { id: "UD-11", approvalId: "APR-16", reference: "Prototype Rule UD-11", evaluate: () => ({ outcome: "Required", explanation: "Commercial operation within local body limits requires a trade licence.", confidence: 86 }) },
  { id: "UD-12", approvalId: "APR-17", reference: "Prototype Rule UD-12", evaluate: (p) => (p.buildingStatus !== "Existing (no change)" ? { outcome: "Required", explanation: "Occupancy certificate is required before operating a newly constructed building.", confidence: 91 } : null) },
  {
    id: "MIDC-02", approvalId: "APR-04", reference: "Prototype Rule MIDC-02 — Water agreement",
    evaluate: (p) => (p.midcPlot === "Yes" && p.water > 20 ? { outcome: "Required", explanation: `Projected consumption of ${p.water} KLD inside an MIDC estate requires an industrial water agreement.`, confidence: 92 } : null),
  },
  { id: "LD-01", approvalId: "APR-05", reference: "Prototype Rule LD-01 — Land possession", evaluate: (p) => (p.midcPlot === "Yes" ? { outcome: "Required", explanation: "Plot inside a notified industrial area; possession is the root prerequisite.", confidence: 99 } : null) },
  {
    id: "IN-03", approvalId: "APR-06", reference: "Prototype Rule IN-03 — Factory registration",
    evaluate: (p) => (p.activity === "Manufacturing" && p.employment >= 20 ? { outcome: "Required", explanation: `Manufacturing activity with ${p.employment} proposed workers and power usage meets the configured factory condition.`, confidence: 97 } : null),
  },
  { id: "EL-01", approvalId: "APR-07", reference: "Prototype Rule EL-01 — HT sanction", evaluate: (p) => (p.power > 150 ? { outcome: "Required", explanation: `Connected load of ${p.power.toLocaleString()} kVA exceeds the LT threshold, requiring HT sanction.`, confidence: 95 } : null) },
  { id: "FD-01", approvalId: "APR-08", reference: "Prototype Rule FD-01 — Food licensing", evaluate: (p) => (FOOD_SECTORS.includes(p.sector) ? { outcome: "Required", explanation: "Processing of food products for commercial sale triggers the food business licensing condition.", confidence: 99 } : null) },
  { id: "BL-01", approvalId: "APR-11", reference: "Prototype Rule BL-01 — Boilers", evaluate: (p) => (p.emission.toLowerCase().includes("boiler") ? { outcome: "Conditional", explanation: "Boiler flue gas declared; registration applies only if steam capacity exceeds the configured threshold.", confidence: 71 } : null) },
  { id: "LM-01", approvalId: "APR-12", reference: "Prototype Rule LM-01 — Packaging", evaluate: (p) => (FOOD_SECTORS.includes(p.sector) ? { outcome: "Required", explanation: "Pre-packaged retail sale requires packer registration.", confidence: 90 } : null) },
  { id: "LB-01", approvalId: "APR-13", reference: "Prototype Rule LB-01", evaluate: () => ({ outcome: "Required", explanation: "Administrative office at the site attracts establishment registration.", confidence: 88 }) },
  { id: "LB-04", approvalId: "APR-14", reference: "Prototype Rule LB-04 — Contract labour", evaluate: (p) => (p.constructionStage !== "Completed" ? { outcome: "Conditional", explanation: "Applies if 20 or more contract workers are engaged during construction.", confidence: 66 } : null) },
];

export function evaluateRules(profile: AssessmentProfile): RuleResult[] {
  return RULES.flatMap((r) => {
    const res = r.evaluate(profile);
    return res ? [{ ruleId: r.id, approvalId: r.approvalId, reference: r.reference, ...res }] : [];
  });
}

/** Approvals annotated with the current rule outcome for the given profile. */
export function assessProject(profile: AssessmentProfile): { approvals: Approval[]; results: RuleResult[]; summary: typeof APPROVAL_SUMMARY } {
  const results = evaluateRules(profile);
  const approvals = APPROVALS.map((a) => {
    const r = results.find((x) => x.approvalId === a.id);
    return r ? { ...a, applicability: r.outcome, reason: r.explanation, confidence: r.confidence, reference: r.reference } : a;
  });
  const applicable = approvals.filter((a) => a.applicability !== "Not Required");
  const conditional = approvals.filter((a) => a.applicability === "Conditional");
  const documents = applicable.reduce((s, a) => s + a.docsRequired, 0);
  return {
    approvals,
    results,
    summary: {
      ...APPROVAL_SUMMARY,
      applicable: applicable.length,
      conditional: conditional.length,
      documents: Math.max(documents, APPROVAL_SUMMARY.documents),
      parallel: APPROVAL_SUMMARY.parallel,
    },
  };
}

/** Approvals with no unmet dependency that can progress now (parallel opportunities). */
export function parallelApprovals(approvals: Approval[]) {
  const done = new Set(approvals.filter((a) => a.status === "Approved").map((a) => a.id));
  return approvals.filter((a) => a.status !== "Approved" && a.applicability !== "Not Required" && a.dependencies.every((d) => done.has(d)));
}

/** Simple critical path: longest cumulative SLA chain through the dependency graph. */
export function criticalPath(approvals: Approval[]): string[] {
  const byId = new Map(approvals.map((a) => [a.id, a]));
  const memo = new Map<string, { len: number; path: string[] }>();
  const walk = (id: string): { len: number; path: string[] } => {
    if (memo.has(id)) return memo.get(id)!;
    const a = byId.get(id)!;
    let best = { len: 0, path: [] as string[] };
    for (const d of a.dependencies) {
      const r = walk(d);
      if (r.len > best.len) best = r;
    }
    const res = { len: best.len + (a.status === "Approved" ? 0 : a.slaDays), path: [...best.path, id] };
    memo.set(id, res);
    return res;
  };
  let best = { len: 0, path: [] as string[] };
  for (const a of approvals) {
    const r = walk(a.id);
    if (r.len > best.len) best = r;
  }
  return best.path;
}
