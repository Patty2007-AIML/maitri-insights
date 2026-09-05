import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Clock, HelpCircle, Minus, XCircle } from "lucide-react";

type Variant = "navy" | "saffron" | "success" | "warning" | "danger" | "info" | "muted";

const MAP: Record<string, Variant> = {
  // applicability
  Required: "navy",
  Conditional: "saffron",
  "Not Required": "muted",
  "Potentially Required": "navy",
  // approval / application status
  "Not Started": "muted",
  "In Progress": "saffron",
  Submitted: "info",
  "Under Review": "info",
  "Query Raised": "warning",
  Approved: "success",
  Blocked: "danger",
  "At Risk": "danger",
  Rejected: "danger",
  // documents
  Verified: "success",
  "Needs Review": "warning",
  Missing: "danger",
  Expired: "danger",
  "Mismatch Detected": "danger",
  // risk
  Low: "success",
  Medium: "warning",
  High: "danger",
  Critical: "danger",
  // compliance
  Upcoming: "info",
  Overdue: "danger",
  Completed: "success",
  Renewal: "saffron",
  // incentives
  "Potentially Eligible": "success",
  "Criteria Pending": "warning",
  // inspections / clarifications / grievances
  Scheduled: "info",
  "To Be Scheduled": "warning",
  "Pending Confirmation": "saffron",
  "Awaiting Applicant": "warning",
  "Response Received": "info",
  Assigned: "info",
  Resolved: "success",
  Closed: "muted",
  // notifications
  "High Priority": "danger",
  "Action Required": "warning",
  Information: "info",
  Success: "success",
};

export function statusVariant(status: string): Variant {
  return MAP[status] ?? "muted";
}

export function StatusBadge({ status, className, icon }: { status: string; className?: string; icon?: boolean }) {
  const v = statusVariant(status);
  const Icon =
    v === "success" ? CheckCircle2 : v === "danger" ? XCircle : v === "warning" ? AlertTriangle : v === "info" ? Clock : v === "saffron" ? HelpCircle : Minus;
  return (
    <Badge variant={v} className={cn(className)}>
      {icon && <Icon className="size-3" aria-hidden />}
      {status}
    </Badge>
  );
}

/** Risk indicator: coloured dot + label. */
export function RiskIndicator({ level, className }: { level: "Low" | "Medium" | "High" | "Critical"; className?: string }) {
  const color = level === "Low" ? "bg-success" : level === "Medium" ? "bg-warning" : "bg-destructive";
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold", className)}>
      <span className={cn("size-2 rounded-full", color)} aria-hidden />
      {level.toUpperCase()}
    </span>
  );
}
