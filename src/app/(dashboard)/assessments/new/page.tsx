"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Package, DollarSign, BookOpen, HeadphonesIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OUTCOME_LABELS, type ConsumerDutyOutcome } from "@/types";

const outcomes: { id: ConsumerDutyOutcome; icon: React.ElementType; color: string; fcaRef: string }[] = [
  { id: "products_services", icon: Package, color: "text-primary bg-primary/10", fcaRef: "PRIN 2A.2" },
  { id: "price_value", icon: DollarSign, color: "text-info bg-info/10", fcaRef: "PRIN 2A.3" },
  { id: "consumer_understanding", icon: BookOpen, color: "text-warning bg-warning/10", fcaRef: "PRIN 2A.4" },
  { id: "consumer_support", icon: HeadphonesIcon, color: "text-success bg-success/10", fcaRef: "PRIN 2A.5" },
];

const OUTCOME_QUESTIONS: Record<ConsumerDutyOutcome, { id: string; question: string }[]> = {
  products_services: [
    { id: "target_market", question: "Is your target market clearly defined and documented in the product governance framework?" },
    { id: "product_review", question: "When was the last annual product review completed and what were the findings?" },
    { id: "stress_testing", question: "Has the product been stress-tested against adverse scenarios relevant to your target market?" },
    { id: "distribution_alignment", question: "Is your distribution strategy aligned to the identified target market?" },
    { id: "vulnerable_customers", question: "How does the product design account for the needs of potentially vulnerable customers?" },
  ],
  price_value: [
    { id: "value_framework", question: "Describe your value assessment framework and how you determine fair value." },
    { id: "pricing_costs", question: "How do you ensure your pricing is proportionate to the overall benefits provided?" },
    { id: "vulnerable_pricing", question: "Have you assessed whether vulnerable customers receive fair value relative to other customer groups?" },
    { id: "cross_subsidy", question: "Have you completed a cross-subsidy analysis to identify any unfair cost transfers between customer segments?" },
    { id: "distributor_costs", question: "How are third-party distribution costs factored into your fair value assessments?" },
  ],
  consumer_understanding: [
    { id: "plain_language", question: "Describe your plain language communications policy and how compliance is monitored." },
    { id: "customer_testing", question: "Have key communications been tested with representative customers? What were the outcomes?" },
    { id: "digital_accessibility", question: "How do you ensure digital communications meet accessibility standards (WCAG 2.1 AA)?" },
    { id: "vulnerable_comms", question: "What specific adaptations are made to communications for potentially vulnerable customers?" },
    { id: "pre_contractual", question: "Describe your review process for pre-contractual information to ensure it supports informed decisions." },
  ],
  consumer_support: [
    { id: "complaint_handling", question: "Describe your complaints handling process and how it meets Consumer Duty expectations." },
    { id: "post_sale_support", question: "How do you assess the adequacy of post-sale support throughout the customer journey?" },
    { id: "vulnerable_support", question: "What is your framework for identifying and supporting potentially vulnerable customers?" },
    { id: "service_slas", question: "What are your customer service SLAs and how are these monitored and reported?" },
    { id: "escalation_process", question: "Describe your escalation process for complex or high-risk customer cases." },
  ],
};

type Step = "outcome" | "details" | "questionnaire" | "review";

