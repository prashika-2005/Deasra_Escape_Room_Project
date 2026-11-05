import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { StationId, WallId } from '../../types/gameTypes';
import WallNav from './WallNav';

interface GameHUDProps {
  activeStation: StationId;
  currentWall: WallId;
  onSelectWall: (wall: WallId) => void;
  progressPercent: number;
  chitsCount: number;
  evidenceCount: number;
  currentObjective: string;
  hoveredObject: string | null;
  founderFileReconstructed?: boolean;
  activity1Complete?: boolean;
  activity2Complete?: boolean;
  activity3Complete?: boolean;
  activity4Complete?: boolean;
  activity5Complete?: boolean;
  exitUnlocked?: boolean;
  onOpenReconstruction?: () => void;
  onStepBack: () => void;
  onSelectStation: (station: StationId) => void;
  toastMessage: string | null;
}

export default function GameHUD({
  activeStation,
  currentWall,
  onSelectWall,
  progressPercent,
  chitsCount,
  evidenceCount,
  currentObjective,
  hoveredObject,
  founderFileReconstructed = false,
  activity1Complete = false,
  activity2Complete = false,
  activity3Complete = false,
  activity4Complete = false,
  activity5Complete = false,
  exitUnlocked = false,
  onOpenReconstruction,
  onStepBack,
  onSelectStation,
  toastMessage,
}: GameHUDProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-3 sm:p-5 select-none">
      {/* ================= TOP BAR ================= */}
      <div className="flex items-start justify-between gap-4">
        {/* Top Left: Game Title & Active Station indicator */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="bg-slate-900/90 border border-slate-800/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <div>
              <h1 className="text-xs font-black tracking-wider uppercase text-white leading-none">
                THE BROKEN STARTUP
              </h1>
              <p className="text-[10px] text-cyan-400 font-semibold tracking-wide uppercase mt-0.5">
                NOVALINK INVESTIGATION
              </p>
            </div>
          </div>

          {/* If inside an inspection, Step Back button */}
          {activeStation !== 'overview' && (
            <button
              onClick={onStepBack}
              id="hud-step-back-btn"
              className="pointer-events-auto flex items-center gap-2 px-3 py-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Step Back</span>
              <span className="text-[9px] text-slate-400 bg-slate-950 px-1 py-0.5 rounded border border-slate-800">ESC</span>
            </button>
          )}
        </div>

        {/* Top Right: Progress & Investigation Counters */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Founder File Fragments Counter */}
          <div className="bg-slate-900/90 border border-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">FOUNDER FILE:</span>
            {founderFileReconstructed ? (
              <span className="text-xs font-black text-emerald-400">
                RESTORED ✓
              </span>
            ) : (
              <span className={`text-xs font-black ${chitsCount === 5 ? 'text-amber-400 animate-pulse' : 'text-slate-200'}`}>
                {chitsCount}/5
              </span>
            )}
          </div>

          {/* Quick Reconstruct Button when all 5 fragments found but not yet assembled */}
          {chitsCount === 5 && !founderFileReconstructed && onOpenReconstruction && (
            <button
              onClick={onOpenReconstruction}
              className="pointer-events-auto px-3 py-1.5 bg-gradient-to-r from-amber-500 to-emerald-400 hover:from-amber-400 text-slate-950 text-xs font-black rounded-xl uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer animate-bounce flex items-center gap-1.5"
            >
              <span>Reconstruct File</span>
            </button>
          )}

          {/* Evidence Counter */}
          <div className="bg-slate-900/90 border border-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">EVIDENCE:</span>
            <span className={`text-xs font-black ${evidenceCount === 6 ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {evidenceCount}/6
            </span>
          </div>

          {/* Progress Percent */}
          <div className="bg-slate-900/90 border border-slate-800/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-2.5">
            <div className="w-14 bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-black text-white">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="self-center bg-slate-900/95 border border-cyan-500/60 shadow-2xl shadow-cyan-950/60 text-cyan-300 px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= HOVER CONTEXTUAL PROMPT ================= */}
      {hoveredObject && (
        <div className="self-center bg-slate-950/90 border border-cyan-500/80 shadow-xl px-4 py-1.5 rounded-full text-cyan-300 text-xs font-black tracking-widest uppercase animate-pulse">
          {hoveredObject}
        </div>
      )}

      {/* ================= BOTTOM BAR: CURRENT OBJECTIVE + WALL NAVIGATION ================= */}
      <div className="flex flex-col items-center gap-1.5 sm:gap-2 max-w-2xl mx-auto w-full">
        {/* Objective Pill */}
        <div className="bg-slate-900/95 border border-slate-800/90 backdrop-blur-md px-4 sm:px-6 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 text-center">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] sm:text-[11px]">
              CURRENT OBJECTIVE:
            </span>
            <span className="font-semibold text-white">
              {currentObjective}
            </span>
          </div>
        </div>

        {/* Tactical In-Game Wall Navigation Bar */}
        <WallNav
          currentWall={currentWall}
          onSelectWall={onSelectWall}
          founderFileReconstructed={founderFileReconstructed}
          chitsFoundCount={chitsCount}
          activity1Complete={activity1Complete}
          activity2Complete={activity2Complete}
          activity3Complete={activity3Complete}
          activity4Complete={activity4Complete}
          activity5Complete={activity5Complete}
          exitUnlocked={exitUnlocked}
        />

        {/* Exploration controls reminder */}
        <p className="text-[10px] text-slate-400/90 font-medium tracking-wide">
          Drag mouse to look around • Click stations to investigate • Click wall buttons to orient
        </p>
      </div>
    </div>
  );
}
