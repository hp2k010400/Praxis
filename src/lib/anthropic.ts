import Anthropic from "@anthropic-ai/sdk";
import type { ConsumerDutyOutcome } from "@/types";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a specialist FCA Consumer Duty compliance advisor.
Your role is to analyse firm data, identify gaps against the FCA Consumer Duty requirements
(PS22/9 and PRIN 2A), and provide structured, actionable remediation guidance.

Always structure your output as valid JSON matching the schema provided. Be specific,
reference FCA guidance where relevant, and prioritise actions by regulatory risk.`;

export async function analyseAssessment(params: {
  outcome: ConsumerDutyOutcome;
  productName: string;
  firmDescription: string;
  questionnaireResponses: Record<string, string>;
}) {
  const { outcome, productName, firmDescription, questionnaireResponses } = params;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Analyse the following Consumer Duty assessment for the outcome: ${outcome}

Firm: ${firmDescription}
Product: ${productName}

Questionnaire responses:
${Object.entries(questionnaireResponses)
  .map(([q, a]) => `Q: ${q}\nA: ${a}`)
  .join("\n\n")}

Return JSON with this structure:
{
  "compliance_score": number (0-100),
  "risk_rating": "low" | "medium" | "high" | "critical",
  "summary": "2-3 sentence executive summary",
  "strengths": ["strength 1", ...],
  "gaps": [{ "area": "...", "description": "...", "fca_reference": "...", "risk": "low|medium|high|critical" }],
  "recommended_actions": [{ "title": "...", "description": "...", "priority": "low|medium|high|critical", "estimated_effort": "..." }],
  "board_mi_summary": "Board-ready paragraph for MI pack"
}`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("AI returned non-JSON response");

  return JSON.parse(jsonMatch[0]);
}

export async function generateBoardReport(params: {
  orgName: string;
  period: string;
  scores: Record<string, number>;
  openActions: number;
  completedActions: number;
}) {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Generate a board-level Consumer Duty MI report for:
Organisation: ${params.orgName}
Period: ${params.period}
Compliance scores by outcome: ${JSON.stringify(params.scores)}
Open actions: ${params.openActions}
Completed actions this period: ${params.completedActions}

Write a professional 3-4 paragraph board report suitable for inclusion in a board MI pack.
Include an executive summary, compliance position, key risks, and forward-looking actions.`,
      },
    ],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}
