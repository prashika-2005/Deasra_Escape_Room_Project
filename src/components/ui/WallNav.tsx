import React, { useState } from 'react';
import { Lock, Check, Compass, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { WallId } from '../../types/gameTypes';

interface WallNavProps {
  currentWall: WallId;
  onSelectWall: (wall: WallId) => void;
  founderFileReconstructed: boolean;
  chitsFoundCount: number;
  activity1Complete: boolean;
  activity2Complete: boolean;
  activity3Complete: boolean;
  activity4Complete: boolean;
  activity5Complete: boolean;
  exitUnlocked: boolean;
}

interface WallMeta {
  id: WallId;
  title: string;
  subtitle: string;
  code: string;
  stations: string[];
  isLocked: boolean;
  lockReason?: string;
  unlockedStatus?: string;
  isCompleted?: boolean;
}

export default function WallNav({
  currentWall,
  onSelectWall,
  founderFileReconstructed,
  chitsFoundCount,
  activity1Complete,
  activity2Complete,
  activity3Complete,
  activity4Complete,
  activity5Complete,
  exitUnlocked,
}: WallNavProps) {
  const [hoveredWall, setHoveredWall] = useState<WallId | null>(null);

  const walls: WallMeta[] = [
    {
      id: 'wall-1',
      title: 'WALL 1',
      subtitle: 'EXIT',
      code: 'SEC-01',
      stations: ['Facility Security Door', 'NOVALINK Master Keypad', 'Emergency Escape Terminal'],
      isLocked: !exitUnlocked,
      lockReason: 'Complete all 6 investigation stages and master analysis to disengage locks.',
      unlockedStatus: 'FACILITY ESCAPE UNLOCKED — Ready to evacuate.',
      isCompleted: exitUnlocked,
    },
    {
      id: 'wall-2',
      title: 'WALL 2',
      subtitle: 'STARTUP BOARD',
      code: 'SEC-02',
      stations: ['NOVALINK Corkboard', 'Urgent Investigation Notice', '5 Founder File Fragments'],
      isLocked: false,
      lockReason: undefined,
      unlockedStatus: founderFileReconstructed
        ? 'Founder\'s Investigation File fully assembled.'
        : `${chitsFoundCount}/5 Fragments Recovered. Inspect clues on Wall 2.`,
      isCompleted: founderFileReconstructed,
    },
    {
      id: 'wall-3',
      title: 'WALL 3',
      subtitle: 'LEARNING',
      code: 'SEC-03',
      stations: ['Metallic Knowledge Box', 'Design Thinking Framework Board', 'Founder Video Archives'],
      isLocked: !founderFileReconstructed,
      lockReason: 'Knowledge Box is LOCKED — Find all 5 Founder File Fragments on Wall 2 first.',
      unlockedStatus: activity3Complete
        ? 'Activities 1, 2 & 3 completed.'
        : activity1Complete
        ? 'Activity 1 complete. Explore Design Thinking stages.'
        : 'Knowledge Box UNLOCKED — Begin Activity 1.',
      isCompleted: activity3Complete,
    },
    {
      id: 'wall-4',
      title: 'WALL 4',
      subtitle: 'INVESTIGATION',
      code: 'SEC-04',
      stations: ['Evidence Filing Cabinet', 'Investigation Pinboard', 'Product Time Machine (Activity 4)'],
      isLocked: !activity3Complete,
      lockReason: 'Evidence File is LOCKED — Complete the Design Thinking Detective activity first.',
      unlockedStatus: activity4Complete
        ? 'Time Machine diagnostics & evidence analysis complete.'
        : 'Evidence Files UNLOCKED — Inspect the 4-drawer cabinet.',
      isCompleted: activity4Complete,
    },
    {
      id: 'center',
      title: 'CENTER',
      subtitle: 'CASE FILES',
      code: 'CORE',
      stations: ['Executive Investigation Desk', 'Activity 5 Case Studies', 'Leather Investigator Notebook (5 Whys)'],
      isLocked: !activity4Complete,
      lockReason: 'Case Studies LOCKED — Complete the Product Time Machine on Wall 4 first.',
      unlockedStatus: activity5Complete
        ? 'Case studies solved. Complete 5 Whys in the Notebook.'
        : 'Case Studies UNLOCKED — Analyze real-world failure patterns.',
      isCompleted: activity5Complete,
    },
  ];

  const hoveredMeta = walls.find((w) => w.id === hoveredWall);

  return (
    <div className="relative flex flex-col items-center">
      {/* ================= INVESTIGATION READOUT CARD (ON HOVER) ================= */}
      {hoveredMeta && (
        <div
          className="pointer-events-none absolute bottom-full mb-3 w-80 sm:w-96 bg-slate-950/95 border border-cyan-500/50 rounded-xl p-3.5 shadow-2xl shadow-cyan-950/80 backdrop-blur-md z-30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
        >
          {/* Top Bar with Code and Status Badge */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/80">
                {hoveredMeta.code}
              </span>
              <span className="text-xs font-black text-white tracking-wider">
                {hoveredMeta.title} // {hoveredMeta.subtitle}
              </span>
            </div>

            {hoveredMeta.isCompleted ? (
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                <Check className="w-3 h-3" /> READY
              </span>
            ) : hoveredMeta.isLocked ? (
              <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/60">
                <Lock className="w-3 h-3" /> LOCKED
              </span>
            ) : (
              <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/60">
                <Sparkles className="w-3 h-3" /> ACTIVE
              </span>
            )}
          </div>

          {/* Key Stations List */}
          <div className="mb-2.5">
            <div className="text-[9px] font-bold tracking-wider text-slate-400 uppercase mb-1">
              Sector Facilities:
            </div>
            <ul className="text-[11px] text-slate-300 space-y-0.5 pl-1">
              {hoveredMeta.stations.map((st, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-400/80 shrink-0" />
                  <span className="truncate">{st}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Status & Navigation Note */}
          <div
            className={`text-[10px] leading-relaxed p-2 rounded-lg border ${
              hoveredMeta.isLocked
                ? 'bg-amber-950/40 border-amber-800/50 text-amber-300'
                : hoveredMeta.isCompleted
                ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                : 'bg-slate-900/90 border-slate-800 text-slate-300'
            }`}
          >
            {hoveredMeta.isLocked ? (
              <div className="flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{hoveredMeta.lockReason}</span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{hoveredMeta.unlockedStatus}</span>
              </div>
            )}
          </div>

          <div className="mt-2 text-[9px] text-cyan-400/80 text-center font-mono uppercase tracking-wider">
            Click to rotate camera to {hoveredMeta.title}
          </div>
        </div>
      )}

      {/* ================= COMPACT WALL NAVIGATION DOCK ================= */}
      <div className="pointer-events-auto bg-slate-950/90 border border-slate-800/90 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl shadow-2xl flex items-center gap-1 sm:gap-1.5">
        {walls.map((wall) => {
          const isActive = currentWall === wall.id;

          return (
            <button
              key={wall.id}
              onClick={() => onSelectWall(wall.id)}
              onMouseEnter={() => setHoveredWall(wall.id)}
              onMouseLeave={() => setHoveredWall(null)}
              className={`group relative flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all duration-200 cursor-pointer min-w-[62px] sm:min-w-[78px] ${
                isActive
                  ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border border-cyan-400/80 text-white shadow-lg shadow-cyan-950/60 ring-1 ring-cyan-400/40'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={`Orient camera to ${wall.title}: ${wall.subtitle}`}
            >
              {/* Active illuminated top beacon dot */}
              {isActive && (
                <span className="absolute -top-1 w-2 h-1 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400 animate-pulse" />
              )}

              {/* Title & Status indicator */}
              <div className="flex items-center gap-1">
                <span
                  className={`text-[11px] sm:text-xs font-black tracking-wider ${
                    isActive ? 'text-cyan-300' : 'text-slate-200 group-hover:text-cyan-300'
                  }`}
                >
                  {wall.title}
                </span>

                {/* Status indicator icon */}
                {isActive ? (
                  <span className="text-[10px] font-black text-cyan-400">✓</span>
                ) : wall.isLocked ? (
                  <Lock className="w-2.5 h-2.5 text-amber-400/80 shrink-0" />
                ) : null}
              </div>

              {/* Subtitle */}
              <span
                className={`text-[8px] sm:text-[9px] font-bold tracking-tight uppercase truncate max-w-[66px] sm:max-w-[76px] ${
                  isActive
                    ? 'text-cyan-400/90'
                    : 'text-slate-400 group-hover:text-slate-300'
                }`}
              >
                {wall.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
