import React, { useState } from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { Chit } from '../../types/gameTypes';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Move, 
  FileText,
  AlertTriangle
} from 'lucide-react';
import { FOUNDER_FILE_DOCUMENT } from '../../data/gameData';

interface ReconstructFileModalProps {
  chits: Chit[];
  alreadyReconstructed: boolean;
  onCompleteReconstruction: () => void;
  onProceedToKnowledgeBox: () => void;
  onClose: () => void;
}

export default function ReconstructFileModal({
  chits,
  alreadyReconstructed,
  onCompleteReconstruction,
  onProceedToKnowledgeBox,
  onClose,
}: ReconstructFileModalProps) {
  // Slots representing positions 1 to 5.
  // Initially, if not reconstructed, shuffle or place them partially unarranged.
  const [slots, setSlots] = useState<number[]>(() => {
    if (alreadyReconstructed) return [1, 2, 3, 4, 5];
    // Start with a slight jumble: e.g. [2, 1, 4, 3, 5] so the player has a satisfying snap-together interaction
    return [2, 1, 4, 3, 5];
  });
  const [isAssembled, setIsAssembled] = useState(alreadyReconstructed);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  const checkAssembled = (currentSlots: number[]) => {
    const isCorrect = currentSlots.every((val, idx) => val === idx + 1);
    if (isCorrect && !isAssembled) {
      setIsAssembled(true);
      onCompleteReconstruction();
    }
  };

  const handleSlotClick = (index: number) => {
    if (isAssembled) return;

    if (selectedSlotIndex === null) {
      setSelectedSlotIndex(index);
    } else {
      // Swap slots
      const updated = [...slots];
      const temp = updated[selectedSlotIndex];
      updated[selectedSlotIndex] = updated[index];
      updated[index] = temp;
      setSlots(updated);
      setSelectedSlotIndex(null);
      checkAssembled(updated);
    }
  };

  const handleQuickAssemble = () => {
    const correct = [1, 2, 3, 4, 5];
    setSlots(correct);
    setIsAssembled(true);
    onCompleteReconstruction();
  };

  return (
    <InspectionOverlayWrapper
      title={isAssembled ? "FOUNDER'S INVESTIGATION FILE RECONSTRUCTED" : "RECONSTRUCT THE FOUNDER'S FILE"}
      subtitle="Wall 2 Sector • Investigation File Assembly Workbench"
      badge={isAssembled ? "FILE RESTORED ✓" : "5 FRAGMENTS READY"}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Assembly Stage Header */}
        {!isAssembled ? (
          <div className="bg-amber-950/40 border border-amber-800/80 rounded-2xl p-4 sm:p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-900/60 border border-amber-600 flex items-center justify-center text-amber-300 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white uppercase tracking-wide">
                ALL FIVE FRAGMENTS RECOVERED
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                The founder's handwritten investigation notes were deliberately torn into five segments. Click two fragments to swap their positions into correct sequential order (Fragment 01 → Fragment 05) to reconstruct the full file.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-950/50 border border-emerald-700/80 rounded-2xl p-4 sm:p-5 flex items-start gap-4 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-500 flex items-center justify-center text-emerald-300 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-emerald-300 uppercase tracking-wide">
                FOUNDER'S INVESTIGATION FILE RECONSTRUCTED ✓
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                The paper fragments have seamlessly united. The founder's diagnostic summary reveals a critical lead regarding the nature of NOVALINK's failure.
              </p>
            </div>
          </div>
        )}

        {/* Workbench: 5 Fragments Display */}
        {!isAssembled ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Sequence Position (Slots 1 to 5):</span>
              <button
                onClick={handleQuickAssemble}
                className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
              >
                Auto-Snap In Order
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {slots.map((fragId, slotIdx) => {
                const chit = chits.find((c) => c.id === fragId)!;
                const isSelected = selectedSlotIndex === slotIdx;
                const isCorrect = fragId === slotIdx + 1;

                return (
                  <div
                    key={`slot-${slotIdx}`}
                    onClick={() => handleSlotClick(slotIdx)}
                    className={`relative cursor-pointer transition-all duration-200 rounded-xl p-3.5 border-2 flex flex-col justify-between select-none ${
                      isSelected
                        ? 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-400/50 scale-[1.03]'
                        : isCorrect
                        ? 'bg-slate-900/90 border-emerald-600/70 hover:border-emerald-500'
                        : 'bg-slate-900/90 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                      <span className="text-slate-400 font-bold">SLOT #{slotIdx + 1}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          isCorrect ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isCorrect ? 'SNAPPED ✓' : 'SWAP'}
                      </span>
                    </div>

                    <div className="bg-[#fbf9f4] text-slate-900 rounded-lg p-2.5 shadow border border-[#d8d0c0] space-y-1.5 min-h-[110px] flex flex-col justify-between">
                      <div>
                        <div className="text-[9px] font-black text-rose-700 uppercase tracking-widest border-b border-slate-300 pb-1">
                          FRAGMENT {chit?.fragmentNumber}
                        </div>
                        <p className="text-[10px] font-bold text-slate-800 line-clamp-2 mt-1 leading-tight">
                          {chit?.excerptTitle}
                        </p>
                      </div>
                      <p className="text-[9px] text-slate-600 line-clamp-3 font-serif italic">
                        "{chit?.excerptText}"
                      </p>
                    </div>

                    <div className="mt-2 text-[10px] text-center text-slate-400 font-medium">
                      {isSelected ? 'Click destination slot' : 'Click to select'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Assembled Full Document View */
          <div className="relative bg-[#fcfaf5] text-slate-900 rounded-2xl p-6 sm:p-9 shadow-2xl border-4 border-[#e2d8c6] overflow-hidden space-y-6">
            {/* Confidential Stamp Watermark */}
            <div className="absolute top-6 right-8 rotate-12 border-3 border-rose-600/80 text-rose-600 px-4 py-1.5 rounded-lg font-black text-sm uppercase tracking-widest pointer-events-none select-none">
              OFFICIAL ARCHIVE // CONFIDENTIAL
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-slate-400 pb-4">
              <div className="flex items-center gap-2 text-cyan-800 font-black tracking-widest text-xs uppercase mb-1">
                <FileText className="w-4 h-4" />
                <span>NOVALINK EXECUTIVE INCIDENT REPORT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-serif">
                {FOUNDER_FILE_DOCUMENT.title}
              </h2>
              <p className="text-xs text-slate-600 font-mono mt-1">
                CLASSIFICATION: {FOUNDER_FILE_DOCUMENT.classification} • AUTHOR: ALEX CHEN (FOUNDER & CEO)
              </p>
            </div>

            {/* Document Core Revelation */}
            <div className="space-y-3 font-serif text-slate-900 text-sm sm:text-base leading-relaxed">
              {FOUNDER_FILE_DOCUMENT.content.map((paragraph, idx) => (
                <p 
                  key={idx} 
                  className={
                    paragraph.includes("BUT THESE MAY ONLY BE SYMPTOMS")
                      ? "text-rose-700 font-sans font-black text-base sm:text-lg tracking-wide uppercase bg-rose-50 border-l-4 border-rose-600 pl-3 py-1.5 my-2"
                      : paragraph.includes("HOW TO IDENTIFY A PROBLEM PROPERLY")
                      ? "text-slate-950 font-bold bg-amber-100/80 px-2 py-1 rounded inline-block"
                      : ""
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Next Lead Banner (Connects to Knowledge Box) */}
            <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>NEXT LEAD IN THE INVESTIGATION</span>
              </div>
              <h4 className="text-lg font-black text-white">
                STATION: {FOUNDER_FILE_DOCUMENT.nextLead.station} (WALL 3)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                "{FOUNDER_FILE_DOCUMENT.nextLead.instruction}"
              </p>
            </div>

            {/* Document Sign-off */}
            <div className="pt-3 border-t border-slate-300 flex items-center justify-between text-xs text-slate-600 font-mono">
              <span>STATUS: RECONSTRUCTED & VERIFIED</span>
              <span className="font-serif italic text-slate-800 text-sm">— Alex Chen, Founder</span>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Window
          </button>

          {isAssembled && (
            <button
              onClick={onProceedToKnowledgeBox}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2.5 shadow-xl shadow-emerald-500/20 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Unlock className="w-4 h-4" />
              <span>PROCEED TO KNOWLEDGE BOX (WALL 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </InspectionOverlayWrapper>
  );
}
