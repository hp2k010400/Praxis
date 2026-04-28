import Link from "next/link";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "£4,800",
    period: "per year",
    description: "For smaller firms getting their Consumer Duty programme in order.",
    features: [
      "Up to 3 users",
      "All four FCA outcome frameworks",
      "AI-powered assessments",
      "Evidence storage & version history",
      "Compliance score dashboard",
      "Email support",
    ],
    cta: "Start free trial",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "£5,000",
    period: "per month",
    description: "For established firms managing complex, multi-entity compliance programmes.",
    features: [
      "Unlimited users",
      "Multi-entity & multi-tenant management",
      "Role-based access (Compliance, Risk, Business)",
      "Board-ready MI report generation",
      "FCA submission exports",
      "Annual review automation",
      "Audit-ready evidence packs",
      "Dedicated success manager",
      "Priority support",
    ],
    cta: "Talk to sales",
    href: "/signup",
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Praxis</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/pricing" className="text-foreground font-medium transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-24 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that fits your firm. No hidden fees, no per-assessment charges.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 mx-auto max-w-4xl">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-8 text-left ${
                  tier.highlighted
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border bg-card"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most popular
                    </span>
                  </div>
                )}

                <h2 className="text-xl font-semibold">{tier.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                </div>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md h-10 text-sm font-medium transition-colors ${
                    tier.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {tier.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Get started today.
            </Link>
          </p>
        </section>
      </main>

      <footer className="border-t border-border/50 py-8">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Praxis &copy; {new Date().getFullYear()}</span>
          </div>
          <p>Designed for FCA-regulated firms. Not FCA advice.</p>
        </div>
      </footer>
    </div>
  );
}
