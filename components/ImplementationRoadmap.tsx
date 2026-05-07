import {
  Search,
  Rocket,
  BarChart2,
  CheckCircle2,
  Flag,
  Target,
  Award,
  BookOpen,
  Users,
  TrendingUp,
  Brain,
  LayoutDashboard,
  ShieldCheck,
  ClipboardCheck,
  LineChart,
  UserCheck,
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────────
const phases = [
  {
    id: 1,
    span: 'Month 1',
    label: 'Discovery &\nAssessment',
    Icon: Search,
    color: 'blue' as const,
    position: 8, // % along the timeline bar (left edge of phase)
    tasks: [
      { Icon: BookOpen, text: 'Skill gap analysis across all 5,000 employees' },
      { Icon: Users, text: 'Identify high-readiness employees for Cohort 1' },
      { Icon: Target, text: 'Define success metrics and baseline KPIs' },
    ],
  },
  {
    id: 2,
    span: 'Month 2 – 4',
    label: 'Execution',
    Icon: Rocket,
    color: 'emerald' as const,
    position: 41,
    tasks: [
      { Icon: Brain, text: 'Launch fintech upskilling program (500 trainees)' },
      { Icon: LayoutDashboard, text: 'Deploy talent scoring model & HR dashboard' },
      { Icon: ShieldCheck, text: 'Begin managerial coaching sessions' },
    ],
  },
  {
    id: 3,
    span: 'Month 5 – 6',
    label: 'Optimization &\nEvaluation',
    Icon: BarChart2,
    color: 'violet' as const,
    position: 78,
    tasks: [
      { Icon: TrendingUp, text: 'Track KPI improvements vs. baseline' },
      { Icon: ClipboardCheck, text: 'Adjust training content based on outcomes' },
      { Icon: LineChart, text: 'Evaluate retention impact & ROI' },
    ],
  },
];

const milestones = [
  {
    month: 'Month 1',
    pct: 16, // % along the bar
    label: 'Talent segmentation\ncompleted',
    Icon: UserCheck,
    color: 'text-blue-400',
    dotBg: 'bg-blue-500',
  },
  {
    month: 'Month 3',
    pct: 50,
    label: '50% training\ncompletion',
    Icon: Award,
    color: 'text-[#DEFF9A]',
    dotBg: 'bg-[#DEFF9A]',
  },
  {
    month: 'Month 6',
    pct: 99,
    label: 'KPI evaluation\n& ROI review',
    Icon: Flag,
    color: 'text-violet-400',
    dotBg: 'bg-violet-500',
  },
];

const colorMap = {
  blue: {
    bg: 'bg-blue-950/40',
    border: 'border-blue-800/50',
    iconBg: 'bg-blue-950/60',
    iconCls: 'text-blue-400',
    tag: 'text-blue-400 bg-blue-950/40',
    dot: 'bg-blue-500',
    taskDot: 'bg-blue-700',
    num: 'text-blue-400',
  },
  emerald: {
    bg: 'bg-[#DEFF9A]/10',
    border: 'border-[#DEFF9A]/25',
    iconBg: 'bg-[#DEFF9A]/10',
    iconCls: 'text-[#DEFF9A]',
    tag: 'text-[#DEFF9A] bg-[#DEFF9A]/10',
    dot: 'bg-[#DEFF9A]',
    taskDot: 'bg-[#DEFF9A]/40',
    num: 'text-[#DEFF9A]',
  },
  violet: {
    bg: 'bg-violet-950/30',
    border: 'border-violet-800/50',
    iconBg: 'bg-violet-950/60',
    iconCls: 'text-violet-400',
    tag: 'text-violet-400 bg-violet-950/40',
    dot: 'bg-violet-500',
    taskDot: 'bg-violet-700',
    num: 'text-violet-400',
  },
} as const;

// ─── Component ─────────────────────────────────────────────────────────────────
export default function ImplementationRoadmap() {
  return (
    <section id="implementation" className="py-14 px-4 relative">
      {/* Subtle tint */}
      <div className="absolute inset-0 bg-[#404040]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="mb-16">
          <span className="text-[#DEFF9A] text-xs font-semibold tracking-widest uppercase">
            Implementation Roadmap
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-3 leading-tight">
            6-Month Execution Plan
          </h2>
          <div className="w-12 h-0.5 bg-[#DEFF9A] mt-4" />
        </div>

        {/* ── Horizontal Timeline Bar ─────────────────────────────────────────── */}
          <div className="relative mb-8">
          {/* Month tick labels */}
          <div className="flex justify-between mb-3 px-0">
            {['M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map((m, i) => (
              <div key={m} className="flex flex-col items-center" style={{ width: '16.66%' }}>
                <span className="text-slate-600 text-[10px] font-mono">{m}</span>
              </div>
            ))}
          </div>

          {/* Timeline rail */}
          <div className="relative h-3 bg-[#3a3a3a] border border-[#484848] rounded-full overflow-hidden">
            {/* Phase fills */}
            {/* Phase 1: M1 → 0–16.6% */}
            <div
              className="absolute top-0 bottom-0 bg-blue-800/50"
              style={{ left: '0%', width: '16.66%' }}
            />
            {/* Phase 2: M2–M4 → 16.6–66.6% */}
            <div
              className="absolute top-0 bottom-0 bg-[#DEFF9A]/15"
              style={{ left: '16.66%', width: '50%' }}
            />
            {/* Phase 3: M5–M6 → 66.6–100% */}
            <div
              className="absolute top-0 bottom-0 bg-violet-800/40"
              style={{ left: '66.66%', width: '33.34%' }}
            />
            {/* Phase separators */}
            <div className="absolute top-0 bottom-0 border-l border-[#555555]" style={{ left: '16.66%' }} />
            <div className="absolute top-0 bottom-0 border-l border-[#555555]" style={{ left: '66.66%' }} />
          </div>

          {/* Milestone markers */}
          <div className="relative h-10 mt-1">
            {milestones.map((m) => (
              <div
                key={m.month}
                className="absolute flex flex-col items-center -translate-x-1/2"
                style={{ left: `${m.pct}%` }}
              >
                {/* Diamond marker */}
                <div
                  className={`w-3 h-3 rotate-45 ${m.dotBg} border-2 border-[#282828] mt-0`}
                />
                <div className={`flex items-center gap-1 mt-1.5 ${m.color}`}>
                  <m.Icon size={10} />
                  <span className="text-[9px] font-semibold whitespace-nowrap">{m.month}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Phase Cards ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {phases.map((phase, i) => {
            const c = colorMap[phase.color];
            const Icon = phase.Icon;
            return (
              <div
                key={phase.id}
                className={`rounded-2xl border p-6 flex flex-col gap-5 ${c.bg} ${c.border}`}
              >
                {/* Phase header */}
                <div className="flex items-start justify-between">
                  <div className={`${c.iconBg} rounded-xl p-2.5`}>
                    <Icon size={20} className={c.iconCls} />
                  </div>
                  <span className={`text-3xl font-black ${c.num} opacity-20 leading-none`}>
                    0{phase.id}
                  </span>
                </div>

                <div>
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 ${c.tag}`}
                  >
                    {phase.span}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight whitespace-pre-line">
                    {phase.label}
                  </h3>
                </div>

                {/* Task list */}
                <div className="space-y-3 flex-1">
                  {phase.tasks.map((task, j) => {
                    const TIcon = task.Icon;
                    return (
                      <div key={j} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 rounded-lg p-1.5 mt-0.5 ${c.iconBg}`}>
                          <TIcon size={11} className={c.iconCls} />
                        </div>
                        <span className="text-slate-300 text-sm leading-snug">{task.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom accent line */}
                <div className={`h-0.5 rounded-full ${c.dot} opacity-30`} />
              </div>
            );
          })}
        </div>

        {/* ── Milestone Summary Row ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {milestones.map((m) => (
            <div
              key={m.month}
              className="bg-[#3a3a3a] border border-[#484848] rounded-xl px-5 py-4 flex items-center gap-4"
            >
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${m.dotBg} bg-opacity-20`}
              >
                <m.Icon size={16} className={m.color} />
              </div>
              <div>
                <span className={`text-xs font-bold ${m.color} block mb-0.5`}>
                  {m.month}
                </span>
                <p className="text-slate-300 text-sm font-semibold leading-snug whitespace-pre-line">
                  {m.label}
                </p>
              </div>
              <CheckCircle2 size={16} className="text-slate-700 ml-auto flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
