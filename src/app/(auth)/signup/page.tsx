import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/forms/signup-form";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          14-day free trial. No credit card required.
        </p>
      </div>

      <SignupForm />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>

      <p className="text-center text-xs text-muted-foreground">
        By signing up you agree to our{" "}
        <Link href="#" className="underline underline-offset-2">Terms</Link>{" "}
        and{" "}
        <Link href="#" className="underline underline-offset-2">Privacy Policy</Link>.
      </p>
    </div>
  );
}
