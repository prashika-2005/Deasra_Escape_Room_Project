import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Chit } from '../../types/gameTypes';

interface Chit3DProps {
  chit: Chit;
  onCollect: (id: number) => void;
  onInspect?: (id: number) => void;
  onHover: (name: string | null) => void;
  guidedDiscovery?: boolean;
}

export default function Chit3D({
  chit,
  onCollect,
  onInspect,
  onHover,
}: Chit3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [collecting, setCollecting] = useState(false);
  const scale = useRef(1);

  useFrame((_, delta) => {
    if (chit.found && !collecting) return;

    if (collecting) {
      scale.current = THREE.MathUtils.lerp(scale.current, 0, delta * 6);
      if (meshRef.current) {
        meshRef.current.position.y += delta * 1.2;
        meshRef.current.rotation.y += delta * 6;
        meshRef.current.scale.setScalar(scale.current);
      }
    }
  });

  if (chit.found && !collecting) {
    return null;
  }

  const getHoverPrompt = () => {
    return `[ 🔍 Inspect: ${chit.locationTitle} ]`;
  };

  const handleClick = (e?: any) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (chit.found || collecting) return;
    if (onInspect) {
      onInspect(chit.id);
    } else {
      setCollecting(true);
      setTimeout(() => {
        onCollect(chit.id);
      }, 400);
    }
  };

  // Orientation tailored to look physically resting on surfaces or pinned
  const getRotation = (): [number, number, number] => {
    switch (chit.id) {
      case 1:
        return [0, Math.PI / 2, 0.1]; // Pinned near board
      case 2:
        return [-Math.PI / 2 + 0.1, 0, 0.2]; // Resting flat in folder on shelf
      case 3:
        return [0, Math.PI / 2, 0]; // Front face in drawer
      case 4:
        return [0, Math.PI / 2, 0.25]; // Protruding behind framed photo
      case 5:
        return [-Math.PI / 2 + 0.05, 0, -0.3]; // Resting on desk near plaque
      default:
        return [0, 0, 0];
    }
  };

  return (
    <group
      ref={meshRef}
      position={[chit.position[0], chit.position[1], chit.position[2]]}
      rotation={getRotation()}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(getHoverPrompt());
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      {/* ================= 3D PHYSICAL DOCUMENT FRAGMENT ================= */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.26, 0.34, 0.008]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#fcfaf5'}
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* Torn Edge / Inset Border styling */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[0.23, 0.31]} />
        <meshStandardMaterial color="#f3ede2" roughness={0.9} />
      </mesh>

      {/* Red CONFIDENTIAL stamp on the paper */}
      <group position={[0.04, 0.1, 0.007]} rotation={[0, 0, 0.15]}>
        <mesh>
          <planeGeometry args={[0.13, 0.035]} />
          <meshBasicMaterial color="#ef4444" wireframe />
        </mesh>
        <Text
          fontSize={0.018}
          color="#dc2626"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.02}
        >
          CONFIDENTIAL
        </Text>
      </group>

      {/* Title Header */}
      <Text
        position={[0, 0.03, 0.007]}
        fontSize={0.016}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        FOUNDER FILE
      </Text>

      {/* Fragment Number Badge */}
      <Text
        position={[0, -0.025, 0.007]}
        fontSize={0.024}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
      >
        {`PIECE ${chit.fragmentNumber}`}
      </Text>

      {/* Simulated lines of handwritten text */}
      {[-0.07, -0.09, -0.11].map((ly, idx) => (
        <mesh key={`line-${idx}`} position={[0, ly, 0.006]}>
          <planeGeometry args={[0.18 - idx * 0.03, 0.004]} />
          <meshStandardMaterial color="#64748b" roughness={0.5} />
        </mesh>
      ))}

      {/* ================= CLEAN MAGNIFYING GLASS ICON (NO LIGHT/GLOW AROUND IT) ================= */}
      <Html
        position={[0, 0.22, 0.05]}
        center
        distanceFactor={6.8}
        zIndexRange={[10, 0]}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          title={`Inspect ${chit.locationTitle}`}
          aria-label={`Inspect ${chit.locationTitle}`}
          className={`cursor-pointer transition-transform duration-200 flex items-center justify-center select-none pointer-events-auto transform hover:scale-125 active:scale-95 focus:outline-none ${
            hovered ? 'scale-125' : 'scale-100'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-white shadow-sm flex items-center justify-center text-xs text-slate-950 font-bold">
            🔍
          </div>
        </button>
      </Html>
    </group>
  );
}
