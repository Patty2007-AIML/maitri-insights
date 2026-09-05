// Centralized prototype data for MAITRI Intelligence (SIH 2026).
// All values are simulated. No live government data is used anywhere.

export type ApplicabilityKind = "Required" | "Conditional" | "Not Required";
export type ApprovalStatus =
  | "Not Started"
  | "In Progress"
  | "Submitted"
  | "Query Raised"
  | "Approved"
  | "Blocked";
export type RiskLevel = "Low" | "Medium" | "High";

export interface Approval {
  id: string;
  name: string;
  department: string;
  authority: string;
  applicability: ApplicabilityKind;
  status: ApprovalStatus;
  docsRequired: number;
  docsReady: number;
  dependencies: string[];
  slaDays: number;
  slaRisk: RiskLevel;
  nextAction: string;
  reason: string;
  confidence: number;
  reference: string;
  stage: "Pre-establishment" | "Pre-operation" | "Operation";
}

export const COMPANY = {
  id: "CMP-001",
  name: "Raj Foods Manufacturing Pvt. Ltd.",
  cin: "U15490MH2025PTC418823",
  gstin: "27AAJCR8842K1ZP",
  contact: "Rajeshwari Deshmukh, Director",
  email: "compliance@rajfoods.example",
  phone: "+91 98XXXXXX12",
};

export const PROJECT = {
  id: "PRJ-2026-0147",
  name: "Integrated Food Processing Unit — Nashik",
  sector: "Agro & Food Processing",
  subSector: "Fruit & Vegetable Processing",
  district: "Nashik",
  taluka: "Dindori",
  estate: "MIDC Vinchur (Wine Park)",
  investment: "₹20.00 Cr",
  employment: 180,
  type: "New Manufacturing Unit",
  stage: "Pre-establishment",
  pollutionCategory: "Orange",
  power: "1,450 kVA",
  water: "180 KLD",
};

export const PROJECTS = [
  { id: "PRJ-2026-0147", name: "Integrated Food Processing Unit — Nashik", district: "Nashik" },
  { id: "PRJ-2026-0152", name: "Cold Chain Warehouse — Pune", district: "Pune" },
  { id: "PRJ-2025-0981", name: "Packaging Line Expansion — Aurangabad", district: "Chh. Sambhajinagar" },
];

export const COMPANIES = [
  { id: "CMP-001", name: "Raj Foods Manufacturing Pvt. Ltd.", sector: "Agro & Food Processing", district: "Nashik", projects: 3 },
  { id: "CMP-002", name: "Sahyadri Auto Components Ltd.", sector: "Auto & Auto Components", district: "Pune", projects: 2 },
  { id: "CMP-003", name: "Konkan Speciality Chemicals Pvt. Ltd.", sector: "Chemical & Pharma", district: "Raigad", projects: 2 },
  { id: "CMP-004", name: "Vidarbha Textiles Mills Pvt. Ltd.", sector: "Textiles", district: "Nagpur", projects: 1 },
  { id: "CMP-005", name: "Deccan Electronics Systems Pvt. Ltd.", sector: "Electronics", district: "Thane", projects: 2 },
];

export const SECTORS = [
  { name: "Auto & Auto Components", icon: "Car", units: 1284 },
  { name: "Aerospace & Defence", icon: "Plane", units: 214 },
  { name: "Agro & Food Processing", icon: "Wheat", units: 1876 },
  { name: "Chemical & Pharma", icon: "FlaskConical", units: 942 },
  { name: "IT & ITES", icon: "Cpu", units: 2310 },
  { name: "Electronics", icon: "CircuitBoard", units: 688 },
  { name: "Textiles", icon: "Shirt", units: 1105 },
  { name: "Gems & Jewellery", icon: "Gem", units: 402 },
];

