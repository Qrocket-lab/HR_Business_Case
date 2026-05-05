import {
  GraduationCap,
  Brain,
  ShieldCheck,
  Award,
  TrendingUp,
  ArrowUpRight,
  Users,
  UserCheck,
  Star,
  BarChart2,
  Target,
  Repeat2,
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────────
const categories = [
  {
    id: 1,
    pillar: 'Upskilling',
    fullLabel: 'Fintech Upskilling Pipeline',
    Icon: GraduationCap,
    color: 'emerald' as const,
    metrics: [
      {
        Icon: Award,
        label: 'Certification Rate',
        unit: '%',
        baseline: '0%',
        target: '90%',
        note: 'First 500 trainees by Month 6',
      },
      {
        Icon: TrendingUp,
        label: 'Skill Proficiency Improvement',
        unit: 'pts',
        baseline: '—',
        target: '+25 pts',
        note: 'Avg. score vs. pre-training baseline',
      },
      {
        Icon: Repeat2,
        label: 'Internal Mobility Rate',
        unit: '%',
        baseline: '~5%',
        target: '15%',
        note: 'Employees promoted or re-assigned internally',
      },
    ],
  },
  {
    id: 2,
    pillar: 'Talent Matching',
    fullLabel: 'Talent Match Intelligence',
    Icon: Brain,
    color: 'blue' as const,
    metrics: [
      {
        Icon: Target,
        label: 'Placement Accuracy',
        unit: '%',
        baseline: 'Ad-hoc',
        target: '85%',
        note: 'Model-recommended vs. actual high performers',
      },
      {
        Icon: BarChart2,
        label: 'Performance Improvement',
        unit: 'x',
        baseline: '1.0×',
        target: '1.4×',
        note: 'Top-tier vs. average performer delta',
      },
    ],
  },
  {
    id: 3,
    pillar: 'Managerial Retention',
    fullLabel: 'Managerial Empowerment & Retention',
    Icon: ShieldCheck,
    color: 'violet' as const,
    metrics: [
      {
        Icon: UserCheck,
        label: 'Manager Turnover Rate',
        unit: '%',
        baseline: '20%',
        target: '10%',
        note: 'Mid-level manager annual churn',
      },
      {
        Icon: Star,
        label: 'Team Engagement Score',
        unit: '%',
        baseline: '60%',
        target: '75%',
        note: 'Engagement measured quarterly via pulse survey',
      },
    ],
  },
];

const colorMap = {
  emerald: {
    bg: 'bg-emerald-950/30',
    border: 'border-emerald-800/50',
    iconBg: 'bg-emerald-950/60',
    iconCls: 'text-emerald-400',
    tag: 'text-emerald-400 bg-emerald-950/40',
    targetCls: 'text-emerald-400',
    barFill: 'bg-emerald-500',
    headerLine: 'bg-emerald-600',
  },
  blue: {
    bg: 'bg-blue-950/30',
    border: 'border-blue-800/50',
    iconBg: 'bg-blue-950/60',
    iconCls: 'text-blue-400',
    tag: 'text-blue-400 bg-blue-950/40',
    targetCls: 'text-blue-400',
    barFill: 'bg-blue-500',
    headerLine: 'bg-blue-600',
  },
  violet: {
    bg: 'bg-violet-950/30',
    border: 'border-violet-800/50',
    iconBg: 'bg-violet-950/60',
    iconCls: 'text-violet-400',
    tag: 'text-violet-400 bg-violet-950/40',
    targetCls: 'text-violet-400',
    barFill: 'bg-violet-500',
    headerLine: 'bg-violet-600',
  },
} as const;

// ─── Component ─────────────────────────────────────────────────────────────────
export default function SuccessMetrics() {
  return (
    <section id="metrics" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">
            Measurement Framework
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-3 leading-tight">
            Success Metrics
          </h2>
          <p className="text-slate-400 text-base max-w-xl mt-3">
            Each pillar is measured against a defined baseline with a 6-month target, enabling
            continuous course-correction.
          </p>
          <div className="w-12 h-0.5 bg-emerald-500 mt-5" />
        </div>

        {/* ── Metric Category Cards ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const c = colorMap[cat.color];
            const CatIcon = cat.Icon;
            return (
              <div
                key={cat.id}
                className={`rounded-2xl border ${c.border} ${c.bg} flex flex-col overflow-hidden`}
              >
                {/* Card header */}
                <div className="px-6 pt-6 pb-5 flex items-start gap-4 border-b border-slate-700/50">
                  <div className={`flex-shrink-0 rounded-xl p-2.5 ${c.iconBg}`}>
                    <CatIcon size={20} className={c.iconCls} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5 ${c.tag}`}
                    >
                      Pillar {cat.id}
                    </span>
                    <h3 className="text-white font-bold text-base leading-snug">
                      {cat.pillar}
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5 leading-tight">{cat.fullLabel}</p>
                  </div>
                </div>

                {/* Metrics list */}
                <div className="flex-1 flex flex-col divide-y divide-slate-700/40">
                  {cat.metrics.map((metric, i) => {
                    const MIcon = metric.Icon;
                    return (
                      <div key={i} className="px-6 py-4 flex flex-col gap-3">
                        {/* Metric label row */}
                        <div className="flex items-center gap-2.5">
                          <div className={`flex-shrink-0 rounded-lg p-1.5 ${c.iconBg}`}>
                            <MIcon size={12} className={c.iconCls} />
                          </div>
                          <span className="text-slate-300 text-sm font-semibold leading-snug">
                            {metric.label}
                          </span>
                        </div>

                        {/* Baseline → Target */}
                        <div className="flex items-center gap-2 ml-8">
                          <span className="text-slate-600 text-xs font-mono tabular-nums">
                            {metric.baseline}
                          </span>
                          <ArrowUpRight
                            size={12}
                            className={`${c.iconCls} flex-shrink-0`}
                          />
                          <span
                            className={`${c.targetCls} text-sm font-bold tabular-nums`}
                          >
                            {metric.target}
                          </span>
                          <span className="text-slate-600 text-xs">target</span>
                        </div>

                        {/* Note */}
                        <p className="text-slate-500 text-xs leading-relaxed ml-8">
                          {metric.note}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom accent bar */}
                <div className={`h-1 ${c.barFill} opacity-60`} />
              </div>
            );
          })}
        </div>

        {/* ── Summary strip ───────────────────────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total KPIs Tracked', value: '7', sub: 'across 3 pillars', cls: 'text-white' },
            { label: 'Primary Target', value: '90%', sub: 'certification rate', cls: 'text-emerald-400' },
            { label: 'Turnover Goal', value: '10%', sub: 'manager churn (from 20%)', cls: 'text-violet-400' },
            { label: 'Engagement Goal', value: '75%', sub: 'employee score (from 60%)', cls: 'text-blue-400' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-center"
            >
              <div className={`text-2xl font-extrabold tabular-nums mb-1 ${s.cls}`}>
                {s.value}
              </div>
              <div className="text-slate-300 text-xs font-semibold mb-0.5">{s.label}</div>
              <div className="text-slate-600 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
