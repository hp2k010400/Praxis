export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      price: "£599",
      period: "/mo",
      description: "For small firms managing their own Consumer Duty programme.",
      highlight: false,
      badge: null,
      cta: "Start free trial",
      ctaHref: "/signup",
      features: [
        "1 organisation",
        "Up to 3 users",
        "All 4 FCA outcome assessments",
        "AI-generated board report",
        "PDF export",
        "Evidence storage & version history",
        "Compliance score dashboard",
        "Email support",
      ],
    },
    {
      name: "Professional",
      price: "£1,499",
      period: "/mo",
      description: "For small compliance consultancies managing a handful of regulated clients.",
      highlight: false,
      badge: null,
      cta: "Start free trial",
      ctaHref: "/signup",
      features: [
        "Up to 3 organisations",
        "Up to 8 users",
        "Everything in Starter",
        "Action tracking & reminders",
        "Multi-firm compliance overview",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "£4,800",
      period: "/mo",
      description: "For compliance consultancies and large regulated firms managing multiple entities.",
      highlight: true,
      badge: "Best value",
      cta: "Talk to sales",
      ctaHref: "mailto:hello@praxis.so",
      features: [
        "Unlimited organisations",
        "Unlimited users",
        "White-label reports (your branding)",
        "Dedicated Customer Success Manager",
        "Multi-entity MI reporting",
        "Bespoke onboarding & training",
        "FCA submission assistance",
        "SLA guarantee",
        "Custom integrations",
        "SSO / SAML",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
            <span className="font-semibold text-white">Praxis</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="/pricing" className="text-sm text-white font-medium">Pricing</a>
            <a href="/docs" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
            <a href="/signin" className="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
            <a href="/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Get started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Simple, transparent pricing</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          No hidden fees. No per-assessment charges. Cancel anytime.
        </p>
      </div>

      {/* Tiers */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                tier.highlight
                  ? "border-indigo-500 bg-indigo-950/40 shadow-[0_0_40px_rgba(99,102,241,0.15)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">{tier.name}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-gray-400 text-sm ml-1">{tier.period}</span>
              </div>

              <a
                href={tier.ctaHref}
                className={`block text-center text-sm font-semibold py-3 rounded-xl mb-8 transition-colors ${
                  tier.highlight
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
              >
                {tier.cta}
              </a>

              <ul className="space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-12">
          All plans include a 14-day free trial. No credit card required.{" "}
          <a href="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Get started today.
          </a>
        </p>
      </div>
    </div>
  );
}
