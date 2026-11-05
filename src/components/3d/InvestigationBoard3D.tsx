import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface InvestigationBoard3DProps {
  evidenceSorted: boolean;
  onInspect: () => void;
  onHover: (name: string | null) => void;
}

export default function InvestigationBoard3D({
  evidenceSorted,
  onInspect,
  onHover,
}: InvestigationBoard3DProps) {
  return (
    <group
      position={[4.88, 2.1, 0]}
      rotation={[0, -Math.PI / 2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onInspect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover('[ Investigate Evidence Board ]');
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* Heavy Wooden Pinboard Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.6, 2.2, 0.08]} />
        <meshStandardMaterial color="#2d2218" roughness={0.7} />
      </mesh>

      {/* Linen/Cork Board Surface */}
      <mesh position={[0, 0, 0.045]} receiveShadow>
        <planeGeometry args={[3.45, 2.05]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.95} />
      </mesh>

      {/* Header Banner */}
      <group position={[0, 0.85, 0.055]}>
        <mesh>
          <planeGeometry args={[3.1, 0.22]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>
        <Text
          position={[0, 0.01, 0.01]}
          fontSize={0.09}
          color="#f8fafc"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          NOVALINK EVIDENCE ANALYSIS
        </Text>
      </group>

      {/* 4 Category Columns Dividers and Headers */}
      {[
        { name: 'EFFECT', x: -1.25, color: '#f87171' },
        { name: 'SYMPTOM', x: -0.42, color: '#fb923c' },
        { name: 'PROBLEM', x: 0.42, color: '#38bdf8' },
        { name: 'UNDERLYING PROBLEM', x: 1.25, color: '#c084fc' },
      ].map((col, idx) => (
        <group key={col.name} position={[col.x, 0.55, 0.06]}>
          {/* Column Header Card */}
          <mesh>
            <planeGeometry args={[0.78, 0.18]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={idx === 3 ? 0.032 : 0.045}
            color={col.color}
            anchorX="center"
            anchorY="middle"
          >
            {col.name}
          </Text>

          {/* Sample Pinned Clue Cards under each column */}
          {[-0.35, -0.7].map((cy, cIdx) => (
            <group key={`pinned-${cIdx}`} position={[0, cy, 0]}>
              <mesh rotation={[0, 0, (cIdx - 0.5) * 0.04]}>
                <planeGeometry args={[0.7, 0.26]} />
                <meshStandardMaterial
                  color={evidenceSorted ? '#f8fafc' : '#e2e8f0'}
                  roughness={0.5}
                />
              </mesh>
              {/* Pushpin */}
              <mesh position={[0, 0.1, 0.015]}>
                <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
                <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Red Investigation Strings crossing between cards */}
      <mesh position={[0, 0, 0.058]}>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-1.2, 0.1, 0),
              new THREE.Vector3(-0.4, -0.15, 0),
              new THREE.Vector3(0.4, 0.15, 0),
              new THREE.Vector3(1.2, -0.15, 0),
            ]),
            24,
            0.003,
            6,
            false,
          ]}
        />
        <meshStandardMaterial color="#ef4444" roughness={0.4} />
      </mesh>

      {/* Bottom Status Tag */}
      <group position={[0, -0.85, 0.055]}>
        <mesh>
          <planeGeometry args={[2.4, 0.18]} />
          <meshStandardMaterial
            color={evidenceSorted ? '#065f46' : '#1e293b'}
            roughness={0.3}
          />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.044}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {evidenceSorted ? 'EVIDENCE ORGANIZED ✓' : 'TAP TO ORGANIZE EVIDENCE'}
        </Text>
      </group>
    </group>
  );
}
