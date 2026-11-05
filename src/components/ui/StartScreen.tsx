import React from 'react';
import { ShieldAlert, ChevronRight } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950 text-slate-100 overflow-y-auto">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-2xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center space-y-8">
        {/* Startup Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/50">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Cinematic Title & Story */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-400 text-xs font-semibold tracking-wider uppercase">
            Emergency Case Dossier
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase">
            THE BROKEN STARTUP
          </h1>
          <p className="text-xl sm:text-2xl font-bold tracking-wide text-red-400">
            NOVALINK IS FAILING.
          </p>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Something has gone catastrophic inside the startup. Orders are collapsing, customers are furious, and the leadership has locked down the office.
          </p>
        </div>

        {/* Mission Briefing Box */}
        <div className="w-full bg-slate-950/80 border border-slate-800/90 rounded-2xl p-6 text-left space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            YOUR MISSION:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-300 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>Investigate the office</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>Discover what happened</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>Identify the real problem</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>Find the root cause</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>Propose a solution</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>Unlock the exit</span>
            </li>
          </ul>
        </div>

        {/* Start Investigation Button */}
        <button
          onClick={onStart}
          id="btn-start-investigation"
          className="w-full sm:w-auto px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-base tracking-wide rounded-xl shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02]"
        >
          <span>START INVESTIGATION</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