export const APPROVALS: Approval[] = [
  {
    id: "APR-01", name: "Fire NOC (Provisional)", department: "Urban Development", authority: "Directorate of Maharashtra Fire Services",
    applicability: "Required", status: "Submitted", docsRequired: 5, docsReady: 5, dependencies: ["APR-03"],
    slaDays: 15, slaRisk: "Low", nextAction: "Await departmental review",
    reason: "Built-up area and stored material profile meet the configured fire-risk applicability condition for processing units.",
    confidence: 96, reference: "Prototype Rule FR-02 — Fire Services applicability (demo reference)", stage: "Pre-establishment",
  },
  {
    id: "APR-02", name: "Consent to Establish (MPCB)", department: "Environment & Climate Change", authority: "Maharashtra Pollution Control Board",
    applicability: "Required", status: "Query Raised", docsRequired: 6, docsReady: 4, dependencies: ["APR-04"],
    slaDays: 30, slaRisk: "High", nextAction: "Respond to water-balance clarification",
    reason: "Sector (food processing), water consumption above configured threshold and Orange pollution category trigger consent applicability.",
    confidence: 98, reference: "Prototype Rule EN-01 — Consent applicability (demo reference)", stage: "Pre-establishment",
  },
  {
    id: "APR-03", name: "Building Plan Approval", department: "Urban Development", authority: "Nashik Metropolitan Region Development Authority",
    applicability: "Required", status: "In Progress", docsRequired: 7, docsReady: 5, dependencies: ["APR-05"],
    slaDays: 30, slaRisk: "Medium", nextAction: "Upload revised structural drawing",
    reason: "New construction on allotted industrial plot requires plan sanction under the configured construction rule.",
    confidence: 94, reference: "Prototype Rule UD-04 (demo reference)", stage: "Pre-establishment",
  },
  {
    id: "APR-04", name: "Water Supply Connection (MIDC)", department: "MIDC", authority: "Maharashtra Industrial Development Corporation",
    applicability: "Required", status: "Approved", docsRequired: 4, docsReady: 4, dependencies: ["APR-05"],
    slaDays: 21, slaRisk: "Low", nextAction: "No action pending",
    reason: "Projected consumption of 180 KLD within MIDC estate requires an industrial water agreement.",
    confidence: 92, reference: "Prototype Rule MIDC-02 (demo reference)", stage: "Pre-establishment",
  },
  {
    id: "APR-05", name: "Plot Allotment / Land Possession", department: "MIDC", authority: "Maharashtra Industrial Development Corporation",
    applicability: "Required", status: "Approved", docsRequired: 5, docsReady: 5, dependencies: [],
    slaDays: 30, slaRisk: "Low", nextAction: "No action pending",
    reason: "Site is inside a notified industrial area; possession is the root prerequisite for most downstream approvals.",
    confidence: 99, reference: "Prototype Rule LD-01 (demo reference)", stage: "Pre-establishment",
  },
  {
    id: "APR-06", name: "Factory Plan Approval & Licence", department: "Industries, Energy & Labour", authority: "Directorate of Industrial Safety & Health",
    applicability: "Required", status: "Not Started", docsRequired: 4, docsReady: 3, dependencies: ["APR-03", "APR-01"],
    slaDays: 21, slaRisk: "Medium", nextAction: "Upload approved building blueprint",
    reason: "Manufacturing activity with more than 20 workers and power usage meets the configured factory registration condition.",
    confidence: 97, reference: "Prototype Rule IN-03 (demo reference)", stage: "Pre-establishment",
  },
  {
    id: "APR-07", name: "Electricity Load Sanction", department: "Energy", authority: "MSEDCL",
    applicability: "Required", status: "In Progress", docsRequired: 4, docsReady: 4, dependencies: ["APR-05"],
    slaDays: 20, slaRisk: "Low", nextAction: "Await feasibility report",
    reason: "Connected load of 1,450 kVA exceeds the LT threshold, requiring HT sanction.",
    confidence: 95, reference: "Prototype Rule EL-01 (demo reference)", stage: "Pre-establishment",
  },
  {
    id: "APR-08", name: "FSSAI Manufacturing Licence", department: "Food & Drug Administration", authority: "FDA Maharashtra",
    applicability: "Required", status: "Not Started", docsRequired: 6, docsReady: 3, dependencies: ["APR-06"],
    slaDays: 30, slaRisk: "Medium", nextAction: "Prepare product category list",
    reason: "Processing of food products for commercial sale triggers the food business licensing condition.",
    confidence: 99, reference: "Prototype Rule FD-01 (demo reference)", stage: "Pre-operation",
  },
  {
    id: "APR-09", name: "Consent to Operate (MPCB)", department: "Environment & Climate Change", authority: "Maharashtra Pollution Control Board",
    applicability: "Required", status: "Not Started", docsRequired: 5, docsReady: 1, dependencies: ["APR-02", "APR-06"],
    slaDays: 45, slaRisk: "Medium", nextAction: "Blocked until Consent to Establish is granted",
    reason: "Operation of an Orange-category unit requires operating consent after establishment.",
    confidence: 98, reference: "Prototype Rule EN-04 (demo reference)", stage: "Pre-operation",
  },
  {
    id: "APR-10", name: "Fire NOC (Final / Occupancy)", department: "Urban Development", authority: "Directorate of Maharashtra Fire Services",
    applicability: "Required", status: "Not Started", docsRequired: 4, docsReady: 1, dependencies: ["APR-01", "APR-03"],
    slaDays: 15, slaRisk: "Low", nextAction: "Complete fire installation works",
    reason: "Final NOC follows completion of the fire-fighting system installed under the provisional NOC.",
    confidence: 93, reference: "Prototype Rule FR-05 (demo reference)", stage: "Pre-operation",
  },
  {
    id: "APR-11", name: "Boiler Registration", department: "Industries, Energy & Labour", authority: "Directorate of Steam Boilers",
    applicability: "Conditional", status: "Not Started", docsRequired: 4, docsReady: 2, dependencies: ["APR-06"],
    slaDays: 25, slaRisk: "Low", nextAction: "Confirm boiler capacity in project profile",
    reason: "Applicable only if the declared steam generation capacity exceeds the configured threshold. Confirm equipment specification.",
    confidence: 71, reference: "Prototype Rule BL-01 (demo reference)", stage: "Pre-operation",
  },
  {
    id: "APR-12", name: "Legal Metrology Packer Registration", department: "Food, Civil Supplies & Consumer Protection", authority: "Controller of Legal Metrology",
    applicability: "Required", status: "Not Started", docsRequired: 3, docsReady: 2, dependencies: ["APR-08"],
    slaDays: 15, slaRisk: "Low", nextAction: "Upload label artwork",
    reason: "Pre-packaged retail sale requires packer registration under the configured packaging rule.",
    confidence: 90, reference: "Prototype Rule LM-01 (demo reference)", stage: "Pre-operation",
  },
  {
    id: "APR-13", name: "Shops & Establishment Registration", department: "Labour", authority: "Labour Commissionerate",
    applicability: "Required", status: "Submitted", docsRequired: 3, docsReady: 3, dependencies: [],
    slaDays: 7, slaRisk: "Low", nextAction: "Await certificate issue",
    reason: "Administrative office at the site attracts establishment registration.",
    confidence: 88, reference: "Prototype Rule LB-01 (demo reference)", stage: "Pre-establishment",
  },
  {
    id: "APR-14", name: "Contract Labour Registration", department: "Labour", authority: "Labour Commissionerate",
    applicability: "Conditional", status: "Not Started", docsRequired: 3, docsReady: 1, dependencies: ["APR-13"],
    slaDays: 15, slaRisk: "Low", nextAction: "Confirm contractor headcount",
    reason: "Applicable if 20 or more contract workers are engaged during construction or operation.",
    confidence: 66, reference: "Prototype Rule LB-04 (demo reference)", stage: "Pre-establishment",
  },
  {
    id: "APR-15", name: "Hazardous Waste Authorisation", department: "Environment & Climate Change", authority: "Maharashtra Pollution Control Board",
    applicability: "Conditional", status: "Not Started", docsRequired: 4, docsReady: 1, dependencies: ["APR-02"],
    slaDays: 30, slaRisk: "Low", nextAction: "Declare used-oil and sludge quantities",
    reason: "Applicable only if listed hazardous waste streams are generated. Declared streams are currently below the configured threshold.",
    confidence: 58, reference: "Prototype Rule EN-09 (demo reference)", stage: "Pre-operation",
  },
  {
    id: "APR-16", name: "Trade Licence (Local Body)", department: "Urban Development", authority: "Gram Panchayat / Municipal Council",
    applicability: "Required", status: "Not Started", docsRequired: 3, docsReady: 2, dependencies: ["APR-03"],
    slaDays: 15, slaRisk: "Low", nextAction: "Upload occupancy proof",
    reason: "Commercial operation within the local body limits requires a trade licence.",
    confidence: 86, reference: "Prototype Rule UD-11 (demo reference)", stage: "Pre-operation",
  },
  {
    id: "APR-17", name: "Occupancy / Building Completion Certificate", department: "Urban Development", authority: "NMRDA",
    applicability: "Required", status: "Not Started", docsRequired: 5, docsReady: 1, dependencies: ["APR-03", "APR-10"],
    slaDays: 21, slaRisk: "Low", nextAction: "Complete construction milestone",
    reason: "Occupancy certificate is required before commencement of operations in a newly constructed building.",
    confidence: 94, reference: "Prototype Rule UD-07 (demo reference)", stage: "Pre-operation",
  },
];

export const APPROVAL_SUMMARY = {
  applicable: 17,
  conditional: 3,
  documents: 42,
  parallel: 8,
  stages: 4,
  incentives: 5,
};

export interface AppRow {
  id: string;
  approvalId: string;
  approval: string;
  department: string;
  company: string;
  project: string;
  status: ApprovalStatus;
  submitted: string;
  slaRemaining: number;
  risk: RiskLevel;
  completeness: number;
  reason: string;
  recommended: string;
  officer: string;
  district: string;
}

