import React, { useState } from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { BookOpen, CheckCircle2, AlertCircle, Sparkles, ChevronRight, HelpCircle, ArrowDown } from 'lucide-react';
import { FIVE_WHYS_DATA } from '../../data/gameData';

interface NotebookStationModalProps {
  activity6Complete: boolean;
  fiveWhysComplete: boolean;
  onSubmitInvestigation: () => void;
  onClose: () => void;
}

export default function NotebookStationModal({
  activity6Complete,
  fiveWhysComplete,
  onSubmitInvestigation,
  onClose,
}: NotebookStationModalProps) {
  const [activeTab, setActiveTab] = useState<'template' | 'fiveWhys' | 'solutions'>(
    fiveWhysComplete ? 'solutions' : 'template'
  );

  // Template State
  const [problemDescription, setProblemDescription] = useState(
    activity6Complete
      ? 'NOVALINK promised 15-minute quick delivery, but orders are arriving severely delayed, cold, or missing items, causing customer cancellations to hit 45% and app store ratings to drop to 1.9 stars.'
      : 'NOVALINK promised 15-minute quick delivery, but orders are arriving severely delayed, cold, or missing items, causing customer cancellations to hit 45% and app store ratings to drop to 1.9 stars.'
  );

  const [signs, setSigns] = useState([
    'Riders waiting 35+ minutes at kitchen front doors for bags.',
    'Kitchen staff desperately juggling 4 separate tablets and WhatsApp groups.',
    'Surge in 1-star reviews citing cold food, missing drinks, and poor support.',
  ]);

  const [impact, setImpact] = useState(
    'Customers lose trust and abandon the app; riders lose hourly wages and refuse shifts; the startup suffers $120k in refunds and risks imminent bankruptcy.'
  );

  // 5 Whys State: track step 0 to 4 answers
  const [whysAnswers, setWhysAnswers] = useState<Record<number, number>>(() => {
    if (fiveWhysComplete) {
      const initial: Record<number, number> = {};
      FIVE_WHYS_DATA.forEach((w) => {
        initial[w.step] = w.correctOption;
      });
      return initial;
    }
    return {};
  });

  const [currentWhyStep, setCurrentWhyStep] = useState(1);
  const [whyFeedback, setWhyFeedback] = useState<string | null>(null);

  // Solutions State
  const [solutions, setSolutions] = useState([
    'Deploy a unified digital dispatch aggregator software to automatically route tickets to cooks and riders.',
    'Temporarily cap flash promo discounts to align order volume with current kitchen preparation capacity.',
    'Redesign the physical staging and pickup zone at the cloud kitchen for rapid, friction-free driver handoffs.',
  ]);

  const [reflections, setReflections] = useState(
    'Learned that surface symptoms (bad reviews, late food) are not the root cause. The true problem was strategic: chasing viral growth before establishing operational and technical infrastructure.'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 5 Whys Logic
  const activeWhy = FIVE_WHYS_DATA.find((w) => w.step === currentWhyStep) || FIVE_WHYS_DATA[0];
  const stepAnswer = whysAnswers[activeWhy.step];
  const isStepDone = stepAnswer !== undefined;

  const handleSelectWhyOption = (optIdx: number) => {
    setWhysAnswers((prev) => ({ ...prev, [activeWhy.step]: optIdx }));

    if (optIdx === activeWhy.correctOption) {
      setWhyFeedback('Correct insight. This reveals the next layer down.');
    } else {
      setWhyFeedback('Notice that this option describes a secondary symptom rather than the direct preceding cause. Consider the deeper operational connection.');
    }
  };

  const handleNextWhyStep = () => {
    setWhyFeedback(null);
    if (currentWhyStep < 5) {
      setCurrentWhyStep((prev) => prev + 1);
    } else {
      setActiveTab('solutions');
    }
  };

  const allWhysDone = Object.keys(whysAnswers).length === 5 &&
    FIVE_WHYS_DATA.every((w) => whysAnswers[w.step] === w.correctOption);

  const handleSubmitFinal = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitInvestigation();
    }, 600);
  };

  return (
    <InspectionOverlayWrapper
      title="INVESTIGATOR NOTEBOOK: ROOT CAUSE RESOLUTION"
      subtitle="Final Desk • Activity 6 Problem Template & The 5 Whys Challenge"
      badge="FINAL DESK"
      onClose={onClose}
      maxWidth="max-w-5xl"
    >
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('template')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
            activeTab === 'template'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Problem Template</span>
        </button>

        <button
          onClick={() => setActiveTab('fiveWhys')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
            activeTab === 'fiveWhys'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>2. The 5 Whys Ladder</span>
          {allWhysDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <button
          onClick={() => setActiveTab('solutions')}
          disabled={!allWhysDone}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
            activeTab === 'solutions'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
              : allWhysDone
              ? 'bg-slate-800/80 text-slate-400 hover:text-white'
              : 'opacity-50 cursor-not-allowed bg-slate-900 text-slate-500'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>3. Solutions & Submission</span>
          {fiveWhysComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>

      {/* ================= SECTION 1: ACTIVITY 6 PROBLEM IDENTIFICATION TEMPLATE ================= */}
      {activeTab === 'template' && (
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              ACTIVITY 6: PROBLEM IDENTIFICATION TEMPLATE
            </span>

            {/* Field 1 */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                1. WHAT'S THE PROBLEM?
              </label>
              <p className="text-[11px] text-slate-400">
                In your own words, tell us what’s bugging you or causing trouble:
              </p>
              <textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            {/* Field 2 */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                2. WHAT'S GOING WRONG?
              </label>
              <p className="text-[11px] text-slate-400">
                What signs show there’s a problem? What’s acting up?
              </p>
              <div className="space-y-2">
                {signs.map((sign, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={sign}
                      onChange={(e) => {
                        const next = [...signs];
                        next[idx] = e.target.value;
                        setSigns(next);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Field 3 */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                3. HOW DOES IT MESS THINGS UP?
              </label>
              <p className="text-[11px] text-slate-400">
                How does this problem affect the startup, customers and employees?
              </p>
              <textarea
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveTab('fiveWhys')}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>PROCEED TO 5 WHYS LADDER</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: THE 5 WHYS CHALLENGE ================= */}
      {activeTab === 'fiveWhys' && (
        <div className="space-y-6">
          {/* Ladder overview */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {FIVE_WHYS_DATA.map((w) => {
              const isSelected = w.step === currentWhyStep;
              const isDone = whysAnswers[w.step] === w.correctOption;

              return (
                <button
                  key={w.step}
                  onClick={() => setCurrentWhyStep(w.step)}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-600 border-amber-400 text-white shadow-md'
                      : isDone
                      ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>{`WHY #${w.step}`}</span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* Active Why Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                LEVEL {activeWhy.step} OF 5: DRILLING DOWN TO THE ROOT CAUSE
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                {activeWhy.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {activeWhy.options.map((opt, idx) => {
                const isSelected = whysAnswers[activeWhy.step] === idx;
                const isCorrect = idx === activeWhy.correctOption;
                let btnStyle = 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white';

                if (isStepDone) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-950/80 border-red-500/80 text-red-200';
                  } else {
                    btnStyle = 'bg-slate-900/40 border-slate-800/50 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isStepDone && isCorrect}
                    onClick={() => handleSelectWhyOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug pt-0.5">{opt}</span>
                  </button>
                );
              })}
            </div>

            {whyFeedback && (
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  stepAnswer === activeWhy.correctOption
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                    : 'bg-red-950/40 border-red-800 text-red-200'
                }`}
              >
                {stepAnswer === activeWhy.correctOption ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <p className="text-xs leading-relaxed">{whyFeedback}</p>
              </div>
            )}

            {isStepDone && stepAnswer === activeWhy.correctOption && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextWhyStep}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>
                    {currentWhyStep < 5 ? `PROCEED TO WHY #${currentWhyStep + 1}` : 'FINISH 5 WHYS & PROPOSE SOLUTIONS'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= SECTION 3: SOLUTIONS, REFLECTION & SUBMIT ================= */}
      {activeTab === 'solutions' && (
        <div className="space-y-6">
          {/* Root Cause Conclusion Plaque */}
          <div className="bg-gradient-to-r from-emerald-950/80 to-slate-950 border border-emerald-800/80 rounded-2xl p-5 sm:p-6 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                ROOT CAUSE FORMULATION: IDENTIFIED ✓
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Premature Marketing Scaling Without Operational & Technical Infrastructure
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The startup aggressively chased user acquisition and order volume via 50% discounts before creating an automated, integrated order-handling and dispatch system. Manual handoffs between disparate tablets collapsed under load, creating the cascading delays, cold food, and cancellations.
            </p>
          </div>

          {/* 3 Solutions Brainstorm */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
              3 ACTIONABLE RESTRUCTURING SOLUTIONS
            </span>

            <div className="space-y-2.5">
              {solutions.map((sol, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0 mt-1">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={sol}
                    onChange={(e) => {
                      const next = [...solutions];
                      next[idx] = e.target.value;
                      setSolutions(next);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              ))}
            </div>

            {/* Reflection */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                REFLECTION & KEY TAKEAWAYS:
              </label>
              <textarea
                value={reflections}
                onChange={(e) => setReflections(e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            {/* Submit Investigation Button */}
            <div className="pt-4 flex justify-end">
              <button
                disabled={isSubmitting}
                onClick={handleSubmitFinal}
                id="btn-submit-investigation"
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-900/50 transition-all cursor-pointer flex items-center gap-2.5 hover:scale-[1.02]"
              >
                <span>{isSubmitting ? 'VERIFYING WITH NOVALINK OS...' : 'SUBMIT INVESTIGATION & UNLOCK EXIT'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </InspectionOverlayWrapper>
  );
}
