import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import type { RiskRating, AssessmentStatus, ActionStatus, Priority } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, fmt = "dd MMM yyyy") {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, fmt);
}

export function timeAgo(date: string | Date) {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function riskRatingColor(rating: RiskRating) {
  return {
    low: "text-success bg-success/10 border-success/20",
    medium: "text-warning bg-warning/10 border-warning/20",
    high: "text-destructive bg-destructive/10 border-destructive/20",
    critical: "text-destructive bg-destructive/20 border-destructive/40",
  }[rating];
}

export function assessmentStatusColor(status: AssessmentStatus) {
  return {
    draft: "text-muted-foreground bg-muted border-border",
    in_progress: "text-info bg-info/10 border-info/20",
    pending_review: "text-warning bg-warning/10 border-warning/20",
    approved: "text-success bg-success/10 border-success/20",
    overdue: "text-destructive bg-destructive/10 border-destructive/20",
  }[status];
}

export function actionStatusColor(status: ActionStatus) {
  return {
    open: "text-info bg-info/10 border-info/20",
    in_progress: "text-primary bg-primary/10 border-primary/20",
    completed: "text-success bg-success/10 border-success/20",
    overdue: "text-destructive bg-destructive/10 border-destructive/20",
    deferred: "text-muted-foreground bg-muted border-border",
  }[status];
}

export function priorityColor(priority: Priority) {
  return {
    low: "text-muted-foreground",
    medium: "text-warning",
    high: "text-destructive",
    critical: "text-destructive font-semibold",
  }[priority];
}

export function scoreColor(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
}

export function scoreRingColor(score: number) {
  if (score >= 80) return "stroke-[hsl(var(--success))]";
  if (score >= 60) return "stroke-[hsl(var(--warning))]";
  return "stroke-[hsl(var(--destructive))]";
}

export function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number) {
  return str.length > length ? str.slice(0, length) + "…" : str;
}
