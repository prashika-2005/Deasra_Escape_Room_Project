import React, { useState } from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { CheckCircle2, ChevronRight, ChevronLeft, Award, Lock, BookOpen } from 'lucide-react';
import { ACTIVITY_1_QUESTIONS } from '../../data/gameData';
import GameQuizRunner from '../ui/GameQuizRunner';

interface KnowledgeStationModalProps {
  unlocked: boolean;
  activity1Complete: boolean;
  onCompleteActivity1: () => void;
  onClose: () => void;
}

const VIDEO_MODULE_SLIDES = [
  {
    title: '1. What Is a Genuine Problem?',
    content: 'A problem is not just a nuisance or a missing feature—it is a measurable gap between the current reality and the desired outcome. Premature solvers rush to build answers before truly understanding what is broken.',
  },
  {
    title: '2. Symptoms vs. Root Causes',
    content: 'A fever is a symptom; a bacterial infection is the cause. Treating the fever leaves the patient sick. In startups, declining renewals are symptoms—the broken user workflow is the underlying disease.',
  },
  {
    title: '3. The Foundation of Empathy',
    content: 'Design Thinking begins with Empathy: observing and listening to users without defensive bias. Unfiltered observation reveals the exact friction points customers face every single day.',
  },
  {
    title: '4. Reframing the Problem',
    content: 'Never accept the initial problem statement at face value. Frame problems around human needs rather than technical hurdles. Ask: "What fundamental job is the customer trying to get done?"',
  },
  {
    title: '5. The Power of the 5 Whys',
    content: 'Originating in the Toyota Production System, iteratively asking "Why?" five times strips away superficial excuses to expose the systemic process failure at the very foundation of an issue.',
  },
];

export default function KnowledgeStationModal({
  unlocked,
  activity1Complete,
  onCompleteActivity1,
  onClose,
}: KnowledgeStationModalProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'activity1'>('video');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [videoWatched, setVideoWatched] = useState(activity1Complete);

  if (!unlocked) {
    return (
      <InspectionOverlayWrapper
        title="METALLIC KNOWLEDGE BOX"
        subtitle="Wall 3 • Secure Learning Station"
        badge="WALL 3 • LOCKED"
        onClose={onClose}
        maxWidth="max-w-xl"
      >
        <div className="py-10 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-950/60 border border-amber-600/40 flex items-center justify-center text-amber-400">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white uppercase">
            KNOWLEDGE BOX IS LOCKED
          </h3>
          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
            The encrypted latch requires authentication from the <span className="text-amber-400 font-bold">reconstructed Founder's Investigation File</span> from Wall 2 (the Startup Intelligence sector).
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 max-w-sm">
            Inspect the environmental clues on Wall 2 to recover all 5 fragments and assemble the Founder's File on the workbench.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
          >
            RETURN TO EXPLORATION
          </button>
        </div>
      </InspectionOverlayWrapper>
    );
  }

  const currentSlide = VIDEO_MODULE_SLIDES[currentSlideIndex];

  return (
    <InspectionOverlayWrapper
      title="LEARNING STATION: KNOWLEDGE BOX"
      subtitle="Wall 3 • Educational Foundations & Problem-Solving Mastery"
      badge="WALL 3 • UNLOCKED"
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('video')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'video'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Learning Video Module</span>
          {videoWatched && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <button
          onClick={() => setActiveTab('activity1')}
          disabled={!videoWatched}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'activity1'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
              : videoWatched
              ? 'bg-slate-800/80 text-slate-400 hover:text-white'
              : 'opacity-50 cursor-not-allowed bg-slate-900 text-slate-500'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Activity 1 (5 Questions)</span>
          {activity1Complete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>

      {/* ================= TAB 1: VIDEO LEARNING MODULE ================= */}
      {activeTab === 'video' && (
        <div className="space-y-5">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
              <span>FOUNDATIONS SLIDE {currentSlideIndex + 1} OF {VIDEO_MODULE_SLIDES.length}</span>
              <span className="text-slate-500">VIDEO BRIEFING</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {currentSlide.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentSlide.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-900">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex((prev) => prev - 1)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>

              {currentSlideIndex < VIDEO_MODULE_SLIDES.length - 1 ? (
                <button
                  onClick={() => setCurrentSlideIndex((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer"
                >
                  <span>NEXT SLIDE</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setVideoWatched(true);
                    setActiveTab('activity1');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white rounded-lg shadow-lg shadow-emerald-900/40 transition-colors cursor-pointer"
                >
                  <span>START ACTIVITY 1</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: ACTIVITY 1 (5 Questions with Game UX) ================= */}
      {activeTab === 'activity1' && (
        <GameQuizRunner
          questions={ACTIVITY_1_QUESTIONS}
          onComplete={() => {
            onCompleteActivity1();
            onClose();
          }}
          completionTitle="ACTIVITY 1 COMPLETE ✓"
          completionSubtitle="Problem-solving diagnostic foundations verified."
          badgePrefix="QUESTION"
          actionButtonLabel="CONTINUE INVESTIGATION"
        />
      )}
    </InspectionOverlayWrapper>
  );
}
