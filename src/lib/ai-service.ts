// Pluggable regulatory assistant service.
// The prototype uses deterministic mock answers. Replace `MockAssistant` with an
// OpenAI-compatible / local LLM / RAG implementation of `AssistantService` later.

export interface StructuredAnswer {
  answer: string;
  reason: string;
  conditions: string[];
  documents: string[];
  authority: string;
  nextAction: string;
  sources: { label: string; ref: string }[];
  confidence: number;
}

export interface AssistantService {
  ask(question: string): Promise<StructuredAnswer>;
}

export const SUGGESTED_PROMPTS = [
  "What approvals are required for a food processing unit in Nashik?",
  "Why do I need environmental consent?",
  "What documents are required for the fire NOC?",
  "Which incentives may apply to my project?",
  "What should I complete before submission?",
  "What approvals do I need before starting operations?",
];

const ANSWERS: { match: RegExp; answer: StructuredAnswer }[] = [
  {
    match: /before (starting )?operations|pre-?operation|start(ing)? operations/i,
    answer: {
      answer: "Based on your project profile, 6 approvals are potentially required before commencing operations: Consent to Operate (MPCB), FSSAI Manufacturing Licence, Fire NOC (Final), Occupancy Certificate, Legal Metrology Packer Registration and Trade Licence. Boiler Registration is conditional.",
      reason: "Your unit is an Orange-category food manufacturing facility in a newly constructed building. Configured pre-operation rules EN-04, FD-01, FR-05, UD-11, UD-12 and LM-01 evaluate as applicable.",
      conditions: ["Consent to Establish must be granted before Consent to Operate", "Fire-fighting installation must be complete for the Final NOC", "Building must match the sanctioned plan for occupancy"],
      documents: ["Consent to Establish copy", "Stack and effluent monitoring report", "Fire installation completion certificate", "Product category list", "Label artwork"],
      authority: "MPCB · FDA Maharashtra · Fire Services · NMRDA · Legal Metrology",
      nextAction: "Resolve the pending MPCB clarification on APP-MH-2026-01882 — it gates Consent to Operate on the critical path.",
      sources: [{ label: "Industrial Consent Framework", ref: "Prototype Reference EN-01 / EN-04" }, { label: "Food Business Licensing Conditions", ref: "Prototype Reference FD-01" }, { label: "Right to Services — Notified Timelines", ref: "Prototype Reference RTS-2026" }],
      confidence: 94,
    },
  },
  {
    match: /approvals? (are )?required|food processing unit|nashik/i,
    answer: {
      answer: "For a new food processing unit in Nashik (MIDC estate, ₹20 Cr, 180 employees), the prototype rules identify 17 potentially applicable approvals: 14 required and 3 conditional, spread across 4 major stages.",
      reason: "Sector = Agro & Food Processing, activity = Manufacturing, pollution category = Orange, water use 180 KLD and HT power load together trigger environmental, factory, fire, food-safety and utility approvals.",
      conditions: ["Boiler Registration applies only above the configured steam capacity", "Hazardous Waste Authorisation applies only if listed waste streams are generated", "Contract Labour Registration applies if 20+ contract workers are engaged"],
      documents: ["42 documents across identity, land, technical, environment, safety and financial categories"],
      authority: "MPCB · MIDC · Urban Development · DISH · FDA · MSEDCL · Labour",
      nextAction: "Open Approval Intelligence to view the full checklist and the 8 approvals that can progress in parallel.",
      sources: [{ label: "MAITRI Intelligence Rules Engine", ref: "17 configured prototype rules" }, { label: "MIDC Land Allotment Guidelines", ref: "Prototype Reference LD-01" }],
      confidence: 96,
    },
  },
  {
    match: /environmental consent|why do i need/i,
    answer: {
      answer: "Consent to Establish from MPCB is potentially required because your unit falls in the Orange pollution category and consumes more than the configured water threshold.",
      reason: "Fruit and vegetable processing generates organic effluent. Configured rule EN-01 marks consent as required when pollution category ≠ White or water consumption > 50 KLD. Your profile declares Orange and 180 KLD.",
      conditions: ["Effluent treatment plant design must be submitted", "Water balance statement must reconcile with the MIDC water agreement"],
      documents: ["Environmental Baseline Report", "Water Balance Statement", "ETP Design", "Site Layout Plan", "Land Document", "Project Report"],
      authority: "Maharashtra Pollution Control Board — Regional Office Nashik",
      nextAction: "Respond to the water-balance clarification (CLR-2026-0912) due 07 Sep 2026.",
      sources: [{ label: "Industrial Consent Framework", ref: "Prototype Reference EN-01" }],
      confidence: 98,
    },
  },
  {
    match: /fire noc|fire safety/i,
    answer: {
      answer: "The Provisional Fire NOC requires 5 documents. Your repository currently has 4 verified; the Fire Safety Layout Drawing is missing.",
      reason: "Configured rule FR-02 lists the layout drawing as mandatory for scrutiny of the fire-fighting scheme.",
      conditions: ["Drawing must be sealed by a licensed fire consultant", "Must match the sanctioned building plan"],
      documents: ["Fire Safety Layout Drawing", "Building Plan (Architect Sealed)", "Site Layout Plan", "Plot Allotment Letter", "Board Resolution"],
      authority: "Directorate of Maharashtra Fire Services",
      nextAction: "Upload the Fire Safety Layout Drawing from Document Validation.",
      sources: [{ label: "Fire Prevention & Life Safety Requirements", ref: "Prototype Reference FR-02" }],
      confidence: 95,
    },
  },
  {
    match: /incentive|scheme|subsidy/i,
    answer: {
      answer: "5 schemes show a potential match above 70%: PSI Industrial Promotion Subsidy (88%), Agro & Food Processing Capital Subsidy (92%), Stamp Duty Exemption (84%), Electricity Duty Exemption (79%) and Interest Subsidy (71%).",
      reason: "Location (notified MIDC area), sector (food processing) and investment range satisfy the configured eligibility conditions. Employment and cold-chain declarations are pending confirmation.",
      conditions: ["Employment criteria to be confirmed", "Cold chain component to be declared", "Eligibility certificate required before lease deed registration"],
      documents: ["Udyam Registration", "DPR", "Bank Sanction Letter", "Machinery Invoices", "Lease Agreement"],
      authority: "Directorate of Industries · Directorate of Agri Business · Revenue · Energy",
      nextAction: "Open Incentive Intelligence and confirm the employment declaration.",
      sources: [{ label: "Package Scheme of Incentives", ref: "Prototype Reference PSI-2026-A" }, { label: "Agro Capital Subsidy", ref: "Prototype Scheme Ref AFP-11" }],
      confidence: 88,
    },
  },
  {
    match: /before submission|complete before|readiness|submit/i,
    answer: {
      answer: "Your application readiness is 88%. Two issues block a higher score: the Fire Safety Drawing is missing and the Environmental Baseline Report needs review.",
      reason: "Readiness combines required documents, data consistency, mandatory fields, approval prerequisites and compliance prerequisites.",
      conditions: ["All required documents verified", "Cross-document fields consistent (GST address mismatch flagged)"],
      documents: ["Fire Safety Layout Drawing", "Environmental Baseline Report"],
      authority: "MAITRI Intelligence — Application Readiness",
      nextAction: "Open Application Readiness and resolve the 2 issues; the score updates to 96%.",
      sources: [{ label: "Readiness model", ref: "Prototype scoring configuration v0.4" }],
      confidence: 92,
    },
  },
];

const FALLBACK: StructuredAnswer = {
  answer: "I can help with approvals, documents, timelines, compliance and government support for your registered project. Try one of the suggested questions or ask about a specific approval.",
  reason: "The prototype assistant answers from a configured regulatory knowledge base for the demo project.",
  conditions: [],
  documents: [],
  authority: "MAITRI Intelligence Assistant",
  nextAction: "Ask about a specific approval, document or scheme.",
  sources: [{ label: "Prototype knowledge base", ref: "Simulated corpus — 10 regulatory references" }],
  confidence: 60,
};

export class MockAssistant implements AssistantService {
  async ask(question: string): Promise<StructuredAnswer> {
    await new Promise((r) => setTimeout(r, 900));
    return ANSWERS.find((a) => a.match.test(question))?.answer ?? FALLBACK;
  }
}

export const assistant: AssistantService = new MockAssistant();
