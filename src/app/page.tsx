import Link from "next/link";
import { ArrowRight, Shield, BarChart3, FileCheck, Users, Zap, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Four Outcome Framework",
    description:
      "Structured assessments across Products & Services, Price & Value, Consumer Understanding, and Consumer Support.",
  },
  {
    icon: BarChart3,
    title: "Real-time Compliance Scoring",
    description:
      "Dynamic dashboards showing your compliance posture with gap analysis and risk-rated action plans.",
  },
  {
    icon: Zap,
    title: "AI-Powered Analysis",
    description:
      "Claude-driven assessments surface vulnerabilities, suggest remediation steps, and draft board-ready MI reports.",
  },
  {
    icon: FileCheck,
    title: "Audit-Ready Evidence",
    description:
      "Structured evidence packs with version history, reviewer sign-off workflows, and FCA submission exports.",
  },
  {
    icon: Users,
    title: "Multi-Tenant & Role-Based",
    description:
      "Manage multiple legal entities under one org, with granular permissions across Compliance, Risk, and Business teams.",
  },
  {
    icon: CheckCircle,
    title: "Annual Review Automation",
    description:
      "Scheduled review prompts, deadline tracking, and automated reminders ensure no outcome cycle is missed.",
  },
];

const stats = [
  { label: "FCA-regulated firms", value: "500+" },
  { label: "Assessments completed", value: "12,000+" },
  { label: "Average compliance lift", value: "34%" },
  { label: "Audit findings prevented", value: "2,800+" },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Praxis</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
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
        {/* Hero */}
        <section className="container py-24 text-center md:py-32">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              FCA Consumer Duty — July 2023 deadline compliant
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              Consumer Duty compliance,{" "}
              <span className="text-primary">without the complexity</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground text-balance">
              Praxis gives FCA-regulated firms a structured, evidence-based platform to assess,
              monitor, and demonstrate Consumer Duty compliance across all four outcomes.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex h-11 items-center rounded-md border border-border px-6 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Mock dashboard preview */}
          <div className="mt-16 rounded-xl border border-border/50 bg-card shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-warning/60" />
              <div className="h-3 w-3 rounded-full bg-success/60" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">praxis.app/dashboard</span>
            </div>
            <div className="grid grid-cols-4 gap-4 p-6">
              {[
                { label: "Overall Score", value: "87%", color: "text-success" },
                { label: "Open Actions", value: "12", color: "text-warning" },
                { label: "Products Assessed", value: "24", color: "text-primary" },
                { label: "Evidence Items", value: "148", color: "text-info" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`mt-1 text-3xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border/50 bg-muted/20">
          <div className="container py-12">
            <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <dt className="text-sm text-muted-foreground">{s.label}</dt>
                  <dd className="mt-1 text-3xl font-bold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="container py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need for Consumer Duty
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built around the FCA&apos;s four outcome framework with workflow tooling your
              compliance team will actually use.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="gradient-border rounded-xl bg-card p-6 hover:bg-card/80 transition-colors"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
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
