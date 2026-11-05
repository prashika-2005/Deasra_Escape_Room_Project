import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import CameraController from './CameraController';
import OfficeRoom from './OfficeRoom';
import ExitDoor from './ExitDoor';
import StartupBoard3D from './StartupBoard3D';
import Chit3D from './Chit3D';
import KnowledgeBox3D from './KnowledgeBox3D';
import DesignThinkingBoard3D from './DesignThinkingBoard3D';
import FilingCabinet3D from './FilingCabinet3D';
import ProductTimeMachine3D from './ProductTimeMachine3D';
import CentralDesk3D from './CentralDesk3D';
import InvestigationBoard3D from './InvestigationBoard3D';
import Notebook3D from './Notebook3D';
import { StationId, Chit, WallId } from '../../types/gameTypes';

interface OfficeCanvasProps {
  activeStation: StationId;
  activeWall?: WallId;
  chits: Chit[];
  exitUnlocked: boolean;
  knowledgeUnlocked: boolean;
  designThinkingExplored: {
    empathize: boolean;
    define: boolean;
    ideate: boolean;
    prototype: boolean;
    test: boolean;
  };
  evidenceUnlocked: boolean;
  evidenceReadCount: number;
  productTimeMachineComplete: boolean;
  activity5Complete: boolean;
  evidenceSorted: boolean;
  activity6Complete: boolean;
  fiveWhysComplete: boolean;
  onSelectStation: (station: StationId) => void;
  onSelectWall?: (wall: WallId) => void;
  onWallDetected?: (wall: WallId) => void;
  onCollectChit: (id: number) => void;
  onInspectFragment?: (id: number) => void;
  onHoverObject: (name: string | null) => void;
  guidedDiscovery?: boolean;
  wall2PanelIndex?: number;
  onWall2Navigate?: (direction: 'left' | 'right') => void;
}

