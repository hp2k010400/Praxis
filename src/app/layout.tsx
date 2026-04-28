import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Praxis", template: "%s | Praxis" },
  description:
    "Consumer Duty compliance platform for FCA-regulated firms. Assess, monitor, and evidence compliance across all four consumer duty outcomes.",
  keywords: ["Consumer Duty", "FCA", "compliance", "regulatory", "financial services"],
  authors: [{ name: "Praxis" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    title: "Praxis — Consumer Duty Compliance",
    description: "Consumer Duty compliance platform for FCA-regulated firms.",
    siteName: "Praxis",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f1a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
