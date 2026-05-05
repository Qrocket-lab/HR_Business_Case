'use client';

import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import {
  Users,
  DollarSign,
  TrendingUp,
  Info,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

// â”€â”€â”€ Constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TOTAL_EMPLOYEES = 5_000;
const CURRENT_TURNOVER_RATE = 0.20;
const AVG_MONTHLY_SALARY = 15_000_000;
const REPLACEMENT_MULTIPLIER = 1.5;
const HR_INVESTMENT = 2_000_000_000;

const CURRENT_EXITS = TOTAL_EMPLOYEES * CURRENT_TURNOVER_RATE;
const ANNUAL_SALARY = AVG_MONTHLY_SALARY * 12;
const COST_PER_REPLACEMENT = ANNUAL_SALARY * REPLACEMENT_MULTIPLIER; // 270M
const CURRENT_TURNOVER_COST = CURRENT_EXITS * COST_PER_REPLACEMENT;  // 270B

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function fmtIDR(v: number): string {
  const abs = Math.abs(v);
  const sign = v < 0 ? '-' : '';
  if (abs >= 1_000_000_000_000) return `${sign}IDR ${(abs / 1_000_000_000_000).toFixed(2)} T`;
  if (abs >= 1_000_000_000)    return `${sign}IDR ${(abs / 1_000_000_000).toFixed(0)} B`;
  if (abs >= 1_000_000)        return `${sign}IDR ${(abs / 1_000_000).toFixed(0)} M`;
  return `${sign}IDR ${abs.toLocaleString('id-ID')}`;
}

// â”€â”€â”€ Custom Tooltip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface TTPayload { value: number }
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TTPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 shadow-2xl text-sm">
      <p className="text-slate-400 mb-1 font-medium">{label}</p>
      <p className="text-white font-bold">{fmtIDR(payload[0].value * 1_000_000_000)}</p>
    </div>
  );
}

