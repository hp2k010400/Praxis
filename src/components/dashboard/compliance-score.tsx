"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { OUTCOME_LABELS, type ConsumerDutyOutcome } from "@/types";
import { scoreColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ComplianceScoreCardProps {
  overall: number;
  byOutcome: Record<ConsumerDutyOutcome, number>;
}

const outcomeColors: Record<ConsumerDutyOutcome, string> = {
  products_services: "bg-primary",
  price_value: "bg-info",
  consumer_understanding: "bg-warning",
  consumer_support: "bg-success",
};

export function ComplianceScoreCard({ overall, byOutcome }: ComplianceScoreCardProps) {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Compliance Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Overall ring */}
        <div className="flex items-center gap-6">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${overall * 2.513} 251.3`}
                className="transition-all duration-700"
              />
            </svg>
            <span className={cn("absolute text-2xl font-bold", scoreColor(overall))}>
              {overall}%
            </span>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-foreground">Overall Consumer Duty Score</p>
            <p className="text-sm text-muted-foreground">
              {overall >= 80
                ? "Strong compliance posture. Continue monitoring."
                : overall >= 60
                ? "Moderate gaps identified. Review open actions."
                : "Significant gaps. Immediate remediation required."}
            </p>
          </div>
        </div>

        {/* By outcome */}
        <div className="space-y-3">
          {(Object.entries(byOutcome) as [ConsumerDutyOutcome, number][]).map(([outcome, score]) => (
            <div key={outcome} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{OUTCOME_LABELS[outcome]}</span>
                <span className={cn("font-medium tabular-nums", scoreColor(score))}>{score}%</span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", outcomeColors[outcome])}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
