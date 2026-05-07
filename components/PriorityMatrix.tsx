import { AlertCircle, Zap, TrendingDown, ArrowRight } from 'lucide-react';

// ─── Problem data ──────────────────────────────────────────────────────────────
// Grid coords: x = 0–100 (Business Impact), y = 0–100 (Urgency)
// Rendered inside a 2x2 quadrant; origin bottom-left.
const problems = [
  {
    id: 1,
    label: 'Skills Gap',
    sublabel: 'Fintech Readiness',
    x: 78, // high impact
    y: 82, // high urgency
    priority: 'top',
    Icon: Zap,
    desc: 'No upskilling roadmap for new financial technologies',
  },
  {
    id: 2,
    label: 'Manager Turnover',
    sublabel: 'Mid-Level Churn (20%)',
    x: 85,
    y: 75,
    priority: 'top',
    Icon: TrendingDown,
    desc: 'Implementation stress driving 20% churn in critical layer',
    callout: 'Manager turnover is the single biggest multiplier of team disengagement.',
  },
  {
    id: 3,
    label: 'Low Engagement',
    sublabel: 'Employee Score (60%)',
    x: 48,
    y: 50,
    priority: 'medium',
    Icon: AlertCircle,
    desc: 'Engagement at 60%, a downstream effect of the gaps above',
  },
];

const quadrants = [
  {
    label: 'Monitor',
    corner: 'top-2 left-2',
    textCls: 'text-slate-600',
    desc: 'Low Impact · High Urgency',
  },
  {
    label: 'Top Priority',
    corner: 'top-2 right-2',
    textCls: 'text-[#8cb030]',
    desc: 'High Impact · High Urgency',
  },
  {
    label: 'Deprioritize',
    corner: 'bottom-2 left-2',
    textCls: 'text-slate-700',
    desc: 'Low Impact · Low Urgency',
  },
  {
    label: 'Plan',
    corner: 'bottom-2 right-2',
    textCls: 'text-blue-600',
    desc: 'High Impact · Low Urgency',
  },
];

