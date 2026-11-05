import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface FilingCabinet3DProps {
  unlocked: boolean;
  readCount: number;
  onInspect: () => void;
  onHover: (name: string | null) => void;
}

export default function FilingCabinet3D({
  unlocked,
  readCount,
  onInspect,
  onHover,
}: FilingCabinet3DProps) {
  const topDrawerRef = useRef<THREE.Group>(null);
  const currentSlide = useRef(0);

  useFrame((_, delta) => {
    // Top drawer slides out when unlocked
    const targetSlide = unlocked ? 0.45 : 0;
    currentSlide.current = THREE.MathUtils.lerp(currentSlide.current, targetSlide, delta * 3);

    if (topDrawerRef.current) {
      topDrawerRef.current.position.x = -currentSlide.current;
    }
  });

  return (
    <group
      position={[4.85, 0, -1.8]}
      rotation={[0, -Math.PI / 2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onInspect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(unlocked ? '[ Read Evidence Files ]' : '[ Evidence Cabinet (Locked - Complete Activity 3) ]');
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* Heavy Steel Cabinet Frame */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 2.2, 0.7]} />
        <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Top Drawer (Sliding unit containing the 6 documents) */}
      <group position={[0, 1.85, 0]} ref={topDrawerRef}>
        {/* Drawer Front */}
        <mesh position={[0, 0, 0.355]} castShadow>
          <boxGeometry args={[0.88, 0.48, 0.04]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, 0, 0.4]}>
          <boxGeometry args={[0.22, 0.04, 0.05]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Label Tag Slot */}
        <mesh position={[0, 0.12, 0.38]}>
          <planeGeometry args={[0.28, 0.09]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.5} />
        </mesh>
        <Text
          position={[0, 0.12, 0.39]}
          fontSize={0.038}
          color="#0f172a"
          anchorX="center"
          anchorY="middle"
        >
          {unlocked ? `EVIDENCE (${readCount}/6)` : 'RESTRICTED'}
        </Text>

        {/* Drawer Interior / Sliding Box */}
        <mesh position={[0, -0.05, 0.05]} castShadow>
          <boxGeometry args={[0.82, 0.4, 0.55]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Physical Evidence Folders inside drawer */}
        {unlocked && (
          <group position={[0, 0.08, 0.05]}>
            {[-0.2, -0.12, -0.04, 0.04, 0.12, 0.2].map((fz, idx) => (
              <mesh key={`doc-${idx}`} position={[0, 0, fz]} rotation={[-0.15, 0, 0]} castShadow>
                <boxGeometry args={[0.65, 0.26, 0.02]} />
                <meshStandardMaterial
                  color={['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'][idx]}
                  roughness={0.6}
                />
              </mesh>
            ))}
          </group>
        )}
      </group>

      {/* Drawers 2, 3, 4 (Closed standard drawers) */}
      {[1.35, 0.85, 0.35].map((dy, idx) => (
        <group key={`drawer-${idx}`} position={[0, dy, 0]}>
          <mesh position={[0, 0, 0.355]} castShadow>
            <boxGeometry args={[0.88, 0.46, 0.04]} />
            <meshStandardMaterial color="#3f4b5b" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.39]}>
            <boxGeometry args={[0.22, 0.04, 0.04]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.12, 0.38]}>
            <planeGeometry args={[0.24, 0.08]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
          </mesh>
          <Text
            position={[0, 0.12, 0.39]}
            fontSize={0.034}
            color="#334155"
            anchorX="center"
            anchorY="middle"
          >
            {`ARCHIVE 0${idx + 2}`}
          </Text>
        </group>
      ))}

      {/* Security Stamp on side of Cabinet */}
      <group position={[0.49, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Text
          fontSize={0.055}
          color={unlocked ? '#10b981' : '#f43f5e'}
          anchorX="center"
          anchorY="middle"
        >
          {unlocked ? 'STATUS: ACCESS GRANTED' : 'CLASSIFIED STARTUP DATA'}
        </Text>
      </group>
    </group>
  );
}