export const APPLICATIONS: AppRow[] = [
  { id: "APP-MH-2026-01882", approvalId: "APR-02", approval: "Consent to Establish (MPCB)", department: "Environment & Climate Change", company: COMPANY.name, project: PROJECT.name, status: "Query Raised", submitted: "12 Aug 2026", slaRemaining: 2, risk: "High", completeness: 97, reason: "Inspection not scheduled and clarification pending with applicant.", recommended: "Schedule field inspection", officer: "S. Kulkarni", district: "Nashik" },
  { id: "APP-MH-2026-01883", approvalId: "APR-01", approval: "Fire NOC (Provisional)", department: "Urban Development", company: COMPANY.name, project: PROJECT.name, status: "Submitted", submitted: "20 Aug 2026", slaRemaining: 9, risk: "Low", completeness: 100, reason: "All documents verified; awaiting scrutiny slot.", recommended: "Proceed to scrutiny", officer: "A. Pawar", district: "Nashik" },
  { id: "APP-MH-2026-01884", approvalId: "APR-03", approval: "Building Plan Approval", department: "Urban Development", company: COMPANY.name, project: PROJECT.name, status: "In Progress", submitted: "02 Aug 2026", slaRemaining: 6, risk: "Medium", completeness: 82, reason: "Structural drawing revision requested by scrutiny cell.", recommended: "Request clarification", officer: "A. Pawar", district: "Nashik" },
  { id: "APP-MH-2026-01885", approvalId: "APR-07", approval: "Electricity Load Sanction", department: "Energy", company: COMPANY.name, project: PROJECT.name, status: "In Progress", submitted: "18 Aug 2026", slaRemaining: 11, risk: "Low", completeness: 95, reason: "Feasibility survey in progress.", recommended: "Monitor", officer: "R. Jadhav", district: "Nashik" },
  { id: "APP-MH-2026-01886", approvalId: "APR-13", approval: "Shops & Establishment Registration", department: "Labour", company: COMPANY.name, project: PROJECT.name, status: "Submitted", submitted: "28 Aug 2026", slaRemaining: 3, risk: "Low", completeness: 100, reason: "Auto-scrutiny cleared.", recommended: "Issue certificate", officer: "M. Shaikh", district: "Nashik" },
  { id: "APP-MH-2026-01812", approvalId: "APR-04", approval: "Water Supply Connection (MIDC)", department: "MIDC", company: COMPANY.name, project: PROJECT.name, status: "Approved", submitted: "04 Jul 2026", slaRemaining: 0, risk: "Low", completeness: 100, reason: "Approved and agreement executed.", recommended: "Closed", officer: "P. More", district: "Nashik" },
  { id: "APP-MH-2026-01799", approvalId: "APR-05", approval: "Plot Allotment / Land Possession", department: "MIDC", company: COMPANY.name, project: PROJECT.name, status: "Approved", submitted: "16 Jun 2026", slaRemaining: 0, risk: "Low", completeness: 100, reason: "Possession letter issued.", recommended: "Closed", officer: "P. More", district: "Nashik" },
  { id: "APP-MH-2026-01901", approvalId: "APR-02", approval: "Consent to Establish (MPCB)", department: "Environment & Climate Change", company: "Konkan Speciality Chemicals Pvt. Ltd.", project: "Speciality Intermediates Plant — Mahad", status: "In Progress", submitted: "10 Aug 2026", slaRemaining: 1, risk: "High", completeness: 74, reason: "Red-category unit with incomplete effluent plan.", recommended: "Request clarification", officer: "S. Kulkarni", district: "Raigad" },
  { id: "APP-MH-2026-01902", approvalId: "APR-06", approval: "Factory Plan Approval & Licence", department: "Industries, Energy & Labour", company: "Sahyadri Auto Components Ltd.", project: "Press Shop Expansion — Chakan", status: "Query Raised", submitted: "08 Aug 2026", slaRemaining: 4, risk: "High", completeness: 88, reason: "Machinery layout mismatch with submitted plan.", recommended: "Await applicant response", officer: "D. Ingle", district: "Pune" },
  { id: "APP-MH-2026-01903", approvalId: "APR-08", approval: "FSSAI Manufacturing Licence", department: "Food & Drug Administration", company: "Raj Foods Manufacturing Pvt. Ltd.", project: "Cold Chain Warehouse — Pune", status: "Submitted", submitted: "22 Aug 2026", slaRemaining: 12, risk: "Low", completeness: 92, reason: "Under document scrutiny.", recommended: "Proceed to scrutiny", officer: "N. Bhosale", district: "Pune" },
  { id: "APP-MH-2026-01904", approvalId: "APR-01", approval: "Fire NOC (Provisional)", department: "Urban Development", company: "Vidarbha Textiles Mills Pvt. Ltd.", project: "Spinning Unit — Butibori", status: "In Progress", submitted: "14 Aug 2026", slaRemaining: 2, risk: "High", completeness: 79, reason: "Site inspection not scheduled; SLA expires shortly.", recommended: "Schedule field inspection", officer: "A. Pawar", district: "Nagpur" },
  { id: "APP-MH-2026-01905", approvalId: "APR-07", approval: "Electricity Load Sanction", department: "Energy", company: "Deccan Electronics Systems Pvt. Ltd.", project: "SMT Line — Wagle Estate", status: "Submitted", submitted: "25 Aug 2026", slaRemaining: 7, risk: "Low", completeness: 96, reason: "Routine processing.", recommended: "Monitor", officer: "R. Jadhav", district: "Thane" },
  { id: "APP-MH-2026-01906", approvalId: "APR-03", approval: "Building Plan Approval", department: "Urban Development", company: "Konkan Speciality Chemicals Pvt. Ltd.", project: "Warehouse Block — Mahad", status: "Query Raised", submitted: "05 Aug 2026", slaRemaining: 0, risk: "High", completeness: 68, reason: "SLA breached; awaiting revised site plan for 9 days.", recommended: "Escalate to head of office", officer: "A. Pawar", district: "Raigad" },
  { id: "APP-MH-2026-01907", approvalId: "APR-09", approval: "Consent to Operate (MPCB)", department: "Environment & Climate Change", company: "Sahyadri Auto Components Ltd.", project: "Machining Unit — Ranjangaon", status: "In Progress", submitted: "01 Aug 2026", slaRemaining: 5, risk: "Medium", completeness: 90, reason: "Awaiting stack monitoring report.", recommended: "Monitor", officer: "S. Kulkarni", district: "Pune" },
  { id: "APP-MH-2026-01908", approvalId: "APR-12", approval: "Legal Metrology Packer Registration", department: "Food, Civil Supplies & Consumer Protection", company: "Raj Foods Manufacturing Pvt. Ltd.", project: "Packaging Line Expansion — Aurangabad", status: "Submitted", submitted: "27 Aug 2026", slaRemaining: 8, risk: "Low", completeness: 100, reason: "Routine processing.", recommended: "Issue certificate", officer: "M. Shaikh", district: "Chh. Sambhajinagar" },
  { id: "APP-MH-2026-01909", approvalId: "APR-16", approval: "Trade Licence (Local Body)", department: "Urban Development", company: "Vidarbha Textiles Mills Pvt. Ltd.", project: "Spinning Unit — Butibori", status: "Not Started", submitted: "—", slaRemaining: 15, risk: "Low", completeness: 40, reason: "Draft created by applicant.", recommended: "No action", officer: "—", district: "Nagpur" },
  { id: "APP-MH-2026-01910", approvalId: "APR-06", approval: "Factory Plan Approval & Licence", department: "Industries, Energy & Labour", company: "Deccan Electronics Systems Pvt. Ltd.", project: "SMT Line — Wagle Estate", status: "In Progress", submitted: "09 Aug 2026", slaRemaining: 3, risk: "Medium", completeness: 85, reason: "Safety officer appointment proof pending.", recommended: "Request clarification", officer: "D. Ingle", district: "Thane" },
  { id: "APP-MH-2026-01911", approvalId: "APR-11", approval: "Boiler Registration", department: "Industries, Energy & Labour", company: "Raj Foods Manufacturing Pvt. Ltd.", project: PROJECT.name, status: "Not Started", submitted: "—", slaRemaining: 25, risk: "Low", completeness: 50, reason: "Conditional approval; capacity confirmation pending.", recommended: "Confirm applicability", officer: "—", district: "Nashik" },
  { id: "APP-MH-2026-01912", approvalId: "APR-15", approval: "Hazardous Waste Authorisation", department: "Environment & Climate Change", company: "Konkan Speciality Chemicals Pvt. Ltd.", project: "Speciality Intermediates Plant — Mahad", status: "Submitted", submitted: "21 Aug 2026", slaRemaining: 10, risk: "Medium", completeness: 87, reason: "Waste quantity verification pending.", recommended: "Monitor", officer: "S. Kulkarni", district: "Raigad" },
  { id: "APP-MH-2026-01913", approvalId: "APR-17", approval: "Occupancy Certificate", department: "Urban Development", company: "Sahyadri Auto Components Ltd.", project: "Press Shop Expansion — Chakan", status: "Approved", submitted: "02 Jul 2026", slaRemaining: 0, risk: "Low", completeness: 100, reason: "Certificate issued.", recommended: "Closed", officer: "A. Pawar", district: "Pune" },
];

export type DocStatus = "Verified" | "Needs Review" | "Missing" | "Expired" | "Mismatch Detected";

export interface DocRow {
  id: string;
  name: string;
  category: string;
  status: DocStatus;
  uploaded: string;
  verified: string;
  expiry: string;
  usedIn: number;
  confidence: number;
}

