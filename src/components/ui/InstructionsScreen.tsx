import React from 'react';
import { MousePointer, Move, Eye, CornerUpLeft, ArrowRight, AlertTriangle } from 'lucide-react';

interface InstructionsScreenProps {
  onEnter: () => void;
}

const MISSION_STEPS = [
  'Explore the NOVALINK office.',
  'Examine Wall 2: The Startup Intelligence Board.',
  'Search environmental clues for the 5 Founder File Fragments.',
  'Reconstruct the Founder\'s Investigation File.',
  'Unlock the Knowledge Box on Wall 3.',
  'Watch the learning module.',
  'Complete the problem-solving activities.',
  'Learn Design Thinking.',
  'Investigate NOVALINK\'s evidence.',
  'Complete Product Back-tracking.',
  'Solve the case studies.',
  'Organize the startup evidence.',
  'Complete the 5 Whys.',
  'Identify the root cause.',
  'Propose 3 solutions.',
  'Submit your investigation.',
  'Unlock the exit.',
];

export default function InstructionsScreen({ onEnter }: InstructionsScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950 text-slate-100 overflow-y-auto">
      <div className="relative max-w-3xl w-full max-h-[94vh] flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-6 sm:p-8 pb-4 text-center border-b border-slate-800 bg-slate-900/90 shrink-0">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            HOW TO PLAY
          </h2>
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-400 mt-1 uppercase">
            INVESTIGATE. LEARN. SOLVE. ESCAPE.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Mouse Controls Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              PRIMARY MOUSE CONTROLS
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col items-center text-center">
                <MousePointer className="w-5 h-5 text-cyan-400 mb-1.5" />
                <span className="text-xs font-bold text-white">LEFT CLICK</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Interact with objects</span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col items-center text-center">
                <Move className="w-5 h-5 text-cyan-400 mb-1.5" />
                <span className="text-xs font-bold text-white">MOUSE DRAG</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Look around office</span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col items-center text-center">
                <Eye className="w-5 h-5 text-cyan-400 mb-1.5" />
                <span className="text-xs font-bold text-white">HOVER</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Find interactive objects</span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col items-center text-center">
                <CornerUpLeft className="w-5 h-5 text-cyan-400 mb-1.5" />
                <span className="text-xs font-bold text-white">ESC KEY</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Step back to room</span>
              </div>
            </div>
          </div>

          {/* 15-Step Roadmap */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              YOUR 15-STEP INVESTIGATION ROADMAP
            </h3>
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300 font-medium">
                {MISSION_STEPS.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                    <span className="w-4 h-4 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/80 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Important Principle Alert Box */}
          <div className="bg-amber-950/30 border border-amber-800/60 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p className="font-bold text-amber-300">
                CRITICAL INVESTIGATION DIRECTIVE:
              </p>
              <p className="leading-relaxed">
                You cannot simply guess the final answer. Look carefully. Read the evidence. Connect the clues. Think about symptoms versus problems. Ask WHY. Your goal is not just to solve the puzzles. Your goal is to discover the REAL problem.
              </p>
            </div>
          </div>
        </div>

        {/* Enter Button */}
        <div className="p-5 sm:p-6 border-t border-slate-800 bg-slate-900/90 flex justify-center shrink-0">
          <button
            onClick={onEnter}
            id="btn-enter-office"
            className="w-full sm:w-auto px-10 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
          >
            <span>ENTER THE OFFICE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
