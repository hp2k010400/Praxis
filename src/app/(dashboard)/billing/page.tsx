export default function BillingPage() {
  const plans = [
    {
      name: "Starter",
      description: "For small firms managing their own Consumer Duty programme.",
      price: "£599",
      period: "/mo",
      current: false,
      cta: "Upgrade to Starter",
      features: [
        "1 organisation",
        "Up to 3 users",
        "All 4 FCA outcome assessments",
        "AI-generated board report",
        "PDF export",
        "Evidence storage & version history",
        "Email support",
      ],
    },
    {
      name: "Professional",
      description: "For small compliance consultancies managing a handful of regulated clients.",
      price: "£1,499",
      period: "/mo",
      current: true,
      cta: "Current plan",
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
      description: "For compliance consultancies and large regulated firms managing multiple entities.",
      price: "£4,800",
      period: "/mo",
      current: false,
      cta: "Contact sales",
      features: [
        "Unlimited organisations",
        "Unlimited users",
        "White-label reports",
        "Dedicated Customer Success Manager",
        "Multi-entity MI reporting",
        "Bespoke onboarding & training",
        "FCA submission assistance",
        "SLA guarantee",
        "Custom integrations",
        "SSO / SAML",
      ],
    },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your subscription and billing information.</p>
      </div>

      {/* Current plan summary */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Current Plan</p>
            <h2 className="text-white font-semibold text-lg">Professional — billed monthly</h2>
            <p className="text-3xl font-bold text-white mt-2">£1,499 <span className="text-base font-normal text-gray-400">/month</span></p>
            <p className="text-gray-400 text-sm mt-2">Next billing: 25 May 2026 · Visa ending in 4242</p>
          </div>
          <span className="bg-green-500/10 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/20">
            Active
          </span>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg border border-white/10 transition-colors">
            Update payment method
          </button>
          <button className="text-red-400 hover:text-red-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Cancel subscription
          </button>
        </div>
      </div>

      {/* Plans */}
      <h2 className="text-white font-semibold text-lg mb-4">Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-6 flex flex-col ${
              plan.current
                ? "border-indigo-500 bg-indigo-950/30"
                : "border-white/10 bg-white/5"
            }`}
          >
            {plan.current && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Current plan
                </span>
              </div>
            )}
            <h3 className="text-white font-bold text-lg mb-1">{plan.name}</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">{plan.description}</p>
            <div className="mb-5">
              <span className="text-3xl font-bold text-white">{plan.price}</span>
              <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
            </div>
            <ul className="space-y-2 flex-1 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.current}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                plan.current
                  ? "bg-white/5 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