export const DOCUMENTS: DocRow[] = [
  { id: "DOC-01", name: "PAN Card — Company", category: "Statutory Identity", status: "Verified", uploaded: "14 Jun 2026", verified: "14 Jun 2026", expiry: "—", usedIn: 12, confidence: 99 },
  { id: "DOC-02", name: "GST Registration Certificate", category: "Statutory Identity", status: "Mismatch Detected", uploaded: "14 Jun 2026", verified: "—", expiry: "—", usedIn: 9, confidence: 97 },
  { id: "DOC-03", name: "Certificate of Incorporation", category: "Statutory Identity", status: "Verified", uploaded: "14 Jun 2026", verified: "15 Jun 2026", expiry: "—", usedIn: 11, confidence: 98 },
  { id: "DOC-04", name: "MIDC Plot Allotment Letter", category: "Land & Site", status: "Verified", uploaded: "20 Jun 2026", verified: "22 Jun 2026", expiry: "—", usedIn: 8, confidence: 96 },
  { id: "DOC-05", name: "Lease Agreement (MIDC)", category: "Land & Site", status: "Verified", uploaded: "20 Jun 2026", verified: "22 Jun 2026", expiry: "31 Mar 2121", usedIn: 7, confidence: 95 },
  { id: "DOC-06", name: "Site Layout Plan", category: "Technical", status: "Verified", uploaded: "02 Jul 2026", verified: "05 Jul 2026", expiry: "—", usedIn: 6, confidence: 93 },
  { id: "DOC-07", name: "Building Plan (Architect Sealed)", category: "Technical", status: "Needs Review", uploaded: "02 Aug 2026", verified: "—", expiry: "—", usedIn: 5, confidence: 88 },
  { id: "DOC-08", name: "Environmental Baseline Report", category: "Environment", status: "Needs Review", uploaded: "28 Jul 2026", verified: "—", expiry: "—", usedIn: 3, confidence: 84 },
  { id: "DOC-09", name: "Water Balance Statement", category: "Environment", status: "Needs Review", uploaded: "28 Jul 2026", verified: "—", expiry: "—", usedIn: 2, confidence: 81 },
  { id: "DOC-10", name: "Fire Safety Layout Drawing", category: "Safety", status: "Missing", uploaded: "—", verified: "—", expiry: "—", usedIn: 3, confidence: 0 },
  { id: "DOC-11", name: "Factory Machinery Layout", category: "Technical", status: "Verified", uploaded: "05 Aug 2026", verified: "07 Aug 2026", expiry: "—", usedIn: 4, confidence: 92 },
  { id: "DOC-12", name: "Board Resolution / Authorisation", category: "Statutory Identity", status: "Verified", uploaded: "14 Jun 2026", verified: "14 Jun 2026", expiry: "—", usedIn: 10, confidence: 97 },
  { id: "DOC-13", name: "Udyam Registration", category: "Statutory Identity", status: "Verified", uploaded: "18 Jun 2026", verified: "18 Jun 2026", expiry: "—", usedIn: 6, confidence: 99 },
  { id: "DOC-14", name: "Project Report (DPR)", category: "Project", status: "Verified", uploaded: "12 Jun 2026", verified: "13 Jun 2026", expiry: "—", usedIn: 9, confidence: 94 },
  { id: "DOC-15", name: "Bank Sanction Letter", category: "Financial", status: "Verified", uploaded: "25 Jun 2026", verified: "26 Jun 2026", expiry: "24 Jun 2027", usedIn: 4, confidence: 91 },
  { id: "DOC-16", name: "Audited Financials FY 2024-25", category: "Financial", status: "Verified", uploaded: "25 Jun 2026", verified: "26 Jun 2026", expiry: "—", usedIn: 5, confidence: 96 },
  { id: "DOC-17", name: "Power Load Requirement Sheet", category: "Utilities", status: "Verified", uploaded: "18 Aug 2026", verified: "19 Aug 2026", expiry: "—", usedIn: 2, confidence: 90 },
  { id: "DOC-18", name: "Effluent Treatment Plant Design", category: "Environment", status: "Needs Review", uploaded: "28 Jul 2026", verified: "—", expiry: "—", usedIn: 3, confidence: 79 },
  { id: "DOC-19", name: "Consent to Establish (Previous Unit)", category: "Environment", status: "Expired", uploaded: "10 Jan 2024", verified: "12 Jan 2024", expiry: "31 Mar 2026", usedIn: 1, confidence: 88 },
  { id: "DOC-20", name: "Safety Officer Appointment Letter", category: "Safety", status: "Missing", uploaded: "—", verified: "—", expiry: "—", usedIn: 2, confidence: 0 },
  { id: "DOC-21", name: "Machinery Purchase Invoices", category: "Financial", status: "Verified", uploaded: "12 Aug 2026", verified: "13 Aug 2026", expiry: "—", usedIn: 3, confidence: 93 },
  { id: "DOC-22", name: "Product Category List", category: "Project", status: "Needs Review", uploaded: "29 Aug 2026", verified: "—", expiry: "—", usedIn: 2, confidence: 86 },
  { id: "DOC-23", name: "Label Artwork Draft", category: "Project", status: "Missing", uploaded: "—", verified: "—", expiry: "—", usedIn: 1, confidence: 0 },
  { id: "DOC-24", name: "Water Test Report", category: "Environment", status: "Verified", uploaded: "30 Jul 2026", verified: "01 Aug 2026", expiry: "29 Jul 2027", usedIn: 2, confidence: 95 },
  { id: "DOC-25", name: "Structural Stability Certificate", category: "Technical", status: "Needs Review", uploaded: "06 Aug 2026", verified: "—", expiry: "—", usedIn: 3, confidence: 82 },
  { id: "DOC-26", name: "Employment Declaration (180 persons)", category: "Project", status: "Verified", uploaded: "12 Jun 2026", verified: "13 Jun 2026", expiry: "—", usedIn: 4, confidence: 89 },
  { id: "DOC-27", name: "Contractor Agreement", category: "Project", status: "Needs Review", uploaded: "16 Aug 2026", verified: "—", expiry: "—", usedIn: 1, confidence: 78 },
  { id: "DOC-28", name: "Solid Waste Management Plan", category: "Environment", status: "Verified", uploaded: "28 Jul 2026", verified: "30 Jul 2026", expiry: "—", usedIn: 2, confidence: 90 },
  { id: "DOC-29", name: "Insurance Policy — Plant", category: "Financial", status: "Verified", uploaded: "20 Aug 2026", verified: "21 Aug 2026", expiry: "19 Aug 2027", usedIn: 1, confidence: 92 },
  { id: "DOC-30", name: "Directors' KYC Set", category: "Statutory Identity", status: "Verified", uploaded: "14 Jun 2026", verified: "14 Jun 2026", expiry: "—", usedIn: 7, confidence: 98 },
];

export const READINESS_BREAKDOWN = [
  { label: "Required documents", base: 88, resolved: 96 },
  { label: "Data consistency", base: 84, resolved: 91 },
  { label: "Mandatory fields", base: 100, resolved: 100 },
  { label: "Approval prerequisites", base: 90, resolved: 94 },
  { label: "Compliance prerequisites", base: 86, resolved: 89 },
];

export interface Incentive {
  id: string;
  name: string;
  authority: string;
  match: number;
  benefit: string;
  eligibility: string;
  status: "Potentially Eligible" | "Under Review" | "Criteria Pending";
  met: string[];
  pending: string[];
  documents: string[];
  deadline: string;
  reference: string;
}

