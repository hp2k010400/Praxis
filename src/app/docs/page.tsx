// src/app/docs/page.tsx

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
            Documentation
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Getting started with Praxis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Everything you need to produce your Consumer Duty annual board report — from your first assessment to a board-ready document.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 flex gap-12">
        {/* Sidebar nav */}
        <aside className="hidden lg:block w-56 shrink-0">
          <nav className="sticky top-8 space-y-1">
            {[
              { label: "Overview", href: "#overview" },
              { label: "Consumer Duty basics", href: "#consumer-duty" },
              { label: "Quick start", href: "#quick-start" },
              { label: "Running an assessment", href: "#assessment" },
              { label: "Your board report", href: "#report" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-sm text-gray-500 hover:text-gray-900 py-1.5 border-l-2 border-transparent hover:border-indigo-500 pl-3 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-16">

          {/* Overview */}
          <section id="overview">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Praxis automates the most time-consuming part of Consumer Duty compliance: producing a structured, evidenced annual board report that satisfies FCA expectations under PRIN 2A.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You answer questions about your firm's practices across the four Consumer Duty outcomes. Praxis analyses your answers, scores your compliance position, identifies gaps, and generates an executive-quality narrative — ready to present to your board.
            </p>
          </section>

          {/* Consumer Duty basics */}
          <section id="consumer-duty">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Consumer Duty basics</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The FCA's Consumer Duty (PS22/9) came into force in July 2023. It requires all FCA-regulated firms to demonstrate that they deliver good outcomes for retail customers across four outcome areas, and to review and report on this annually to their board.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Products & Services",
                  desc: "Products are designed to meet the needs of the target market and do not cause foreseeable harm.",
                  color: "bg-blue-50 border-blue-200",
                  dot: "bg-blue-500",
                },
                {
                  title: "Price & Value",
                  desc: "Customers receive fair value — the price paid is reasonable relative to the benefit received.",
                  color: "bg-green-50 border-green-200",
                  dot: "bg-green-500",
                },
                {
                  title: "Consumer Understanding",
                  desc: "Communications are clear, timely, and help customers make informed decisions.",
                  color: "bg-purple-50 border-purple-200",
                  dot: "bg-purple-500",
                },
                {
                  title: "Consumer Support",
                  desc: "Customers receive support that meets their needs throughout the product lifecycle.",
                  color: "bg-orange-50 border-orange-200",
                  dot: "bg-orange-500",
                },
              ].map((outcome) => (
                <div key={outcome.title} className={`rounded-xl border p-5 ${outcome.color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${outcome.dot}`} />
                    <h3 className="font-semibold text-gray-900 text-sm">{outcome.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{outcome.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-semibold text-amber-900 text-sm mb-1">Annual board report requirement</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                Under PRIN 2A.10, firms must produce and review an annual Consumer Duty board report at least once per year. The board must review and approve it. The FCA expects this to be a substantive document — not a tick-box exercise.
              </p>
            </div>
          </section>

          {/* Quick start */}
          <section id="quick-start">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick start</h2>
            <ol className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Create your account",
                  desc: "Sign up at praxis.so and create your organisation. Invite colleagues if needed — all team members share the same compliance workspace.",
                },
                {
                  step: "2",
                  title: "Add your products",
                  desc: "Register the financial products or services your firm offers. Praxis uses this to scope assessments correctly to your business.",
                },
                {
                  step: "3",
                  title: "Run your first assessment",
                  desc: "Step through the four Consumer Duty outcomes. Answer questions honestly — the more detail you provide, the better the AI-generated narrative.",
                },
                {
                  step: "4",
                  title: "Review and export",
                  desc: "Praxis generates your board report. Review the executive summary, address any flagged gaps, then export to PDF for your board pack.",
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-5">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Assessment */}
          <section id="assessment">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Running an assessment</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Each assessment covers all four Consumer Duty outcomes in a structured questionnaire. Praxis scores each outcome from 0–100 and calculates an overall compliance score.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Be specific",
                  desc: "Vague answers produce vague narratives. Where possible, include figures, dates, and process names. E.g. \"We reviewed pricing quarterly using our fair value framework last updated March 2025\" is far more useful than \"We review pricing regularly.\"",
                },
                {
                  title: "Upload evidence",
                  desc: "Attach MI reports, board minutes, complaints data, or policy documents as supporting evidence. These are referenced in the generated report to substantiate your position.",
                },
                {
                  title: "Save as you go",
                  desc: "Assessments auto-save. You can start, save, and return across multiple sessions — no need to complete in one sitting.",
                },
                {
                  title: "Re-run assessments",
                  desc: "You can run multiple assessments over the year to track your compliance position as it improves. Praxis keeps a history so you can demonstrate progress.",
                },
              ].map((tip) => (
                <div key={tip.title} className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Report */}
          <section id="report">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your board report</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Once an assessment is complete, Praxis generates a full board report containing:
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Executive summary — a plain-English narrative of your Consumer Duty position",
                "Outcome-by-outcome analysis — scored breakdown with strengths and gaps identified",
                "Priority actions — ranked list of remediation steps with regulatory context",
                "PRIN 2A references — specific rule citations to demonstrate regulatory awareness",
                "Evidence log — record of supporting documents uploaded during the assessment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-indigo-500 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed">
              Reports export as a formatted PDF suitable for direct inclusion in your board pack. The report is dated and version-stamped so you have a clear audit trail.
            </p>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Does Praxis replace our compliance officer?",
                  a: "No. Praxis is a tool that structures and accelerates the work your compliance function already needs to do. It doesn't provide regulated advice. You remain responsible for the accuracy of the information you submit and the contents of your board report.",
                },
                {
                  q: "How does the AI generate the narrative?",
                  a: "Praxis uses Claude (Anthropic's AI) to analyse your assessment answers in the context of PRIN 2A and the FCA's Consumer Duty guidance. It produces structured prose that reflects your specific circumstances — it's not a generic template.",
                },
                {
                  q: "Is our data secure?",
                  a: "Yes. All data is encrypted in transit and at rest. Each firm's data is strictly isolated — no other firm can see your assessments, reports, or evidence. We do not use your data to train AI models.",
                },
                {
                  q: "What types of firms does Praxis support?",
                  a: "Any FCA-regulated firm with retail customers in scope of Consumer Duty — IFAs, mortgage brokers, insurance brokers, wealth managers, and consumer credit firms. If you're unsure whether Consumer Duty applies to you, the FCA's guidance at PS22/9 is the definitive source.",
                },
                {
                  q: "How long does an assessment take?",
                  a: "Most firms complete their first full assessment in 60–90 minutes. Subsequent annual assessments are faster because you can build on the previous year's answers.",
                },
                {
                  q: "Can multiple people collaborate on an assessment?",
                  a: "Yes. You can invite team members to your organisation. Multiple users can contribute to the same workspace, which is useful if different colleagues own different outcome areas.",
                },
              ].map((item) => (
                <div key={item.q} className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to get started?</h2>
            <p className="text-gray-600 text-sm mb-6">
              Your first board report is a few assessments away.
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href="/signup"
                className="bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start free trial
              </a>
              <a
                href="/pricing"
                className="bg-white text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                View pricing
              </a>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
