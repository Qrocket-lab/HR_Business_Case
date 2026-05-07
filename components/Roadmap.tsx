import { Clock, Target, CheckCircle, ArrowRight, Star } from 'lucide-react';

const timeline = [
  {
    phase: 'Day 1 – 30',
    label: 'Discovery Phase',
    desc: 'Finalize the Talent Success Formula attributes. Run baseline diagnostic assessments across all 5,000 employees to identify the first cohort of high-readiness talent.',
    status: 'active',
    color: 'emerald' as const,
    idx: 1,
  },
  {
    phase: 'Month 2 – 3',
    label: 'Pilot Program',
    desc: 'Launch the first cohort of 500 trainees through the Fintech Upskilling Pipeline. Begin managerial coaching sessions and deploy engagement tracking tools.',
    status: 'upcoming',
    color: 'blue' as const,
    idx: 2,
  },
  {
    phase: 'Month 4 – 6',
    label: 'Full Rollout',
    desc: 'Scale training to all high-readiness employees. Deploy the HR Analytics dashboard and the Talent Scoring engine across the organization.',
    status: 'upcoming',
    color: 'violet' as const,
    idx: 3,
  },
  {
    phase: 'Month 7 – 12',
    label: 'Measure & Optimize',
    desc: 'Track KPIs quarterly. Adjust training content based on certification rates. Expand successful programs to remaining employee tiers.',
    status: 'upcoming',
    color: 'amber' as const,
    idx: 4,
  },
];

const colorMap = {
  emerald: {
    dot: 'bg-[#DEFF9A]',
    border: 'border-[#DEFF9A]/25',
    tag: 'text-[#DEFF9A] bg-[#DEFF9A]/10',
  },
  blue: {
    dot: 'bg-blue-500',
    border: 'border-blue-800/30',
    tag: 'text-blue-400 bg-blue-950/40',
  },
  violet: {
    dot: 'bg-violet-500',
    border: 'border-violet-800/30',
    tag: 'text-violet-400 bg-violet-950/40',
  },
  amber: {
    dot: 'bg-amber-500',
    border: 'border-amber-800/30',
    tag: 'text-amber-400 bg-amber-950/40',
  },
};

const kpis = [
  {
    from: '20%',
    to: '15%',
    label: 'Annual Turnover Rate',
    note: 'Target reduction',
    accentCls: 'text-[#DEFF9A]',
  },
  {
    from: '60%',
    to: '75%',
    label: 'Employee Engagement',
    note: 'Target improvement',
    accentCls: 'text-[#DEFF9A]',
  },
  {
    from: '0%',
    to: '90%',
    label: 'Certification Rate',
    note: 'First 500 trainees',
    accentCls: 'text-blue-400',
  },
];

const alignmentPoints = [
  'Bridges the fintech skills gap systematically across all tiers',
  'Creates data-driven talent intelligence for ongoing hiring',
  'Retains the mid-management layer that drives day-to-day change',
  'Delivers measurable, KPI-trackable return on investment',
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-14 px-4 relative">
      {/* Top ambient glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(222,255,154,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
          <div className="text-center mb-10">
          <span className="text-[#DEFF9A] text-xs font-semibold tracking-widest uppercase">
            Slide 8
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4">
            Conclusion & Roadmap
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A clear execution path aligning with ABC Corporation's vision to become a{' '}
            <span className="text-[#DEFF9A] font-semibold">digital-first bank</span> while
            maintaining a stable, high-engagement culture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">

          {/* Timeline */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <Clock size={18} className="text-[#DEFF9A]" />
              Implementation Timeline
            </h3>
            <div className="relative space-y-4">
              {/* Vertical connector line */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-[#484848]" />

              {timeline.map((item) => {
                const c = colorMap[item.color];
                return (
                  <div key={item.idx} className="flex gap-5">
                    {/* Node */}
                    <div className="flex-shrink-0 z-10">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          item.status === 'active'
                            ? `${c.dot} border-[#e8ff9a]`
                            : 'bg-[#484848] border-[#555555]'
                        }`}
                      >
                        {item.status === 'active' ? (
                          <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
                        ) : (
                          <span className="text-slate-400 text-xs font-bold">{item.idx}</span>
                        )}
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`flex-1 bg-[#3a3a3a] border ${c.border} rounded-xl p-4 mb-1`}>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.tag}`}
                        >
                          {item.phase}
                        </span>
                        {item.status === 'active' && (
                          <span className="text-xs text-[#DEFF9A] font-semibold animate-pulse">
                            ▶ Initiate Now
                          </span>
                        )}
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.label}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: KPIs + Alignment */}
          <div className="flex flex-col gap-6">

            {/* KPI Targets */}
            <div>
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                <Target size={18} className="text-[#DEFF9A]" />
                Target KPIs
              </h3>
              <div className="space-y-4">
                {kpis.map((k) => (
                  <div
                    key={k.label}
                    className="bg-[#3a3a3a] border border-[#484848] rounded-xl p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="text-slate-300 text-sm font-semibold">{k.label}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{k.note}</div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-slate-500 text-base line-through tabular-nums">
                        {k.from}
                      </span>
                      <ArrowRight size={14} className="text-slate-600" />
                      <span className={`${k.accentCls} text-2xl font-extrabold tabular-nums`}>
                        {k.to}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Alignment card */}
            <div className="bg-gradient-to-br from-[#DEFF9A]/8 to-blue-950/40 border border-[#DEFF9A]/20 rounded-2xl p-6 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Star size={15} className="text-[#DEFF9A]" />
                <span className="text-[#DEFF9A] text-sm font-semibold">
                  Strategic Alignment
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                Project Horizon directly supports ABC Corporation's transformation into a
                digital-first bank by building a workforce that is not just equipped — but{' '}
                <span className="text-white font-semibold">enthusiastic</span> — about the
                financial technology revolution.
              </p>
              <div className="space-y-2.5">
                {alignmentPoints.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={13} className="text-[#DEFF9A] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-400 text-xs leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
          <div className="bg-gradient-to-r from-[#DEFF9A]/10 via-[#3a3a3a] to-blue-950/60 border border-[#DEFF9A]/20 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-[#DEFF9A] text-xs font-semibold tracking-widest uppercase mb-4">
            Call to Action
          </p>
          <h3 className="text-white text-2xl md:text-4xl font-extrabold mb-4">
            Begin the 30-Day Discovery Phase
          </h3>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Finalize the Success Formula attributes and run baseline assessments on all 5,000
            employees to identify the first cohort of high-readiness talent.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#DEFF9A] hover:bg-[#e8ff9a] text-slate-900 font-bold px-8 py-3.5 rounded-full transition-colors text-sm cursor-pointer">
            Initiate Discovery Phase
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-700 text-xs">
          Project Horizon · ABC Corporation HR Strategy · IDR 2B Investment · FY2026 · All
          figures in Indonesian Rupiah (IDR)
        </div>
      </div>
    </section>
  );
}
