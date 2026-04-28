import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft, ClipboardList, AlertTriangle, CheckCircle2, XCircle,
  Sparkles, Download, Clock, User, Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import { OUTCOME_LABELS, type ConsumerDutyOutcome } from "@/types";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Assessment Detail" };

// Demo data — replace with Supabase query by ID
const DEMO_ASSESSMENTS: Record<string, {
  id: string;
  title: string;
  outcome: ConsumerDutyOutcome;
  type: string;
  status: string;
  risk: string;
  score: number;
  dueDate: string;
  createdAt: string;
  assignee: string;
  product: string;
  summary: string;
  strengths: string[];
  gaps: { area: string; description: string; fcaRef: string; risk: string }[];
  actions: { id: string; title: string; priority: string; status: string; due: string }[];
  boardMI: string;
}> = {
  "1": {
    id: "1",
    title: "ISA Product Range Review",
    outcome: "products_services",
    type: "annual_review",
    status: "pending_review",
    risk: "medium",
    score: 82,
    dueDate: "2026-05-01",
    createdAt: "2026-04-01",
    assignee: "Sarah Chen",
    product: "Flexible Cash ISA",
    summary: "The Flexible Cash ISA demonstrates a broadly sound Consumer Duty posture for the Products & Services outcome. Target market documentation is comprehensive and the annual product review was completed on schedule. Key gaps relate to distribution strategy alignment and stress-testing methodology for adverse economic scenarios affecting vulnerable customer segments.",
    strengths: [
      "Target market clearly defined with documented evidence in product governance framework",
      "Annual product review completed on schedule with board-level sign-off",
      "Product design governance committee meets quarterly with documented minutes",
    ],
    gaps: [
      {
        area: "Distribution Strategy Alignment",
        description: "Current distribution channels include execution-only platforms which may not be fully aligned to the target market's advised customer profile.",
        fcaRef: "PRIN 2A.2.16",
        risk: "medium",
      },
      {
        area: "Stress Testing — Adverse Scenarios",
        description: "Stress testing has not yet incorporated rising interest rate scenarios and their impact on customer outcomes, particularly for vulnerable customers.",
        fcaRef: "PRIN 2A.2.20",
        risk: "medium",
      },
    ],
    actions: [
      { id: "a1", title: "Review and update distribution strategy to align to target market", priority: "high", status: "open", due: "2026-05-01" },
      { id: "a2", title: "Expand stress-testing to include rising interest rate and vulnerable customer scenarios", priority: "medium", status: "open", due: "2026-05-15" },
      { id: "a3", title: "Update product governance framework to document stress-test methodology", priority: "low", status: "open", due: "2026-06-01" },
    ],
    boardMI: "The Flexible Cash ISA achieved a Consumer Duty compliance score of 82% for the Products & Services outcome as at April 2026. The firm demonstrates a strong governance framework with completed annual reviews and documented target market analysis. Two medium-risk gaps have been identified relating to distribution strategy alignment and stress-testing methodology. A structured remediation plan with three time-bound actions has been agreed with the product governance committee. The Board should note that remediation is expected to be completed by June 2026, bringing the projected score to above 90%.",
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AssessmentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const assessment = DEMO_ASSESSMENTS[id];

  if (!assessment) notFound();

  const riskColors: Record<string, string> = {
    low: "text-success",
    medium: "text-warning",
    high: "text-destructive",
    critical: "text-destructive",
  };

  const priorityVariants: Record<string, "success" | "warning" | "destructive" | "muted"> = {
    low: "muted",
    medium: "warning",
    high: "destructive",
    critical: "destructive",
  };

  const statusVariants: Record<string, "muted" | "info" | "warning" | "success" | "destructive"> = {
    draft: "muted",
    in_progress: "info",
    pending_review: "warning",
    approved: "success",
    overdue: "destructive",
    open: "info",
    completed: "success",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 mt-0.5 shrink-0" asChild>
            <Link href="/assessments"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold tracking-tight">{assessment.title}</h1>
              <Badge variant={statusVariants[assessment.status]}>{assessment.status.replace("_", " ")}</Badge>
              <Badge variant={assessment.risk === "critical" || assessment.risk === "high" ? "destructive" : assessment.risk === "medium" ? "warning" : "success"}>
                {assessment.risk} risk
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ClipboardList className="h-3 w-3" />
                {OUTCOME_LABELS[assessment.outcome]}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {assessment.assignee}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Due {formatDate(assessment.dueDate)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Created {formatDate(assessment.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">Approve</Button>
        </div>
      </div>

      {/* Score summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="col-span-1">
          <CardContent className="flex flex-col items-center justify-center py-6 gap-3">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="32" fill="none"
                  stroke={assessment.score >= 80 ? "hsl(var(--success))" : assessment.score >= 60 ? "hsl(var(--warning))" : "hsl(var(--destructive))"}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${assessment.score * 2.011} 201.1`}
                />
              </svg>
              <span className={cn("absolute text-xl font-bold", riskColors[assessment.risk])}>
                {assessment.score}%
              </span>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold">Compliance Score</p>
              <p className="text-xs text-muted-foreground">{assessment.outcome.replace("_", " ")} outcome</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm">AI Executive Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{assessment.summary}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="findings">
        <TabsList>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="actions">Actions ({assessment.actions.length})</TabsTrigger>
          <TabsTrigger value="board-mi">Board MI</TabsTrigger>
        </TabsList>

        {/* Findings */}
        <TabsContent value="findings" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Strengths */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <CardTitle className="text-sm">Strengths ({assessment.strengths.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {assessment.strengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{s}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Gaps */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <CardTitle className="text-sm">Gaps ({assessment.gaps.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {assessment.gaps.map((gap, i) => (
                  <div key={i} className="space-y-1.5 rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{gap.area}</p>
                      <Badge variant={priorityVariants[gap.risk]}>{gap.risk}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{gap.description}</p>
                    <p className="text-xs text-primary font-mono">{gap.fcaRef}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Actions */}
        <TabsContent value="actions" className="mt-4">
          <Card>
            <CardContent className="space-y-3 pt-5">
              {assessment.actions.map((action) => (
                <div key={action.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{action.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={priorityVariants[action.priority]} className="text-xs">{action.priority}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />Due {formatDate(action.due)}
                      </span>
                    </div>
                  </div>
                  <Badge variant={statusVariants[action.status]}>{action.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Board MI */}
        <TabsContent value="board-mi" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Board Management Information</CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                  Copy to clipboard
                </Button>
              </div>
              <CardDescription className="text-xs">
                AI-drafted board-level narrative for your MI pack. Review and edit before use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-muted/20 p-5">
                <p className="text-sm leading-relaxed text-foreground">{assessment.boardMI}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
