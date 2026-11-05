import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface CentralDesk3DProps {
  activity5Complete: boolean;
  onInspectCases: () => void;
  onHover: (name: string | null) => void;
}

const CASE_COLORS = ['#3b82f6', '#06b6d4', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function CentralDesk3D({
  activity5Complete,
  onInspectCases,
  onHover,
}: CentralDesk3DProps) {
  return (
    <group position={[0, 0, -0.2]}>
      {/* Executive Wooden Desk Top */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.08, 1.4]} />
        <meshStandardMaterial color="#4a3728" roughness={0.45} metalness={0.1} />
      </mesh>

      {/* Desk Metal Legs */}
      {[
        [-1.3, 0.35, -0.6],
        [1.3, 0.35, -0.6],
        [-1.3, 0.35, 0.6],
        [1.3, 0.35, 0.6],
      ].map(([lx, ly, lz], i) => (
        <mesh key={`desk-leg-${i}`} position={[lx, ly, lz]} castShadow>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Leather Desk Mat */}
      <mesh position={[-0.4, 0.785, 0]} receiveShadow>
        <boxGeometry args={[1.5, 0.01, 0.9]} />
        <meshStandardMaterial color="#1f242d" roughness={0.8} />
      </mesh>

      {/* Ergonomic Office Chair Behind Desk */}
      <group position={[0, 0, -1.0]} rotation={[0, 0.1, 0]}>
        {/* Chair Seat */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <boxGeometry args={[0.65, 0.1, 0.6]} />
          <meshStandardMaterial color="#18181b" roughness={0.7} />
        </mesh>
        {/* Chair Backrest */}
        <mesh position={[0, 0.95, -0.28]} castShadow>
          <boxGeometry args={[0.6, 0.75, 0.08]} />
          <meshStandardMaterial color="#27272a" roughness={0.7} />
        </mesh>
        {/* Chair Central Column & Wheels */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.45, 12]} />
          <meshStandardMaterial color="#71717a" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.03, 5]} />
          <meshStandardMaterial color="#18181b" metalness={0.8} />
        </mesh>
      </group>

      {/* Modern Desk Lamp */}
      <group position={[-1.1, 0.78, -0.45]}>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.03, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        {/* Angled Arm */}
        <mesh position={[0.08, 0.22, 0.08]} rotation={[-0.2, 0, 0.2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.45, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        {/* Lamp Hood */}
        <mesh position={[0.18, 0.4, 0.15]} rotation={[0.5, 0.3, 0]}>
          <coneGeometry args={[0.12, 0.16, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} />
        </mesh>
        {/* Lamp Light casting warm glow on desk */}
        <pointLight position={[0.18, 0.36, 0.15]} color="#ffedd5" intensity={1.5} distance={2.5} />
      </group>

      {/* Coffee Mug */}
      <group position={[-1.1, 0.78, 0.35]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.11, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.042, 0.042, 0.01, 16]} />
          <meshStandardMaterial color="#451a03" roughness={0.9} />
        </mesh>
      </group>

      {/* Pen Cup with stationery */}
      <group position={[-0.9, 0.78, -0.45]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.12, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.7} />
        </mesh>
        <mesh position={[0.01, 0.12, 0.01]} rotation={[0.1, 0, 0.1]}>
          <cylinderGeometry args={[0.005, 0.005, 0.18, 8]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      </group>

      {/* ================= 5 PHYSICAL CASE STUDY DOSSIERS ================= */}
      <group
        position={[-0.45, 0.79, -0.05]}
        onClick={(e) => {
          e.stopPropagation();
          onInspectCases();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover('[ Open Case Files (Activity 5) ]');
        }}
        onPointerOut={() => onHover(null)}
      >
        {/* Dossiers fan arrangement */}
        {[-0.4, -0.2, 0.0, 0.2, 0.4].map((dx, i) => (
          <group key={`case-${i}`} position={[dx, 0.005 * i, i * 0.02]} rotation={[0, (i - 2) * 0.05, 0]}>
            {/* Dossier Folder */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.26, 0.015, 0.36]} />
              <meshStandardMaterial color={CASE_COLORS[i]} roughness={0.6} />
            </mesh>
            {/* Top Label */}
            <mesh position={[0, 0.009, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.22, 0.08]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            <Text
              position={[0, 0.012, -0.1]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.024}
              color="#0f172a"
              anchorX="center"
              anchorY="middle"
            >
              {`CASE 0${i + 1}`}
            </Text>
          </group>
        ))}

        {/* Status Plaque on desk */}
        <group position={[0, 0.01, 0.25]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.65, 0.1]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
          <Text
            position={[0, 0.015, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.034}
            color={activity5Complete ? '#34d399' : '#f59e0b'}
            anchorX="center"
            anchorY="middle"
          >
            {activity5Complete ? 'CASE STUDIES COMPLETE ✓' : 'TAP TO INVESTIGATE CASES'}
          </Text>
        </group>
      </group>
    </group>
  );
}
