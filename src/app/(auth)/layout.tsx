import { Shield } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-muted/20 border-r border-border p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">Praxis</span>
        </Link>

        <div className="space-y-6">
          <blockquote className="space-y-2">
            <p className="text-xl font-medium leading-relaxed text-foreground">
              &ldquo;Praxis gave our compliance team a single source of truth for Consumer Duty.
              We went from spreadsheets to a board-ready evidence pack in two weeks.&rdquo;
            </p>
            <footer className="text-sm text-muted-foreground">
              <strong className="text-foreground">Sarah Chen</strong> — Head of Compliance, Meridian Investments
            </footer>
          </blockquote>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">500+</p>
            <p>FCA firms</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">12k+</p>
            <p>Assessments</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">34%</p>
            <p>Avg. compliance lift</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">Praxis</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
