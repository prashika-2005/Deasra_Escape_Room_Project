import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface ProductTimeMachine3DProps {
  unlocked: boolean;
  completed: boolean;
  onInspect: () => void;
  onHover: (name: string | null) => void;
}

export default function ProductTimeMachine3D({
  unlocked,
  completed,
  onInspect,
  onHover,
}: ProductTimeMachine3DProps) {
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const leverRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // Gears rotate smoothly when unlocked/powered
    if (unlocked || completed) {
      if (gear1Ref.current) gear1Ref.current.rotation.z += delta * 0.9;
      if (gear2Ref.current) gear2Ref.current.rotation.z -= delta * 1.3;
    }

    // Mechanical subtle hum
    if (leverRef.current && (unlocked || completed)) {
      leverRef.current.rotation.x = Math.sin(t * 1.5) * 0.08 + 0.2;
    }

    // Light breathing animation
    if (coreLightRef.current) {
      if (completed) {
        coreLightRef.current.intensity = 1.6 + 0.3 * Math.sin(t * 2);
      } else if (unlocked) {
        coreLightRef.current.intensity = 1.3 + 0.4 * Math.sin(t * 3);
      } else {
        coreLightRef.current.intensity = 0.3 + 0.1 * Math.sin(t * 1);
      }
    }
  });

  const getHoverText = () => {
    if (!unlocked) {
      return '[ 🔒 Product Time Machine: Locked — Inspect All 6 Evidence Files First ]';
    }
    if (completed) {
      return '[ ⏱️ Product Time Machine: Mission 4 Complete ✓ (Click to Review) ]';
    }
    return '[ ⏱️ Product Time Machine: Mission 4 Available (Click to Start) ]';
  };

  return (
    <group
      position={[4.85, 0, 1.8]}
      rotation={[0, -Math.PI / 2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onInspect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(getHoverText());
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* Heavy Industrial Cast Steel & Brushed Iron Workbench / Pedestal */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.96, 0.78]} />
        <meshStandardMaterial color="#1e2229" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Machined Metal Trims */}
      <mesh position={[0, 0.97, 0]}>
        <boxGeometry args={[1.38, 0.03, 0.82]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Main Machine Housing (Brushed Dark Steel with Mechanical Insets) */}
      <group position={[0, 1.45, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.15, 0.9, 0.62]} />
          <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.35} />
        </mesh>

        {/* Top Curved Pressure Cylinder / Capacitor Chamber */}
        <mesh position={[0, 0.48, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 1.15, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Precision Vacuum Tubes / Indicator Diodes */}
        {[-0.38, 0.38].map((tx, idx) => (
          <group key={`tube-${idx}`} position={[tx, 0.68, 0]}>
            {/* Brass Base Mount */}
            <mesh>
              <cylinderGeometry args={[0.075, 0.09, 0.06, 16]} />
              <meshStandardMaterial color="#78716c" metalness={0.85} roughness={0.25} />
            </mesh>
            {/* Glass Vacuum Tube */}
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.065, 0.065, 0.26, 16]} />
              <meshStandardMaterial
                color={completed ? '#34d399' : unlocked ? '#38bdf8' : '#f87171'}
                emissive={completed ? '#10b981' : unlocked ? '#0284c7' : '#991b1b'}
                emissiveIntensity={completed ? 1.5 : unlocked ? 1.2 : 0.2}
                transparent
                opacity={0.7}
                roughness={0.15}
              />
            </mesh>
          </group>
        ))}

        {/* Core Lighting */}
        <pointLight
          ref={coreLightRef}
          position={[0, 0.2, 0.35]}
          color={completed ? '#34d399' : unlocked ? '#38bdf8' : '#f87171'}
          distance={1.6}
          decay={2}
        />

        {/* Steampunk Precision Rotating Gears */}
        <group ref={gear1Ref} position={[-0.4, 0.15, 0.32]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.02, 12]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0, 0.015]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.03, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
        </group>

        <group ref={gear2Ref} position={[-0.18, -0.05, 0.32]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.02, 10]} />
            <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.3} />
          </mesh>
        </group>

        {/* Interactive Actuation Lever */}
        <group ref={leverRef} position={[-0.42, -0.25, 0.32]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.04, 12]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.08, 0.03]} rotation={[-0.2, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
          </mesh>
          <mesh position={[0, 0.16, 0.045]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial color={unlocked ? '#38bdf8' : '#64748b'} roughness={0.3} />
          </mesh>
        </group>

        {/* Central Display Screen & Glass Bezel */}
        <group position={[0.16, 0.06, 0.31]}>
          {/* Bezel */}
          <mesh>
            <boxGeometry args={[0.56, 0.46, 0.02]} />
            <meshStandardMaterial color="#0b0f19" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* CRT Screen Display */}
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[0.52, 0.42]} />
            <meshStandardMaterial
              color={completed ? '#022c22' : unlocked ? '#082f49' : '#1e1b18'}
              emissive={completed ? '#059669' : unlocked ? '#0284c7' : '#7f1d1d'}
              emissiveIntensity={completed ? 0.4 : unlocked ? 0.35 : 0.15}
              roughness={0.25}
            />
          </mesh>

          {/* Screen Display Text */}
          <Text
            position={[0, 0.14, 0.02]}
            fontSize={0.03}
            color={completed ? '#a7f3d0' : unlocked ? '#bae6fd' : '#fca5a5'}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.02}
          >
            PRODUCT TIME MACHINE
          </Text>

          {/* Status Text */}
          <Text
            position={[0, 0.04, 0.02]}
            fontSize={0.038}
            color={completed ? '#34d399' : unlocked ? '#38bdf8' : '#ef4444'}
            anchorX="center"
            anchorY="middle"
          >
            {completed ? 'MISSION 4 COMPLETE ✓' : unlocked ? 'MISSION 4 AVAILABLE' : '🔒 LOCKED'}
          </Text>

          {/* Message Text */}
          <Text
            position={[0, -0.07, 0.02]}
            fontSize={0.022}
            color={completed ? '#e2e8f0' : unlocked ? '#e0f2fe' : '#cbd5e1'}
            anchorX="center"
            anchorY="middle"
            maxWidth={0.48}
          >
            {completed
              ? 'Back-Tracking Mastered\nTap to Review Mission 4'
              : unlocked
              ? 'USER → PROBLEM → NEED → PRODUCT\nTap to Start Investigation'
              : 'Complete the Evidence Investigation\nto activate this station.'}
          </Text>
        </group>

        {/* 4 Physical Card Slots on Console Shelf */}
        <group position={[0, -0.32, 0.32]}>
          {[-0.33, -0.11, 0.11, 0.33].map((sx, sIdx) => {
            const slotNames = ['USER', 'PROB', 'NEED', 'PROD'];
            return (
              <group key={`slot-${sIdx}`} position={[sx, 0, 0]}>
                {/* Metallic Slot Housing */}
                <mesh>
                  <boxGeometry args={[0.18, 0.04, 0.04]} />
                  <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
                </mesh>
                {/* Slot Inset Hole */}
                <mesh position={[0, 0.015, 0]}>
                  <boxGeometry args={[0.16, 0.01, 0.02]} />
                  <meshStandardMaterial color="#000000" />
                </mesh>
                {/* Physical Card Protruding when active */}
                {(unlocked || completed) && (
                  <mesh position={[0, 0.04, 0.005]}>
                    <boxGeometry args={[0.15, 0.07, 0.005]} />
                    <meshStandardMaterial
                      color={completed ? '#d1fae5' : '#fef08a'}
                      roughness={0.7}
                    />
                  </mesh>
                )}
                {/* Slot Label */}
                <Text
                  position={[0, -0.015, 0.022]}
                  fontSize={0.016}
                  color={completed ? '#34d399' : unlocked ? '#93c5fd' : '#64748b'}
                  anchorX="center"
                  anchorY="middle"
                >
                  {slotNames[sIdx]}
                </Text>
              </group>
            );
          })}
        </group>
      </group>
    </group>
  );
}