export const INCENTIVES: Incentive[] = [
  { id: "INC-01", name: "Package Scheme of Incentives — Industrial Promotion Subsidy", authority: "Directorate of Industries", match: 88, benefit: "Up to ₹2.4 Cr over 7 years (indicative)", eligibility: "New manufacturing unit in a notified area", status: "Potentially Eligible", met: ["Unit located in Maharashtra", "Sector eligible under the scheme", "Investment within declared range"], pending: ["Employment criteria needs confirmation"], documents: ["Udyam Registration", "DPR", "Bank Sanction Letter"], deadline: "31 Mar 2027", reference: "Prototype Scheme Ref PSI-2026-A" },
  { id: "INC-02", name: "Agro & Food Processing Capital Subsidy", authority: "Directorate of Agri Business", match: 92, benefit: "35% capital subsidy on plant & machinery (indicative cap ₹1.5 Cr)", eligibility: "Food processing unit with cold chain component", status: "Potentially Eligible", met: ["Food processing activity", "Plant & machinery above threshold", "Nashik district eligible"], pending: ["Cold chain component to be declared"], documents: ["Machinery Invoices", "Project Report", "Land Document"], deadline: "30 Nov 2026", reference: "Prototype Scheme Ref AFP-11" },
  { id: "INC-03", name: "Electricity Duty Exemption", authority: "Energy Department", match: 79, benefit: "Exemption for 7 years from commercial production", eligibility: "New unit with HT connection in eligible area", status: "Under Review", met: ["HT load sanction in progress", "New unit"], pending: ["Commercial production date to be declared", "Consent to Operate required"], documents: ["Load Sanction Letter", "Factory Licence"], deadline: "Rolling", reference: "Prototype Scheme Ref ED-04" },
  { id: "INC-04", name: "Stamp Duty Exemption on Lease Deed", authority: "Revenue Department", match: 84, benefit: "100% exemption on the MIDC lease instrument (indicative)", eligibility: "Unit in a notified industrial area", status: "Potentially Eligible", met: ["MIDC allotment confirmed", "Unit qualifies as new investment"], pending: ["Eligibility certificate to be obtained"], documents: ["Lease Agreement", "Allotment Letter"], deadline: "Before deed registration", reference: "Prototype Scheme Ref SD-02" },
  { id: "INC-05", name: "Interest Subsidy on Term Loan", authority: "Directorate of Industries", match: 71, benefit: "5% interest reimbursement on eligible term loan", eligibility: "MSME term loan for plant & machinery", status: "Criteria Pending", met: ["Term loan sanctioned", "MSME classification valid"], pending: ["Disbursement schedule required", "Repayment record of 6 months required"], documents: ["Bank Sanction Letter", "Loan Statement"], deadline: "31 Dec 2026", reference: "Prototype Scheme Ref IS-07" },
  { id: "INC-06", name: "Employment Generation Support", authority: "Skill Development Department", match: 64, benefit: "₹12,000 per eligible local worker per year (indicative)", eligibility: "Minimum 50 local persons employed", status: "Criteria Pending", met: ["Declared employment of 180"], pending: ["Local domicile ratio to be evidenced", "EPF registration required"], documents: ["Employment Declaration", "EPF Registration"], deadline: "Post commencement", reference: "Prototype Scheme Ref EG-03" },
  { id: "INC-07", name: "Effluent Treatment Infrastructure Assistance", authority: "Environment Department", match: 58, benefit: "25% assistance on ETP capital cost", eligibility: "Unit installing an in-house ETP", status: "Criteria Pending", met: ["ETP design submitted"], pending: ["MPCB Consent to Establish required", "Cost estimate certification required"], documents: ["ETP Design", "Consent to Establish"], deadline: "31 Mar 2027", reference: "Prototype Scheme Ref ETP-05" },
  { id: "INC-08", name: "Export Market Development Assistance", authority: "Directorate of Industries", match: 46, benefit: "Reimbursement of export certification cost", eligibility: "Unit with declared export intent", status: "Criteria Pending", met: ["Food products qualify for export incentives"], pending: ["Export intent not declared in project profile", "IEC registration required"], documents: ["IEC Certificate", "Export Plan"], deadline: "Rolling", reference: "Prototype Scheme Ref EX-09" },
];

export const COMPLIANCE = [
  { id: "CMP-A", name: "Consent to Establish — Renewal", authority: "MPCB", due: "18 days", dueDate: "23 Sep 2026", status: "Upcoming", priority: "High" },
  { id: "CMP-B", name: "Factory Licence Renewal", authority: "DISH", due: "42 days", dueDate: "17 Oct 2026", status: "Upcoming", priority: "Medium" },
  { id: "CMP-C", name: "Fire Safety Certificate (Form B)", authority: "Fire Services", due: "Overdue by 4 days", dueDate: "01 Sep 2026", status: "Overdue", priority: "Critical" },
  { id: "CMP-D", name: "Quarterly Environmental Statement", authority: "MPCB", due: "26 days", dueDate: "01 Oct 2026", status: "Upcoming", priority: "Medium" },
  { id: "CMP-E", name: "Legal Metrology Stamping", authority: "Legal Metrology", due: "Completed", dueDate: "12 Aug 2026", status: "Completed", priority: "Low" },
  { id: "CMP-F", name: "Annual Returns — Labour", authority: "Labour Commissionerate", due: "Completed", dueDate: "30 Jun 2026", status: "Completed", priority: "Low" },
  { id: "CMP-G", name: "Water Cess Return", authority: "MPCB", due: "9 days", dueDate: "14 Sep 2026", status: "Upcoming", priority: "High" },
  { id: "CMP-H", name: "Boiler Inspection Certificate", authority: "Steam Boilers", due: "Renewal in 88 days", dueDate: "02 Dec 2026", status: "Renewal", priority: "Low" },
];

export const NOTIFICATIONS = [
  { id: "N1", level: "High Priority", title: "MPCB clarification is due in 2 days", body: "Application APP-MH-2026-01882 requires a response to the water-balance query.", time: "05 Sep 2026, 09:12" },
  { id: "N2", level: "Action Required", title: "Fire Safety Layout Drawing has not been uploaded", body: "This document blocks 3 approvals including the final Fire NOC.", time: "04 Sep 2026, 17:40" },
  { id: "N3", level: "Information", title: "Application APP-MH-2026-01884 moved to scrutiny stage", body: "Building Plan Approval is now with the scrutiny cell.", time: "04 Sep 2026, 11:05" },
  { id: "N4", level: "Success", title: "Water Supply Connection approved", body: "MIDC has executed the industrial water agreement for the Nashik plot.", time: "02 Sep 2026, 15:22" },
  { id: "N5", level: "Information", title: "New incentive match detected", body: "Agro & Food Processing Capital Subsidy shows an 92% eligibility match.", time: "01 Sep 2026, 10:31" },
  { id: "N6", level: "Success", title: "Shops & Establishment auto-scrutiny cleared", body: "Certificate expected within 3 working days.", time: "30 Aug 2026, 12:48" },
];

