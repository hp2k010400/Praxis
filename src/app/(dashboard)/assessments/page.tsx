import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Search, Filter, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { OUTCOME_LABELS } from "@/types";
import type { ConsumerDutyOutcome } from "@/types";

export const metadata: Metadata = { title: "Assessments" };

const assessments = [
  { id: "1", title: "ISA Product Range Review", outcome: "products_services" as ConsumerDutyOutcome, type: "annual_review", status: "pending_review", risk: "medium", score: 82, dueDate: "2026-05-01", assignee: "Sarah Chen" },
  { id: "2", title: "Fee Fairness Assessment Q1 2026", outcome: "price_value" as ConsumerDutyOutcome, type: "thematic", status: "in_progress", risk: "high", score: 68, dueDate: "2026-04-28", assignee: "James Park" },
  { id: "3", title: "Customer Communication Review", outcome: "consumer_understanding" as ConsumerDutyOutcome, type: "annual_review", status: "approved", risk: "low", score: 91, dueDate: "2026-04-15", assignee: "Sarah Chen" },
  { id: "4", title: "Complaints Handling Effectiveness", outcome: "consumer_support" as ConsumerDutyOutcome, type: "trigger_review", status: "overdue", risk: "critical", score: 55, dueDate: "2026-04-10", assignee: "Maria Lopez" },
  { id: "5", title: "Mortgage Product Suitability", outcome: "products_services" as ConsumerDutyOutcome, type: "initial", status: "draft", risk: "medium", score: null, dueDate: "2026-06-01", assignee: "James Park" },
  { id: "6", title: "Vulnerable Customer Pricing Review", outcome: "price_value" as ConsumerDutyOutcome, type: "thematic", status: "in_progress", risk: "high", score: 61, dueDate: "2026-05-15", assignee: "Maria Lopez" },
];

const statusVariants: Record<string, string> = {
  draft: "muted",
  in_progress: "info",
  pending_review: "warning",
  approved: "success",
  overdue: "destructive",
};

const riskVariants: Record<string, string> = {
  low: "success",
  medium: "warning",
  high: "destructive",
  critical: "destructive",
};

export default function AssessmentsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>
          <p className="text-sm text-muted-foreground">
            Manage Consumer Duty assessments across all four outcomes
          </p>
        </div>
        <Button asChild>
          <Link href="/assessments/new">
            <Plus className="h-4 w-4" />
            New Assessment
          </Link>
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: assessments.length, color: "text-foreground" },
          { label: "In Progress", value: assessments.filter(a => a.status === "in_progress").length, color: "text-info" },
          { label: "Pending Review", value: assessments.filter(a => a.status === "pending_review").length, color: "text-warning" },
          { label: "Overdue", value: assessments.filter(a => a.status === "overdue").length, color: "text-destructive" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search assessments…" className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All outcomes</SelectItem>
                  <SelectItem value="products_services">Products & Services</SelectItem>
                  <SelectItem value="price_value">Price & Value</SelectItem>
                  <SelectItem value="consumer_understanding">Consumer Understanding</SelectItem>
                  <SelectItem value="consumer_support">Consumer Support</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead>Due date</TableHead>
                <TableHead>Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <Link
                      href={`/assessments/${a.id}`}
                      className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
                    >
                      <ClipboardList className="h-4 w-4 text-muted-foreground shrink-0" />
                      {a.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {OUTCOME_LABELS[a.outcome]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground capitalize">
                      {a.type.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[a.status] as "muted" | "info" | "warning" | "success" | "destructive"}>
                      {a.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={riskVariants[a.risk] as "success" | "warning" | "destructive"}>
                      {a.risk}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">
                    {a.score !== null ? `${a.score}%` : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(a.dueDate)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {a.assignee}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
