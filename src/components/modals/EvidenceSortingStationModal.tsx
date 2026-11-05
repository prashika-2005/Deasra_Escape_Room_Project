import React, { useState } from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { EVIDENCE_SORTING_CARDS } from '../../data/gameData';
import { EvidenceCategory } from '../../types/gameTypes';

interface EvidenceSortingStationModalProps {
  evidenceSorted: boolean;
  onComplete: () => void;
  onClose: () => void;
}

const CATEGORIES: { key: EvidenceCategory; title: string; color: string; desc: string }[] = [
  {
    key: 'EFFECT',
    title: 'EFFECT',
    color: 'text-rose-400 border-rose-800 bg-rose-950/40',
    desc: 'The final business or financial consequence.',
  },
  {
    key: 'SYMPTOM',
    title: 'SYMPTOM',
    color: 'text-amber-400 border-amber-800 bg-amber-950/40',
    desc: 'Visible, observable signs of friction.',
  },
  {
    key: 'PROBLEM',
    title: 'PROBLEM',
    color: 'text-sky-400 border-sky-800 bg-sky-950/40',
    desc: 'Immediate operational breakdown.',
  },
  {
    key: 'UNDERLYING PROBLEM',
    title: 'UNDERLYING PROBLEM',
    color: 'text-purple-400 border-purple-800 bg-purple-950/40',
    desc: 'The fundamental root decision/failure.',
  },
];

