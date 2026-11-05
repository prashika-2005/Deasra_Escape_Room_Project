import React from 'react';
import { Text } from '@react-three/drei';

interface DesignThinkingBoard3DProps {
  explored: {
    empathize: boolean;
    define: boolean;
    ideate: boolean;
    prototype: boolean;
    test: boolean;
  };
  onInspect: () => void;
  onHover: (name: string | null) => void;
}

const STICKIES = [
  { label: 'Think\nUser', color: '#fef08a', x: -1.5, y: 0.45 },
  { label: 'Build\nIdeas', color: '#f9a8d4', x: -0.4, y: 0.55 },
  { label: 'Create\nImpact', color: '#bbf7d0', x: 0.75, y: 0.38 },
  { label: 'Iterate\nImprove', color: '#c7d2fe', x: -1.2, y: -0.55 },
  { label: 'Prototype', color: '#d9f99d', x: 1.1, y: -0.7 },
] as const;

export default function DesignThinkingBoard3D({
  explored,
  onInspect,
  onHover,
}: DesignThinkingBoard3DProps) {
  const allExplored = Object.values(explored).every(Boolean);

  return (
    <group
      position={[0.25, 2.1, -6.8]}
      onClick={(e) => {
        e.stopPropagation();
        onInspect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover('[ Explore Design Thinking Board ]');
      }}
      onPointerOut={() => onHover(null)}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.9, 2.8, 0.1]} />
        <meshStandardMaterial color="#1d2430" roughness={0.38} metalness={0.8} />
      </mesh>

      <mesh position={[0, 0, 0.06]} receiveShadow>
        <planeGeometry args={[4.75, 2.62]} />
        <meshStandardMaterial color="#f5f7fa" roughness={0.22} metalness={0.06} />
      </mesh>

      <Text position={[0, 0.9, 0.08]} fontSize={0.16} color="#0f172a" anchorX="center" anchorY="middle" letterSpacing={0.04}>
        DESIGN THINKING STATION
      </Text>
      <Text position={[0, 0.6, 0.08]} fontSize={0.07} color="#0f172a" anchorX="center" anchorY="middle" letterSpacing={0.04}>
        Empathize • Define • Ideate • Prototype • Test
      </Text>

      <mesh position={[0, 0.06, 0.08]}>
        <boxGeometry args={[3.4, 0.03, 0.01]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.45} />
      </mesh>

      {STICKIES.map((item, index) => (
        <group key={`${item.label}-${index}`} position={[item.x, item.y, 0.09]}>
          <mesh rotation={[0, 0, index % 2 === 0 ? 0.04 : -0.04]}>
            <planeGeometry args={[0.9, 0.8]} />
            <meshStandardMaterial color={item.color} roughness={0.8} />
          </mesh>
          <Text position={[0, 0.02, 0.02]} fontSize={0.085} color="#111827" anchorX="center" anchorY="middle" lineHeight={1.2}>
            {item.label}
          </Text>
        </group>
      ))}

      <group position={[-1.75, -0.88, 0.09]}>
        <mesh>
          <planeGeometry args={[1.05, 0.62]} />
          <meshStandardMaterial color="#dbeafe" roughness={0.2} />
        </mesh>
        <Text position={[0, 0.03, 0.02]} fontSize={0.08} color="#0f172a" anchorX="center" anchorY="middle">
          Empathize
        </Text>
      </group>

      <group position={[0.05, -0.92, 0.09]}>
        <mesh>
          <planeGeometry args={[0.95, 0.58]} />
          <meshStandardMaterial color="#e0f2fe" roughness={0.2} />
        </mesh>
        <Text position={[0, 0.02, 0.02]} fontSize={0.075} color="#0f172a" anchorX="center" anchorY="middle">
          Define
        </Text>
      </group>

      <group position={[1.9, -0.83, 0.09]}>
        <mesh>
          <planeGeometry args={[1.15, 0.7]} />
          <meshStandardMaterial color="#dcfce7" roughness={0.2} />
        </mesh>
        <Text position={[0, 0.05, 0.02]} fontSize={0.075} color="#0f172a" anchorX="center" anchorY="middle">
          Prototype
        </Text>
      </group>

      <group position={[0, -1.1, 0.09]}>
        <mesh>
          <planeGeometry args={[2.7, 0.28]} />
          <meshStandardMaterial color={allExplored ? '#065f46' : '#334155'} roughness={0.3} />
        </mesh>
        <Text position={[0, 0, 0.02]} fontSize={0.06} color="#ffffff" anchorX="center" anchorY="middle">
          {allExplored ? 'DESIGN THINKING EXPLORED ✓' : 'FOUR STAGES OF LEARNING'}
        </Text>
      </group>
    </group>
  );
}
