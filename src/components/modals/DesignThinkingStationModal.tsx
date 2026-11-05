import React, { useState } from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { CheckCircle2, ChevronRight, Compass, Search, FileText } from 'lucide-react';
import { DESIGN_THINKING_STAGES, ACTIVITY_2_QUESTIONS, ACTIVITY_3_CASES } from '../../data/gameData';
import GameQuizRunner from '../ui/GameQuizRunner';

interface DesignThinkingStationModalProps {
  explored: {
    empathize: boolean;
    define: boolean;
    ideate: boolean;
    prototype: boolean;
    test: boolean;
  };
  activity2Complete: boolean;
  activity3Complete: boolean;
  onExploreStage: (stage: 'empathize' | 'define' | 'ideate' | 'prototype' | 'test') => void;
  onCompleteActivity2: () => void;
  onCompleteActivity3: () => void;
  onClose: () => void;
}

export default function DesignThinkingStationModal({
  explored,
  activity2Complete,
  activity3Complete,
  onExploreStage,
  onCompleteActivity2,
  onCompleteActivity3,
  onClose,
}: DesignThinkingStationModalProps) {
  const allExplored = Object.values(explored).every(Boolean);

  const [activeTab, setActiveTab] = useState<'stages' | 'activity2' | 'activity3'>(
    activity2Complete ? (activity3Complete ? 'stages' : 'activity3') : allExplored ? 'activity2' : 'stages'
  );

  const [selectedStageKey, setSelectedStageKey] = useState<keyof typeof explored>('empathize');

  const handleStageClick = (key: keyof typeof explored) => {
    setSelectedStageKey(key);
    onExploreStage(key);
  };

  const selectedStage = DESIGN_THINKING_STAGES.find((s) => s.id === selectedStageKey) || DESIGN_THINKING_STAGES[0];

  return (
    <InspectionOverlayWrapper
      title="WALL 3: DESIGN THINKING INTERACTIVE BOARD"
      subtitle="Five Stages Framework & Diagnostic Checkpoints"
      badge="WALL 3"
      onClose={onClose}
      maxWidth="max-w-5xl"
    >
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('stages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'stages'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>1. The 5 Stages</span>
          {allExplored && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <button
          onClick={() => setActiveTab('activity2')}
          disabled={!allExplored}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'activity2'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
              : allExplored
              ? 'bg-slate-800/80 text-slate-400 hover:text-white'
              : 'opacity-50 cursor-not-allowed bg-slate-900 text-slate-500'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>2. Activity 2 (5 MCQs)</span>
          {activity2Complete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <button
          onClick={() => setActiveTab('activity3')}
          disabled={!activity2Complete}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'activity3'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
              : activity2Complete
              ? 'bg-slate-800/80 text-slate-400 hover:text-white'
              : 'opacity-50 cursor-not-allowed bg-slate-900 text-slate-500'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>3. Activity 3 (3 Scenarios)</span>
          {activity3Complete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>

      {/* ================= TAB 1: THE 5 STAGES ================= */}
      {activeTab === 'stages' && (
        <div className="space-y-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">
            Click each phase below to analyze its core methodology:
          </p>

          {/* 5 Stage Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {DESIGN_THINKING_STAGES.map((stage) => {
              const isSelected = stage.id === selectedStageKey;
              const isExplored = explored[stage.id as keyof typeof explored];

              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageClick(stage.id as keyof typeof explored)}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                      {stage.tagline}
                    </span>
                    {isExplored && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <div className="font-bold text-sm tracking-tight">{stage.name}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage View */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                {selectedStage.tagline}
              </span>
              <span className="text-[11px] font-mono text-slate-500">STAGE METHODOLOGY</span>
            </div>

            <p className="text-base text-slate-200 leading-relaxed">
              {selectedStage.description}
            </p>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-1">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block text-[11px]">
                KEY DESIGN THINKING PRINCIPLE:
              </span>
              <p className="text-slate-300 italic text-sm">
                "{selectedStage.keyInsight}"
              </p>
            </div>
          </div>

          {/* Next Action Unlock */}
          {allExplored && !activity2Complete && (
            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab('activity2')}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>PROCEED TO ACTIVITY 2 (5 MCQs)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: ACTIVITY 2 (5 MCQs) ================= */}
      {activeTab === 'activity2' && (
        <GameQuizRunner
          questions={ACTIVITY_2_QUESTIONS}
          onComplete={() => {
            onCompleteActivity2();
            setActiveTab('activity3');
          }}
          completionTitle="ACTIVITY 2 COMPLETE ✓"
          completionSubtitle="Design thinking framework mastered. Ready for scenario investigation."
          badgePrefix="QUESTION"
          actionButtonLabel="PROCEED TO ACTIVITY 3 SCENARIOS"
        />
      )}

      {/* ================= TAB 3: ACTIVITY 3 (3 SCENARIOS) ================= */}
      {activeTab === 'activity3' && (
        <GameQuizRunner
          questions={ACTIVITY_3_CASES.map((c) => ({
            id: c.code,
            code: c.code,
            title: c.title,
            scenario: c.scenario,
            question: c.question,
            options: c.options,
            correctAnswer: c.correctAnswer,
            explanation: c.explanation,
          }))}
          onComplete={() => {
            onCompleteActivity3();
            onClose();
          }}
          completionTitle="DESIGN THINKING DETECTIVE COMPLETE ✓"
          completionSubtitle="All startup case scenarios diagnosed. Evidence File unlocked on Wall 4."
          badgePrefix="CASE"
          actionButtonLabel="CONTINUE TO WALL 4 EVIDENCE FILE"
        />
      )}
    </InspectionOverlayWrapper>
  );
}