export default function OfficeCanvas({
  activeStation,
  activeWall = 'wall-2',
  chits,
  exitUnlocked,
  knowledgeUnlocked,
  designThinkingExplored,
  evidenceUnlocked,
  evidenceReadCount,
  productTimeMachineComplete,
  activity5Complete,
  evidenceSorted,
  activity6Complete,
  fiveWhysComplete,
  onSelectStation,
  onSelectWall,
  onWallDetected,
  onCollectChit,
  onInspectFragment,
  onHoverObject,
  guidedDiscovery = false,
  wall2PanelIndex = 1,
  onWall2Navigate,
}: OfficeCanvasProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ position: [0, 2.6, 4.6], fov: 50, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0f172a']} />
        <fog attach="fog" args={['#0f172a', 14, 28]} />

        {/* Ambient Warm Fill Light */}
        <ambientLight intensity={0.65} color="#fffbeb" />

        {/* Sunlight through Window (Wall 2) */}
        <directionalLight
          position={[-7, 6, -3]}
          intensity={1.8}
          color="#fef3c7"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-bias={-0.0001}
        />

        {/* Soft Overhead Downlights */}
        <pointLight position={[0, 3.8, 0]} intensity={1.4} color="#f8fafc" distance={9} />
        <pointLight position={[-2.5, 3.5, 2.5]} intensity={0.9} color="#e0f2fe" distance={7} />
        <pointLight position={[2.5, 3.5, -2.5]} intensity={0.9} color="#fef9c3" distance={7} />

        <Suspense fallback={null}>
          <CameraController
            activeStation={activeStation}
            activeWall={activeWall}
            onWallDetected={onWallDetected}
          />

          {/* Connected 3D Realistic Office Environment */}
          <OfficeRoom />

          {/* Wall 1: Heavy Security Exit Door */}
          <ExitDoor
            exitUnlocked={exitUnlocked}
            onInspect={() => onSelectStation('exit')}
            onHover={onHoverObject}
          />

          {/* Wall 2: Startup Information Corkboard */}
          <StartupBoard3D
            onInspect={() => onSelectStation('startup-board')}
            onInspectFragment1={onInspectFragment ? () => onInspectFragment(1) : undefined}
            onHover={onHoverObject}
            fragment1Found={chits.find((c) => c.id === 1)?.found}
            panelIndex={wall2PanelIndex}
            onNavigate={onWall2Navigate}
          />

          {/* 5 Hidden Founder File Fragments around Wall 2 */}
          {chits.map((chit) => (
            <Chit3D
              key={chit.id}
              chit={chit}
              onCollect={onCollectChit}
              onInspect={onInspectFragment}
              onHover={onHoverObject}
              guidedDiscovery={guidedDiscovery}
            />
          ))}

          {/* Wall 3: Metallic Knowledge Box */}
          <KnowledgeBox3D
            unlocked={knowledgeUnlocked}
            onOpen={() => onSelectStation('knowledge-box')}
            onHover={onHoverObject}
          />

          {/* Wall 3: Design Thinking Framework Board */}
          <DesignThinkingBoard3D
            explored={designThinkingExplored}
            onInspect={() => onSelectStation('design-thinking')}
            onHover={onHoverObject}
          />

          <group position={[5.2, 2.1, -6.8]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[2.1, 2.6, 0.08]} />
              <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.15} />
            </mesh>
            <mesh position={[0, 0, 0.05]}>
              <planeGeometry args={[1.9, 2.38]} />
              <meshStandardMaterial color="#122b35" roughness={0.8} />
            </mesh>
            <Text position={[0, 0.82, 0.08]} fontSize={0.11} color="#f8fafc" anchorX="center" anchorY="middle" letterSpacing={0.04}>
              FOUNDER'S JOURNEY
            </Text>
            <Text position={[0, 0.54, 0.08]} fontSize={0.06} color="#bfdbfe" anchorX="center" anchorY="middle">
              Dream • Build • Grow
            </Text>
            {[
              { label: 'Idea', color: '#fef08a' },
              { label: 'Prototype', color: '#bbf7d0' },
              { label: 'Product', color: '#dbeafe' },
              { label: 'Growth', color: '#f5d0fe' },
            ].map((item, index) => (
              <group key={item.label} position={[0, 0.12 - index * 0.52, 0.09]}>
                <mesh>
                  <planeGeometry args={[1.45, 0.3]} />
                  <meshStandardMaterial color={item.color} roughness={0.4} />
                </mesh>
                <Text position={[0, 0, 0.02]} fontSize={0.06} color="#0f172a" anchorX="center" anchorY="middle">
                  {item.label}
                </Text>
              </group>
            ))}
          </group>

          {/* Wall 4: Steel 4-Drawer Evidence Filing Cabinet */}
          <FilingCabinet3D
            unlocked={evidenceUnlocked}
            readCount={evidenceReadCount}
            onInspect={() => onSelectStation('filing-cabinet')}
            onHover={onHoverObject}
          />

          {/* Wall 4: Steampunk Product Time Machine */}
          <ProductTimeMachine3D
            unlocked={evidenceReadCount >= 6}
            completed={productTimeMachineComplete}
            onInspect={() => onSelectStation('time-machine')}
            onHover={onHoverObject}
          />

          {/* Wall 4: Evidence Analysis Pinboard */}
          <InvestigationBoard3D
            evidenceSorted={evidenceSorted}
            onInspect={() => onSelectStation('evidence-sorting')}
            onHover={onHoverObject}
          />

          {/* Center: Executive Desk with 5 Case Studies */}
          <CentralDesk3D
            activity5Complete={activity5Complete}
            onInspectCases={() => onSelectStation('central-desk')}
            onHover={onHoverObject}
          />

          {/* Final Desk: Leather-Bound Investigator Notebook */}
          <Notebook3D
            activity6Complete={activity6Complete}
            fiveWhysComplete={fiveWhysComplete}
            onOpen={() => onSelectStation('notebook')}
            onHover={onHoverObject}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