export const GRIEVANCES = [
  { id: "GRV-2026-0412", subject: "Delay in building plan scrutiny", department: "Urban Development", application: "APP-MH-2026-01884", raised: "26 Aug 2026", status: "Under Review", stage: 2 },
  { id: "GRV-2026-0388", subject: "Inspection slot not allotted", department: "Environment & Climate Change", application: "APP-MH-2026-01882", raised: "18 Aug 2026", status: "Assigned", stage: 1 },
  { id: "GRV-2026-0341", subject: "Duplicate document request", department: "Industries, Energy & Labour", application: "APP-MH-2026-01902", raised: "02 Aug 2026", status: "Resolved", stage: 3 },
  { id: "GRV-2026-0299", subject: "Fee payment not reflected", department: "MIDC", application: "APP-MH-2026-01812", raised: "21 Jul 2026", status: "Closed", stage: 4 },
  { id: "GRV-2026-0255", subject: "Portal login issue", department: "MAITRI Helpdesk", application: "—", raised: "11 Jul 2026", status: "Closed", stage: 4 },
  { id: "GRV-2026-0231", subject: "Incorrect SLA displayed", department: "MAITRI Helpdesk", application: "APP-MH-2026-01883", raised: "04 Jul 2026", status: "Closed", stage: 4 },
  { id: "GRV-2026-0210", subject: "Clarification wording unclear", department: "Environment & Climate Change", application: "APP-MH-2026-01882", raised: "28 Jun 2026", status: "Resolved", stage: 3 },
  { id: "GRV-2026-0188", subject: "Water connection charges dispute", department: "MIDC", application: "APP-MH-2026-01812", raised: "19 Jun 2026", status: "Closed", stage: 4 },
  { id: "GRV-2026-0155", subject: "Document re-upload requested twice", department: "Urban Development", application: "APP-MH-2026-01883", raised: "08 Jun 2026", status: "Resolved", stage: 3 },
  { id: "GRV-2026-0121", subject: "Officer contact not reachable", department: "Labour", application: "APP-MH-2026-01886", raised: "30 May 2026", status: "Closed", stage: 4 },
];

export const OFFICERS = [
  { id: "OFF-01", name: "S. Kulkarni", designation: "Regional Officer", department: "Environment & Climate Change", district: "Nashik", load: 38, sla: 81 },
  { id: "OFF-02", name: "A. Pawar", designation: "Assistant Director", department: "Urban Development", district: "Nashik", load: 44, sla: 88 },
  { id: "OFF-03", name: "R. Jadhav", designation: "Executive Engineer", department: "Energy", district: "Nashik", load: 26, sla: 93 },
  { id: "OFF-04", name: "M. Shaikh", designation: "Labour Officer", department: "Labour", district: "Nashik", load: 19, sla: 96 },
  { id: "OFF-05", name: "P. More", designation: "Regional Manager", department: "MIDC", district: "Nashik", load: 22, sla: 94 },
  { id: "OFF-06", name: "D. Ingle", designation: "Joint Director", department: "Industries, Energy & Labour", district: "Pune", load: 51, sla: 78 },
  { id: "OFF-07", name: "N. Bhosale", designation: "Designated Officer", department: "Food & Drug Administration", district: "Pune", load: 33, sla: 90 },
  { id: "OFF-08", name: "V. Sawant", designation: "Sub-Regional Officer", department: "Environment & Climate Change", district: "Raigad", load: 47, sla: 74 },
  { id: "OFF-09", name: "K. Gaikwad", designation: "Assistant Engineer", department: "MIDC", district: "Pune", load: 24, sla: 92 },
  { id: "OFF-10", name: "S. Patil", designation: "Fire Officer", department: "Urban Development", district: "Nagpur", load: 29, sla: 85 },
  { id: "OFF-11", name: "H. Rane", designation: "Deputy Director", department: "Industries, Energy & Labour", district: "Thane", load: 41, sla: 83 },
  { id: "OFF-12", name: "T. Nikam", designation: "Inspector", department: "Legal Metrology", district: "Chh. Sambhajinagar", load: 15, sla: 97 },
  { id: "OFF-13", name: "G. Kadam", designation: "Regional Officer", department: "Environment & Climate Change", district: "Nagpur", load: 36, sla: 80 },
  { id: "OFF-14", name: "B. Chavan", designation: "Executive Engineer", department: "Energy", district: "Raigad", load: 28, sla: 89 },
  { id: "OFF-15", name: "L. Joshi", designation: "Assistant Director", department: "Food & Drug Administration", district: "Nashik", load: 31, sla: 91 },
];

export const INSPECTIONS = [
  { id: "INS-2026-0451", application: "APP-MH-2026-01882", type: "Site & Effluent Inspection", officer: "S. Kulkarni", location: "MIDC Vinchur, Nashik", date: "08 Sep 2026, 11:00", status: "To Be Scheduled" },
  { id: "INS-2026-0452", application: "APP-MH-2026-01883", type: "Fire Safety Inspection", officer: "A. Pawar", location: "MIDC Vinchur, Nashik", date: "09 Sep 2026, 10:00", status: "Scheduled" },
  { id: "INS-2026-0453", application: "APP-MH-2026-01904", type: "Fire Safety Inspection", officer: "S. Patil", location: "Butibori, Nagpur", date: "10 Sep 2026, 14:30", status: "Scheduled" },
  { id: "INS-2026-0454", application: "APP-MH-2026-01901", type: "Pollution Control Inspection", officer: "V. Sawant", location: "Mahad MIDC, Raigad", date: "11 Sep 2026, 09:30", status: "Pending Confirmation" },
  { id: "INS-2026-0455", application: "APP-MH-2026-01907", type: "Stack Monitoring", officer: "S. Kulkarni", location: "Ranjangaon, Pune", date: "12 Sep 2026, 12:00", status: "Scheduled" },
  { id: "INS-2026-0456", application: "APP-MH-2026-01910", type: "Factory Safety Inspection", officer: "H. Rane", location: "Wagle Estate, Thane", date: "12 Sep 2026, 16:00", status: "Completed" },
  { id: "INS-2026-0457", application: "APP-MH-2026-01903", type: "Food Safety Inspection", officer: "N. Bhosale", location: "Hinjawadi, Pune", date: "15 Sep 2026, 11:30", status: "Scheduled" },
  { id: "INS-2026-0458", application: "APP-MH-2026-01912", type: "Hazardous Waste Verification", officer: "V. Sawant", location: "Mahad MIDC, Raigad", date: "16 Sep 2026, 10:00", status: "To Be Scheduled" },
  { id: "INS-2026-0459", application: "APP-MH-2026-01906", type: "Site Verification", officer: "A. Pawar", location: "Mahad MIDC, Raigad", date: "16 Sep 2026, 13:00", status: "To Be Scheduled" },
];

export const CLARIFICATIONS = [
  { id: "CLR-2026-0912", application: "APP-MH-2026-01882", subject: "Water balance statement mismatch", raised: "29 Aug 2026", due: "07 Sep 2026", status: "Awaiting Applicant", department: "Environment & Climate Change" },
  { id: "CLR-2026-0913", application: "APP-MH-2026-01902", subject: "Machinery layout differs from plan", raised: "27 Aug 2026", due: "06 Sep 2026", status: "Response Received", department: "Industries, Energy & Labour" },
  { id: "CLR-2026-0914", application: "APP-MH-2026-01906", subject: "Revised site plan required", raised: "20 Aug 2026", due: "29 Aug 2026", status: "Overdue", department: "Urban Development" },
  { id: "CLR-2026-0915", application: "APP-MH-2026-01884", subject: "Structural stability certificate", raised: "31 Aug 2026", due: "09 Sep 2026", status: "Awaiting Applicant", department: "Urban Development" },
  { id: "CLR-2026-0916", application: "APP-MH-2026-01910", subject: "Safety officer appointment proof", raised: "01 Sep 2026", due: "10 Sep 2026", status: "Awaiting Applicant", department: "Industries, Energy & Labour" },
  { id: "CLR-2026-0917", application: "APP-MH-2026-01912", subject: "Waste quantity break-up", raised: "02 Sep 2026", due: "11 Sep 2026", status: "Awaiting Applicant", department: "Environment & Climate Change" },
];

export const ESCALATIONS = [
  { id: "ESC-2026-0071", application: "APP-MH-2026-01906", department: "Urban Development", days: 9, level: "Level 2 — Head of Office", reason: "SLA breached; clarification overdue" },
  { id: "ESC-2026-0072", application: "APP-MH-2026-01901", department: "Environment & Climate Change", days: 1, level: "Level 1 — Regional Officer", reason: "SLA expiring within 24 hours" },
  { id: "ESC-2026-0073", application: "APP-MH-2026-01904", department: "Urban Development", days: 2, level: "Level 1 — Regional Officer", reason: "Inspection not scheduled" },
  { id: "ESC-2026-0074", application: "APP-MH-2026-01882", department: "Environment & Climate Change", days: 2, level: "Level 1 — Regional Officer", reason: "High predicted delay risk" },
];

