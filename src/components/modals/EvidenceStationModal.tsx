import React, { useState } from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { Lock, FileText, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import { EVIDENCE_DOCUMENTS } from '../../data/gameData';

interface EvidenceStationModalProps {
  unlocked: boolean;
  inspectedDocIds: number[];
  onInspectDocument: (id: number) => void;
  onClose: () => void;
}

export default function EvidenceStationModal({
  unlocked,
  inspectedDocIds,
  onInspectDocument,
  onClose,
}: EvidenceStationModalProps) {
  const [selectedDocId, setSelectedDocId] = useState<number>(1);

  if (!unlocked) {
    return (
      <InspectionOverlayWrapper
        title="FOUR-DRAWER EVIDENCE FILING CABINET"
        subtitle="Wall 4 • Classified Investigation Archives"
        badge="WALL 4 • LOCKED"
        onClose={onClose}
        maxWidth="max-w-xl"
      >
        <div className="py-10 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-600/40 flex items-center justify-center text-rose-400">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white uppercase">
            EVIDENCE CABINET IS LOCKED
          </h3>
          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
            The top drawer latch requires clearance from <span className="text-cyan-400 font-bold">Activity 3: Design Thinking Detective</span> on Wall 3.
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 max-w-sm">
            Complete the 5 Design Thinking case files on Wall 3 to automatically unlock this drawer.
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

  const selectedDoc = EVIDENCE_DOCUMENTS.find((d) => d.id === selectedDocId) || EVIDENCE_DOCUMENTS[0];
  const isInspected = inspectedDocIds.includes(selectedDoc.id);

  const handleSelectDoc = (id: number) => {
    setSelectedDocId(id);
    onInspectDocument(id);
  };

  return (
    <InspectionOverlayWrapper
      title="WALL 4: EVIDENCE FILING CABINET"
      subtitle="Classified Startup Records • Inspect All 6 Physical Documents"
      badge={`EVIDENCE: ${inspectedDocIds.length}/6 INSPECTED`}
      onClose={onClose}
      maxWidth="max-w-5xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left List of 6 Documents */}
        <div className="md:col-span-4 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">
            DOSSIER FOLDERS (6)
          </span>
          <div className="space-y-1.5">
            {EVIDENCE_DOCUMENTS.map((doc) => {
              const active = doc.id === selectedDocId;
              const inspected = inspectedDocIds.includes(doc.id);

              return (
                <button
                  key={doc.id}
                  onClick={() => handleSelectDoc(doc.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    active
                      ? 'bg-cyan-950 border-cyan-400 text-white shadow-lg'
                      : 'bg-slate-950/80 border-slate-800/90 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileText className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <div className="truncate">
                      <p className="text-xs font-bold truncate">{doc.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                        {doc.type}
                      </p>
                    </div>
                  </div>

                  {inspected ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Document Reader */}
        <div className="md:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  {selectedDoc.type}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                  {selectedDoc.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400 px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">
                DATE: {selectedDoc.date}
              </span>
            </div>

            {/* Document Content */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 text-sm text-slate-200 leading-relaxed font-sans space-y-2">
              {selectedDoc.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Detective Clue Highlight */}
            <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-amber-300 uppercase tracking-wide">
                  DETECTIVE CLUE INSIGHT:
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {selectedDoc.clueInsight}
                </p>
              </div>
            </div>
          </div>

          {/* Inspection Confirmation Footer */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
            <div className="flex items-center gap-2 text-xs">
              {isInspected ? (
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RECORDED IN INVESTIGATION LOG</span>
                </span>
              ) : (
                <span className="text-slate-400">Not yet recorded</span>
              )}
            </div>

            {!isInspected && (
              <button
                onClick={() => onInspectDocument(selectedDoc.id)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>MARK AS INSPECTED</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </InspectionOverlayWrapper>
  );
}
