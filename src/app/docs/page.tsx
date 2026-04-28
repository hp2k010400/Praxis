import Link from "next/link";
import { Shield, BookOpen, ArrowRight } from "lucide-react";

export default function DocsPage() {
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
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/docs" className="text-foreground font-medium transition-colors">Docs</Link>
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

      <main className="flex-1 container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Full documentation is on its way. In the meantime, our team is happy to walk you through
            the platform directly.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center rounded-md border border-border px-5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
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
