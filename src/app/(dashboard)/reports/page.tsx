import type { Metadata } from "next";
import { FileBarChart2, Download, Sparkles, Clock, FileText, PresentationIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Reports" };

const reports = [
  {
    id: "1",
    title: "Q1 2026 Board MI Pack",
    type: "board_mi",
    period: "Q1 2026",
    status: "completed",
    generatedAt: "2026-04-10",
    pages: 12,
    aiGenerated: true,
  },
  {
    id: "2",
    title: "Annual Consumer Duty Report 2025",
    type: "annual",
    period: "2025",
    status: "completed",
    generatedAt: "2026-01-15",
    pages: 34,
    aiGenerated: true,
  },
  {
    id: "3",
    title: "Thematic Review — Vulnerable Customers",
    type: "thematic",
    period: "H2 2025",
    status: "completed",
    generatedAt: "2025-12-20",
    pages: 18,
    aiGenerated: false,
  },
  {
    id: "4",
    title: "Q2 2026 Board MI Pack",
    type: "board_mi",
    period: "Q2 2026",
    status: "draft",
    generatedAt: "2026-04-20",
    pages: 0,
    aiGenerated: true,
  },
];

const typeIcons: Record<string, React.ElementType> = {
  board_mi: PresentationIcon,
  annual: FileBarChart2,
  thematic: FileText,
};

const typeLabels: Record<string, string> = {
  board_mi: "Board MI",
  annual: "Annual Report",
  thematic: "Thematic",
};

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground">
            Generate board MI packs and FCA-ready compliance reports
          </p>
        </div>
        <Button>
          <Sparkles className="h-4 w-4" />
          Generate AI Report
        </Button>
      </div>

      {/* Generate new report cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Board MI Pack",
            description: "AI-drafted board management information pack covering all four Consumer Duty outcomes",
            icon: PresentationIcon,
            color: "bg-primary/10 text-primary",
          },
          {
            title: "Annual Outcome Report",
            description: "Comprehensive annual review documenting compliance evidence and continuous improvement",
            icon: FileBarChart2,
            color: "bg-info/10 text-info",
          },
          {
            title: "Thematic Deep Dive",
            description: "Focused report on a specific outcome or product, with gap analysis and action plan",
            icon: FileText,
            color: "bg-warning/10 text-warning",
          },
        ].map((t) => (
          <Card key={t.title} className="cursor-pointer hover:bg-card/80 transition-colors gradient-border">
            <CardHeader className="pb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${t.color} mb-2`}>
                <t.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-sm">{t.title}</CardTitle>
              <CardDescription className="text-xs">{t.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                <Sparkles className="h-3.5 w-3.5" />
                Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Report History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {reports.map((report) => {
            const Icon = typeIcons[report.type] ?? FileText;
            return (
              <div
                key={report.id}
                className="flex items-center gap-4 rounded-lg border border-border p-4 hover:bg-accent transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{report.title}</p>
                    {report.aiGenerated && (
                      <Badge variant="default" className="text-xs shrink-0">
                        <Sparkles className="h-2.5 w-2.5 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <Badge variant="muted" className="text-xs">{typeLabels[report.type]}</Badge>
                    <span>{report.period}</span>
                    {report.pages > 0 && <span>{report.pages} pages</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(report.generatedAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={report.status === "completed" ? "success" : "warning"}>
                    {report.status}
                  </Badge>
                  {report.status === "completed" && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
