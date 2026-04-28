import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { analyseAssessment } from "@/lib/anthropic";
import { z } from "zod";
import type { ConsumerDutyOutcome } from "@/types";

const schema = z.object({
  assessmentId: z.string().uuid(),
  outcome: z.enum(["products_services", "price_value", "consumer_understanding", "consumer_support"]),
  productName: z.string().min(1),
  firmDescription: z.string().min(1),
  responses: z.record(z.string()),
});

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { assessmentId, outcome, productName, firmDescription, responses } = parsed.data;

  try {
    const analysis = await analyseAssessment({
      outcome: outcome as ConsumerDutyOutcome,
      productName,
      firmDescription,
      questionnaireResponses: responses,
    });

    // Persist AI analysis back to the assessment
    await supabase
      .from("assessments")
      .update({
        ai_analysis: JSON.stringify(analysis),
        compliance_score: analysis.compliance_score,
        risk_rating: analysis.risk_rating,
        summary: analysis.summary,
        status: "pending_review",
      })
      .eq("id", assessmentId);

    return NextResponse.json({ analysis });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
