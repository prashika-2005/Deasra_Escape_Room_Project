import React from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { 
  TrendingDown, 
  Users, 
  AlertCircle, 
  MessageSquare, 
  Clock, 
  MapPin, 
  FileSearch, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Chit } from '../../types/gameTypes';
import { STARTUP_BOARD_DATA } from '../../data/gameData';

interface StartupBoardModalProps {
  chits: Chit[];
  founderFileReconstructed: boolean;
  onInspectFragment: (id: number) => void;
  onOpenReconstruction: () => void;
  onClose: () => void;
}

export default function StartupBoardModal({
  chits,
  founderFileReconstructed,
  onInspectFragment,
  onOpenReconstruction,
  onClose,
}: StartupBoardModalProps) {
  const foundCount = chits.filter((c) => c.found).length;
  const allFound = foundCount === 5;

  return (
    <InspectionOverlayWrapper
      title="NOVALINK STARTUP INTELLIGENCE BOARD"
      subtitle="Wall 2 • Operational Dossier & Founder's Investigation"
      badge="WALL 2 • SECTOR 02"
      onClose={onClose}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-6">
        {/* ================= PROMINENT CENTER: URGENT INTERNAL INVESTIGATION ================= */}
        <div className="relative bg-gradient-to-br from-amber-950/70 via-slate-900 to-slate-950 border-2 border-amber-500/70 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          {/* Background red stamp watermark */}
          <div className="absolute -right-4 -bottom-4 rotate-12 border-4 border-rose-600/30 text-rose-500/30 px-6 py-2 rounded-xl font-black text-2xl uppercase tracking-widest pointer-events-none select-none">
            CLASSIFIED // INTERNAL
          </div>

          <div className="flex items-start justify-between flex-wrap gap-3 border-b border-amber-500/40 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                <FileSearch className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  PINNED TO BOARD CENTER // FOUNDER'S DIRECTIVE
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {STARTUP_BOARD_DATA.urgentInvestigationNotice.title}
                </h3>
              </div>
            </div>

            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 tracking-wider">
              {STARTUP_BOARD_DATA.urgentInvestigationNotice.classification}
            </span>
          </div>

          {/* Letter Body */}
          <div className="space-y-3 font-serif text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl">
            {STARTUP_BOARD_DATA.urgentInvestigationNotice.body.map((line, idx) => (
              <p
                key={idx}
                className={
                  line.includes("FIND THE FIVE FRAGMENTS")
                    ? "font-sans font-black text-amber-300 text-base sm:text-lg uppercase tracking-wide my-2"
                    : line.includes("Reconstruct the Founder’s Investigation File")
                    ? "font-sans font-bold text-white bg-amber-950/60 border-l-4 border-amber-400 pl-3 py-1 my-1"
                    : ""
                }
              >
                {line}
              </p>
            ))}
            <div className="pt-2 text-right font-serif italic text-amber-300 text-sm sm:text-base">
              {STARTUP_BOARD_DATA.urgentInvestigationNotice.signoff}
            </div>
          </div>

          {/* Mission Objective Bar */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4 bg-slate-950/70 p-4 rounded-2xl border">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
              <div>
                <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                  MISSION 01
                </div>
                <div className="text-sm font-black text-white uppercase tracking-wide">
                  RECONSTRUCT THE FOUNDER'S FILE
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">RECOVERED:</span>
                <span className="text-base font-black text-amber-400">
                  {foundCount} / 5 FRAGMENTS
                </span>
              </div>

              {allFound ? (
                <button
                  onClick={onOpenReconstruction}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-emerald-400 hover:from-amber-400 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2 hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{founderFileReconstructed ? "VIEW RECONSTRUCTED FILE" : "RECONSTRUCT FILE NOW"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="text-xs text-slate-400 italic bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  Search Wall 2 environmental clues below
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= THE 5 ENVIRONMENTAL FRAGMENT LEADS ================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>THE 5 FOUNDER FILE FRAGMENTS ({foundCount}/5 RECOVERED)</span>
            </h4>
            <span className="text-[11px] text-slate-400">
              Click any lead to inspect environmental location
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {chits.map((chit) => (
              <div
                key={chit.id}
                onClick={() => onInspectFragment(chit.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none hover:scale-[1.02] ${
                  chit.found
                    ? 'bg-emerald-950/40 border-emerald-700/60 hover:border-emerald-500'
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1.5">
                    <span className="font-mono text-amber-400 font-bold">PIECE {chit.fragmentNumber}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${chit.found ? 'bg-emerald-900 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                      {chit.found ? 'RECOVERED ✓' : 'HIDDEN'}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white leading-tight mb-1">
                    {chit.locationTitle}
                  </h5>
                  <p className="text-[11px] text-slate-400 italic line-clamp-2 leading-relaxed">
                    "{chit.environmentalClue}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-cyan-400 font-bold">
                  <span>{chit.found ? 'Inspect Paper' : 'Search Area'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ORGANIZED STARTUP INTELLIGENCE SECTIONS ================= */}
        <div>
          <div className="mb-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              NOVALINK ARCHIVES & OPERATIONAL AUDIT
            </h4>
            <p className="text-[11px] text-slate-400">
              Examine these sections for clues regarding symptoms vs underlying causes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STARTUP_BOARD_DATA.sections.map((sec) => (
              <div
                key={sec.id}
                className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 space-y-2.5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-xs font-black text-white uppercase tracking-wider">
                    {sec.title}
                  </h5>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                    {sec.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {sec.content}
                </p>
                <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-2.5 text-[11px] text-amber-200/90 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-300 font-semibold">Investigator Foreshadowing:</strong> {sec.insight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InspectionOverlayWrapper>
  );
}
