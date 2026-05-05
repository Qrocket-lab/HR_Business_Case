import { ChevronDown, TrendingDown, Users, Landmark } from 'lucide-react';

const stats = [
  {
    label: 'Total Employees',
    value: '5,000',
    sub: 'legacy workforce',
    Icon: Users,
    textCls: 'text-emerald-400',
    borderCls: 'border-emerald-800/40',
    bgCls: 'bg-emerald-950/50',
  },
  {
    label: 'Total Investment',
    value: 'IDR 2B',
    sub: 'strategic budget',
    Icon: Landmark,
    textCls: 'text-blue-400',
    borderCls: 'border-blue-800/40',
    bgCls: 'bg-blue-950/50',
  },
  {
    label: 'Current Turnover',
    value: '20%',
    sub: 'annual churn rate',
    Icon: TrendingDown,
    textCls: 'text-rose-400',
    borderCls: 'border-rose-800/40',
    bgCls: 'bg-rose-950/50',
  },
];

export default function Hero() {
  return (
    <section
      id="mandate"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-16"
    >
      {/* Grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16,185,129,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/40 rounded-full px-4 py-1.5 mb-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">
            Strategic HR Case Study · ABC Corporation · FY2026
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] mb-6">
          Project{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #34d399, #22d3ee)' }}
          >
            Horizon
          </span>
        </h1>

        <p className="text-xl md:text-2xl font-semibold text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
          Re-engineering the Employee Lifecycle for a Digital Era
        </p>
        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
          A critical inflection point where a 5,000-employee legacy workforce must transition into
          a tech-forward banking leader, backed by a data-driven IDR 2 Billion strategy.
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14">
          {stats.map(({ label, value, sub, Icon, textCls, borderCls, bgCls }) => (
            <div
              key={label}
              className={`${bgCls} border ${borderCls} rounded-2xl p-6 backdrop-blur-sm`}
            >
              <Icon size={22} className={`${textCls} mb-3 mx-auto`} />
              <div className={`text-3xl font-extrabold ${textCls} mb-1`}>{value}</div>
              <div className="text-slate-300 text-xs font-semibold mb-0.5">{label}</div>
              <div className="text-slate-600 text-xs">{sub}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#root-cause"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-8 py-3.5 rounded-full transition-colors text-sm"
        >
          Explore the Strategy
          <ChevronDown size={16} />
        </a>
      </div>

      {/* Bottom gradient */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0f172a, transparent)' }}
      />
    </section>
  );
}
