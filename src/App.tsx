import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import OfficeCanvas from './components/3d/OfficeCanvas';
import GameHUD from './components/ui/GameHUD';
import StartScreen from './components/ui/StartScreen';
import InstructionsScreen from './components/ui/InstructionsScreen';
import StartupBoardModal from './components/modals/StartupBoardModal';
import KnowledgeStationModal from './components/modals/KnowledgeStationModal';
import DesignThinkingStationModal from './components/modals/DesignThinkingStationModal';
import EvidenceStationModal from './components/modals/EvidenceStationModal';
import TimeMachineStationModal from './components/modals/TimeMachineStationModal';
import CaseStudiesStationModal from './components/modals/CaseStudiesStationModal';
import EvidenceSortingStationModal from './components/modals/EvidenceSortingStationModal';
import NotebookStationModal from './components/modals/NotebookStationModal';
import ExitTerminalModal from './components/modals/ExitTerminalModal';
import ReportCardModal from './components/modals/ReportCardModal';
import FragmentInspectModal from './components/modals/FragmentInspectModal';
import ReconstructFileModal from './components/modals/ReconstructFileModal';
import { CHALLENGE_CHITS } from './data/gameData';
import { StationId, Chit, WallId } from './types/gameTypes';

export default function App() {
  const [phase, setPhase] = useState<'start' | 'instructions' | 'game' | 'escaped'>('start');
  const [activeStation, setActiveStation] = useState<StationId>('overview');
  const [currentWall, setCurrentWall] = useState<WallId>('wall-2');
  const [wall2PanelIndex, setWall2PanelIndex] = useState(1);

  // Interactive Game State
  const [chits, setChits] = useState<Chit[]>(CHALLENGE_CHITS);
  const [founderFileReconstructed, setFounderFileReconstructed] = useState(false);
  const [activeInspectFragmentId, setActiveInspectFragmentId] = useState<number | null>(null);
  const [reconstructModalOpen, setReconstructModalOpen] = useState(false);
  const [knowledgeUnlocked, setKnowledgeUnlocked] = useState(false);
  const [activity1Complete, setActivity1Complete] = useState(false);

  const [designThinkingExplored, setDesignThinkingExplored] = useState({
    empathize: false,
    define: false,
    ideate: false,
    prototype: false,
    test: false,
  });
  const [activity2Complete, setActivity2Complete] = useState(false);
  const [activity3Complete, setActivity3Complete] = useState(false);

  const [evidenceUnlocked, setEvidenceUnlocked] = useState(false);
  const [inspectedDocIds, setInspectedDocIds] = useState<number[]>([]);

  const [productTimeMachineComplete, setProductTimeMachineComplete] = useState(false);
  const [activity5Complete, setActivity5Complete] = useState(false);
  const [evidenceSorted, setEvidenceSorted] = useState(false);

  const [activity6Complete, setActivity6Complete] = useState(false);
  const [fiveWhysComplete, setFiveWhysComplete] = useState(false);
  const [rootCauseIdentified, setRootCauseIdentified] = useState(false);
  const [exitUnlocked, setExitUnlocked] = useState(false);

  // Guided Discovery System for Wall 2 fragments
  const [guidedDiscoveryActive, setGuidedDiscoveryActive] = useState(false);
  const [guidedDiscoveryHint, setGuidedDiscoveryHint] = useState<string | null>(null);

  // HUD and Hover States
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Guided Discovery Timer: If no fragment is found in 16 seconds on Wall 2, provide visual hint
  useEffect(() => {
    const foundCount = chits.filter((c) => c.found).length;
    if (phase !== 'game' || foundCount >= 5) {
      setGuidedDiscoveryActive(false);
      setGuidedDiscoveryHint(null);
      return;
    }

    const timer = setTimeout(() => {
      setGuidedDiscoveryActive(true);
      const remainingChits = chits.filter((c) => !c.found);
      const nextClue = remainingChits[0];
      if (nextClue) {
        setGuidedDiscoveryHint(
          `GUIDED DISCOVERY: Glowing amber pulses mark the clue near "${nextClue.locationTitle}". Look for the pulsing investigation icon!`
        );
      }
    }, 16000);

    return () => clearTimeout(timer);
  }, [phase, chits, currentWall]);

  // Handle Collecting a Founder File Fragment
  const handleCollectChit = (id: number) => {
    setGuidedDiscoveryActive(false);
    setGuidedDiscoveryHint(null);
    setChits((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, found: true } : c));
      const newlyFound = updated.filter((c) => c.found).length;

      if (newlyFound === 5) {
        showToast('ALL 5 FRAGMENTS RECOVERED! The Founder\'s File can now be reconstructed.');
        setTimeout(() => {
          setReconstructModalOpen(true);
        }, 500);
      } else {
        showToast(`FOUNDER FILE FRAGMENT RECOVERED (0${id}/05)! (${newlyFound}/5)`);
      }
      return updated;
    });
  };

  // Complete Reconstructing the Founder's File
  const handleCompleteReconstruction = () => {
    setFounderFileReconstructed(true);
    setKnowledgeUnlocked(true);
    showToast("FOUNDER'S INVESTIGATION FILE RECONSTRUCTED! The Knowledge Box is unlocked on Wall 3.");
  };

  // Proceed directly to Knowledge Box
  const handleProceedToKnowledgeBox = () => {
    setReconstructModalOpen(false);
    setActiveStation('knowledge-box');
  };

  // Handle Exploring a Design Thinking Stage
  const handleExploreDesignThinkingStage = (
    stage: 'empathize' | 'define' | 'ideate' | 'prototype' | 'test'
  ) => {
    setDesignThinkingExplored((prev) => {
      const next = { ...prev, [stage]: true };
      const count = Object.values(next).filter(Boolean).length;
      if (count === 5 && !prev[stage]) {
        showToast('DESIGN THINKING FRAMEWORK EXPLORED! Activity 2 is now unlocked.');
      }
      return next;
    });
  };

  // Activity 1 Completed
  const handleCompleteActivity1 = () => {
    setActivity1Complete(true);
    showToast('ACTIVITY 1 COMPLETE! Problem-solving concepts verified.');
  };

  // Activity 2 Completed
  const handleCompleteActivity2 = () => {
    setActivity2Complete(true);
    showToast('ACTIVITY 2 COMPLETE! Design Thinking checkpoints passed.');
  };

  // Activity 3 Completed
  const handleCompleteActivity3 = () => {
    setActivity3Complete(true);
    setEvidenceUnlocked(true);
    showToast('ACTIVITY 3 COMPLETE! The Evidence Filing Cabinet on Wall 4 has unlocked.');
  };

  // Inspecting a Document in the Cabinet
  const handleInspectDocument = (id: number) => {
    if (!inspectedDocIds.includes(id)) {
      setInspectedDocIds((prev) => {
        const next = [...prev, id];
        if (next.length === 6) {
          showToast('ALL 6 EVIDENCE DOSSIERS INSPECTED! Proceed to the Product Time Machine or Pinboard.');
        } else {
          showToast(`Evidence File #${id} inspected (${next.length}/6).`);
        }
        return next;
      });
    }
  };

  // Activity 4 Time Machine Completed
  const handleCompleteTimeMachine = () => {
    setProductTimeMachineComplete(true);
    showToast('PRODUCT TIME MACHINE & CHECKPOINT COMPLETE! 5.2.3 Back-tracking mastered.');
  };

  // Activity 5 Case Studies Completed
  const handleCompleteActivity5 = () => {
    setActivity5Complete(true);
    showToast('ACTIVITY 5 COMPLETE! All 5 real-world case studies investigated.');
  };

  // Evidence Sorting Pinboard Completed
  const handleCompleteEvidenceSorting = () => {
    setEvidenceSorted(true);
    showToast('EVIDENCE ORGANIZED! Effects, Symptoms, and Root Problems clearly categorized.');
  };

  // Submit Final Investigation in Notebook
  const handleSubmitInvestigation = () => {
    setActivity6Complete(true);
    setFiveWhysComplete(true);
    setRootCauseIdentified(true);
    setExitUnlocked(true);
    setActiveStation('overview');
    showToast('INVESTIGATION SUBMITTED & APPROVED! The exit door is now unlocked.');
  };

  // Step through exit
  const handleEscape = () => {
    setActiveStation('overview');
    setPhase('escaped');
  };

  // Reset / Play Again
  const handleRestart = () => {
    setChits(CHALLENGE_CHITS.map((c) => ({ ...c, found: false })));
    setFounderFileReconstructed(false);
    setActiveInspectFragmentId(null);
    setReconstructModalOpen(false);
    setKnowledgeUnlocked(false);
    setActivity1Complete(false);
    setDesignThinkingExplored({
      empathize: false,
      define: false,
      ideate: false,
      prototype: false,
      test: false,
    });
    setActivity2Complete(false);
    setActivity3Complete(false);
    setEvidenceUnlocked(false);
    setInspectedDocIds([]);
    setProductTimeMachineComplete(false);
    setActivity5Complete(false);
    setEvidenceSorted(false);
    setActivity6Complete(false);
    setFiveWhysComplete(false);
    setRootCauseIdentified(false);
    setExitUnlocked(false);
    setCurrentWall('wall-2');
    setActiveStation('overview');
    setPhase('start');
  };

  // Wall Navigation Handler (Smooth in-room camera reorientation without skipping progression)
  const handleSelectWall = (wall: WallId) => {
    setActiveStation('overview');
    setActiveInspectFragmentId(null);
    setReconstructModalOpen(false);
    setCurrentWall(wall);
    if (wall === 'wall-2') {
      setWall2PanelIndex(1);
    }
  };

  const handleWall2Navigate = (direction: 'left' | 'right') => {
    setWall2PanelIndex((prev) => {
      const next = direction === 'left' ? prev - 1 : prev + 1;
      return Math.max(0, Math.min(2, next));
    });
  };

  // Station Access Controller & Mission Flow Gating
  const handleSelectStation = (st: StationId) => {
    if (st === 'central-desk' && !productTimeMachineComplete) {
      showToast('ACCESS RESTRICTED: Complete Mission 4 (Product Time Machine) first.');
      return;
    }
    setActiveStation(st);
  };

  // Calculate Progress Percent
  const chitsFoundCount = chits.filter((c) => c.found).length;
  let progressScore = 0;
  progressScore += (chitsFoundCount / 5) * 10;
  if (founderFileReconstructed) progressScore += 5;
  if (activity1Complete) progressScore += 15;
  if (activity2Complete) progressScore += 7;
  if (activity3Complete) progressScore += 8;
  progressScore += (inspectedDocIds.length / 6) * 10;
  if (productTimeMachineComplete) progressScore += 10;
  if (activity5Complete) progressScore += 10;
  if (evidenceSorted) progressScore += 10;
  if (rootCauseIdentified) progressScore += 15;
  const progressPercent = Math.min(100, Math.round(progressScore));

  // Determine Current Objective
  let currentObjective = "Reconstruct the Founder's File: Search Wall 2 for the 5 fragments.";
  if (chitsFoundCount < 5) {
    currentObjective = `Reconstruct the Founder's File: Search Wall 2 for 5 fragments (${chitsFoundCount}/5 recovered).`;
  } else if (!founderFileReconstructed) {
    currentObjective = "All 5 fragments recovered! Reconstruct the Founder's Investigation File on Wall 2.";
  } else if (!activity1Complete) {
    currentObjective = 'Founder File Restored! Proceed to the Knowledge Box on Wall 3 (Activity 1).';
  } else if (!Object.values(designThinkingExplored).every(Boolean)) {
    currentObjective = 'Inspect the Design Thinking Board on Wall 3 and explore all 5 stages.';
  } else if (!activity2Complete) {
    currentObjective = 'Complete Activity 2 (Design Thinking Checkpoint) on Wall 3.';
  } else if (!activity3Complete) {
    currentObjective = 'Solve the 5 cases in Activity 3 (Design Thinking Detective) on Wall 3.';
  } else if (inspectedDocIds.length < 6) {
    currentObjective = `Open the Filing Cabinet on Wall 4 and inspect all 6 evidence documents (${inspectedDocIds.length}/6).`;
  } else if (!productTimeMachineComplete) {
    currentObjective = 'Activate the Product Time Machine on Wall 4 and back-track the product.';
  } else if (!activity5Complete) {
    currentObjective = 'Investigate the 5 Case Studies on the central desk (Activity 5).';
  } else if (!evidenceSorted) {
    currentObjective = 'Organize the Evidence Pinboard on Wall 4 into Effects, Symptoms & Problems.';
  } else if (!rootCauseIdentified) {
    currentObjective = 'Open the Investigator Notebook on the desk, climb the 5 Whys ladder, and submit.';
  } else {
    currentObjective = 'The exit is unlocked! Return to Wall 1 and step through the exit corridor.';
  }

  return (
    <main className="w-screen h-screen relative bg-slate-950 overflow-hidden font-sans select-none">
      {/* ================= 1. START SCREEN ================= */}
      {phase === 'start' && (
        <StartScreen onStart={() => setPhase('instructions')} />
      )}

      {/* ================= 2. INSTRUCTIONS SCREEN ================= */}
      {phase === 'instructions' && (
        <InstructionsScreen onEnter={() => setPhase('game')} />
      )}

      {/* ================= 3. 3D ESCAPE ROOM OFFICE CANVAS ================= */}
      <OfficeCanvas
        activeStation={activeStation}
        activeWall={currentWall}
        onSelectWall={handleSelectWall}
        onWallDetected={(w) => setCurrentWall(w)}
        chits={chits}
        exitUnlocked={exitUnlocked}
        knowledgeUnlocked={knowledgeUnlocked}
        designThinkingExplored={designThinkingExplored}
        evidenceUnlocked={evidenceUnlocked}
        evidenceReadCount={inspectedDocIds.length}
        productTimeMachineComplete={productTimeMachineComplete}
        activity5Complete={activity5Complete}
        evidenceSorted={evidenceSorted}
        activity6Complete={activity6Complete}
        fiveWhysComplete={fiveWhysComplete}
        onSelectStation={handleSelectStation}
        onCollectChit={handleCollectChit}
        onInspectFragment={(id) => setActiveInspectFragmentId(id)}
        onHoverObject={(obj) => setHoveredObject(obj)}
        guidedDiscovery={guidedDiscoveryActive}
        wall2PanelIndex={wall2PanelIndex}
        onWall2Navigate={handleWall2Navigate}
      />

      {/* Guided Discovery Hint Notification Banner */}
      {guidedDiscoveryHint && chitsFoundCount < 5 && phase === 'game' && currentWall === 'wall-2' && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 max-w-lg w-[92%] bg-amber-950/95 border border-amber-500/80 text-amber-200 text-xs px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <p className="flex-1 font-medium leading-snug">{guidedDiscoveryHint}</p>
          <button
            onClick={() => setGuidedDiscoveryHint(null)}
            className="text-amber-400/70 hover:text-white text-xs font-bold px-2 py-1 rounded-lg bg-amber-900/40 cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* ================= 4. MINIMAL GAMEPLAY HUD ================= */}
      {phase === 'game' && (
        <GameHUD
          activeStation={activeStation}
          currentWall={currentWall}
          onSelectWall={handleSelectWall}
          progressPercent={progressPercent}
          chitsCount={chitsFoundCount}
          evidenceCount={inspectedDocIds.length}
          currentObjective={currentObjective}
          hoveredObject={hoveredObject}
          founderFileReconstructed={founderFileReconstructed}
          activity1Complete={activity1Complete}
          activity2Complete={activity2Complete}
          activity3Complete={activity3Complete}
          activity4Complete={productTimeMachineComplete}
          activity5Complete={activity5Complete}
          exitUnlocked={exitUnlocked}
          onOpenReconstruction={() => setReconstructModalOpen(true)}
          onStepBack={() => setActiveStation('overview')}
          onSelectStation={handleSelectStation}
          toastMessage={toastMessage}
        />
      )}

      {/* ================= 5. INSPECTION MODALS ================= */}
      {/* Wall 2: Startup Board */}
      {activeStation === 'startup-board' && (
        <StartupBoardModal
          chits={chits}
          founderFileReconstructed={founderFileReconstructed}
          onInspectFragment={(id) => setActiveInspectFragmentId(id)}
          onOpenReconstruction={() => setReconstructModalOpen(true)}
          onClose={() => setActiveStation('overview')}
        />
      )}

      {/* Wall 2: Specific Fragment Environmental Clue Inspection Modal */}
      {activeInspectFragmentId !== null && (
        <FragmentInspectModal
          fragmentId={activeInspectFragmentId}
          chits={chits}
          onCollectFragment={(id) => {
            handleCollectChit(id);
          }}
          onClose={() => setActiveInspectFragmentId(null)}
          onOpenReconstruction={() => {
            setActiveInspectFragmentId(null);
            setReconstructModalOpen(true);
          }}
        />
      )}

      {/* Wall 2: Founder's Investigation File Reconstruction Workbench Modal */}
      {reconstructModalOpen && (
        <ReconstructFileModal
          chits={chits}
          alreadyReconstructed={founderFileReconstructed}
          onCompleteReconstruction={handleCompleteReconstruction}
          onProceedToKnowledgeBox={handleProceedToKnowledgeBox}
          onClose={() => setReconstructModalOpen(false)}
        />
      )}

      {/* Wall 3: Knowledge Box & Activity 1 */}
      {activeStation === 'knowledge-box' && (
        <KnowledgeStationModal
          unlocked={knowledgeUnlocked}
          activity1Complete={activity1Complete}
          onCompleteActivity1={handleCompleteActivity1}
          onClose={() => setActiveStation('overview')}
        />
      )}

      {/* Wall 3: Design Thinking Board & Activities 2, 3 */}
      {activeStation === 'design-thinking' && (
        <DesignThinkingStationModal
          explored={designThinkingExplored}
          activity2Complete={activity2Complete}
          activity3Complete={activity3Complete}
          onExploreStage={handleExploreDesignThinkingStage}
          onCompleteActivity2={handleCompleteActivity2}
          onCompleteActivity3={handleCompleteActivity3}
          onClose={() => setActiveStation('overview')}
        />
      )}

      {/* Wall 4: Evidence Filing Cabinet */}
      {activeStation === 'filing-cabinet' && (
        <EvidenceStationModal
          unlocked={evidenceUnlocked}
          inspectedDocIds={inspectedDocIds}
          onInspectDocument={handleInspectDocument}
          onClose={() => setActiveStation('overview')}
        />
      )}

      {/* Wall 4: Product Time Machine & Checkpoint */}
      {activeStation === 'time-machine' && (
        <TimeMachineStationModal
          unlocked={inspectedDocIds.length >= 6}
          completed={productTimeMachineComplete}
          onComplete={handleCompleteTimeMachine}
          onClose={() => setActiveStation('overview')}
        />
      )}

      {/* Center Desk: 5 Case Studies */}
      {activeStation === 'central-desk' && (
        <CaseStudiesStationModal
          unlocked={productTimeMachineComplete}
          activity5Complete={activity5Complete}
          onComplete={handleCompleteActivity5}
          onClose={() => setActiveStation('overview')}
        />
      )}

      {/* Wall 4: Evidence Sorting Pinboard */}
      {activeStation === 'evidence-sorting' && (
        <EvidenceSortingStationModal
          evidenceSorted={evidenceSorted}
          onComplete={handleCompleteEvidenceSorting}
          onClose={() => setActiveStation('overview')}
        />
      )}

      {/* Final Desk: Investigator Notebook & 5 Whys */}
      {activeStation === 'notebook' && (
        <NotebookStationModal
          activity6Complete={activity6Complete}
          fiveWhysComplete={fiveWhysComplete}
          onSubmitInvestigation={handleSubmitInvestigation}
          onClose={() => setActiveStation('overview')}
        />
      )}

      {/* Wall 1: Security Exit Terminal */}
      {activeStation === 'exit' && (
        <ExitTerminalModal
          exitUnlocked={exitUnlocked}
          rootCauseIdentified={rootCauseIdentified}
          onEscape={handleEscape}
          onClose={() => setActiveStation('overview')}
        />
      )}

      {/* ================= 6. FINAL REPORT CARD CELEBRATION ================= */}
      {phase === 'escaped' && (
        <ReportCardModal onRestart={handleRestart} />
      )}
    </main>
  );
}
