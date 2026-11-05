import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface ExitDoorProps {
  exitUnlocked: boolean;
  onInspect: () => void;
  onHover: (name: string | null) => void;
}

export default function ExitDoor({ exitUnlocked, onInspect, onHover }: ExitDoorProps) {
  const doorPivotRef = useRef<THREE.Group>(null);
  const handleRef = useRef<THREE.Group>(null);
  const currentAngle = useRef(0);
  const handleAngle = useRef(0);

  useFrame((_, delta) => {
    // When exit is unlocked, rotate handle down then swing door open
    const targetDoorAngle = exitUnlocked ? -Math.PI / 2.2 : 0;
    const targetHandleAngle = exitUnlocked ? -0.4 : 0;

    currentAngle.current = THREE.MathUtils.lerp(currentAngle.current, targetDoorAngle, delta * 2.2);
    handleAngle.current = THREE.MathUtils.lerp(handleAngle.current, targetHandleAngle, delta * 4);

    if (doorPivotRef.current) {
      doorPivotRef.current.rotation.y = currentAngle.current;
    }
    if (handleRef.current) {
      handleRef.current.rotation.z = handleAngle.current;
    }
  });

  return (
    <group position={[0, 0, 6.9]}>
      <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.7, 3.3, 0.22]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.8} roughness={0.25} />
      </mesh>

      <mesh position={[0, 1.7, -0.05]}>
        <planeGeometry args={[2.05, 3.05]} />
        <meshBasicMaterial color="#050810" />
      </mesh>

      <group position={[0, 1.7, 1.5]}>
        <mesh position={[0, 0, 1]}>
          <boxGeometry args={[2.2, 3.0, 2.5]} />
          <meshStandardMaterial
            color="#f8fafc"
            emissive={exitUnlocked ? '#e0f2fe' : '#030712'}
            emissiveIntensity={exitUnlocked ? 0.9 : 0.05}
            roughness={0.3}
            side={THREE.BackSide}
          />
        </mesh>
        {exitUnlocked && (
          <pointLight position={[0, 1, 1.2]} color="#38bdf8" intensity={2.5} distance={6} />
        )}
      </group>

      <group
        position={[-1.2, 0.2, 0.04]}
        ref={doorPivotRef}
      >
        <mesh
          position={[1.2, 1.5, 0]}
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation();
            onInspect();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(exitUnlocked ? 'Enter Escape Corridor' : 'Inspect Security Exit');
          }}
          onPointerOut={() => onHover(null)}
        >
          <boxGeometry args={[2.2, 3.0, 0.12]} />
          <meshStandardMaterial
            color="#2b3036"
            metalness={0.75}
            roughness={0.35}
          />
        </mesh>

        {[-0.7, 0.7].map((py, idx) => (
          <mesh key={`panel-${idx}`} position={[1.0, 1.5 + py, 0.055]}>
            <boxGeometry args={[1.7, 1.1, 0.02]} />
            <meshStandardMaterial color="#21262d" metalness={0.8} roughness={0.4} />
          </mesh>
        ))}

        <group ref={handleRef} position={[1.9, 1.5, 0.08]}>
          <mesh>
            <boxGeometry args={[0.08, 0.35, 0.02]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-0.12, 0, 0.05]}>
            <boxGeometry args={[0.26, 0.04, 0.04]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        <group position={[1.2, 2.4, 0.065]}>
          <Text
            fontSize={0.11}
            color="#9aa7b7"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.04}
          >
            NOVALINK
          </Text>
        </group>
      </group>

      {/* ================= WALL 1 MYSTERY PLAQUE (Left of door) ================= */}
      <group position={[-1.8, 1.7, 0.02]}>
        {/* Metal backing plaque */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.0, 1.4, 0.04]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Inset copper plate */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.92, 1.32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        {/* Mystery Title */}
        <Text
          position={[0, 0.48, 0.035]}
          fontSize={0.06}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          THE BROKEN STARTUP
        </Text>
        <mesh position={[0, 0.41, 0.035]}>
          <planeGeometry args={[0.8, 0.008]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
        {/* Story Text */}
        <Text
          position={[0, 0.28, 0.035]}
          fontSize={0.042}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          NOVALINK IS FAILING.
        </Text>
        <Text
          position={[0, 0.05, 0.035]}
          fontSize={0.032}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.84}
          lineHeight={1.4}
        >
          {"Something went wrong.\nFind the real problem.\nIdentify the root cause.\nUnlock the exit."}
        </Text>
        {/* Directive footer */}
        <group position={[0, -0.45, 0.035]}>
          <mesh>
            <planeGeometry args={[0.82, 0.18]} />
            <meshStandardMaterial color="#0284c7" roughness={0.4} />
          </mesh>
          <Text
            fontSize={0.03}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.02}
          >
            START AT WALL 2: STARTUP BOARD
          </Text>
        </group>
      </group>

      {/* ================= DIGITAL ACCESS TERMINAL (Wall mounted to the right) ================= */}
      <group
        position={[1.6, 1.55, -0.02]}
        onClick={(e) => {
          e.stopPropagation();
          onInspect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover('Inspect Exit Terminal');
        }}
        onPointerOut={() => onHover(null)}
      >
        {/* Terminal backplate */}
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.85, 0.08]} />
          <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Glass Screen */}
        <mesh position={[0, 0.08, 0.045]}>
          <boxGeometry args={[0.48, 0.58, 0.01]} />
          <meshStandardMaterial
            color={exitUnlocked ? '#022c22' : '#1e1b4b'}
            emissive={exitUnlocked ? '#059669' : '#312e81'}
            emissiveIntensity={0.3}
            roughness={0.2}
          />
        </mesh>

        {/* Terminal Screen Text */}
        <group position={[0, 0.28, 0.055]}>
          <Text
            fontSize={0.038}
            color={exitUnlocked ? '#34d399' : '#60a5fa'}
            anchorX="center"
            anchorY="middle"
          >
            NOVALINK SECURE OS
          </Text>
          <Text
            position={[0, -0.06, 0]}
            fontSize={0.028}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            {exitUnlocked ? 'ROOT CAUSE IDENTIFIED' : 'ROOT CAUSE: UNKNOWN'}
          </Text>
          <Text
            position={[0, -0.11, 0]}
            fontSize={0.026}
            color={exitUnlocked ? '#34d399' : '#f87171'}
            anchorX="center"
            anchorY="middle"
          >
            {exitUnlocked ? 'INVESTIGATION COMPLETE' : 'INVESTIGATION INCOMPLETE'}
          </Text>
          <Text
            position={[0, -0.17, 0]}
            fontSize={0.034}
            color={exitUnlocked ? '#10b981' : '#ef4444'}
            anchorX="center"
            anchorY="middle"
          >
            {exitUnlocked ? 'STATUS: UNLOCKED ✓' : 'STATUS: LOCKED ✕'}
          </Text>
        </group>

        {/* Status Indicator LED Light */}
        <mesh position={[0, -0.28, 0.045]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial
            color={exitUnlocked ? '#10b981' : '#ef4444'}
            emissive={exitUnlocked ? '#10b981' : '#ef4444'}
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>
        <pointLight
          position={[0, -0.28, 0.1]}
          color={exitUnlocked ? '#10b981' : '#ef4444'}
          intensity={0.8}
          distance={1.5}
        />
      </group>
    </group>
  );
}
