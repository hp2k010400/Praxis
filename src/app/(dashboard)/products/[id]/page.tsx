import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Plus, Package, CheckCircle2, AlertCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { OUTCOME_LABELS, type ConsumerDutyOutcome } from "@/types";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Product Detail" };

const DEMO_PRODUCTS: Record<string, {
  id: string;
  name: string;
  type: string;
  targetMarket: string;
  status: string;
  description: string;
  distributionChannels: string[];
  scores: Record<ConsumerDutyOutcome, number>;
  lastReview: string;
  nextReview: string;
  openActions: number;
  assessments: { id: string; title: string; outcome: ConsumerDutyOutcome; status: string; score: number; date: string }[];
}> = {
  "1": {
    id: "1",
    name: "Flexible Cash ISA",
    type: "Savings",
    targetMarket: "Retail — General consumers",
    status: "active",
    description: "A flexible cash ISA allowing customers to deposit and withdraw funds while maintaining their annual ISA allowance. Targeted at retail customers seeking tax-efficient savings with access.",
    distributionChannels: ["Branch", "Online", "Mobile app"],
    scores: {
      products_services: 88,
      price_value: 75,
      consumer_understanding: 92,
      consumer_support: 80,
    },
    lastReview: "2026-03-15",
    nextReview: "2027-03-15",
    openActions: 2,
    assessments: [
      { id: "1", title: "ISA Product Range Annual Review", outcome: "products_services", status: "pending_review", score: 88, date: "2026-03-15" },
      { id: "5", title: "ISA Fee Fairness Assessment", outcome: "price_value", status: "in_progress", score: 75, date: "2026-04-01" },
      { id: "6", title: "ISA Customer Communications Review", outcome: "consumer_understanding", status: "approved", score: 92, date: "2026-02-20" },
      { id: "7", title: "ISA Customer Support Effectiveness", outcome: "consumer_support", status: "approved", score: 80, date: "2026-01-10" },
    ],
  },
};

function scoreColor(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 65) return "text-warning";
  return "text-destructive";
}

function progressBg(score: number) {
  if (score >= 80) return "bg-success";
  if (score >= 65) return "bg-warning";
  return "bg-destructive";
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = DEMO_PRODUCTS[id];

  if (!product) notFound();

  const overall = Math.round(
    Object.values(product.scores).reduce((a, b) => a + b, 0) / Object.values(product.scores).length
  );

  const statusVariants: Record<string, "success" | "warning" | "muted"> = {
    active: "success",
    under_review: "warning",
    withdrawn: "muted",
    discontinued: "muted",
  };

  const assessmentStatusVariants: Record<string, "muted" | "info" | "warning" | "success" | "destructive"> = {
    draft: "muted",
    in_progress: "info",
    pending_review: "warning",
    approved: "success",
    overdue: "destructive",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 mt-0.5 shrink-0" asChild>
            <Link href="/products"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">{product.name}</h1>
              <Badge variant={statusVariants[product.status]}>{product.status.replace("_", " ")}</Badge>
            </div>
            <p className="text-sm text-muted-foreground ml-12">
              {product.type} · {product.targetMarket}
            </p>
          </div>
        </div>
        <Button size="sm" asChild>
          <Link href="/assessments/new">
            <Plus className="h-4 w-4" />
            New assessment
          </Link>
        </Button>
      </div>

      {/* Score overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Overall Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle
                    cx="40" cy="40" r="32" fill="none"
                    stroke={overall >= 80 ? "hsl(var(--success))" : overall >= 65 ? "hsl(var(--warning))" : "hsl(var(--destructive))"}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${overall * 2.011} 201.1`}
                  />
                </svg>
                <span className={cn("absolute text-lg font-bold", scoreColor(overall))}>
                  {overall}%
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Consumer Duty score</p>
                <p className="text-xs text-muted-foreground">
                  {product.openActions === 0 ? "No open actions" : `${product.openActions} open action${product.openActions > 1 ? "s" : ""}`}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Next review: {formatDate(product.nextReview)}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2.5">
              {(Object.entries(product.scores) as [ConsumerDutyOutcome, number][]).map(([outcome, score]) => (
                <div key={outcome} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{OUTCOME_LABELS[outcome]}</span>
                    <span className={cn("font-medium tabular-nums", scoreColor(score))}>{score}%</span>
                  </div>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", progressBg(score))}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{product.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target market</span>
                <span className="font-medium">{product.targetMarket}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distribution</span>
                <span className="font-medium">{product.distributionChannels.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last review</span>
                <span className="font-medium">{formatDate(product.lastReview)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessments */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Assessments</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/assessments/new">
                <Plus className="h-4 w-4" />
                New
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {product.assessments.map((a) => (
            <Link
              key={a.id}
              href={`/assessments/${a.id}`}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-accent transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{a.title}</p>
                <p className="text-xs text-muted-foreground">{OUTCOME_LABELS[a.outcome]} · {formatDate(a.date)}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={cn("text-sm font-semibold tabular-nums", scoreColor(a.score))}>
                  {a.score}%
                </span>
                <Badge variant={assessmentStatusVariants[a.status]} className="text-xs">
                  {a.status.replace("_", " ")}
                </Badge>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
