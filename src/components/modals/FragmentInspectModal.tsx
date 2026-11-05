import React, { useState } from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { Chit } from '../../types/gameTypes';
import { 
  FileText, 
  Folder, 
  Archive, 
  Image as ImageIcon, 
  Award, 
  CheckCircle2, 
  ShieldAlert, 
  Search,
  Sparkles
} from 'lucide-react';

interface FragmentInspectModalProps {
  fragmentId: number;
  chits: Chit[];
  onCollectFragment: (id: number) => void;
  onClose: () => void;
  onOpenReconstruction?: () => void;
}

export default function FragmentInspectModal({
  fragmentId,
  chits,
  onCollectFragment,
  onClose,
  onOpenReconstruction,
}: FragmentInspectModalProps) {
  const chit = chits.find((c) => c.id === fragmentId) || chits[0];
  const isFound = chit.found;
  const [inspectingClue, setInspectingClue] = useState(true);
  const [isCollecting, setIsCollecting] = useState(false);

  const foundCount = chits.filter((c) => c.found).length;

  const handleCollect = () => {
    if (isFound) return;
    setIsCollecting(true);
    setTimeout(() => {
      onCollectFragment(chit.id);
      setIsCollecting(false);
    }, 400);
  };

  const getIcon = () => {
    switch (chit.id) {
      case 1:
        return <FileText className="w-6 h-6 text-amber-400" />;
      case 2:
        return <Folder className="w-6 h-6 text-cyan-400" />;
      case 3:
        return <Archive className="w-6 h-6 text-emerald-400" />;
      case 4:
        return <ImageIcon className="w-6 h-6 text-purple-400" />;
      case 5:
        return <Award className="w-6 h-6 text-rose-400" />;
      default:
        return <FileText className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <InspectionOverlayWrapper
      title={`INVESTIGATION LEAD — ${chit.locationTitle.toUpperCase()}`}
      subtitle={`Wall 2 Sector Clue • Founder File Fragment ${chit.fragmentNumber}`}
      badge={`FRAGMENT ${chit.fragmentNumber}`}
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Environmental Clue Context Banner */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shrink-0">
            {getIcon()}
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              ENVIRONMENTAL OBSERVATION
            </span>
            <h4 className="text-base font-bold text-white">
              {chit.locationTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-medium italic">
              "{chit.environmentalClue}"
            </p>
          </div>
        </div>

        {/* Physical Discovery Visual Container */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5">
          {/* Specific Physical Scene Breakdown */}
          {chit.id === 1 && (
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-[11px]">
                <Search className="w-4 h-4" />
                <span>Notice Board Inspection</span>
              </div>
              <p>
                Beneath an old, faded operations policy notice, you spot the dog-eared corner of heavy bond paper stamped in crimson ink: <span className="text-rose-400 font-bold tracking-wider">CONFIDENTIAL</span>. Gently peeling back the pinned notice exposes the complete document.
              </p>
            </div>
          )}

          {chit.id === 2 && (
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-[11px]">
                <Search className="w-4 h-4" />
                <span>Manila Folder Inspection</span>
              </div>
              <p>
                The side shelf contains numerous digital backup drives, but tucked into an ordinary manila folder labeled with a handwritten sticky note sits an unindexed physical typescript.
              </p>
            </div>
          )}

          {chit.id === 3 && (
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[11px]">
                <Search className="w-4 h-4" />
                <span>"BACKUP NOTES" Drawer Opened</span>
              </div>
              <p>
                The credenza drawer glides open smoothly. Inside, amid office stationery, receipts, and an unlabelled USB thumbdrive, lies an official stamped investigation dispatch note.
              </p>
            </div>
          )}

          {chit.id === 4 && (
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold uppercase text-[11px]">
                <Search className="w-4 h-4" />
                <span>Milestone Photo Frame Inspection</span>
              </div>
              <p>
                Inspecting the framed founding team photo on Wall 2 reveals a red <span className="text-rose-400 font-bold">CONFIDENTIAL</span> tab protruding from the wooden backing. Tilting the frame slightly frees the hidden page.
              </p>
            </div>
          )}

          {chit.id === 5 && (
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold uppercase text-[11px]">
                <Search className="w-4 h-4" />
                <span>Founder Desk & Plaque Inspection</span>
              </div>
              <p>
                On the executive desk beneath the glowing NOVALINK logo rests the brass nameplate of founder Alex Chen. Following the note "Start where the company began", you check beneath the leather notebook and find the concluding fragment.
              </p>
            </div>
          )}

          {/* Physical Document Fragment View */}
          <div className="relative bg-[#fbf9f4] text-slate-900 rounded-xl p-6 sm:p-7 shadow-2xl border-2 border-[#e6ded0] overflow-hidden transition-all duration-300">
            {/* Red Confidential Stamp watermark */}
            <div className="absolute top-4 right-4 rotate-12 border-2 border-rose-600/70 text-rose-600 px-3 py-1 rounded font-black text-xs uppercase tracking-widest pointer-events-none select-none">
              CONFIDENTIAL // NOVALINK
            </div>

            {/* Document Header */}
            <div className="border-b border-slate-300 pb-3 mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                  FOUNDER FILE FRAGMENT // PIECE {chit.fragmentNumber}
                </p>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 mt-0.5">
                  {chit.excerptTitle}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-200/80 px-2.5 py-1 rounded">
                PAGE {chit.id} OF 5
              </span>
            </div>

            {/* Document Content */}
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
              "{chit.excerptText}"
            </p>

            {/* Document Footer Signature */}
            <div className="mt-6 pt-3 border-t border-slate-300/80 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>AUTHENTICITY: FOUNDER ARCHIVE</span>
              <span className="italic font-serif text-slate-700">— Alex Chen, Founder & CEO</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
          <div className="text-xs text-slate-400 font-medium">
            Fragments Recovered: <span className="text-amber-400 font-bold">{isFound ? foundCount : foundCount + (isCollecting ? 1 : 0)} / 5</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>

            {!isFound ? (
              <button
                onClick={handleCollect}
                disabled={isCollecting}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isCollecting ? 'RECOVERING...' : `COLLECT FRAGMENT ${chit.fragmentNumber}`}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>FRAGMENT RECOVERED</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </InspectionOverlayWrapper>
  );
}
