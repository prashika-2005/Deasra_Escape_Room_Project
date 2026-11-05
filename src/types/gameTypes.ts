export type StationId = 
  | 'overview'
  | 'exit'
  | 'startup-board'
  | 'knowledge-box'
  | 'design-thinking'
  | 'filing-cabinet'
  | 'time-machine'
  | 'central-desk'
  | 'evidence-sorting'
  | 'notebook';

export type WallId = 'wall-1' | 'wall-2' | 'wall-3' | 'wall-4' | 'center';

export interface Chit {
  id: number;
  name: string;
  fragmentNumber: string;
  locationTitle: string;
  environmentalClue: string;
  locationHint: string;
  found: boolean;
  position: [number, number, number];
  rotation?: [number, number, number];
  excerptTitle: string;
  excerptText: string;
}

export interface MCQQuestion {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface CaseFileQuestion {
  code: string;
  title: string;
  scenario: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface EvidenceDocument {
  id: number;
  title: string;
  type: string;
  date: string;
  summary: string;
  content: string[];
  clueInsight: string;
  inspected: boolean;
}

export interface TimeMachineCard {
  id: string;
  label: 'USER' | 'PROBLEM' | 'NEED' | 'PRODUCT';
  title: string;
  description: string;
}

export interface CaseStudy {
  id: number;
  code: string;
  title: string;
  context: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export type EvidenceCategory = 'EFFECT' | 'SYMPTOM' | 'PROBLEM' | 'UNDERLYING PROBLEM';

export interface EvidenceSortingCard {
  id: string;
  text: string;
  correctCategory: EvidenceCategory;
  assignedCategory?: EvidenceCategory;
}

export interface NotebookState {
  problemStatement: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  impact: string;
  whys: [string, string, string, string, string];
  rootCause: string;
  idea1: string;
  idea2: string;
  idea3: string;
  reflection: string;
}

export interface GameState {
  // Navigation
  activeStation: StationId;
  hoveredObject: string | null;

  // Phase
  gamePhase: 'start' | 'instructions' | 'playing' | 'escaped';

  // Fragments / Founder File
  chits: Chit[];
  chitsCollectedCount: number;
  founderFileReconstructed: boolean;
  knowledgeUnlocked: boolean;

  // Video & Activity 1
  videoCompleted: boolean;
  activity1Complete: boolean;
  activity1Score: number;

  // Design Thinking & Activity 2, 3
  designThinkingExplored: {
    empathize: boolean;
    define: boolean;
    ideate: boolean;
    prototype: boolean;
    test: boolean;
  };
  activity2Complete: boolean;
  activity2Score: number;
  activity3Complete: boolean;
  activity3Score: number;

  // Wall 4 Evidence & Cabinet
  evidenceUnlocked: boolean;
  evidenceDocuments: EvidenceDocument[];
  evidenceReadCount: number;

  // Activity 4 Time machine
  productTimeMachineComplete: boolean;
  problemSpottingComplete: boolean;
  problemSpottingScore: number;

  // Center Desk Case Studies
  activity5Complete: boolean;
  activity5Score: number;

  // Evidence Sorting
  evidenceSorted: boolean;

  // Activity 6 & 5 Whys
  notebook: NotebookState;
  activity6Complete: boolean;
  fiveWhysComplete: boolean;
  rootCauseIdentified: boolean;

  // Exit
  exitUnlocked: boolean;
  escaped: boolean;

  // Toast / notification
  toastMessage: string | null;
}
