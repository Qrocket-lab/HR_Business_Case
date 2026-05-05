import { GraduationCap, Brain, ShieldCheck, CheckCircle } from 'lucide-react';

const pillars = [
  {
    num: '01',
    Icon: GraduationCap,
    tag: 'Solution Pillar 1',
    title: 'Fintech Upskilling Pipeline',
    budget: 'IDR 900 Million',
    budgetPct: '45%',
    strategy:
      'Implement a 6-month intensive training program for the top 20% of "high-readiness" employees, creating a certified talent vanguard to lead the digital transition.',
    actions: [
      'Partner with leading digital bootcamps for fintech certifications',
      'Focus on modern financial systems, digital banking & compliance tools',
      'Target the top 20% of high-readiness employees in Cohort 1',
      'Phased rollout to all 5,000 employees over 18 months',
    ],
    iconBg: 'bg-emerald-950/60',
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-800/40',
    tagBg: 'text-emerald-400 bg-emerald-950/40',
    accentColor: 'text-emerald-400',
    checkColor: 'text-emerald-500',
    barColor: 'bg-emerald-500',
  },
  {
    num: '02',
    Icon: Brain,
    tag: 'Solution Pillar 2',
    title: 'Talent Match Intelligence',
    budget: 'IDR 500 Million',
    budgetPct: '25%',
    strategy:
      'Deploy a data-driven "Success Formula" to identify high-potential employees for internal mobility, reducing misfit cost and creating clear performance differentiation across talent tiers.',
    actions: [
      'Statistical scoring using Self-Efficacy (SEA) & Stakeholder Focus (CEX)',
      'Predict which employees will excel in the new tech environment',
      'Create clear performance differentiation between talent tiers',
      'Reduce misfit cost through evidence-based internal mobility',
    ],
    iconBg: 'bg-blue-950/60',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-800/40',
    tagBg: 'text-blue-400 bg-blue-950/40',
    accentColor: 'text-blue-400',
    checkColor: 'text-blue-500',
    barColor: 'bg-blue-500',
  },
  {
    num: '03',
    Icon: ShieldCheck,
    tag: 'Solution Pillar 3',
    title: 'Managerial Empowerment & Retention',
    budget: 'IDR 600 Million',
    budgetPct: '30%',
    strategy:
      'Launch a "Managerial Retention Protocol" that ties performance bonuses to team engagement scores and provides leadership coaching focused on navigating technological change.',
    actions: [
      'Performance bonuses directly tied to team engagement scores',
      'Leadership coaching focused on Change Management methodology',
      'Help managers lead disengaged teams through the tech transition',
      'Build a resilient, supported mid-management layer',
    ],
    iconBg: 'bg-violet-950/60',
    iconColor: 'text-violet-400',
    borderColor: 'border-violet-800/40',
    tagBg: 'text-violet-400 bg-violet-950/40',
    accentColor: 'text-violet-400',
    checkColor: 'text-violet-500',
    barColor: 'bg-violet-500',
  },
];

export default function SolutionPillars() {
  return (
    <section id="solutions" className="py-24 px-4 relative">
      {/* Subtle section tint */}
      <div className="absolute inset-0 bg-slate-800/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">
            Strategic Interventions
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4">
            Our Three-Pillar Strategy
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A coordinated intervention targeting skills capability, talent intelligence, and
            leadership resilience — simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.Icon;
            return (
              <div
                key={p.num}
                className={`bg-slate-800 border ${p.borderColor} rounded-2xl p-7 flex flex-col gap-5`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className={`${p.iconBg} rounded-xl p-3`}>
                    <Icon size={22} className={p.iconColor} />
                  </div>
                  <span className="text-slate-700 text-3xl font-black leading-none">{p.num}</span>
                </div>

                <span
                  className={`inline-block ${p.tagBg} text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit`}
                >
                  {p.tag}
                </span>

                <h3 className="text-white font-bold text-xl leading-tight">{p.title}</h3>

                <p className="text-slate-400 text-sm leading-relaxed">{p.strategy}</p>

                {/* Action checklist */}
                <div className="space-y-2.5 flex-1">
                  {p.actions.map((action, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className={`${p.checkColor} flex-shrink-0 mt-0.5`} />
                      <span className="text-slate-300 text-sm leading-snug">{action}</span>
                    </div>
                  ))}
                </div>

                {/* Budget footer */}
                <div className="mt-auto pt-5 border-t border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-slate-500 text-xs mb-0.5">Allocated Budget</div>
                      <div className={`${p.accentColor} font-bold text-lg`}>{p.budget}</div>
                    </div>
                    <div
                      className={`${p.tagBg} px-3 py-1.5 rounded-full text-sm font-bold`}
                    >
                      {p.budgetPct}
                    </div>
                  </div>
                  {/* Mini bar */}
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div
                      className={`${p.barColor} h-1.5 rounded-full`}
                      style={{ width: p.budgetPct }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
