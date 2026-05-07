import { DollarSign, Lightbulb } from 'lucide-react';

const allocations = [
  {
    label: 'Upskilling & Technical Training',
    amount: 'IDR 900M',
    pct: 45,
    barColor: 'bg-[#DEFF9A]',
    textColor: 'text-[#DEFF9A]',
    tagBg: 'text-[#DEFF9A] bg-[#DEFF9A]/10',
    items: [
      'Digital bootcamp partnerships & licensing',
      'Fintech certification programs (500 initial trainees)',
      '6-month intensive training cohort operations',
    ],
  },
  {
    label: 'Managerial Retention & Coaching',
    amount: 'IDR 600M',
    pct: 30,
    barColor: 'bg-violet-500',
    textColor: 'text-violet-400',
    tagBg: 'text-violet-400 bg-violet-950/40',
    items: [
      'Engagement-linked performance bonus pool',
      'Change Management leadership coaching program',
      'Executive resilience & facilitation workshops',
    ],
  },
  {
    label: 'HR Analytics & Digital Infrastructure',
    amount: 'IDR 500M',
    pct: 25,
    barColor: 'bg-blue-500',
    textColor: 'text-blue-400',
    tagBg: 'text-blue-400 bg-blue-950/40',
    items: [
      'Talent Success Formula scoring engine',
      'Real-time engagement monitoring dashboard',
      'Predictive attrition analytics platform',
    ],
  },
];

export default function BudgetSection() {
  return (
    <section id="budget" className="py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
          <div className="text-center mb-10">
          <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
            Budget Breakdown
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4">
            Budget Allocation
          </h2>
          <p className="text-slate-400 text-lg">
            Optimizing an{' '}
            <span className="text-[#DEFF9A] font-semibold">IDR 2 Billion</span> investment
            across three strategic pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Left: Summary card */}
          <div className="flex flex-col gap-6 h-full">
            <div className="bg-[#3a3a3a] border border-[#484848] rounded-2xl p-8 text-center flex-1 flex flex-col justify-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#DEFF9A]/10 mb-5">
                <DollarSign size={28} className="text-[#DEFF9A]" />
              </div>
              <div className="text-5xl font-extrabold text-white mb-2">IDR 2.0B</div>
              <div className="text-slate-500 text-sm mb-8">Total Strategic Investment</div>

              {/* Stacked bar */}
              <div className="h-8 rounded-xl overflow-hidden flex w-full mb-3">
                <div
                  className="bg-[#DEFF9A] h-full flex items-center justify-center"
                  style={{ width: '45%' }}
                  title="Upskilling 45%"
                >
                  <span className="text-slate-900 text-xs font-bold">45%</span>
                </div>
                <div
                  className="bg-violet-500 h-full flex items-center justify-center"
                  style={{ width: '30%' }}
                  title="Managerial 30%"
                >
                  <span className="text-white text-xs font-bold">30%</span>
                </div>
                <div
                  className="bg-blue-500 h-full flex items-center justify-center"
                  style={{ width: '25%' }}
                  title="HR Analytics 25%"
                >
                  <span className="text-white text-xs font-bold">25%</span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-600 mb-6">
                <span>IDR 0</span>
                <span>IDR 2 Billion</span>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-5">
                {allocations.map((a) => (
                  <div key={a.label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-sm ${a.barColor}`} />
                    <span className="text-slate-400 text-xs">{a.label.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-[#DEFF9A]/10 border border-[#DEFF9A]/20 rounded-2xl p-6 flex gap-4">
              <div className="flex-shrink-0 bg-[#DEFF9A]/15 rounded-xl p-2.5 h-fit">
                <Lightbulb size={18} className="text-[#DEFF9A]" />
              </div>
              <div>
                <p className="text-[#DEFF9A] text-xs font-semibold tracking-widest uppercase mb-2">
                  Key Insight
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Projected cost avoidance of{' '}
                  <span className="text-[#DEFF9A] font-semibold">IDR 122B in year one</span>{': '}
                  a{' '}
                  <span className="text-[#DEFF9A] font-semibold">60x return</span>{' '}
                  on the IDR 2B investment.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Detailed breakdown */}
          <div className="flex flex-col gap-4 h-full">
            {allocations.map((a) => (
              <div
                key={a.label}
                className="bg-[#3a3a3a] border border-[#484848] rounded-2xl p-6 flex-1 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex-1">
                    <span
                      className={`inline-block ${a.tagBg} text-xs font-semibold px-2 py-0.5 rounded-full mb-2`}
                    >
                      {a.pct}% of budget
                    </span>
                    <h3 className="text-white font-bold text-base">{a.label}</h3>
                  </div>
                  <div className={`${a.textColor} font-extrabold text-xl tabular-nums flex-shrink-0`}>
                    {a.amount}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#484848] rounded-full h-2 mb-5">
                  <div
                    className={`${a.barColor} h-2 rounded-full`}
                    style={{ width: `${a.pct}%` }}
                  />
                </div>

                {/* Line items */}
                <div className="space-y-2">
                  {a.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-slate-400 text-xs">
                      <span className={`w-1.5 h-1.5 rounded-full ${a.barColor} flex-shrink-0`} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
