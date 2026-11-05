import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, ChevronRight, Sparkles, RefreshCw, Trophy, Zap } from 'lucide-react';

export interface QuizQuestionItem {
  id: number | string;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  scenario?: string;
  code?: string;
  title?: string;
}

interface GameQuizRunnerProps {
  questions: QuizQuestionItem[];
  onComplete: (score: number, total: number) => void;
  completionTitle: string;
  completionSubtitle?: string;
  badgePrefix?: string;
  autoAdvanceDelay?: number;
  onClose?: () => void;
  actionButtonLabel?: string;
}

export default function GameQuizRunner({
  questions,
  onComplete,
  completionTitle,
  completionSubtitle = 'Investigation findings verified.',
  badgePrefix = 'QUESTION',
  autoAdvanceDelay = 1300,
  onClose,
  actionButtonLabel = 'CONTINUE INVESTIGATION',
}: GameQuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [autoTimer, setAutoTimer] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSelect = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered && isCorrect) return; // already got it right

    const correct = key === currentQ.correctAnswer;
    setSelectedKey(key);
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      setScore((s) => s + 1);
      // Automatically advance after brief delay
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        handleAdvance();
      }, autoAdvanceDelay);
    }
  };

  const handleAdvance = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedKey(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleFinish = () => {
    onComplete(score, questions.length);
  };

  // Completion Screen
  if (isComplete) {
    const perfect = score === questions.length;
    return (
      <div className="py-6 px-4 sm:px-8 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-xl shadow-emerald-950/50">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-emerald-400">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 text-[11px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VERIFIED OBJECTIVE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            {completionTitle}
          </h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            {completionSubtitle}
          </p>
        </div>

        {/* Score & XP Card */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400">SCORE</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {score} / {questions.length}
            </div>
            <span className="text-[10px] text-slate-500">
              {Math.round((score / questions.length) * 100)}% Accuracy
            </span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400">INVESTIGATION XP</span>
            <div className="text-2xl font-black text-amber-400 mt-1 flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 fill-amber-400" />
              <span>+{score * 100}</span>
            </div>
            <span className="text-[10px] text-slate-500">Expertise Logged</span>
          </div>
        </div>

        <button
          onClick={handleFinish}
          className="w-full max-w-sm py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-emerald-950/50 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{actionButtonLabel}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Game-like Header Bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/90 border border-slate-800/80 px-4 py-2.5 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-mono text-xs font-black tracking-wider">
            {badgePrefix} {currentIndex + 1}/{questions.length}
          </span>
          {currentQ.code && (
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              {currentQ.code}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/50 border border-amber-800/40 px-2.5 py-0.5 rounded-md">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span>{score * 100} XP</span>
          </div>

          <div className="w-24 sm:w-32 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + (isCorrect ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scenario Box (if present for Case Studies or Activity 3) */}
      {currentQ.scenario && (
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            {currentQ.title || 'CASE SCENARIO'}
          </div>
          <p className="text-slate-200 font-medium">"{currentQ.scenario}"</p>
        </div>
      )}

      {/* Question Text */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
          {currentQ.question}
        </h3>
      </div>

      {/* 4 Compact Game Answer Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {currentQ.options.map((option) => {
          const isSelected = selectedKey === option.key;
          const isThisCorrect = option.key === currentQ.correctAnswer;

          let cardStyle =
            'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 text-slate-200 hover:border-slate-700 hover:text-white';

          if (isAnswered) {
            if (isThisCorrect) {
              cardStyle =
                'bg-emerald-950/90 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500';
            } else if (isSelected && !isThisCorrect) {
              cardStyle =
                'bg-red-950/90 border-red-500 text-red-200 shadow-lg shadow-red-950/40 ring-1 ring-red-500/80';
            } else {
              cardStyle = 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={option.key}
              disabled={isAnswered && isCorrect}
              onClick={() => handleSelect(option.key)}
              className={`text-left p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 cursor-pointer transform active:scale-[0.98] ${cardStyle}`}
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                  isAnswered && isThisCorrect
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : isAnswered && isSelected && !isThisCorrect
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-800 border border-slate-700 text-cyan-300'
                }`}
              >
                {option.key}
              </span>
              <span className="leading-snug pt-0.5">{option.text}</span>
            </button>
          );
        })}
      </div>

      {/* Immediate Interactive Feedback Banner */}
      {isAnswered && (
        <div
          className={`p-3.5 sm:p-4 rounded-xl border transition-all animate-in fade-in duration-150 flex items-start justify-between gap-3 ${
            isCorrect
              ? 'bg-emerald-950/60 border-emerald-600/70 text-emerald-200'
              : 'bg-red-950/60 border-red-700/60 text-red-200'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider uppercase">
                  {isCorrect ? '✓ CORRECT' : '✕ NOT QUITE'}
                </span>
                {isCorrect && (
                  <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold rounded text-[10px]">
                    +100 XP
                  </span>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {isCorrect
                  ? currentQ.explanation
                  : `Read the clue and try again: ${currentQ.explanation}`}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {isCorrect ? (
              <button
                onClick={handleAdvance}
                className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>{currentIndex < questions.length - 1 ? 'NEXT' : 'FINISH'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-[10px] text-red-300/80 font-mono italic">
                Choose another option
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
