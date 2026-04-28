import type { Metadata } from "next";
import {
  ClipboardList,
  AlertTriangle,
  Package,
  FileText,
  TrendingUp,
  Clock,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ComplianceScoreCard } from "@/components/dashboard/compliance-score";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { ConsumerDutyOutcome } from "@/types";

export const metadata: Metadata = { title: "Dashboard" };

// Demo data — replace with real Supabase queries
const demoScore = {
  overall: 78,
  byOutcome: {
    products_services: 85,
    price_value: 72,
    consumer_understanding: 79,
    consumer_support: 76,
  } as Record<ConsumerDutyOutcome, number>,
};

const recentAssessments = [
  { id: "1", title: "ISA Product Range Review", outcome: "products_services", status: "pending_review", score: 82, date: "2026-04-20" },
  { id: "2", title: "Fee Fairness Assessment Q1", outcome: "price_value", status: "in_progress", score: 68, date: "2026-04-18" },
  { id: "3", title: "Customer Communication Review", outcome: "consumer_understanding", status: "approved", score: 91, date: "2026-04-15" },
  { id: "4", title: "Complaints Handling Review", outcome: "consumer_support", status: "overdue", score: 55, date: "2026-04-10" },
];

const openActions = [
  { id: "1", title: "Update product disclosure documents", priority: "high", due: "2026-05-01", assessment: "ISA Product Range Review" },
  { id: "2", title: "Review pricing methodology for vulnerable customers", priority: "critical", due: "2026-04-28", assessment: "Fee Fairness Assessment Q1" },
  { id: "3", title: "Implement plain English comms template", priority: "medium", due: "2026-05-15", assessment: "Customer Communication Review" },
];

const statusColors: Record<string, string> = {
  draft: "muted",
  in_progress: "info",
  pending_review: "warning",
  approved: "success",
  overdue: "destructive",
};

const priorityColors: Record<string, string> = {
  low: "muted",
  medium: "warning",
  high: "destructive",
  critical: "destructive",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Consumer Duty compliance overview — {formatDate(new Date())}
          </p>
        </div>
        <Button asChild>
          <Link href="/assessments/new">New Assessment</Link>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Overall Score"
          value="78%"
          change={{ value: 4, label: "vs last quarter" }}
          icon={TrendingUp}
          valueColor="text-warning"
        />
        <StatsCard
          title="Open Actions"
          value="14"
          change={{ value: -2, label: "vs last week" }}
          icon={AlertTriangle}
          iconColor="bg-destructive/10"
          valueColor="text-destructive"
        />
        <StatsCard
          title="Products Assessed"
          value="24"
          change={{ value: 3, label: "this quarter" }}
          icon={Package}
        />
        <StatsCard
          title="Evidence Items"
          value="148"
          change={{ value: 12, label: "this month" }}
          icon={FileText}
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Compliance score — spans 2 cols */}
        <ComplianceScoreCard overall={demoScore.overall} byOutcome={demoScore.byOutcome} />

        {/* Overdue actions */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Priority Actions</CardTitle>
              <Badge variant="destructive">{openActions.length} open</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {openActions.map((action) => (
              <div key={action.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                  <AlertTriangle className="h-3 w-3 text-destructive" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-sm font-medium leading-tight">{action.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{action.assessment}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={priorityColors[action.priority] as "destructive" | "warning" | "muted"}
                      className="text-xs"
                    >
                      {action.priority}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDate(action.due)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/assessments">View all actions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent assessments table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Assessments</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/assessments">View all</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {recentAssessments.map((a) => (
              <Link
                key={a.id}
                href={`/assessments/${a.id}`}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ClipboardList className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(a.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold tabular-nums">{a.score}%</span>
                  <Badge
                    variant={statusColors[a.status] as "muted" | "info" | "warning" | "success" | "destructive"}
                    className="text-xs"
                  >
                    {a.status.replace("_", " ")}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
