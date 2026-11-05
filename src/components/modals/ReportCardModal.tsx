import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, RotateCcw, ShieldCheck, Sparkles, TrendingUp, Trophy } from 'lucide-react';

interface ReportCardModalProps {
  onRestart: () => void;
}

const ACHIEVEMENTS = [
  '5 Challenge Chits Found & Knowledge Box Unlocked',
  'Video Learning Module: Problem-Solving in Daily Life Mastered',
  'Activity 1: Problem-Solving Foundation (10/10 MCQs)',
  'Design Thinking 5 Stages & Activity 2 Completed',
  'Activity 3: Design Thinking Detective Scenarios Solved',
  'All 6 Classified Startup Evidence Folders Inspected',
  'Activity 4: 5.2.3 Product Back-Tracking & Checkpoint Completed',
  'Activity 5: 5 Real-World Problem-Solving Case Studies Solved',
  'Evidence Analysis Pinboard Categorized (8/8 Cards Correct)',
  'Activity 6: Problem Identification & Solving Template Documented',
  'The 5 Whys Ladder Mastered & Root Cause Identified',
  '3 Strategic Operational Solutions Formulated & Exit Unlocked',
];

export default function ReportCardModal({ onRestart }: ReportCardModalProps) {
  useEffect(() => {
    // Launch fireworks confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative max-w-3xl w-full max-h-[94vh] flex flex-col bg-slate-900 border border-emerald-600/50 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-100">
        {/* Celebration Header */}
        <div className="p-6 sm:p-8 pb-4 text-center border-b border-slate-800 bg-gradient-to-b from-emerald-950/40 to-slate-900/90 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>INVESTIGATION SOLVED • ESCAPE SUCCESSFUL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            THE BROKEN STARTUP RESOLVED
          </h2>
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-400 mt-1 uppercase">
            NOVALINK RESTRUCTURING PLAN SUBMITTED & APPROVED
          </p>
        </div>

        {/* Scrollable Summary Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Key Metrics Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">
              <Sparkles className="w-6 h-6 text-amber-400 mb-1" />
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                XP REWARD
              </span>
              <span className="text-2xl font-black text-amber-400">+1,450 XP</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">
              <Award className="w-6 h-6 text-cyan-400 mb-1" />
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                DETECTIVE RANK
              </span>
              <span className="text-xl font-black text-cyan-400">Master Problem Solver</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mb-1" />
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                BADGE UNLOCKED
              </span>
              <span className="text-base font-black text-emerald-400">Root Cause Detective</span>
            </div>
          </div>

          {/* Root Cause Recap */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                THE DISCOVERED ROOT CAUSE OF NOVALINK'S COLLAPSE:
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              "Aggressive pursuit of rapid user growth and promotional discounts without first designing and implementing automated, integrated order-handling and dispatch infrastructure. The resulting manual tablet handoffs created severe kitchen bottlenecks, delayed deliveries, and customer churn."
            </p>
          </div>

          {/* Checklist of Completed Educational Modules */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              SOLVED INVESTIGATION CHECKLIST (12/12):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {ACHIEVEMENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-slate-800 bg-slate-900/90 flex justify-center shrink-0">
          <button
            onClick={onRestart}
            id="btn-play-again"
            className="px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>PLAY AGAIN / RE-ENTER OFFICE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