// â”€â”€â”€ Slider â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Slider({ label, min, max, step, value, onChange, display, accentCls, accentHex }:
  { label: string; min: number; max: number; step: number; value: number;
    onChange: (v: number) => void; display: string; accentCls: string; accentHex: string }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2.5">
        <span className="text-slate-400 text-sm">{label}</span>
        <span className={`font-extrabold text-xl tabular-nums ${accentCls}`}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-700"
        style={{ accentColor: accentHex }}
      />
      <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-mono">
        <span>{min}%</span><span>{max}%</span>
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Dashboard() {
  const [turnoverReduction, setTurnoverReduction] = useState(6);
  const [trainingCompletion, setTrainingCompletion] = useState(50);

  const calc = useMemo(() => {
    const retained = Math.round(TOTAL_EMPLOYEES * (turnoverReduction / 100));
    const costAvoidance = retained * COST_PER_REPLACEMENT;
    const netImpact = costAvoidance - HR_INVESTMENT;
    const projectedCost = (CURRENT_EXITS - retained) * COST_PER_REPLACEMENT;
    return { retained, costAvoidance, netImpact, projectedCost };
  }, [turnoverReduction]);

  const chartData = [
    { name: 'Current Annual Cost', value: CURRENT_TURNOVER_COST / 1_000_000_000, color: '#f43f5e' },
    { name: 'Projected Annual Cost', value: calc.projectedCost / 1_000_000_000, color: '#10b981' },
  ];

  const kpiCards = [
    {
      Icon: Users,
      title: 'Employees Retained',
      value: calc.retained.toLocaleString(),
      sub: `${turnoverReduction}% reduction from total workforce`,
      accent: 'text-emerald-400',
      border: 'border-emerald-800/40',
      bg: 'bg-emerald-950/30',
    },
    {
      Icon: DollarSign,
      title: 'Estimated Cost Avoidance',
      value: fmtIDR(calc.costAvoidance),
      sub: 'Based on replacement cost per employee',
      accent: 'text-emerald-400',
      border: 'border-emerald-800/40',
      bg: 'bg-emerald-950/30',
    },
    {
      Icon: TrendingUp,
      title: 'Net Financial Impact',
      value: (calc.netImpact >= 0 ? '+' : '') + fmtIDR(calc.netImpact),
      sub: 'After deducting IDR 2B investment',
      accent: calc.netImpact >= 0 ? 'text-emerald-400' : 'text-rose-400',
      border: calc.netImpact >= 0 ? 'border-emerald-800/40' : 'border-rose-800/40',
      bg: calc.netImpact >= 0 ? 'bg-emerald-950/30' : 'bg-rose-950/30',
    },
  ];

  const interpretations = [
    'Turnover reduction has the highest financial leverage among all HR initiatives',
    'Upskilling and retention programs directly translate into measurable cost savings',
    'Investment efficiency increases as retention improves â€” compounding returns over time',
  ];

  return (
    <section id="roi" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-slate-800/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">

        {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="max-w-3xl">
          <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">
            Financial Simulation
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-1 leading-tight">
            HR Investment Impact Simulation
          </h2>
          <p className="text-slate-400 text-lg font-medium">
            Turnover Reduction Scenario
          </p>
          <p className="text-slate-500 text-sm max-w-xl leading-relaxed mt-2">
            Estimating financial impact of reducing employee turnover through targeted HR interventions
          </p>
          <div className="w-12 h-0.5 bg-emerald-500 mt-5" />
        </div>

        {/* â”€â”€ Body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* LEFT: Inputs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="lg:col-span-2 space-y-5">

            {/* Key Assumptions */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info size={13} className="text-slate-500" />
                <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase">
                  Key Assumptions
                </h3>
              </div>
              <div className="divide-y divide-slate-700/60">
                {[
                  { label: 'Total Employees', value: '5,000' },
                  { label: 'Current Turnover Rate', value: '20% — 1,000 exits / yr' },
                  { label: 'Avg. Monthly Salary', value: 'IDR 15,000,000' },
                  { label: 'Replacement Cost Multiplier', value: '1.5x annual salary' },
                  { label: 'Cost per Replacement', value: 'IDR 270,000,000' },
                  { label: 'Total HR Investment', value: 'IDR 2 Billion' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between py-2.5 gap-4">
                    <span className="text-slate-500 text-xs">{row.label}</span>
                    <span className="text-slate-200 text-xs font-semibold tabular-nums text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scenario Sliders */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-7">
              <div className="flex items-center gap-2">
                <ChevronRight size={14} className="text-emerald-400" />
                <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase">
                  Scenario Inputs
                </h3>
              </div>

              <Slider
                label="Turnover Reduction"
                min={0} max={15} step={1}
                value={turnoverReduction}
                onChange={setTurnoverReduction}
                display={`${turnoverReduction}%`}
                accentCls="text-emerald-400"
                accentHex="#10b981"
              />

              <Slider
                label="Training Completion Rate"
                min={0} max={100} step={5}
                value={trainingCompletion}
                onChange={setTrainingCompletion}
                display={`${trainingCompletion}%`}
                accentCls="text-blue-400"
                accentHex="#60a5fa"
              />

              {/* Dynamic business logic note */}
              <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-4">
                <div className="flex items-start gap-2.5">
                  <Lightbulb size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Each employee replacement costs{' '}
                    <span className="text-slate-200 font-semibold">~IDR 270M</span> annually.
                    Reducing turnover by{' '}
                    <span className="text-emerald-400 font-semibold">{turnoverReduction}%</span>{' '}
                    prevents{' '}
                    <span className="text-emerald-400 font-semibold">~{calc.retained.toLocaleString()} exits</span>,
                    resulting in significant cost avoidance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Outputs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="lg:col-span-3 space-y-5">

            {/* KPI Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {kpiCards.map((card) => {
                const Icon = card.Icon;
                return (
                  <div key={card.title} className={`rounded-2xl border ${card.border} ${card.bg} p-5 flex flex-col gap-3`}>
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Icon size={13} />
                      <span>{card.title}</span>
                    </div>
                    <div className={`text-2xl font-extrabold tabular-nums leading-tight ${card.accent}`}>
                      {card.value}
                    </div>
                    <p className="text-slate-500 text-xs leading-snug">{card.sub}</p>
                  </div>
                );
              })}
            </div>

            {/* Bar Chart */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h3 className="text-white text-sm font-bold">
                    Turnover Cost Comparison{' '}
                    <span className="text-slate-500 font-normal">(Annual)</span>
                  </h3>
                  <p className="text-slate-600 text-xs mt-0.5">Values in IDR Billion</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" />
                    <span className="text-slate-400">Current</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                    <span className="text-slate-400">Projected</span>
                  </span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 4 }} barSize={72}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }}
                    tickLine={false} axisLine={false} />
                  <YAxis stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }}
                    tickLine={false} axisLine={false}
                    tickFormatter={(v: number) => `${v.toFixed(0)}B`} domain={[0, 320]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                    <LabelList dataKey="value" position="top"
                      formatter={(v: number) => `IDR ${v.toFixed(0)}B`}
                      style={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center gap-2">
                <ArrowRight size={12} className="text-emerald-500 flex-shrink-0" />
                <p className="text-slate-400 text-xs">
                  Even a modest reduction in turnover delivers outsized financial impact.
                </p>
              </div>
            </div>

            {/* Strategic Interpretation */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <ChevronRight size={14} className="text-emerald-400" />
                <h3 className="text-white text-sm font-bold">Strategic Interpretation</h3>
              </div>
              <div className="space-y-3">
                {interpretations.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