export const DEPARTMENT_STATS = [
  { department: "Environment & Climate Change", received: 2184, disposed: 1602, pending: 582, avgDays: 26.4, sla: 74, services: 14 },
  { department: "Urban Development", received: 1962, disposed: 1521, pending: 441, avgDays: 21.8, sla: 82, services: 21 },
  { department: "Industries, Energy & Labour", received: 1743, disposed: 1398, pending: 345, avgDays: 17.2, sla: 88, services: 26 },
  { department: "MIDC", received: 1521, disposed: 1288, pending: 233, avgDays: 14.6, sla: 91, services: 18 },
  { department: "Energy", received: 1288, disposed: 1094, pending: 194, avgDays: 13.9, sla: 92, services: 9 },
  { department: "Labour", received: 1121, disposed: 992, pending: 129, avgDays: 9.4, sla: 95, services: 17 },
  { department: "Food & Drug Administration", received: 984, disposed: 762, pending: 222, avgDays: 22.1, sla: 79, services: 12 },
  { department: "Revenue", received: 872, disposed: 641, pending: 231, avgDays: 24.8, sla: 76, services: 19 },
  { department: "Food, Civil Supplies & Consumer Protection", received: 807, disposed: 743, pending: 64, avgDays: 8.7, sla: 96, services: 17 },
];

export const MONTHLY_TREND = [
  { month: "Apr", received: 1042, disposed: 812, breached: 96 },
  { month: "May", received: 1188, disposed: 921, breached: 104 },
  { month: "Jun", received: 1264, disposed: 1042, breached: 88 },
  { month: "Jul", received: 1391, disposed: 1128, breached: 92 },
  { month: "Aug", received: 1476, disposed: 1249, breached: 78 },
  { month: "Sep", received: 1522, disposed: 1341, breached: 71 },
];

export const DISTRICTS = [
  { name: "Pune", applications: 2184, investment: "₹38,420 Cr", approvals: 1841, avgDays: 15.2, sla: 91, x: 38, y: 62 },
  { name: "Nashik", applications: 982, investment: "₹12,860 Cr", approvals: 812, avgDays: 14.6, sla: 89, x: 32, y: 44 },
  { name: "Thane", applications: 1642, investment: "₹29,110 Cr", approvals: 1388, avgDays: 16.8, sla: 87, x: 26, y: 57 },
  { name: "Raigad", applications: 764, investment: "₹18,240 Cr", approvals: 588, avgDays: 24.1, sla: 71, x: 27, y: 68 },
  { name: "Nagpur", applications: 1122, investment: "₹14,980 Cr", approvals: 921, avgDays: 18.4, sla: 84, x: 78, y: 41 },
  { name: "Chh. Sambhajinagar", applications: 848, investment: "₹9,640 Cr", approvals: 702, avgDays: 17.9, sla: 86, x: 48, y: 44 },
  { name: "Kolhapur", applications: 612, investment: "₹6,210 Cr", approvals: 511, avgDays: 16.1, sla: 88, x: 34, y: 82 },
  { name: "Amravati", applications: 448, investment: "₹4,120 Cr", approvals: 361, avgDays: 19.7, sla: 81, x: 66, y: 38 },
  { name: "Satara", applications: 398, investment: "₹3,880 Cr", approvals: 322, avgDays: 15.8, sla: 90, x: 36, y: 74 },
  { name: "Ratnagiri", applications: 288, investment: "₹5,410 Cr", approvals: 214, avgDays: 22.6, sla: 76, x: 26, y: 79 },
];

export const SECTOR_STATS = [
  { sector: "IT & ITES", applications: 2412, investment: 42180, sla: 93 },
  { sector: "Auto & Auto Components", applications: 1884, investment: 38420, sla: 86 },
  { sector: "Agro & Food Processing", applications: 1746, investment: 21640, sla: 84 },
  { sector: "Chemical & Pharma", applications: 1522, investment: 34120, sla: 72 },
  { sector: "Textiles", applications: 1188, investment: 15240, sla: 88 },
  { sector: "Electronics", applications: 902, investment: 19860, sla: 90 },
  { sector: "Aerospace & Defence", applications: 424, investment: 12480, sla: 82 },
  { sector: "Gems & Jewellery", applications: 404, investment: 6120, sla: 91 },
];

export const BOTTLENECKS = [
  { rank: 1, stage: "Environmental Consent Scrutiny", department: "Environment & Climate Change", severity: "High", avgDays: 26.4, sla: 30, breach: 26, backlog: 582, cause: "Inspection scheduling and effluent document rework", intervention: "Add two regional scrutiny cells and pre-validate water balance documents at intake" },
  { rank: 2, stage: "Inspection Scheduling", department: "Cross-department", severity: "Medium", avgDays: 11.2, sla: 10, breach: 18, backlog: 341, cause: "Officer availability clustered in the same week", intervention: "Geographic slot clustering and shared inspection calendar" },
  { rank: 3, stage: "Fire NOC Scrutiny", department: "Urban Development", severity: "Medium", avgDays: 13.8, sla: 15, breach: 14, backlog: 228, cause: "Repeated drawing revisions", intervention: "Automated drawing checklist validation before submission" },
  { rank: 4, stage: "Building Plan Approval", department: "Urban Development", severity: "Low", avgDays: 21.8, sla: 30, breach: 9, backlog: 441, cause: "Structural certificate submitted late", intervention: "Prompt applicants at 50% of SLA window" },
  { rank: 5, stage: "Factory Licence Issue", department: "Industries, Energy & Labour", severity: "Low", avgDays: 17.2, sla: 21, breach: 7, backlog: 345, cause: "Dependent building approval pending", intervention: "Enable conditional parallel processing" },
];

export const AUDIT_LOGS = [
  { user: "Officer S. Kulkarni", role: "Officer", action: "Requested clarification", time: "05 Sep 2026, 14:32", application: "APP-MH-2026-01882", change: "status: In Progress → Query Raised" },
  { user: "Officer A. Pawar", role: "Officer", action: "Updated inspection status", time: "05 Sep 2026, 15:14", application: "APP-MH-2026-01883", change: "inspection: Pending → Scheduled" },
  { user: "Raj Foods (Investor)", role: "Investor", action: "Uploaded document", time: "05 Sep 2026, 12:02", application: "APP-MH-2026-01884", change: "document: Structural Stability Certificate added" },
  { user: "System (Rules Engine)", role: "System", action: "Recomputed applicability", time: "05 Sep 2026, 11:58", application: "PRJ-2026-0147", change: "approvals: 16 → 17" },
  { user: "Officer D. Ingle", role: "Officer", action: "Assigned application", time: "04 Sep 2026, 17:41", application: "APP-MH-2026-01902", change: "assignee: unassigned → D. Ingle" },
  { user: "Admin R. Deshpande", role: "Administrator", action: "Viewed analytics", time: "04 Sep 2026, 16:20", application: "—", change: "report: Bottleneck Analytics" },
  { user: "System (SLA Engine)", role: "System", action: "Raised SLA alert", time: "04 Sep 2026, 09:00", application: "APP-MH-2026-01906", change: "risk: Medium → High" },
  { user: "Officer V. Sawant", role: "Officer", action: "Scheduled inspection", time: "03 Sep 2026, 15:33", application: "APP-MH-2026-01901", change: "inspection: 11 Sep 2026" },
  { user: "Raj Foods (Investor)", role: "Investor", action: "Raised grievance", time: "26 Aug 2026, 10:12", application: "APP-MH-2026-01884", change: "grievance: GRV-2026-0412 created" },
  { user: "System (Document AI)", role: "System", action: "Flagged mismatch", time: "26 Aug 2026, 09:41", application: "PRJ-2026-0147", change: "document: GST Certificate — address mismatch" },
];

