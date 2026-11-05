import React, { useState, useEffect, useRef } from 'react';
import InspectionOverlayWrapper from '../ui/InspectionOverlayWrapper';
import { 
  History, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  HelpCircle,
  Lightbulb,
  Zap,
  MousePointer,
  Share2
} from 'lucide-react';
import { 
  PRODUCT_CHALLENGES, 
  ProductChallengeType, 
  ProductCard 
} from '../../data/timeMachineProducts';

interface TimeMachineStationModalProps {
  unlocked: boolean;
  completed: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export default function TimeMachineStationModal({
  unlocked,
  completed,
  onComplete,
  onClose,
}: TimeMachineStationModalProps) {
  // Mode: 'intro' | 'puzzle' | 'success'
  const [modalPhase, setModalPhase] = useState<'intro' | 'puzzle' | 'success'>(
    completed ? 'success' : 'intro'
  );

  // Selected Product (default to 'food-delivery' for NOVALINK food-tech context)
  const [selectedProductId, setSelectedProductId] = useState<ProductChallengeType>('food-delivery');

  // Slots state for the 4 stages: [USER, PROBLEM, NEED, PRODUCT]
  const [placedCards, setPlacedCards] = useState<{
    user?: ProductCard;
    problem?: ProductCard;
    need?: ProductCard;
    product?: ProductCard;
  }>({});

  // Matching Challenge specific state (Ride-Hailing)
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  // Relational Wire connections (Wireless Earbuds)
  const [wireSequence, setWireSequence] = useState<('USER' | 'PROBLEM' | 'NEED' | 'PRODUCT')[]>([]);

  // Feedback & Hints
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [hintActive, setHintActive] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(Date.now());
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const currentConfig = PRODUCT_CHALLENGES[selectedProductId];

  // 15-second Inactivity Hint System
  useEffect(() => {
    if (modalPhase !== 'puzzle') return;

    const timer = setInterval(() => {
      const elapsed = Date.now() - lastInteractionTime;
      if (elapsed > 15000 && !hintActive) {
        setHintActive(true);
        setHintMessage(currentConfig.hint);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [modalPhase, lastInteractionTime, hintActive, currentConfig.hint]);

  const recordInteraction = () => {
    setLastInteractionTime(Date.now());
    setErrorNotice(null);
  };

  // Switch product challenge
  const handleSelectProduct = (id: ProductChallengeType) => {
    setSelectedProductId(id);
    setPlacedCards({});
    setSelectedProfileId(null);
    setWireSequence([]);
    setErrorNotice(null);
    setHintActive(false);
    recordInteraction();
  };

  // Reset current challenge
  const handleResetChallenge = () => {
    setPlacedCards({});
    setSelectedProfileId(null);
    setWireSequence([]);
    setErrorNotice(null);
    setHintActive(false);
    recordInteraction();
  };

  // Handle Card Slotting (Drag or Click)
  const handleSlotCard = (card: ProductCard, targetSlot?: 'USER' | 'PROBLEM' | 'NEED' | 'PRODUCT') => {
    recordInteraction();
    const slotKey = targetSlot || card.type;

    // Check if correct
    const expected = currentConfig.correctCards[slotKey.toLowerCase() as keyof typeof currentConfig.correctCards];

    if (card.id === expected.id) {
      setPlacedCards((prev) => {
        const next = { ...prev, [slotKey.toLowerCase()]: card };
        checkPuzzleCompletion(next);
        return next;
      });
      setErrorNotice(null);
    } else {
      setErrorNotice(
        `This component doesn't match the ${slotKey} stage for this product. Ask: what role does this play in the origin chain?`
      );
    }
  };

  const handleRemoveCard = (slotKey: 'user' | 'problem' | 'need' | 'product') => {
    recordInteraction();
    setPlacedCards((prev) => {
      const next = { ...prev };
      delete next[slotKey];
      return next;
    });
  };

  // Check if all 4 slots are correctly filled
  const checkPuzzleCompletion = (nextPlaced: typeof placedCards) => {
    if (nextPlaced.user && nextPlaced.problem && nextPlaced.need && nextPlaced.product) {
      setTimeout(() => {
        setModalPhase('success');
        onComplete();
      }, 600);
    }
  };

  // Handle Wireless Earbuds wire connection
  const handleNodeClick = (node: 'USER' | 'PROBLEM' | 'NEED' | 'PRODUCT') => {
    recordInteraction();
    const expectedOrder: ('USER' | 'PROBLEM' | 'NEED' | 'PRODUCT')[] = ['USER', 'PROBLEM', 'NEED', 'PRODUCT'];
    const nextExpected = expectedOrder[wireSequence.length];

    if (wireSequence.includes(node)) {
      // Allow unlinking to that point
      const idx = wireSequence.indexOf(node);
      setWireSequence(wireSequence.slice(0, idx));
      return;
    }

    if (node === nextExpected) {
      const nextSeq = [...wireSequence, node];
      setWireSequence(nextSeq);
      setErrorNotice(null);
      if (nextSeq.length === 4) {
        // Complete!
        setPlacedCards({
          user: currentConfig.correctCards.user,
          problem: currentConfig.correctCards.problem,
          need: currentConfig.correctCards.need,
          product: currentConfig.correctCards.product,
        });
        setTimeout(() => {
          setModalPhase('success');
          onComplete();
        }, 700);
      }
    } else {
      setErrorNotice(`The logical causation starts at USER and moves forward: USER → PROBLEM → NEED → PRODUCT. Try connecting ${nextExpected} next!`);
    }
  };

  // ================= 1. LOCKED STATE =================
  if (!unlocked) {
    return (
      <InspectionOverlayWrapper
        title="WALL 4: PRODUCT TIME MACHINE"
        subtitle="Reverse Product Engineering Station • Inactive Console"
        badge="WALL 4 • LOCKED"
        onClose={onClose}
        maxWidth="max-w-xl"
      >
        <div className="py-10 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-600/40 flex items-center justify-center text-rose-400">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-rose-400 tracking-wider">
              STATUS: 🔒 LOCKED
            </span>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              STATION CLEARANCE REQUIRED
            </h3>
          </div>
          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
            Complete the <span className="text-cyan-400 font-bold">Evidence Investigation</span> in the Filing Cabinet on Wall 4 to activate this station.
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 max-w-sm">
            Inspect all 6 classified dossiers (Customer Complaints, Sales Slump, Delivery Latency, etc.) to power on the Time Machine.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
          >
            RETURN TO INVESTIGATION
          </button>
        </div>
      </InspectionOverlayWrapper>
    );
  }

  // ================= 2. INTRO STAGE =================
  if (modalPhase === 'intro') {
    return (
      <InspectionOverlayWrapper
        title="MISSION 4: PRODUCT TIME MACHINE"
        subtitle="Reverse Engineering Origin Station • Wall 4"
        badge="MISSION 4 AVAILABLE"
        onClose={onClose}
        maxWidth="max-w-3xl"
      >
        <div className="space-y-6 py-2">
          {/* Hero Banner with Retro-Futuristic Aesthetic */}
          <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <History className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
                  INVESTIGATION DIRECTIVE
                </span>
                <h3 className="text-xl font-black text-white uppercase tracking-wide">
                  MISSION 4: PRODUCT TIME MACHINE
                </h3>
              </div>
            </div>

            <p className="text-base font-semibold text-cyan-100 italic leading-snug mb-3">
              "Every product exists because it solves a need or problem for someone."
            </p>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2.5">
              <p className="text-xs text-slate-300 font-medium">
                Your task is to travel backwards from a product and discover:
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 bg-slate-900 rounded-lg border border-cyan-500/30 font-mono text-xs sm:text-sm font-black text-cyan-300 tracking-wider">
                <span>USER</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                <span>PROBLEM</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                <span>NEED</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                <span>PRODUCT</span>
              </div>
            </div>
          </div>

          {/* Entrepreneurial Mindset Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Lightbulb className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">THINK LIKE AN ENTREPRENEUR</span>
            </div>
            <p className="text-xs text-slate-300">
              Ask yourself:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px]">1</span>
                <span>Who needed this?</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px]">2</span>
                <span>What problem did they face?</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px]">3</span>
                <span>What did they need?</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px]">4</span>
                <span>What product solved it?</span>
              </div>
            </div>
          </div>

          {/* Product Challenge Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                SELECT TARGET PRODUCT ARTIFACT:
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">
                NOVALINK FOCUS: FOOD DELIVERY
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(Object.keys(PRODUCT_CHALLENGES) as ProductChallengeType[]).map((key) => {
                const conf = PRODUCT_CHALLENGES[key];
                const isSelected = selectedProductId === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedProductId(key)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="text-xl mb-1">{conf.icon}</div>
                    <div className="text-[11px] font-bold truncate">{conf.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Mission Button */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                setModalPhase('puzzle');
                recordInteraction();
              }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-cyan-950/60 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>START MISSION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </InspectionOverlayWrapper>
    );
  }

  // ================= 3. SUCCESS / RECONSTRUCTED STAGE =================
  if (modalPhase === 'success') {
    return (
      <InspectionOverlayWrapper
        title="PRODUCT HISTORY RECONSTRUCTED"
        subtitle="Mission 4 Complete • 5.2.3 Origin Chain Verified"
        badge="MISSION 4 COMPLETE ✓"
        onClose={onClose}
        maxWidth="max-w-2xl"
      >
        <div className="py-6 space-y-6 text-center">
          {/* Activation Aura Icon */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full bg-emerald-500/30 animate-ping" />
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950/60">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          </div>

          {/* Headings */}
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
              SYSTEM RE-ENGINEERED
            </span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              PRODUCT HISTORY RECONSTRUCTED
            </h3>
            <p className="text-xs text-slate-400">
              Artifact: {currentConfig.icon} {currentConfig.title}
            </p>
          </div>

          {/* Checkmarks Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto">
            <div className="p-3 bg-slate-950 border border-emerald-500/40 rounded-xl text-left">
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> USER
              </span>
              <p className="text-[10px] text-slate-400 mt-1 truncate">
                {currentConfig.correctCards.user.title}
              </p>
            </div>
            <div className="p-3 bg-slate-950 border border-emerald-500/40 rounded-xl text-left">
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> PROBLEM
              </span>
              <p className="text-[10px] text-slate-400 mt-1 truncate">
                {currentConfig.correctCards.problem.title}
              </p>
            </div>
            <div className="p-3 bg-slate-950 border border-emerald-500/40 rounded-xl text-left">
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> NEED
              </span>
              <p className="text-[10px] text-slate-400 mt-1 truncate">
                {currentConfig.correctCards.need.title}
              </p>
            </div>
            <div className="p-3 bg-slate-950 border border-emerald-500/40 rounded-xl text-left">
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> PRODUCT
              </span>
              <p className="text-[10px] text-slate-400 mt-1 truncate">
                {currentConfig.correctCards.product.title}
              </p>
            </div>
          </div>

          {/* Reward Badge */}
          <div className="p-4 bg-amber-950/50 border border-amber-500/40 rounded-2xl flex items-center justify-between gap-4 max-w-lg mx-auto text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  ACHIEVEMENT UNLOCKED
                </span>
                <span className="text-sm font-bold text-white">
                  🏆 ENTREPRENEURIAL INSIGHT
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-300 font-bold px-3 py-1 bg-amber-900/60 rounded-lg border border-amber-600/40">
              +250 XP
            </span>
          </div>

          {/* Learning Moment */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 max-w-lg mx-auto text-xs text-slate-300 space-y-1 text-left">
            <span className="text-cyan-400 font-bold uppercase tracking-wider block text-[10px]">
              CORE ENTREPRENEURIAL TAKEAWAY:
            </span>
            <p className="leading-relaxed">
              "You worked backwards from a product to the user, problem and need. Great products solve real problems for real people."
            </p>
          </div>

          {/* Continue Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
              }}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>CONTINUE INVESTIGATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </InspectionOverlayWrapper>
    );
  }

  // ================= 4. ACTIVE PUZZLE STAGE =================
  const availablePool = [
    currentConfig.correctCards.user,
    currentConfig.correctCards.problem,
    currentConfig.correctCards.need,
    currentConfig.correctCards.product,
    ...(currentConfig.distractorCards || []),
  ].filter((c) => {
    return !Object.values(placedCards).some((p) => p?.id === c.id);
  });

  return (
    <InspectionOverlayWrapper
      title={`PRODUCT TIME MACHINE: ${currentConfig.title.toUpperCase()}`}
      subtitle={`Mission 4 • Reverse Causality Challenge`}
      badge={`TARGET: ${currentConfig.title}`}
      onClose={onClose}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-5">
        {/* Top Product Header & Question Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-2xl shrink-0">
              {currentConfig.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  PRODUCT DISCOVERED
                </span>
                <span className="text-[10px] text-slate-500 font-mono">• {currentConfig.tagline}</span>
              </div>
              <h4 className="text-base font-black text-white uppercase tracking-tight">
                {currentConfig.title}
              </h4>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                Question: "{currentConfig.question}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChallenge}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
            <button
              onClick={() => setModalPhase('intro')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-[11px] font-bold transition-colors cursor-pointer"
            >
              SWITCH PRODUCT
            </button>
          </div>
        </div>

        {/* Dynamic 4 Physical Deduction Slots */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              1. ORIGIN CAUSATION SLOTS (DRAG OR CLICK TO SLOT):
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              USER → PROBLEM → NEED → PRODUCT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {(['user', 'problem', 'need', 'product'] as const).map((slotKey, slotIdx) => {
              const card = placedCards[slotKey];
              const slotLabel = slotKey.toUpperCase();
              const isSlotTarget = draggedCardId && draggedCardId.includes(slotKey);

              return (
                <div
                  key={slotKey}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedCardId) {
                      const allCards = [
                        currentConfig.correctCards.user,
                        currentConfig.correctCards.problem,
                        currentConfig.correctCards.need,
                        currentConfig.correctCards.product,
                        ...(currentConfig.distractorCards || []),
                      ];
                      const matched = allCards.find((c) => c.id === draggedCardId);
                      if (matched) {
                        handleSlotCard(matched, slotLabel as any);
                      }
                      setDraggedCardId(null);
                    }
                  }}
                  className={`min-h-[140px] p-3.5 rounded-2xl border transition-all flex flex-col justify-between relative group ${
                    card
                      ? 'bg-cyan-950/40 border-cyan-500/80 shadow-lg shadow-cyan-950/40'
                      : isSlotTarget
                      ? 'bg-cyan-950/20 border-cyan-400 border-dashed'
                      : 'bg-slate-950/80 border-dashed border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Slot Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <span className="text-[10px] font-mono font-black tracking-widest text-slate-400">
                      STEP 0{slotIdx + 1}: {slotLabel}
                    </span>
                    {card ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-[9px] font-mono text-slate-600">EMPTY SLOT</span>
                    )}
                  </div>

                  {/* Card Content or Placeholder */}
                  {card ? (
                    <div className="my-2 space-y-1">
                      <div className="text-xs font-black text-cyan-300 uppercase tracking-tight">
                        {card.title}
                      </div>
                      <p className="text-[11px] text-slate-200 leading-snug font-sans">
                        "{card.description}"
                      </p>
                    </div>
                  ) : (
                    <div className="my-auto text-center py-3">
                      <MousePointer className="w-5 h-5 mx-auto text-slate-700 mb-1" />
                      <p className="text-[10px] text-slate-500 font-mono">
                        Drop {slotLabel} card here
                      </p>
                    </div>
                  )}

                  {/* Bottom Slot Action */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                    <span>{card?.tagline || `Slot: ${slotLabel}`}</span>
                    {card && (
                      <button
                        onClick={() => handleRemoveCard(slotKey)}
                        className="text-rose-400 hover:text-rose-300 font-bold uppercase transition-colors cursor-pointer"
                      >
                        REMOVE
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wireless Earbuds Special Mode: Relational Wire Visualizer */}
        {currentConfig.interactionStyle === 'relational-wires' && (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> RELATIONAL PATHWAY BUILDER:
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Click nodes in causal sequence
              </span>
            </div>
            <div className="flex items-center justify-around gap-2 py-2">
              {(['USER', 'PROBLEM', 'NEED', 'PRODUCT'] as const).map((node, i) => {
                const isLinked = wireSequence.includes(node);
                const isNext = (['USER', 'PROBLEM', 'NEED', 'PRODUCT'] as const)[wireSequence.length] === node;
                return (
                  <React.Fragment key={node}>
                    <button
                      onClick={() => handleNodeClick(node)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        isLinked
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-950'
                          : isNext
                          ? 'bg-amber-950/80 border-amber-400 text-amber-200 ring-2 ring-amber-400/40 animate-pulse'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>0{i + 1}. {node}</span>
                      {isLinked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    {i < 3 && (
                      <div className={`h-1 flex-1 transition-all rounded ${
                        wireSequence.length > i ? 'bg-emerald-400 shadow-md shadow-emerald-400/50' : 'bg-slate-800'
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Available Components Pool */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              2. AVAILABLE INVESTIGATION CARDS (DRAG OR CLICK TO ASSIGN):
            </span>
            <span className="text-[10px] text-slate-500">
              {availablePool.length} components available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {availablePool.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => setDraggedCardId(card.id)}
                onDragEnd={() => setDraggedCardId(null)}
                onClick={() => handleSlotCard(card)}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500 hover:bg-slate-800/90 transition-all text-left flex flex-col justify-between gap-2 shadow-md group cursor-grab active:cursor-grabbing hover:shadow-cyan-950/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest">
                      {card.type}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">CLICK TO SLOT</span>
                  </div>
                  <div className="font-bold text-xs text-white group-hover:text-cyan-200 transition-colors">
                    {card.title}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug mt-1 font-sans">
                    "{card.description}"
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-500">
                  <span className="italic">{card.tagline || 'Artifact component'}</span>
                  <span className="text-cyan-400 font-bold group-hover:translate-x-0.5 transition-transform">
                    SLOT →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Notices */}
        {errorNotice && (
          <div className="p-3.5 bg-rose-950/80 border border-rose-600/60 rounded-xl text-xs text-rose-200 flex items-center gap-2 animate-in fade-in duration-200">
            <span className="font-bold">⚠️ ADJUSTMENT REQUIRED:</span>
            <span>{errorNotice}</span>
          </div>
        )}

        {/* Hint System Banner (15s Inactivity or Clickable) */}
        <div className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-300">
                {hintActive ? 'DETECTIVE HINT: ' : 'NEED ASSISTANCE? '}
              </span>
              <span className="text-slate-400">
                {hintActive ? hintMessage : 'Ask yourself what root problem the customer was experiencing before this existed.'}
              </span>
            </div>
          </div>

          {!hintActive && (
            <button
              onClick={() => {
                setHintActive(true);
                setHintMessage(currentConfig.hint);
              }}
              className="text-amber-400 hover:text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-600/40 cursor-pointer"
            >
              SHOW HINT
            </button>
          )}
        </div>
      </div>
    </InspectionOverlayWrapper>
  );
}
