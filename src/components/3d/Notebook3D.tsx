import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Notebook3DProps {
  activity6Complete: boolean;
  fiveWhysComplete: boolean;
  onOpen: () => void;
  onHover: (name: string | null) => void;
}

export default function Notebook3D({
  activity6Complete,
  fiveWhysComplete,
  onOpen,
  onHover,
}: Notebook3DProps) {
  return (
    <group
      position={[0.65, 0.785, 0.05]}
      rotation={[0, -0.15, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover('[ Open Notebook (5 Whys & Activity 6) ]');
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* Leather Bound Book Cover */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.035, 0.55]} />
        <meshStandardMaterial color="#451a03" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Pages interior */}
      <mesh position={[0.01, 0, 0]}>
        <boxGeometry args={[0.39, 0.03, 0.52]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.8} />
      </mesh>

      {/* Gold Foil Title Embossing */}
      <group position={[0, 0.02, 0]}>
        <Text
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, -0.12]}
          fontSize={0.036}
          color="#facc15"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          INVESTIGATOR NOTEBOOK
        </Text>
        <Text
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, -0.04]}
          fontSize={0.024}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
        >
          ACTIVITY 6 & 5 WHYS
        </Text>
        <Text
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0.12]}
          fontSize={0.028}
          color={fiveWhysComplete ? '#34d399' : '#f59e0b'}
          anchorX="center"
          anchorY="middle"
        >
          {fiveWhysComplete ? 'ROOT CAUSE IDENTIFIED ✓' : 'PROBLEM SOLVING TEMPLATE'}
        </Text>
      </group>

      {/* Detective Fountain Pen next to the notebook */}
      <group position={[0.26, 0.015, 0]} rotation={[0, 0.05, 0]}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.38, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Brass Ring */}
        <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.03, 12]} />
          <meshStandardMaterial color="#eab308" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Nib */}
        <mesh position={[0, 0, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.009, 0.04, 12]} />
          <meshStandardMaterial color="#eab308" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}