export const SERVICES = [
  { id: "SVC-001", name: "Consent to Establish", department: "Environment & Climate Change", subDepartment: "MPCB", stage: "Pre-establishment", sector: "All", docs: 6, sla: 30, online: true, fee: "₹ As per capital investment slab", desc: "Prior consent required before establishing an industrial unit that discharges effluent or emissions." },
  { id: "SVC-002", name: "Consent to Operate", department: "Environment & Climate Change", subDepartment: "MPCB", stage: "Pre-operation", sector: "All", docs: 5, sla: 45, online: true, fee: "₹ As per slab", desc: "Consent required before commencing operations at an established unit." },
  { id: "SVC-003", name: "Fire NOC (Provisional)", department: "Urban Development", subDepartment: "Fire Services", stage: "Pre-establishment", sector: "All", docs: 5, sla: 15, online: true, fee: "₹ Area based", desc: "Provisional no-objection certificate for the proposed building and fire-fighting scheme." },
  { id: "SVC-004", name: "Fire NOC (Final)", department: "Urban Development", subDepartment: "Fire Services", stage: "Pre-operation", sector: "All", docs: 4, sla: 15, online: true, fee: "₹ Area based", desc: "Final NOC after fire-fighting installation is completed and tested." },
  { id: "SVC-005", name: "Building Plan Approval", department: "Urban Development", subDepartment: "Planning Authority", stage: "Pre-establishment", sector: "All", docs: 7, sla: 30, online: true, fee: "₹ Built-up area based", desc: "Sanction of building plans for industrial construction." },
  { id: "SVC-006", name: "Occupancy Certificate", department: "Urban Development", subDepartment: "Planning Authority", stage: "Pre-operation", sector: "All", docs: 5, sla: 21, online: true, fee: "₹ Nominal", desc: "Certificate confirming the completed building conforms to sanctioned plans." },
  { id: "SVC-007", name: "Factory Plan Approval & Licence", department: "Industries, Energy & Labour", subDepartment: "DISH", stage: "Pre-establishment", sector: "Manufacturing", docs: 4, sla: 21, online: true, fee: "₹ Worker & HP based", desc: "Approval of factory plans and grant of licence under factory regulations." },
  { id: "SVC-008", name: "Boiler Registration", department: "Industries, Energy & Labour", subDepartment: "Steam Boilers", stage: "Pre-operation", sector: "Manufacturing", docs: 4, sla: 25, online: true, fee: "₹ Capacity based", desc: "Registration and certification of steam boilers before use." },
  { id: "SVC-009", name: "Plot Allotment (MIDC)", department: "MIDC", subDepartment: "Regional Office", stage: "Pre-establishment", sector: "All", docs: 5, sla: 30, online: true, fee: "₹ Plot rate", desc: "Allotment of industrial plots in notified MIDC areas." },
  { id: "SVC-010", name: "Water Supply Connection (MIDC)", department: "MIDC", subDepartment: "Water Supply", stage: "Pre-establishment", sector: "All", docs: 4, sla: 21, online: true, fee: "₹ Connection charges", desc: "Industrial water connection and agreement within MIDC estates." },
  { id: "SVC-011", name: "Electricity Load Sanction", department: "Energy", subDepartment: "MSEDCL", stage: "Pre-establishment", sector: "All", docs: 4, sla: 20, online: true, fee: "₹ Load based", desc: "Sanction of HT/LT connected load for industrial premises." },
  { id: "SVC-012", name: "FSSAI Manufacturing Licence", department: "Food & Drug Administration", subDepartment: "FDA", stage: "Pre-operation", sector: "Agro & Food Processing", docs: 6, sla: 30, online: true, fee: "₹7,500 per annum (indicative)", desc: "Licence to manufacture food products for commercial sale." },
  { id: "SVC-013", name: "Legal Metrology Packer Registration", department: "Food, Civil Supplies & Consumer Protection", subDepartment: "Legal Metrology", stage: "Pre-operation", sector: "All", docs: 3, sla: 15, online: true, fee: "₹ Nominal", desc: "Registration for pre-packaged commodity declaration compliance." },
  { id: "SVC-014", name: "Shops & Establishment Registration", department: "Labour", subDepartment: "Labour Commissionerate", stage: "Pre-establishment", sector: "All", docs: 3, sla: 7, online: true, fee: "₹ Headcount based", desc: "Registration of commercial establishments and offices." },
  { id: "SVC-015", name: "Contract Labour Registration", department: "Labour", subDepartment: "Labour Commissionerate", stage: "Pre-establishment", sector: "All", docs: 3, sla: 15, online: true, fee: "₹ Headcount based", desc: "Registration of principal employers engaging contract labour." },
  { id: "SVC-016", name: "Hazardous Waste Authorisation", department: "Environment & Climate Change", subDepartment: "MPCB", stage: "Pre-operation", sector: "Manufacturing", docs: 4, sla: 30, online: true, fee: "₹ Quantity based", desc: "Authorisation for generation, storage and disposal of hazardous waste." },
  { id: "SVC-017", name: "Trade Licence", department: "Urban Development", subDepartment: "Local Body", stage: "Pre-operation", sector: "All", docs: 3, sla: 15, online: false, fee: "₹ Local body rates", desc: "Licence to carry on trade within local body jurisdiction." },
  { id: "SVC-018", name: "Stamp Duty Exemption Certificate", department: "Revenue", subDepartment: "Collector of Stamps", stage: "Pre-establishment", sector: "All", docs: 4, sla: 21, online: true, fee: "Nil", desc: "Certificate for stamp duty exemption on eligible industrial instruments." },
];

export const REGULATIONS = [
  { id: "REG-01", title: "Industrial Consent Framework — Prototype Reference EN-01", authority: "Environment Department", updated: "12 Feb 2026" },
  { id: "REG-02", title: "Fire Prevention & Life Safety Requirements — Prototype Reference FR-02", authority: "Urban Development", updated: "04 Mar 2026" },
  { id: "REG-03", title: "Factory Registration Conditions — Prototype Reference IN-03", authority: "Industries Department", updated: "28 Jan 2026" },
  { id: "REG-04", title: "Package Scheme of Incentives — Prototype Reference PSI-2026-A", authority: "Directorate of Industries", updated: "01 Apr 2026" },
  { id: "REG-05", title: "Right to Services — Notified Service Timelines", authority: "GAD / RTS Commission", updated: "18 Dec 2025" },
  { id: "REG-06", title: "MIDC Land Allotment Guidelines — Prototype Reference LD-01", authority: "MIDC", updated: "22 Nov 2025" },
  { id: "REG-07", title: "Food Business Licensing Conditions — Prototype Reference FD-01", authority: "FDA Maharashtra", updated: "09 May 2026" },
  { id: "REG-08", title: "Hazardous Waste Handling Requirements — Prototype Reference EN-09", authority: "MPCB", updated: "16 Jun 2026" },
  { id: "REG-09", title: "Electricity Duty Exemption Conditions — Prototype Reference ED-04", authority: "Energy Department", updated: "27 Feb 2026" },
  { id: "REG-10", title: "Legal Metrology Packaging Declarations — Prototype Reference LM-01", authority: "Legal Metrology", updated: "03 Aug 2026" },
];

export const EXECUTIVE_KPIS = [
  { label: "Departments", value: "18" },
  { label: "Total Services", value: "153" },
  { label: "Applications Received", value: "12,482" },
  { label: "Disposed", value: "9,241" },
  { label: "SLA Compliance", value: "87%" },
  { label: "Investment Facilitated", value: "₹1.92 Lakh Cr" },
];
