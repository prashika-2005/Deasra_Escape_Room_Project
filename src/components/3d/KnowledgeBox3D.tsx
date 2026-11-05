import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface KnowledgeBox3DProps {
  unlocked: boolean;
  onOpen: () => void;
  onHover: (name: string | null) => void;
}

export default function KnowledgeBox3D({ unlocked, onOpen, onHover }: KnowledgeBox3DProps) {
  const lidRef = useRef<THREE.Group>(null);
  const currentLidAngle = useRef(0);

  useFrame((_, delta) => {
    const targetAngle = unlocked ? -Math.PI / 1.7 : 0;
    currentLidAngle.current = THREE.MathUtils.lerp(currentLidAngle.current, targetAngle, delta * 3);

    if (lidRef.current) {
      lidRef.current.rotation.x = currentLidAngle.current;
    }
  });

  return (
    <group position={[-2.05, 2.1, -6.8]}>
      <group
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(unlocked ? '[ Open Knowledge Box ]' : '[ Knowledge Box (Locked — Founder File Required) ]');
        }}
        onPointerOut={() => onHover(null)}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 2.25, 0.1]} />
          <meshStandardMaterial color="#0d2630" roughness={0.72} metalness={0.12} />
        </mesh>

        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[2.62, 2.08, 0.05]} />
          <meshStandardMaterial color="#165066" roughness={0.72} metalness={0.08} />
        </mesh>

        <group position={[0, 0.8, 0.08]}>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.48, 0.42, 0.03]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
          <Text position={[0, 0.12, 0.05]} fontSize={0.13} color="#0f172a" anchorX="center" anchorY="middle">
            K
          </Text>
          <Text position={[0, -0.15, 0.06]} fontSize={0.16} color="#f8fafc" anchorX="center" anchorY="middle" letterSpacing={0.04}>
            KNOWLEDGE BOX
          </Text>
        </group>

        <Text position={[0, 0.32, 0.08]} fontSize={0.07} color="#dbeafe" anchorX="center" anchorY="middle" letterSpacing={0.04}>
          Learn • Understand • Apply
        </Text>

        <group position={[0, -0.7, 0.09]}>
          <mesh castShadow>
            <boxGeometry args={[1.4, 0.18, 0.18]} />
            <meshStandardMaterial color="#0f172a" roughness={0.38} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.04, 0.01]}>
            <planeGeometry args={[1.18, 0.12]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0284c7" emissiveIntensity={unlocked ? 0.8 : 0.12} roughness={0.2} />
          </mesh>
          <Text position={[0, 0.04, 0.03]} fontSize={0.05} color="#f8fafc" anchorX="center" anchorY="middle">
            {unlocked ? 'PROBLEM-SOLVING' : 'SYSTEM LOCKED'}
          </Text>
        </group>

        <group position={[0, 0.1, -0.25]} ref={lidRef}>
          <mesh castShadow>
            <boxGeometry args={[2.9, 0.08, 0.18]} />
            <meshStandardMaterial color="#495763" roughness={0.26} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.04, 0.08]}>
            <boxGeometry args={[1.15, 0.015, 0.12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.7} />
          </mesh>
        </group>

        <mesh position={[0, -0.95, 0.14]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color={unlocked ? '#10b981' : '#ef4444'} emissive={unlocked ? '#10b981' : '#ef4444'} emissiveIntensity={1.5} />
        </mesh>
      </group>
    </group>
  );
}
