export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

/* ─── Tenant / Org ─────────────────────────────────────────────────── */
export interface Organisation {
  id: string;
  name: string;
  slug: string;
  frn?: string; // FCA Firm Reference Number
  regulated_activities: string[];
  plan: PricingPlan;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  subscription_status: SubscriptionStatus;
  created_at: string;
  updated_at: string;
}

export type PricingPlan = "starter" | "professional" | "enterprise";
export type SubscriptionStatus = "active" | "past_due" | "canceled" | "trialing" | "incomplete";

/* ─── Users / Members ───────────────────────────────────────────────── */
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  job_title?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganisationMember {
  id: string;
  organisation_id: string;
  user_id: string;
  role: MemberRole;
  invited_by?: string;
  accepted_at?: string;
  created_at: string;
}

export type MemberRole = "owner" | "admin" | "compliance" | "risk" | "viewer";

/* ─── Consumer Duty ─────────────────────────────────────────────────── */
export type ConsumerDutyOutcome =
  | "products_services"
  | "price_value"
  | "consumer_understanding"
  | "consumer_support";

export const OUTCOME_LABELS: Record<ConsumerDutyOutcome, string> = {
  products_services: "Products & Services",
  price_value: "Price & Value",
  consumer_understanding: "Consumer Understanding",
  consumer_support: "Consumer Support",
};

/* ─── Products ──────────────────────────────────────────────────────── */
export interface Product {
  id: string;
  organisation_id: string;
  name: string;
  description?: string;
  product_type: string;
  target_market?: string;
  distribution_channels: string[];
  vulnerable_customer_considerations?: string;
  status: ProductStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type ProductStatus = "active" | "under_review" | "withdrawn" | "discontinued";

/* ─── Assessments ───────────────────────────────────────────────────── */
export interface Assessment {
  id: string;
  organisation_id: string;
  product_id?: string;
  title: string;
  outcome: ConsumerDutyOutcome;
  assessment_type: AssessmentType;
  status: AssessmentStatus;
  risk_rating: RiskRating;
  compliance_score?: number; // 0–100
  summary?: string;
  ai_analysis?: string;
  due_date?: string;
  completed_at?: string;
  reviewed_by?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type AssessmentType = "initial" | "annual_review" | "trigger_review" | "thematic";
export type AssessmentStatus = "draft" | "in_progress" | "pending_review" | "approved" | "overdue";
export type RiskRating = "low" | "medium" | "high" | "critical";

/* ─── Actions / Remediation ─────────────────────────────────────────── */
export interface Action {
  id: string;
  organisation_id: string;
  assessment_id: string;
  title: string;
  description?: string;
  owner_id?: string;
  due_date?: string;
  priority: Priority;
  status: ActionStatus;
  created_at: string;
  updated_at: string;
}

export type Priority = "low" | "medium" | "high" | "critical";
export type ActionStatus = "open" | "in_progress" | "completed" | "overdue" | "deferred";

/* ─── Evidence ──────────────────────────────────────────────────────── */
export interface Evidence {
  id: string;
  organisation_id: string;
  assessment_id?: string;
  action_id?: string;
  title: string;
  description?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  evidence_type: EvidenceType;
  uploaded_by: string;
  created_at: string;
}

export type EvidenceType = "policy" | "procedure" | "mi_data" | "customer_feedback" | "audit_report" | "other";

/* ─── Dashboard ─────────────────────────────────────────────────────── */
export interface ComplianceScore {
  overall: number;
  by_outcome: Record<ConsumerDutyOutcome, number>;
  trend: "improving" | "stable" | "declining";
  last_updated: string;
}

export interface DashboardStats {
  compliance_score: ComplianceScore;
  open_actions: number;
  overdue_actions: number;
  assessments_total: number;
  assessments_this_month: number;
  products_total: number;
  evidence_items: number;
}
