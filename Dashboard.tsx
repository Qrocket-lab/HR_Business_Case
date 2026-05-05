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
} from 'recharts';
import {
  TrendingDown,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  ChevronRight,
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_EMPLOYEES = 5_000;
const AVG_MONTHLY_SALARY = 15_000_000; // IDR
const REPLACEMENT_COST_PER_EMPLOYEE = AVG_MONTHLY_SALARY * 12 * 1.5; // IDR 270,000,000
const TOTAL_BUDGET = 2_000_000_000; // IDR 2 Billion
const CURRENT_TURNOVER_RATE = 0.2; // 20%
const CURRENT_TURNOVER_HEADCOUNT = TOTAL_EMPLOYEES * CURRENT_TURNOVER_RATE; // 1,000

// ─── Sample talent profile for formula display ────────────────────────────────
const SAMPLE_PROFILE = {
  SEA: 78,
  CEX: 82,
  QDD: 70,
  IQ: 75,
  Papi_T: 45,
  Papi_G: 40,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatIDR(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (abs >= 1_000_000_000) return `${sign}IDR ${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}IDR ${(abs / 1_000_000).toFixed(0)}M`;
  return `${sign}IDR ${abs.toLocaleString('id-ID')}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
      <ChevronRight size={16} className="text-emerald-400 flex-shrink-0" />
      {children}
    </h2>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-800 rounded-2xl p-6 border border-slate-700 ${className}`}>
      {children}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [turnoverReduction, setTurnoverReduction] = useState(5); // percentage points (0–15)
  const [trainingCompletion, setTrainingCompletion] = useState(80); // % (0–100)

  // ── Derived financials ──────────────────────────────────────────────────────
  const metrics = useMemo(() => {
    const savedEmployees = Math.round(TOTAL_EMPLOYEES * (turnoverReduction / 100));
    const totalSavings = savedEmployees * REPLACEMENT_COST_PER_EMPLOYEE;
    const netROI = totalSavings - TOTAL_BUDGET;
    const roiPct = ((netROI / TOTAL_BUDGET) * 100).toFixed(1);

    const currentTurnoverCost = CURRENT_TURNOVER_HEADCOUNT * REPLACEMENT_COST_PER_EMPLOYEE;
    const projectedHeadcount = CURRENT_TURNOVER_HEADCOUNT - savedEmployees;
    const projectedTurnoverCost = projectedHeadcount * REPLACEMENT_COST_PER_EMPLOYEE;

    return {
      savedEmployees,
      totalSavings,
      netROI,
      roiPct,
      currentTurnoverCost,
      projectedTurnoverCost,
    };
  }, [turnoverReduction]);

  // ── Talent Success Score ────────────────────────────────────────────────────
  const talentScore = (
    0.3 * SAMPLE_PROFILE.SEA +
    0.2 * SAMPLE_PROFILE.CEX +
    0.15 * SAMPLE_PROFILE.QDD +
    0.15 * SAMPLE_PROFILE.IQ -
    0.1 * SAMPLE_PROFILE.Papi_T -
    0.1 * SAMPLE_PROFILE.Papi_G
  ).toFixed(1);

  // ── Chart data ──────────────────────────────────────────────────────────────
  const chartData = [
    { name: 'Current Cost', value: metrics.currentTurnoverCost / 1_000_000_000, color: '#f43f5e' },
    { name: 'Projected Cost', value: metrics.projectedTurnoverCost / 1_000_000_000, color: '#10b981' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="mb-8">
        <p className="text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2 flex items-center gap-2">
          <Award size={14} /> Project Horizon · ABC Corporation
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          HR Intervention ROI Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Re-engineering the Employee Lifecycle for a Digital Era
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── LEFT COLUMN ── */}
        <div className="space-y-6">

          {/* Scenario Controls */}
          <Card>
            <SectionTitle>Scenario Controls</SectionTitle>
            <p className="text-slate-500 text-xs mb-5">Adjust sliders to model different outcomes</p>

            {/* Slider 1 — Turnover Reduction */}
            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-sm text-slate-400">Projected Turnover Reduction</label>
                <span className="text-emerald-400 font-bold text-xl tabular-nums">
                  {turnoverReduction}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                step={1}
                value={turnoverReduction}
                onChange={(e) => setTurnoverReduction(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500 bg-slate-700"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>0%</span><span>15%</span>
              </div>
            </div>

            {/* Slider 2 — Training Completion */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-sm text-slate-400">Training Completion Rate</label>
                <span className="text-blue-400 font-bold text-xl tabular-nums">
                  {trainingCompletion}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={trainingCompletion}
                onChange={(e) => setTrainingCompletion(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 bg-slate-700"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>0%</span><span>100%</span>
              </div>
            </div>
          </Card>

          {/* Budget Allocation */}
          <Card>
            <SectionTitle>Budget Allocation</SectionTitle>
            <div className="text-center my-4">
              <div className="text-2xl font-bold text-white">IDR 2.00B</div>
              <div className="text-slate-500 text-xs mt-0.5">Total Intervention Budget</div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Upskilling & Technical Training', pct: 45, amount: '900M', barColor: 'bg-emerald-500' },
                { label: 'Managerial Retention & Coaching', pct: 30, amount: '600M', barColor: 'bg-blue-500' },
                { label: 'HR Analytics & Digital Infra', pct: 25, amount: '500M', barColor: 'bg-violet-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-slate-300 font-medium">IDR {item.amount} ({item.pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className={`${item.barColor} h-1.5 rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Employees Saved */}
            <Card className="!p-5">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                <Users size={14} /><span>Employees Saved</span>
              </div>
              <div className="text-3xl font-bold text-emerald-400 tabular-nums">
                {metrics.savedEmployees.toLocaleString()}
              </div>
              <div className="text-slate-500 text-xs mt-1">
                of {CURRENT_TURNOVER_HEADCOUNT.toLocaleString()} at-risk employees
              </div>
            </Card>

            {/* Total Savings */}
            <Card className="!p-5">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                <DollarSign size={14} /><span>Total Savings</span>
              </div>
              <div className="text-3xl font-bold text-emerald-400 tabular-nums">
                {formatIDR(metrics.totalSavings)}
              </div>
              <div className="text-slate-500 text-xs mt-1">replacement cost avoided</div>
            </Card>

            {/* Net ROI */}
            <div
              className={`rounded-2xl p-5 border ${
                metrics.netROI >= 0
                  ? 'bg-emerald-950/50 border-emerald-700/40'
                  : 'bg-rose-950/50 border-rose-700/40'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs mb-3 ${
                  metrics.netROI >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {metrics.netROI >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>Net ROI</span>
              </div>
              <div
                className={`text-3xl font-bold tabular-nums ${
                  metrics.netROI >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {metrics.netROI >= 0 ? '+' : ''}{formatIDR(metrics.netROI)}
              </div>
              <div className="text-slate-500 text-xs mt-1">
                {metrics.roiPct}% return on investment
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <Card>
            <SectionTitle>Turnover Cost Comparison</SectionTitle>
            <p className="text-slate-500 text-xs mb-5 ml-6">
              Annual replacement cost — Current vs. Projected scenario (IDR Billion)
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis
                  stroke="#475569"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickFormatter={(v: number) => `${v.toFixed(1)}B`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '10px',
                    color: '#f1f5f9',
                    fontSize: '13px',
                  }}
                  formatter={(value: number) => [`IDR ${value.toFixed(3)}B`, 'Turnover Cost']}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={80}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Talent Success Formula */}
          <Card>
            <SectionTitle>Talent Match Intelligence — Success Formula</SectionTitle>
            <p className="text-slate-500 text-xs mb-4 ml-6">
              Statistical model identifying high-potential employees for the new tech environment
            </p>

            {/* Formula */}
            <div className="bg-slate-900/70 rounded-xl p-4 mb-5 border border-slate-700/60 font-mono text-xs md:text-sm leading-relaxed text-slate-300 overflow-x-auto">
              Score{' '}={' '}
              <span className="text-emerald-400 font-semibold">(0.30 × SEA)</span>
              {' '}+{' '}
              <span className="text-emerald-400 font-semibold">(0.20 × CEX)</span>
              {' '}+{' '}
              <span className="text-blue-400 font-semibold">(0.15 × QDD)</span>
              {' '}+{' '}
              <span className="text-blue-400 font-semibold">(0.15 × IQ)</span>
              {' '}−{' '}
              <span className="text-rose-400 font-semibold">(0.10 × PAPI_T)</span>
              {' '}−{' '}
              <span className="text-rose-400 font-semibold">(0.10 × PAPI_G)</span>
            </div>

            {/* Attribute Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {(
                [
                  { key: 'SEA', desc: 'Self-Efficacy', weight: '+30%', val: SAMPLE_PROFILE.SEA, variant: 'emerald' },
                  { key: 'CEX', desc: 'Stakeholder Focus', weight: '+20%', val: SAMPLE_PROFILE.CEX, variant: 'emerald' },
                  { key: 'QDD', desc: 'Quality-Driven', weight: '+15%', val: SAMPLE_PROFILE.QDD, variant: 'blue' },
                  { key: 'IQ', desc: 'Intelligence', weight: '+15%', val: SAMPLE_PROFILE.IQ, variant: 'blue' },
                  { key: 'PAPI-T', desc: 'Risk Factor T', weight: '−10%', val: SAMPLE_PROFILE.Papi_T, variant: 'rose' },
                  { key: 'PAPI-G', desc: 'Risk Factor G', weight: '−10%', val: SAMPLE_PROFILE.Papi_G, variant: 'rose' },
                ] as const
              ).map((attr) => {
                const colorMap = {
                  emerald: { label: 'text-emerald-400', bar: 'bg-emerald-500' },
                  blue: { label: 'text-blue-400', bar: 'bg-blue-500' },
                  rose: { label: 'text-rose-400', bar: 'bg-rose-500' },
                } as const;
                const c = colorMap[attr.variant];
                return (
                  <div
                    key={attr.key}
                    className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-xs font-bold ${c.label}`}>{attr.key}</span>
                      <span className="text-xs text-slate-500">{attr.weight}</span>
                    </div>
                    <div className="text-white font-semibold text-xl tabular-nums">{attr.val}</div>
                    <div className="text-slate-500 text-xs mb-2">{attr.desc}</div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div className={`${c.bar} h-1.5 rounded-full`} style={{ width: `${attr.val}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Score Result */}
            <div className="flex items-center justify-between bg-gradient-to-r from-emerald-950/60 to-blue-950/60 rounded-xl p-4 border border-emerald-800/30">
              <div>
                <div className="text-white font-semibold text-sm">Talent Success Score</div>
                <div className="text-slate-500 text-xs mt-0.5">
                  Sample profile · High-Readiness Tier
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-extrabold text-emerald-400 tabular-nums">
                  {talentScore}
                </div>
                <div className="text-emerald-700 text-xs">/ 100</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ── KPI Target Footer ── */}
      <Card className="mt-6">
        <SectionTitle>Target KPIs — End of Program</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {[
            { label: 'Annual Turnover Rate', from: '20%', to: '15%', Icon: TrendingDown, color: 'emerald' },
            { label: 'Employee Engagement', from: '60%', to: '75%', Icon: TrendingUp, color: 'emerald' },
            { label: 'Certification Rate (500)', from: '0%', to: '90%', Icon: Award, color: 'blue' },
          ].map(({ label, from, to, Icon, color }) => (
            <div
              key={label}
              className="flex items-center gap-4 bg-slate-900/40 rounded-xl p-4 border border-slate-700/50"
            >
              <Icon
                size={28}
                className={color === 'emerald' ? 'text-emerald-400 flex-shrink-0' : 'text-blue-400 flex-shrink-0'}
              />
              <div>
                <div className="text-slate-400 text-xs">{label}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-rose-400 font-semibold">{from}</span>
                  <ChevronRight size={14} className="text-slate-600" />
                  <span
                    className={`text-xl font-bold ${color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'}`}
                  >
                    {to}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 text-center text-slate-700 text-xs">
        Project Horizon · ABC Corporation HR Strategy · IDR 2B Investment · FY2026
      </div>
    </div>
  );
}