export default function NewAssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("outcome");
  const [selectedOutcome, setSelectedOutcome] = useState<ConsumerDutyOutcome | null>(null);
  const [details, setDetails] = useState({
    title: "",
    productName: "",
    firmDescription: "",
    type: "annual_review",
    dueDate: "",
  });
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const steps: { id: Step; label: string }[] = [
    { id: "outcome", label: "Select outcome" },
    { id: "details", label: "Assessment details" },
    { id: "questionnaire", label: "Questionnaire" },
    { id: "review", label: "Review & submit" },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);
  const questions = selectedOutcome ? OUTCOME_QUESTIONS[selectedOutcome] : [];

  function canAdvance() {
    if (step === "outcome") return selectedOutcome !== null;
    if (step === "details") return details.title.length > 2 && details.productName.length > 1;
    if (step === "questionnaire") return questions.every((q) => responses[q.id]?.trim().length > 0);
    return true;
  }

  function advance() {
    const order: Step[] = ["outcome", "details", "questionnaire", "review"];
    const idx = order.indexOf(step);
    if (idx < order.length - 1) setStep(order[idx + 1]);
  }

  function back() {
    const order: Step[] = ["outcome", "details", "questionnaire", "review"];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1]);
    else router.push("/assessments");
  }

  async function handleSubmit() {
    setSubmitting(true);
    // In production: POST to /api/assessments, then POST to /api/ai/assess
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/assessments");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={back} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">New Assessment</h1>
          <p className="text-xs text-muted-foreground">Consumer Duty compliance assessment</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
              i < stepIndex ? "bg-success text-success-foreground" :
              i === stepIndex ? "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground"
            )}>
              {i < stepIndex ? "✓" : i + 1}
            </div>
            <span className={cn("text-xs hidden sm:block", i === stepIndex ? "text-foreground font-medium" : "text-muted-foreground")}>
              {s.label}
            </span>
            {i < steps.length - 1 && <div className={cn("h-px w-6 sm:w-12", i < stepIndex ? "bg-success" : "bg-border")} />}
          </div>
        ))}
      </div>

      {/* Step: Outcome selection */}
      {step === "outcome" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Select Consumer Duty Outcome</h2>
            <p className="text-sm text-muted-foreground">Which FCA PRIN 2A outcome are you assessing?</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {outcomes.map(({ id, icon: Icon, color, fcaRef }) => (
              <button
                key={id}
                onClick={() => setSelectedOutcome(id)}
                className={cn(
                  "group text-left rounded-xl border p-4 transition-all",
                  selectedOutcome === id
                    ? "border-primary bg-primary/5 shadow-glow-primary"
                    : "border-border hover:border-border/80 hover:bg-accent"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{OUTCOME_LABELS[id]}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{fcaRef}</p>
                  </div>
                  {selectedOutcome === id && (
                    <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Details */}
      {step === "details" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Assessment Details</h2>
            <p className="text-sm text-muted-foreground">Provide context for this assessment</p>
          </div>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="title">Assessment title</Label>
                <Input
                  id="title"
                  placeholder="e.g. ISA Product Range Annual Review 2026"
                  value={details.title}
                  onChange={(e) => setDetails((p) => ({ ...p, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product / service name</Label>
                  <Input
                    id="productName"
                    placeholder="e.g. Flexible Cash ISA"
                    value={details.productName}
                    onChange={(e) => setDetails((p) => ({ ...p, productName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Assessment type</Label>
                  <Select value={details.type} onValueChange={(v) => setDetails((p) => ({ ...p, type: v }))}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initial">Initial assessment</SelectItem>
                      <SelectItem value="annual_review">Annual review</SelectItem>
                      <SelectItem value="trigger_review">Trigger review</SelectItem>
                      <SelectItem value="thematic">Thematic review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="firmDescription">Firm / business area description</Label>
                <Textarea
                  id="firmDescription"
                  placeholder="Brief description of your firm, the business area, and the regulatory context…"
                  className="h-24"
                  value={details.firmDescription}
                  onChange={(e) => setDetails((p) => ({ ...p, firmDescription: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due date (optional)</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={details.dueDate}
                  onChange={(e) => setDetails((p) => ({ ...p, dueDate: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step: Questionnaire */}
      {step === "questionnaire" && selectedOutcome && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">
              {OUTCOME_LABELS[selectedOutcome]} — Questionnaire
            </h2>
            <p className="text-sm text-muted-foreground">
              Answer each question. Your responses will be analysed by AI to generate a compliance score and remediation plan.
            </p>
          </div>
          <div className="space-y-4">
            {questions.map((q, i) => (
              <Card key={q.id}>
                <CardContent className="space-y-3 pt-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <Label className="text-sm leading-relaxed">{q.question}</Label>
                  </div>
                  <Textarea
                    placeholder="Provide a detailed response…"
                    className="h-28 ml-9"
                    value={responses[q.id] ?? ""}
                    onChange={(e) => setResponses((p) => ({ ...p, [q.id]: e.target.value }))}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step: Review */}
      {step === "review" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Review & Submit</h2>
            <p className="text-sm text-muted-foreground">
              Review your assessment before AI analysis begins.
            </p>
          </div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Assessment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 text-sm">
                {[
                  { label: "Title", value: details.title },
                  { label: "Outcome", value: selectedOutcome ? OUTCOME_LABELS[selectedOutcome] : "" },
                  { label: "Product", value: details.productName },
                  { label: "Type", value: details.type.replace("_", " ") },
                  { label: "Questions answered", value: `${Object.keys(responses).length} / ${questions.length}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium capitalize">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex items-start gap-3 pt-5">
              <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">AI Analysis will run on submission</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Claude will analyse your responses against FCA Consumer Duty requirements (PS22/9),
                  generate a compliance score, identify gaps, and produce a prioritised remediation plan.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" onClick={back}>
          <ArrowLeft className="h-4 w-4" />
          {step === "outcome" ? "Cancel" : "Back"}
        </Button>
        {step === "review" ? (
          <Button onClick={handleSubmit} loading={submitting}>
            <Sparkles className="h-4 w-4" />
            Submit for AI analysis
          </Button>
        ) : (
          <Button onClick={advance} disabled={!canAdvance()}>
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