export default function PriorityMatrix() {
  return (
    <section id="priority" className="py-14 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="mb-10">
          <span className="text-[#DEFF9A] text-xs font-semibold tracking-widest uppercase">
            Problem Prioritization
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-3 leading-tight">
            Where to Intervene First
          </h2>
          <div className="w-12 h-0.5 bg-[#DEFF9A] mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── Left: Matrix ───────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            {/* Y-axis label */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 pt-4 pb-8 select-none">
                <span className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase rotate-[-90deg] whitespace-nowrap origin-center translate-y-10 translate-x-0.5 block w-0">
                  Urgency
                </span>
              </div>

              <div className="flex-1">
                {/* Y-axis arrow + labels */}
                <div className="flex items-center justify-between mb-2 pl-0">
                  <span className="text-slate-500 text-[10px] tracking-widest uppercase">
                    ↑ High
                  </span>
                  <span className="text-slate-600 text-[10px] font-bold tracking-widest uppercase mr-0">
                    URGENCY
                  </span>
                </div>

                {/* Matrix grid */}
                <div
                  className="relative w-full border border-[#484848] rounded-2xl overflow-hidden"
                  style={{ aspectRatio: '1 / 1' }}
                >
                  {/* Four quadrant backgrounds */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    {/* Top-left: Monitor */}
                    <div className="border-r border-b border-[#484848]/60 bg-[#3a3a3a]/50" />
                    {/* Top-right: Top Priority */}
                    <div className="border-b border-[#484848]/60 bg-[#DEFF9A]/5" />
                    {/* Bottom-left: Deprioritize */}
                    <div className="border-r border-[#484848]/60 bg-[#3a3a3a]/30" />
                    {/* Bottom-right: Plan */}
                    <div className="bg-[#3a3a3a]/40" />
                  </div>

                  {/* Quadrant labels */}
                  {quadrants.map((q) => (
                    <div
                      key={q.label}
                      className={`absolute ${q.corner} flex flex-col gap-0.5 pointer-events-none`}
                    >
                      <span
                        className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${q.textCls}`}
                      >
                        {q.label}
                      </span>
                      <span className="text-[9px] text-slate-600 hidden md:block">
                        {q.desc}
                      </span>
                    </div>
                  ))}

                  {/* Centre divider labels */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Horizontal mid-line dashed */}
                    <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#484848]/50" />
                    {/* Vertical mid-line dashed */}
                    <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-[#484848]/50" />
                  </div>

                  {/* Plotted points */}
                  {problems.map((p) => {
                    const Icon = p.Icon;
                    const isTop = p.priority === 'top';
                    // x=0→left, x=100→right; y=0→bottom, y=100→top
                    const left = `${p.x}%`;
                    const top = `${100 - p.y}%`;

                    return (
                      <div
                        key={p.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                        style={{ left, top }}
                      >
                        {/* Pulse ring for top priority */}
                        {isTop && (
                          <span className="absolute inset-0 rounded-full bg-[#DEFF9A]/20 animate-ping scale-[2.5]" />
                        )}

                        {/* Dot */}
                        <div
                          className={`relative flex items-center justify-center rounded-full transition-transform group-hover:scale-110 z-10 ${
                            isTop
                              ? 'w-11 h-11 bg-[#DEFF9A] shadow-lg shadow-black/40'
                              : 'w-9 h-9 bg-slate-600 border border-slate-500'
                          }`}
                        >
                          <Icon
                            size={isTop ? 18 : 15}
                            className={isTop ? 'text-slate-900' : 'text-slate-300'}
                          />
                        </div>

                        {/* Tooltip card */}
                        <div
                          className={`absolute z-20 w-40 pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${
                            p.x > 55 ? 'right-full mr-3' : 'left-full ml-3'
                          } ${p.y > 55 ? 'top-0' : 'bottom-0'}`}
                        >
                          <div
                            className={`rounded-xl p-3 border text-left shadow-xl ${
                              isTop
                                ? 'bg-[#1e2a00] border-[#DEFF9A]/30'
                                : 'bg-[#3a3a3a] border-[#484848]'
                            }`}
                          >
                            <p
                              className={`text-xs font-bold mb-1 ${
                                isTop ? 'text-[#DEFF9A]' : 'text-slate-300'
                              }`}
                            >
                              {p.label}
                            </p>
                            <p className="text-[10px] text-slate-400 leading-snug">
                              {p.desc}
                            </p>
                          </div>
                        </div>


                      </div>
                    );
                    })}
                  </div>

                {/* X-axis labels */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-slate-500 text-[10px] tracking-widest uppercase">
                    Low →
                  </span>
                  <span className="text-slate-600 text-[10px] font-bold tracking-widest uppercase">
                    BUSINESS IMPACT
                  </span>
                  <span className="text-slate-500 text-[10px] tracking-widest uppercase">
                    → High
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Legend + Insight ────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Legend cards */}
            {problems.map((p, i) => {
              const Icon = p.Icon;
              const isTop = p.priority === 'top';
              return (
                <div
                  key={p.id}
                  className={`rounded-2xl p-5 border flex gap-4 items-start transition-all ${
                    isTop
                      ? 'bg-[#DEFF9A]/10 border-[#DEFF9A]/25'
                      : 'bg-[#3a3a3a] border-[#484848]'
                  }`}
                >
                  {/* Number badge */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isTop
                        ? 'bg-[#DEFF9A] text-slate-900'
                        : 'bg-[#484848] text-slate-400'
                    }`}
                  >
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <Icon
                        size={13}
                        className={isTop ? 'text-[#DEFF9A]' : 'text-slate-400'}
                      />
                      <span
                        className={`text-sm font-bold ${
                          isTop ? 'text-[#DEFF9A]' : 'text-slate-300'
                        }`}
                      >
                        {p.label}
                      </span>
                      {isTop && (
                        <span className="text-[9px] bg-[#DEFF9A]/15 text-[#DEFF9A] border border-[#DEFF9A]/30 px-1.5 py-0.5 rounded-full font-semibold">
                          TOP PRIORITY
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs mb-2">{p.sublabel}</p>
                    <div className="flex items-center gap-3 text-[10px]">
                      <div>
                        <span className="text-slate-600">Impact </span>
                        <span
                          className={isTop ? 'text-[#DEFF9A] font-semibold' : 'text-amber-400 font-semibold'}
                        >
                          {isTop ? 'High' : 'Medium'}
                        </span>
                      </div>
                      <span className="text-slate-700">·</span>
                      <div>
                        <span className="text-slate-600">Urgency </span>
                        <span
                          className={isTop ? 'text-[#DEFF9A] font-semibold' : 'text-amber-400 font-semibold'}
                        >
                          {isTop ? 'High' : 'Medium'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Insight box */}
            <div className="bg-[#3a3a3a]/50 border border-[#484848] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <ArrowRight size={13} className="text-[#DEFF9A] flex-shrink-0" />
                <span className="text-[#DEFF9A] text-xs font-semibold tracking-widest uppercase">
                  Key Insight
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Primary focus must be on{' '}
                <span className="text-[#DEFF9A] font-semibold">
                  closing the fintech skills gap
                </span>{' '}
                and{' '}
                <span className="text-[#DEFF9A] font-semibold">
                  stabilizing mid-level leadership
                </span>
                , as these drive both turnover and engagement decline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