export default function EvidenceSortingStationModal({
  evidenceSorted,
  onComplete,
  onClose,
}: EvidenceSortingStationModalProps) {
  // Mapping of card ID -> assigned category
  const [assignments, setAssignments] = useState<Record<string, EvidenceCategory>>(() => {
    if (evidenceSorted) {
      const initial: Record<string, EvidenceCategory> = {};
      EVIDENCE_SORTING_CARDS.forEach((c) => {
        initial[c.id] = c.correctCategory;
      });
      return initial;
    }
    return {};
  });

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(evidenceSorted);
  const [mistakes, setMistakes] = useState<string[]>([]);

  const unassignedCards = EVIDENCE_SORTING_CARDS.filter((c) => !assignments[c.id]);

  const handleCardClick = (id: string) => {
    if (evidenceSorted) return;
    setShowResult(false);
    setSelectedCardId(id === selectedCardId ? null : id);
  };

  const handleAssignToCategory = (cat: EvidenceCategory) => {
    if (!selectedCardId || evidenceSorted) return;
    setAssignments((prev) => ({ ...prev, [selectedCardId]: cat }));
    setSelectedCardId(null);
    setShowResult(false);
  };

  const handleRemoveFromCategory = (cardId: string) => {
    if (evidenceSorted) return;
    setShowResult(false);
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[cardId];
      return next;
    });
  };

  const handleCheckEvidence = () => {
    const wrong: string[] = [];
    EVIDENCE_SORTING_CARDS.forEach((card) => {
      if (assignments[card.id] !== card.correctCategory) {
        wrong.push(card.id);
      }
    });

    setMistakes(wrong);
    setShowResult(true);

    if (wrong.length === 0 && Object.keys(assignments).length === EVIDENCE_SORTING_CARDS.length) {
      onComplete();
    }
  };

  const isAllAssigned = Object.keys(assignments).length === EVIDENCE_SORTING_CARDS.length;

  return (
    <InspectionOverlayWrapper
      title="WALL 4: NOVALINK EVIDENCE ANALYSIS PINBOARD"
      subtitle="Classify Evidence into Effects, Symptoms, Problems & Underlying Problems"
      badge="WALL 4"
      onClose={onClose}
      maxWidth="max-w-6xl"
    >
      {/* Principle Instruction Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <p className="font-bold text-white uppercase tracking-wide">
            INVESTIGATION DIRECTIVE: DISTINGUISHING THE LAYERS OF TRUTH
          </p>
          <p className="leading-relaxed">
            Do not mistake an <span className="text-rose-400 font-semibold">Effect</span> (financial results) or a <span className="text-amber-400 font-semibold">Symptom</span> (visible warning signs) for the <span className="text-purple-400 font-semibold">Underlying Problem</span>. Tap a card, then tap a category column to pin it.
          </p>
        </div>
      </div>

      {/* 4 Category Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CATEGORIES.map((col) => {
          const cardsInCol = EVIDENCE_SORTING_CARDS.filter((c) => assignments[c.id] === col.key);

          return (
            <div
              key={col.key}
              onClick={() => selectedCardId && handleAssignToCategory(col.key)}
              className={`rounded-2xl border p-4 flex flex-col justify-between min-h-[220px] transition-all ${
                col.color
              } ${
                selectedCardId
                  ? 'cursor-pointer ring-2 ring-cyan-500/50 hover:border-cyan-400'
                  : ''
              }`}
            >
              <div className="space-y-3">
                <div className="border-b border-slate-800/80 pb-2">
                  <h4 className="text-xs font-black tracking-wider uppercase text-white">
                    {col.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                    {col.desc}
                  </p>
                </div>

                {/* Cards in this column */}
                <div className="space-y-2">
                  {cardsInCol.map((card) => {
                    const isMistake = showResult && mistakes.includes(card.id);

                    return (
                      <div
                        key={card.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromCategory(card.id);
                        }}
                        className={`p-2.5 rounded-xl border text-xs text-slate-200 transition-all ${
                          isMistake
                            ? 'bg-red-950 border-red-500 text-red-100 animate-pulse'
                            : 'bg-slate-900/90 border-slate-700/80 hover:bg-slate-800/90'
                        } cursor-pointer`}
                        title="Tap to unpin"
                      >
                        <p className="font-medium leading-snug">{card.text}</p>
                        {!evidenceSorted && (
                          <span className="text-[9px] text-slate-400 block mt-1 uppercase">
                            (Tap to remove)
                          </span>
                        )}
                      </div>
                    );
                  })}

                  {cardsInCol.length === 0 && (
                    <div className="text-center py-6 text-[11px] text-slate-600 italic">
                      {selectedCardId
                        ? 'Tap here to pin selected card'
                        : 'No cards pinned yet'}
                    </div>
                  )}
                </div>
              </div>

              {selectedCardId && (
                <button
                  onClick={() => handleAssignToCategory(col.key)}
                  className="mt-3 w-full py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  PIN CARD HERE
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Unassigned Cards Tray */}
      {unassignedCards.length > 0 && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            UNASSIGNED INVESTIGATION CARDS (TAP TO SELECT):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {unassignedCards.map((card) => {
              const isSelected = selectedCardId === card.id;

              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950 border-cyan-400 text-white ring-2 ring-cyan-400/40 shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-cyan-400 font-bold block mb-1 uppercase">
                    CARD #{card.id}
                  </span>
                  <span className="leading-snug">{card.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Result feedback */}
      {showResult && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 ${
            mistakes.length === 0
              ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
              : 'bg-red-950/40 border-red-800 text-red-200'
          }`}
        >
          {mistakes.length === 0 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs space-y-1">
            <p className="font-bold">
              {mistakes.length === 0
                ? 'EVIDENCE ORGANIZED PERFECTLY ✓'
                : `INCORRECT PLACEMENT (${mistakes.length} Cards misplaced)`}
            </p>
            <p className="leading-relaxed text-slate-300">
              {mistakes.length === 0
                ? 'All evidence is structured! Notice how the marketing surge without infrastructure created the immediate operational problem, manifesting as symptoms and severe business effects.'
                : 'Review the highlighted red cards. Remember: Effects are final business/reputation results, Symptoms are everyday warning signals, Problems are operational bottlenecks, and Underlying Problems are foundational leadership/strategy mistakes.'}
            </p>
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-400 font-mono">
          CARDS PINNED: {Object.keys(assignments).length} / {EVIDENCE_SORTING_CARDS.length}
        </span>

        {!evidenceSorted ? (
          <button
            disabled={!isAllAssigned}
            onClick={handleCheckEvidence}
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            CHECK EVIDENCE PINBOARD
          </button>
        ) : (
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>PINBOARD VALIDATED</span>
          </span>
        )}
      </div>
    </InspectionOverlayWrapper>
  );
}
