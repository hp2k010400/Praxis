import { createClient } from "@/lib/supabase/server";
import type { Assessment, Action, Product, Organisation, OrganisationMember } from "@/types";

// ─── Organisation ───────────────────────────────────────────

export async function getOrgForUser(userId: string): Promise<Organisation | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("organisation_members")
    .select("organisations(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  return (data?.organisations as unknown as Organisation) ?? null;
}

export async function getOrgMembers(orgId: string): Promise<OrganisationMember[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("organisation_members")
    .select("*, profiles(full_name, email, avatar_url, job_title)")
    .eq("organisation_id", orgId)
    .order("created_at", { ascending: true });

  return (data as unknown as OrganisationMember[]) ?? [];
}

// ─── Products ───────────────────────────────────────────────

export async function getProducts(orgId: string): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("organisation_id", orgId)
    .order("created_at", { ascending: false });

  return (data as unknown as Product[]) ?? [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  return (data as unknown as Product) ?? null;
}

// ─── Assessments ────────────────────────────────────────────

export async function getAssessments(orgId: string): Promise<Assessment[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("assessments")
    .select("*, products(name), profiles!assessments_created_by_fkey(full_name)")
    .eq("organisation_id", orgId)
    .order("created_at", { ascending: false });

  return (data as unknown as Assessment[]) ?? [];
}

export async function getAssessment(id: string): Promise<Assessment | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("assessments")
    .select("*, products(name, product_type), profiles!assessments_created_by_fkey(full_name, email)")
    .eq("id", id)
    .single();

  return (data as unknown as Assessment) ?? null;
}

export async function getAssessmentsByOutcome(orgId: string, outcome: string): Promise<Assessment[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("assessments")
    .select("*")
    .eq("organisation_id", orgId)
    .eq("outcome", outcome)
    .order("created_at", { ascending: false });

  return (data as unknown as Assessment[]) ?? [];
}

// ─── Actions ────────────────────────────────────────────────

export async function getOpenActions(orgId: string): Promise<Action[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("actions")
    .select("*, assessments(title), profiles!actions_owner_id_fkey(full_name)")
    .eq("organisation_id", orgId)
    .in("status", ["open", "in_progress", "overdue"])
    .order("priority", { ascending: false })
    .order("due_date", { ascending: true });

  return (data as unknown as Action[]) ?? [];
}

export async function getActionsByAssessment(assessmentId: string): Promise<Action[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("actions")
    .select("*")
    .eq("assessment_id", assessmentId)
    .order("priority", { ascending: false });

  return (data as unknown as Action[]) ?? [];
}

// ─── Dashboard stats ─────────────────────────────────────────

export async function getDashboardStats(orgId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("dashboard_stats")
    .select("*")
    .eq("organisation_id", orgId)
    .single();

  return data;
}

// ─── Compliance score ─────────────────────────────────────────

export async function getComplianceScore(orgId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("assessments")
    .select("outcome, compliance_score")
    .eq("organisation_id", orgId)
    .eq("status", "approved")
    .not("compliance_score", "is", null);

  if (!data || data.length === 0) return null;

  const byOutcome: Record<string, number[]> = {};
  for (const row of data) {
    if (!byOutcome[row.outcome]) byOutcome[row.outcome] = [];
    byOutcome[row.outcome].push(row.compliance_score ?? 0);
  }

  const averages: Record<string, number> = {};
  for (const [outcome, scores] of Object.entries(byOutcome)) {
    averages[outcome] = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  const allScores = Object.values(averages);
  const overall = allScores.length > 0
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;

  return { overall, byOutcome: averages };
}
