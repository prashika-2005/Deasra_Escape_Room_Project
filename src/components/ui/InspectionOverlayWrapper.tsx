import React, { useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';

interface InspectionOverlayWrapperProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  badge?: string;
  maxWidth?: string;
}

export default function InspectionOverlayWrapper({
  title,
  subtitle,
  onClose,
  children,
  badge,
  maxWidth = 'max-w-4xl',
}: InspectionOverlayWrapperProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full ${maxWidth} max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              id="btn-step-back"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer shadow-sm"
              title="Return to office view (ESC)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Step Back</span>
              <span className="text-[10px] text-slate-400 bg-slate-900/60 px-1 py-0.5 rounded border border-slate-700">ESC</span>
            </button>

            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">{title}</h2>
                {badge && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-modal"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
