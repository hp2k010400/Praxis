import type { Metadata } from "next";
import { CreditCard, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PLANS } from "@/lib/stripe";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Billing" };

export default function BillingPage() {
  const currentPlan = "professional";

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Current Plan</CardTitle>
              <CardDescription>Professional — billed monthly</CardDescription>
            </div>
            <Badge variant="success" className="text-sm px-3 py-1">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">£799</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              Next billing: 25 May 2026
            </span>
            <span>·</span>
            <span>Visa ending in 4242</span>
          </div>
          <Separator />
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Update payment method</Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              Cancel subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plans comparison */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Plans</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(Object.entries(PLANS) as [string, typeof PLANS[keyof typeof PLANS]][]).map(([key, plan]) => {
            const isCurrent = key === currentPlan;
            return (
              <Card
                key={key}
                className={cn(
                  "relative",
                  isCurrent && "border-primary gradient-border"
                )}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Current plan</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-2">
                    {plan.price > 0 ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">£{plan.price}</span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold">Custom</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={isCurrent ? "secondary" : "outline"}
                    className="w-full"
                    disabled={isCurrent}
                  >
                    {isCurrent ? "Current plan" : key === "enterprise" ? "Contact sales" : `Upgrade to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Invoice history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { date: "25 Apr 2026", amount: "£799.00", status: "paid" },
              { date: "25 Mar 2026", amount: "£799.00", status: "paid" },
              { date: "25 Feb 2026", amount: "£799.00", status: "paid" },
              { date: "25 Jan 2026", amount: "£799.00", status: "paid" },
            ].map((invoice) => (
              <div key={invoice.date} className="flex items-center justify-between rounded-lg p-3 hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{invoice.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-sm">{invoice.amount}</span>
                  <Badge variant="success">{invoice.status}</Badge>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
