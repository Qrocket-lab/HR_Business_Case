import { GraduationCap, Brain, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────────
const kpiGroups = [
  {
    category: 'Upskilling',
    Icon: GraduationCap,
    color: 'emerald' as const,
    rows: [
      { kpi: 'Certification Rate',      baseline: '0%',    target: '90%',    dir: 'up'   as const },
      { kpi: 'Internal Mobility Rate',  baseline: '5%',    target: '15%',    dir: 'up'   as const },
    ],
  },
  {
    category: 'Talent Matching',
    Icon: Brain,
    color: 'blue' as const,
    rows: [
      { kpi: 'Placement Accuracy',      baseline: 'Ad-hoc', target: '85%',   dir: 'up'   as const },
      { kpi: 'Performance Delta',       baseline: '1.0×',  target: '1.4×',   dir: 'up'   as const },
    ],
  },
  {
    category: 'Managerial Retention',
    Icon: ShieldCheck,
    color: 'violet' as const,
    rows: [
      { kpi: 'Manager Turnover Rate',   baseline: '20%',   target: '10%',    dir: 'down' as const },
      { kpi: 'Team Engagement Score',   baseline: '60%',   target: '75%',    dir: 'up'   as const },
    ],
  },
];

const colorMap = {
  emerald: {
    header:  'bg-[#DEFF9A]/10 border-b border-[#DEFF9A]/20',
    icon:    'text-[#DEFF9A]',
    target:  'text-[#DEFF9A]',
    rowHover:'hover:bg-[#DEFF9A]/5',
  },
  blue: {
    header:  'bg-blue-950/50 border-b border-blue-800/40',
    icon:    'text-blue-400',
    target:  'text-blue-400',
    rowHover:'hover:bg-blue-950/10',
  },
  violet: {
    header:  'bg-violet-950/50 border-b border-violet-800/40',
    icon:    'text-violet-400',
    target:  'text-violet-400',
    rowHover:'hover:bg-violet-950/10',
  },
} as const;

// ─── Component ─────────────────────────────────────────────────────────────────
export default function SuccessMetrics() {
  return (
    <section id="metrics" className="py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="text-[#DEFF9A] text-xs font-semibold tracking-widest uppercase">
            Measurement Framework
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3 leading-tight">
            Success Metrics
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Defined baselines and 6-month targets across all three strategic pillars.
          </p>
          <div className="w-12 h-0.5 bg-[#DEFF9A] mt-4" />
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-[#484848] overflow-hidden">

          {/* Column headers */}
          <div className="grid grid-cols-12 bg-[#3a3a3a]/80 border-b border-[#484848] px-6 py-3">
            <div className="col-span-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              Category
            </div>
            <div className="col-span-5 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              KPI
            </div>
            <div className="col-span-2 text-slate-500 text-xs font-semibold uppercase tracking-wider text-center">
              Baseline
            </div>
            <div className="col-span-2 text-slate-500 text-xs font-semibold uppercase tracking-wider text-center">
              6-Mo Target
            </div>
          </div>

          {/* KPI groups */}
          {kpiGroups.map((group, gi) => {
            const c = colorMap[group.color];
            const GroupIcon = group.Icon;
            return (
              <div key={gi}>
                {/* Category sub-header */}
                <div className={`grid grid-cols-12 px-6 py-2.5 ${c.header}`}>
                  <div className="col-span-12 flex items-center gap-2">
                    <GroupIcon size={13} className={c.icon} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${c.icon}`}>
                      {group.category}
                    </span>
                  </div>
                </div>

                {/* KPI rows */}
                {group.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className={`grid grid-cols-12 px-6 py-4 border-b border-[#484848]/30 transition-colors ${c.rowHover}`}
                  >
                    <div className="col-span-3" />
                    <div className="col-span-5 flex items-center">
                      <span className="text-slate-200 text-sm">{row.kpi}</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <span className="text-slate-500 text-sm font-mono tabular-nums">
                        {row.baseline}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center gap-1.5">
                      {row.dir === 'up'
                        ? <TrendingUp  size={12} className={`${c.target} flex-shrink-0`} />
                        : <TrendingDown size={12} className={`${c.target} flex-shrink-0`} />
                      }
                      <span className={`${c.target} text-sm font-bold tabular-nums`}>
                        {row.target}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {/* Optional row */}
          <div className="grid grid-cols-12 px-6 py-3.5 bg-[#3a3a3a]/20">
            <div className="col-span-3 flex items-center">
              <span className="text-slate-600 text-[10px] uppercase tracking-wider font-semibold">
                Optional
              </span>
            </div>
            <div className="col-span-5 flex items-center">
              <span className="text-slate-500 text-sm">Skill Proficiency Improvement</span>
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <span className="text-slate-600 text-sm font-mono">TBD</span>
            </div>
            <div className="col-span-2 flex items-center justify-center gap-1.5">
              <TrendingUp size={12} className="text-slate-500 flex-shrink-0" />
              <span className="text-slate-400 text-sm font-bold">+25 pts</span>
            </div>
          </div>
        </div>

        {/* Financial impact */}
        <div className="mt-6 bg-[#DEFF9A]/10 border border-[#DEFF9A]/20 rounded-xl px-6 py-4">
          <p className="text-slate-300 text-sm leading-relaxed text-center">
            Retaining{' '}
            <span className="text-[#DEFF9A] font-bold">450 employees</span>
            {' '}through these initiatives avoids{' '}
            <span className="text-[#DEFF9A] font-bold">IDR 122B</span>
            {' '}in annual replacement costs — a{' '}
            <span className="text-[#DEFF9A] font-bold">60× return</span>
            {' '}on the IDR 2B investment.
          </p>
        </div>

      </div>
    </section>
  );
}
