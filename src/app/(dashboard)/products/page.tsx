import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Package, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { OUTCOME_LABELS } from "@/types";
import type { ConsumerDutyOutcome } from "@/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Products" };

const products = [
  {
    id: "1",
    name: "Flexible Cash ISA",
    type: "Savings",
    targetMarket: "Retail — General",
    status: "active",
    scores: { products_services: 88, price_value: 75, consumer_understanding: 92, consumer_support: 80 },
    lastReview: "2026-03-15",
    nextReview: "2027-03-15",
    openActions: 2,
  },
  {
    id: "2",
    name: "First-Time Buyer Mortgage",
    type: "Mortgage",
    targetMarket: "Retail — First-time buyers",
    status: "active",
    scores: { products_services: 72, price_value: 65, consumer_understanding: 78, consumer_support: 74 },
    lastReview: "2025-11-01",
    nextReview: "2026-11-01",
    openActions: 5,
  },
  {
    id: "3",
    name: "Stocks & Shares ISA",
    type: "Investment",
    targetMarket: "Retail — Advised",
    status: "under_review",
    scores: { products_services: 61, price_value: 58, consumer_understanding: 67, consumer_support: 70 },
    lastReview: "2025-08-20",
    nextReview: "2026-08-20",
    openActions: 8,
  },
  {
    id: "4",
    name: "Business Current Account",
    type: "Banking",
    targetMarket: "SME",
    status: "active",
    scores: { products_services: 91, price_value: 88, consumer_understanding: 85, consumer_support: 90 },
    lastReview: "2026-01-10",
    nextReview: "2027-01-10",
    openActions: 0,
  },
];

function overallScore(scores: Record<ConsumerDutyOutcome, number>) {
  const vals = Object.values(scores);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function scoreColor(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 65) return "text-warning";
  return "text-destructive";
}

function progressColor(score: number) {
  if (score >= 80) return "bg-success";
  if (score >= 65) return "bg-warning";
  return "bg-destructive";
}

const statusVariants: Record<string, "success" | "warning" | "muted"> = {
  active: "success",
  under_review: "warning",
  withdrawn: "muted",
  discontinued: "muted",
};

export default function ProductsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">
            Consumer Duty assessment scores across your product range
          </p>
        </div>
        <Button asChild>
          <Link href="/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {products.map((product) => {
          const overall = overallScore(product.scores as Record<ConsumerDutyOutcome, number>);
          return (
            <Card key={product.id} className="gradient-border hover:bg-card/80 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
                          {product.name}
                        </Link>
                      </CardTitle>
                      <CardDescription>{product.type} · {product.targetMarket}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn("text-2xl font-bold tabular-nums", scoreColor(overall))}>
                      {overall}%
                    </span>
                    <Badge variant={statusVariants[product.status]}>
                      {product.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {(Object.entries(product.scores) as [ConsumerDutyOutcome, number][]).map(([outcome, score]) => (
                  <div key={outcome} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{OUTCOME_LABELS[outcome]}</span>
                      <span className={cn("font-medium tabular-nums", scoreColor(score))}>{score}%</span>
                    </div>
                    <div className="relative h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", progressColor(score))}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {product.openActions === 0
                      ? "No open actions"
                      : `${product.openActions} open action${product.openActions > 1 ? "s" : ""}`}
                  </span>
                  <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
                    <Link href={`/products/${product.id}`}>View details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
