import React from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { Lock, Unlock, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface ExitTerminalModalProps {
  exitUnlocked: boolean;
  rootCauseIdentified: boolean;
  onEscape: () => void;
  onClose: () => void;
}

export default function ExitTerminalModal({
  exitUnlocked,
  rootCauseIdentified,
  onEscape,
  onClose,
}: ExitTerminalModalProps) {
  return (
    <InspectionOverlayWrapper
      title="WALL 1: NOVALINK SECURITY EXIT ACCESS TERMINAL"
      subtitle="Main Facility Ingress & Egress Lockdown Controller"
      badge="WALL 1"
      onClose={onClose}
      maxWidth="max-w-xl"
    >
      <div className="py-6 flex flex-col items-center text-center space-y-6">
        {/* Lock Status Icon */}
        <div
          className={`w-20 h-20 rounded-3xl border flex items-center justify-center shadow-xl ${
            exitUnlocked
              ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-400 shadow-emerald-950/60'
              : 'bg-rose-950/80 border-rose-600/80 text-rose-400 shadow-rose-950/60'
          }`}
        >
          {exitUnlocked ? <Unlock className="w-10 h-10" /> : <Lock className="w-10 h-10" />}
        </div>

        {/* Digital Terminal Status Screen */}
        <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left font-mono space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
            <span className="text-slate-400 font-bold uppercase">NOVALINK SECURE OS v3.4</span>
            <span className={exitUnlocked ? 'text-emerald-400' : 'text-rose-400'}>
              {exitUnlocked ? 'OVERRIDE AUTHORIZED' : 'SECTOR LOCKDOWN ACTIVE'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">ROOT CAUSE:</span>
              <span className={rootCauseIdentified ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                {rootCauseIdentified ? 'IDENTIFIED ✓' : 'UNKNOWN ✕'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">INVESTIGATION REPORT:</span>
              <span className={exitUnlocked ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                {exitUnlocked ? 'COMPLETE & APPROVED ✓' : 'INCOMPLETE ✕'}
              </span>
            </div>

            <div className="flex justify-between border-t border-slate-800 pt-2">
              <span className="text-slate-400 font-bold">SECURITY DOOR:</span>
              <span className={exitUnlocked ? 'text-emerald-400 font-black text-sm' : 'text-rose-400 font-black text-sm'}>
                {exitUnlocked ? 'UNLOCKED ✓' : 'LOCKED ✕'}
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Message */}
        <p className="text-sm text-slate-300 max-w-md leading-relaxed">
          {exitUnlocked
            ? 'The facility doors have unlocked. The heavy steel door has unlatched, revealing the bright illuminated exit corridor. You have cracked the case of the broken startup!'
            : 'EXIT LOCKED: The startup problem has not been solved yet. Complete the investigation notebook on the desk, climb the 5 Whys ladder, and submit your restructuring solutions.'}
        </p>

        {/* Action Button */}
        {exitUnlocked ? (
          <button
            onClick={onEscape}
            id="btn-escape-now"
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-emerald-900/50 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <span>STEP THROUGH THE EXIT & ESCAPE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
          >
            RETURN TO INVESTIGATION
          </button>
        )}
      </div>
    </InspectionOverlayWrapper>
  );
}
