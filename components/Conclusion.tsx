'use client';

import { CheckCircle2, ArrowRight, Target, Lightbulb } from 'lucide-react';

const takeaways = [
  {
    number: '01',
    headline: 'Close the Fintech Skills Gap',
    body: 'Closing the fintech skills gap is the highest-impact intervention, directly enabling the technology transition and reducing capability-driven attrition.',
  },
  {
    number: '02',
    headline: 'Retain Mid-Level Managers',
    body: 'Retaining mid-level managers stabilizes execution and culture. Manager turnover is the single greatest multiplier of team disengagement and productivity loss.',
  },
  {
    number: '03',
    headline: 'Embed Data-Driven HR',
    body: 'Data-driven HR enables measurable and scalable impact, shifting HR from a cost center to a strategic lever with clear accountability.',
  },
];

export default function Conclusion() {
  return (
    <section id="conclusion" className="py-14 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#DEFF9A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">

        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#DEFF9A] text-xs font-semibold tracking-widest uppercase">
            Strategic Summary
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4 leading-tight">
            Conclusion &amp; Strategic Impact
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            A targeted, evidence-based program to transform ABC Corporation&#39;s workforce
            into a competitive advantage in the digital banking era.
          </p>
          <div className="w-16 h-0.5 bg-[#DEFF9A] mx-auto mt-6" />
        </div>

        {/* ── Key Takeaways ───────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Lightbulb size={15} className="text-amber-400" />
            <h3 className="text-white font-bold text-sm tracking-widest uppercase">
              3 Key Takeaways
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {takeaways.map((t) => (
              <div
                key={t.number}
                className="relative bg-[#3a3a3a]/80 border border-[#484848] rounded-2xl p-7 flex flex-col gap-4 hover:border-[#DEFF9A]/40 transition-colors"
              >
                {/* Large number */}
                <span className="text-6xl font-black text-slate-700/60 leading-none select-none">
                  {t.number}
                </span>
                <div className="space-y-2">
                  <h4 className="text-white font-bold text-base leading-snug">
                    {t.headline}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{t.body}</p>
                </div>
                <CheckCircle2
                  size={16}
                  className="text-[#DEFF9A] absolute top-6 right-6"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Final Statement ─────────────────────────────────────────────────── */}
<div className="bg-gradient-to-br from-[#3a3a3a] to-[#3a3a3a]/60 border border-[#484848] rounded-2xl p-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <Target size={40} className="text-[#DEFF9A] flex-shrink-0" />
          <div>
            <p className="text-base font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Final Statement
            </p>
            <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
              With a targeted{' '}
              <span className="text-[#DEFF9A] font-bold">IDR 2 Billion</span>{' '}
              investment, ABC Corporation can reduce turnover, improve engagement,
              and accelerate its transition into a{' '}
              <span className="text-[#DEFF9A] font-bold">digital-first bank</span>.
            </p>
          </div>
        </div>

        {/* ── Call to Action ──────────────────────────────────────────────────── */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#DEFF9A]/15 via-[#DEFF9A]/8 to-[#3a3a3a] border border-[#DEFF9A]/25 p-10 text-center">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)',
            }}
          />
          <div className="relative z-10 space-y-5">
            <p className="text-[#DEFF9A] text-xs font-bold tracking-widest uppercase">
              Call to Action
            </p>
            <p className="text-white text-2xl md:text-3xl font-extrabold leading-snug max-w-2xl mx-auto">
              Initiate a 30-Day Discovery Phase to validate assumptions and begin
              implementation.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="text-slate-400 text-sm">
                Aligned with ABC Corporation&apos;s digital transformation mandate
              </span>
              <ArrowRight size={14} className="text-[#DEFF9A]" />
            </div>
          </div>
        </div>

        {/* ── Prepared By ─────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between border-t border-[#383838] pt-8">
          <div>
            <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-1">
              Prepared by
            </p>
            <p className="text-white font-bold text-lg">Qodri Muhamad</p>
            <p className="text-slate-400 text-sm">Business Intelligence Analyst</p>
          </div>
          <div className="text-right">
            <p className="text-slate-600 text-xs">Project Horizon</p>
            <p className="text-slate-600 text-xs">ABC Corporation</p>
          </div>
        </div>

      </div>
    </section>
  );
}
