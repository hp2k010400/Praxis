import type { Metadata } from "next";
import { Package, DollarSign, BookOpen, HeadphonesIcon, ArrowRight, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ConsumerDutyOutcome } from "@/types";

export const metadata: Metadata = { title: "Outcomes" };

const outcomes = [
  {
    id: "products_services" as ConsumerDutyOutcome,
    title: "Products & Services",
    subtitle: "PRIN 2A.2",
    icon: Package,
    iconColor: "bg-primary/10 text-primary",
    score: 85,
    description:
      "Products and services must be designed to meet the needs, characteristics, and objectives of the target market. Manufacturers must conduct regular product reviews.",
    keyRequirements: [
      { text: "Target market defined and documented", status: "pass" },
      { text: "Product design governance in place", status: "pass" },
      { text: "Stress-testing against adverse scenarios", status: "warning" },
      { text: "Annual product review completed", status: "pass" },
      { text: "Distribution strategy aligned to target market", status: "warning" },
    ],
    openActions: 2,
    assessments: 8,
    lastUpdated: "2026-04-20",
  },
  {
    id: "price_value" as ConsumerDutyOutcome,
    title: "Price & Value",
    subtitle: "PRIN 2A.3",
    icon: DollarSign,
    iconColor: "bg-info/10 text-info",
    score: 72,
    description:
      "The price of a product or service must be reasonable given the overall benefits. Firms must assess whether retail customers are receiving fair value.",
    keyRequirements: [
      { text: "Value assessment framework documented", status: "warning" },
      { text: "Pricing strategy reviewed against costs", status: "pass" },
      { text: "Vulnerable customer pricing review", status: "fail" },
      { text: "Cross-subsidy analysis completed", status: "warning" },
      { text: "Third-party distribution costs assessed", status: "pass" },
    ],
    openActions: 5,
    assessments: 6,
    lastUpdated: "2026-04-15",
  },
  {
    id: "consumer_understanding" as ConsumerDutyOutcome,
    title: "Consumer Understanding",
    subtitle: "PRIN 2A.4",
    icon: BookOpen,
    iconColor: "bg-warning/10 text-warning",
    score: 79,
    description:
      "Communications must be clear, fair, and not misleading. They must support consumers in making informed decisions, with particular care for vulnerable customers.",
    keyRequirements: [
      { text: "Plain language communications policy", status: "pass" },
      { text: "Customer testing of key documents", status: "pass" },
      { text: "Digital accessibility compliance", status: "warning" },
      { text: "Vulnerable customer communications review", status: "pass" },
      { text: "Pre-contractual information reviewed", status: "fail" },
    ],
    openActions: 3,
    assessments: 7,
    lastUpdated: "2026-04-18",
  },
  {
    id: "consumer_support" as ConsumerDutyOutcome,
    title: "Consumer Support",
    subtitle: "PRIN 2A.5",
    icon: HeadphonesIcon,
    iconColor: "bg-success/10 text-success",
    score: 76,
    description:
      "Firms must provide consumers with support that meets their needs throughout their customer journey, including vulnerable customers requiring additional support.",
    keyRequirements: [
      { text: "Complaint handling process reviewed", status: "pass" },
      { text: "Post-sale support adequacy assessed", status: "pass" },
      { text: "Vulnerable customer support framework", status: "warning" },
      { text: "Customer service SLAs documented", status: "pass" },
      { text: "Escalation process for complex cases", status: "warning" },
    ],
    openActions: 4,
    assessments: 5,
    lastUpdated: "2026-04-12",
  },
];

function scoreColor(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 65) return "text-warning";
  return "text-destructive";
}

function scoreRingDash(score: number) {
  return `${score * 2.199} 219.9`;
}

const statusIcon = {
  pass: <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />,
  warning: <AlertCircle className="h-3.5 w-3.5 text-warning shrink-0" />,
  fail: <XCircle className="h-3.5 w-3.5 text-destructive shrink-0" />,
};

export default function OutcomesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Consumer Duty Outcomes</h1>
        <p className="text-sm text-muted-foreground">
          FCA PRIN 2A framework — four outcome compliance status
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {outcomes.map((outcome) => (
          <Card key={outcome.id} className="gradient-border">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                {/* Score ring */}
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                  <svg className="h-16 w-16 -rotate-90" viewBox="0 0 70 70">
                    <circle cx="35" cy="35" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="7" />
                    <circle
                      cx="35"
                      cy="35"
                      r="28"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={scoreRingDash(outcome.score)}
                      className="transition-all duration-700"
                    />
                  </svg>
                  <span className={cn("absolute text-sm font-bold", scoreColor(outcome.score))}>
                    {outcome.score}%
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={cn("flex h-7 w-7 items-center justify-center rounded-md", outcome.iconColor)}>
                      <outcome.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{outcome.title}</CardTitle>
                      <CardDescription className="text-xs">{outcome.subtitle}</CardDescription>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {outcome.description}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Key requirements */}
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Key Requirements
                </p>
                <div className="space-y-1.5">
                  {outcome.keyRequirements.map((req) => (
                    <div key={req.text} className="flex items-center gap-2">
                      {statusIcon[req.status as keyof typeof statusIcon]}
                      <span className="text-xs text-muted-foreground">{req.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>
                    <strong className="text-foreground">{outcome.openActions}</strong> open actions
                  </span>
                  <span>
                    <strong className="text-foreground">{outcome.assessments}</strong> assessments
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" asChild>
                  <Link href={`/assessments?outcome=${outcome.id}`}>
                    View <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
