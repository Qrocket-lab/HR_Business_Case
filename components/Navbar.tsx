'use client';

import { useState, useEffect } from 'react';
import { BarChart2, Menu, X } from 'lucide-react';

const links = [
  { href: '#mandate', label: 'Mandate' },
  { href: '#root-cause', label: 'Root Cause' },
  { href: '#priority', label: 'Prioritization' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#budget', label: 'Budget' },
  { href: '#roi', label: 'Simulation' },
  { href: '#implementation', label: 'Roadmap' },
  { href: '#metrics', label: 'Metrics' },
  { href: '#conclusion', label: 'Conclusion' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1c1c1c]/75 backdrop-blur-2xl saturate-150 border-b border-white/10 shadow-lg shadow-black/30'
          : 'bg-[#1c1c1c]/10 backdrop-blur-sm border-b border-white/[0.04]'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#mandate" className="flex items-center gap-2 group">
          <BarChart2 size={18} className="text-[#DEFF9A]" />
          <span className="font-bold text-white text-sm tracking-wide group-hover:text-[#DEFF9A] transition-colors">
            Project Horizon
          </span>
          <span className="hidden sm:inline text-slate-600 text-xs ml-1">| ABC Corp</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium text-slate-400 hover:text-[#DEFF9A] transition-colors tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#roi"
            className="ml-2 bg-[#DEFF9A]/10 border border-[#DEFF9A]/30 hover:bg-[#DEFF9A]/20 text-[#DEFF9A] text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
          >
            Live Dashboard ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-[#1c1c1c]/85 backdrop-blur-2xl border-b border-white/10 px-4 pb-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-slate-400 hover:text-[#DEFF9A] transition-colors border-b border-white/5 last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
