import { Zap, AlertTriangle, TrendingDown, Flame } from 'lucide-react';

const steps = [
  {
    icon: Zap,
    tag: 'The Catalyst',
    title: 'New FinTech Adoption',
    desc: 'Rapid deployment of new financial technologies—digital banking platforms, AI-driven credit scoring, automated compliance tools—without a parallel workforce readiness strategy.',
    iconBg: 'bg-blue-950/60',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-800/50',
    tagBg: 'text-blue-400 bg-blue-950/40',
    number: '01',
  },
  {
    icon: AlertTriangle,
    tag: 'The Gap',
    title: 'No Upskilling Roadmap',
    desc: 'Employees feel incompetent with new tools. Without structured training, confidence erodes and the skills gap between workforce capability and technology requirements widens.',
    iconBg: 'bg-amber-950/60',
    iconColor: 'text-amber-400',
    borderColor: 'border-amber-800/50',
    tagBg: 'text-amber-400 bg-amber-950/40',
    number: '02',
  },
  {
    icon: TrendingDown,
    tag: 'The Result',
    title: '60% Engagement Collapse',
    desc: 'Employee engagement drops to a critical 60% as workers feel left behind. Disengagement cascades into missed performance targets, increasing pressure across all levels.',
    iconBg: 'bg-orange-950/60',
    iconColor: 'text-orange-400',
    borderColor: 'border-orange-800/50',
    tagBg: 'text-orange-400 bg-orange-950/40',
    number: '03',
  },
  {
    icon: Flame,
    tag: 'The Crisis',
    title: '20% Manager Churn',
    desc: 'Mid-level managers bear the full weight of implementation stress—accountable for results but lacking resources. This drives a devastating 20% churn rate in the organization\'s most critical layer. Assuming ~500 mid-level managers, this equals 100 departures per year.',
    iconBg: 'bg-rose-950/60',
    iconColor: 'text-rose-400',
    borderColor: 'border-rose-800/50',
    tagBg: 'text-rose-400 bg-rose-950/40',
    number: '04',
  },
];

export default function RootCause() {
  return (
    <section id="root-cause" className="py-14 px-4 relative">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
          <div className="text-center mb-10">
          <span className="text-rose-400 text-xs font-semibold tracking-widest uppercase">
            Root Cause Analysis
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4">
            The Root Cause
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A{' '}
            <span className="text-rose-400 font-semibold">domino effect</span> triggered by a
            single strategic gap: the absence of a workforce upskilling plan during technology
            adoption.
          </p>
        </div>

        {/* Flowchart */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex flex-col lg:flex-row items-center flex-1 min-w-0"
              >
                {/* Card */}
                <div
                  className={`flex-1 w-full bg-[#3a3a3a] border ${step.borderColor} rounded-2xl p-6 flex flex-col gap-3 h-full`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`${step.iconBg} rounded-xl p-2.5`}>
                      <Icon size={20} className={step.iconColor} />
                    </div>
                    <span className="text-slate-700 text-2xl font-black">{step.number}</span>
                  </div>
                  <span
                    className={`inline-block ${step.tagBg} text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit`}
                  >
                    {step.tag}
                  </span>
                  <h3 className="text-white font-bold text-base leading-tight">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div className="flex-shrink-0 flex items-center justify-center py-3 lg:py-0 px-0 lg:px-3">
                    {/* Desktop: → */}
                    <svg
                      className="hidden lg:block w-10 h-6 text-slate-600"
                      viewBox="0 0 40 24"
                      fill="none"
                    >
                      <path
                        d="M0 12 H32 M26 5 L40 12 L26 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Mobile: ↓ */}
                    <svg
                      className="lg:hidden w-6 h-10 text-slate-600"
                      viewBox="0 0 24 40"
                      fill="none"
                    >
                      <path
                        d="M12 0 V32 M5 26 L12 40 L19 26"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Insight banner */}
        <div className="mt-10 bg-rose-950/20 border border-rose-800/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 bg-rose-950/50 rounded-xl p-3">
            <Flame size={22} className="text-rose-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-1">Core Insight</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Technology alone cannot drive transformation; people capability must evolve in
              parallel with the tools they are expected to use. The absence of a structured
              upskilling roadmap created a compounding crisis that is now costing the organization
              its most experienced talent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
