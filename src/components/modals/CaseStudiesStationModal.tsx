import React from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { CASE_STUDIES } from '../../data/gameData';
import GameQuizRunner from '../ui/GameQuizRunner';
import { Lock } from 'lucide-react';

interface CaseStudiesStationModalProps {
  unlocked?: boolean;
  activity5Complete: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export default function CaseStudiesStationModal({
  unlocked = true,
  activity5Complete,
  onComplete,
  onClose,
}: CaseStudiesStationModalProps) {
  if (!unlocked) {
    return (
      <InspectionOverlayWrapper
        title="CENTRAL DESK: CASE INVESTIGATION"
        subtitle="Mission 5 • Access Restricted"
        badge="MISSION 5 • LOCKED"
        onClose={onClose}
        maxWidth="max-w-md"
      >
        <div className="py-8 flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-950/60 border border-rose-600/40 flex items-center justify-center text-rose-400">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-rose-400">STATUS: 🔒 RESTRICTED</span>
            <h3 className="text-lg font-black text-white uppercase">COMPLETE MISSION 4 FIRST</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
            You must activate and reconstruct the <span className="text-cyan-400 font-bold">Product Time Machine (Mission 4)</span> on Wall 4 before inspecting the central case studies.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer"
          >
            RETURN TO INVESTIGATION
          </button>
        </div>
      </InspectionOverlayWrapper>
    );
  }

  return (
    <InspectionOverlayWrapper
      title="CENTRAL DESK: 5 PROBLEM-SOLVING CASE STUDIES"
      subtitle="Activity 5 • Real-World Context Diagnostic Dossiers"
      badge="ACTIVITY 5"
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <GameQuizRunner
        questions={CASE_STUDIES.map((c) => ({
          id: c.id,
          code: c.code,
          title: `${c.code}: ${c.title}`,
          scenario: c.context,
          question: c.question,
          options: c.options,
          correctAnswer: c.correctAnswer,
          explanation: c.explanation,
        }))}
        onComplete={() => {
          onComplete();
          onClose();
        }}
        completionTitle="ACTIVITY 5 COMPLETE ✓"
        completionSubtitle="All 5 real-world case study investigations solved and validated."
        badgePrefix="CASE"
        actionButtonLabel="RETURN TO INVESTIGATION DESK"
      />
    </InspectionOverlayWrapper>
  );
}
