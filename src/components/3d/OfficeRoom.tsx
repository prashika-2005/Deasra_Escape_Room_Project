import React from 'react';
import { Text } from '@react-three/drei';

export default function OfficeRoom() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 16]} />
        <meshStandardMaterial color="#c4b7af" roughness={0.38} metalness={0.08} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} receiveShadow>
        <planeGeometry args={[13.7, 15.6]} />
        <meshStandardMaterial color="#d9d2cc" roughness={0.82} metalness={0.06} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.1, 0]}>
        <planeGeometry args={[14, 16]} />
        <meshStandardMaterial color="#1b1d20" roughness={0.9} metalness={0.2} />
      </mesh>

      {[-3.4, 0, 3.4].map((x, i) => (
        <group key={`track-${i}`} position={[x, 4.14, 0]}>
          <mesh>
            <boxGeometry args={[0.18, 0.04, 10]} />
            <meshStandardMaterial color="#121212" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.02, 0]}>
            <boxGeometry args={[0.08, 0.02, 9.7]} />
            <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={1.35} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 2.1, 7]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[14, 4.2]} />
        <meshStandardMaterial color="#7a6258" roughness={0.9} metalness={0.08} />
      </mesh>

      <mesh position={[-5, 2.1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[16, 4.2]} />
        <meshStandardMaterial color="#7a6258" roughness={0.9} metalness={0.08} />
      </mesh>

      <mesh position={[0, 2.1, -7]} receiveShadow>
        <planeGeometry args={[14, 4.2]} />
        <meshStandardMaterial color="#c8c0b7" roughness={0.82} metalness={0.06} />
      </mesh>

      <mesh position={[5, 2.1, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[16, 4.2]} />
        <meshStandardMaterial color="#c8c0b7" roughness={0.82} metalness={0.06} />
      </mesh>

      <mesh position={[0, 0.08, 6.95]}>
        <boxGeometry args={[14, 0.16, 0.04]} />
        <meshStandardMaterial color="#221f1e" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.08, -6.95]}>
        <boxGeometry args={[14, 0.16, 0.04]} />
        <meshStandardMaterial color="#221f1e" roughness={0.5} />
      </mesh>
      <mesh position={[-4.95, 0.08, 0]}>
        <boxGeometry args={[0.04, 0.16, 14]} />
        <meshStandardMaterial color="#221f1e" roughness={0.5} />
      </mesh>
      <mesh position={[4.95, 0.08, 0]}>
        <boxGeometry args={[0.04, 0.16, 14]} />
        <meshStandardMaterial color="#221f1e" roughness={0.5} />
      </mesh>

      {[
        [-4.9, 2.1, -6.85],
        [4.9, 2.1, -6.85],
        [-4.9, 2.1, 6.85],
        [4.9, 2.1, 6.85],
      ].map(([cx, cy, cz], idx) => (
        <mesh key={`column-${idx}`} position={[cx, cy, cz]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 4.2, 0.3]} />
          <meshStandardMaterial color="#17191c" roughness={0.4} metalness={0.8} />
        </mesh>
      ))}

      <mesh position={[-5.5, 2.1, 0.8]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[5.2, 3.7]} />
        <meshStandardMaterial color="#4d382d" roughness={0.8} metalness={0.06} />
      </mesh>

      <group position={[-3.25, 1.55, 0.18]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6, 2.5, 0.08]} />
          <meshStandardMaterial color="#1a130f" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[1.45, 2.3]} />
          <meshStandardMaterial color="#f4f4f4" roughness={0.4} metalness={0.06} />
        </mesh>
        <Text position={[0, 0.75, 0.06]} fontSize={0.45} color="#10253f" anchorX="center" anchorY="middle" letterSpacing={0.04}>
          N
        </Text>
        <Text position={[0, -0.1, 0.06]} fontSize={0.13} color="#0f172a" anchorX="center" anchorY="middle" letterSpacing={0.06}>
          NOVALINK
        </Text>
        <Text position={[0, -0.35, 0.06]} fontSize={0.07} color="#475569" anchorX="center" anchorY="middle" letterSpacing={0.04}>
          Connect • Build • Grow
        </Text>
      </group>

      <group position={[4.9, 2.1, 0.1]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.9, 2.1, 0.1]} />
          <meshStandardMaterial color="#f0efe9" roughness={0.7} metalness={0.08} />
        </mesh>
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[2.7, 1.9]} />
          <meshStandardMaterial color="#f9f9f7" roughness={0.85} />
        </mesh>
        <Text position={[0, 0.7, 0.06]} fontSize={0.18} color="#0f172a" anchorX="center" anchorY="middle">
          Great
        </Text>
        <Text position={[0, 0.42, 0.06]} fontSize={0.18} color="#0f172a" anchorX="center" anchorY="middle">
          Startups
        </Text>
        <Text position={[0, 0.14, 0.06]} fontSize={0.18} color="#0f172a" anchorX="center" anchorY="middle">
          Solve
        </Text>
        <Text position={[0, -0.14, 0.06]} fontSize={0.18} color="#0f172a" anchorX="center" anchorY="middle">
          Real
        </Text>
        <Text position={[0, -0.42, 0.06]} fontSize={0.18} color="#0f172a" anchorX="center" anchorY="middle">
          Problems
        </Text>
        <mesh position={[0, -0.92, 0.06]}>
          <boxGeometry args={[1.8, 0.03, 0.02]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </group>

      <group position={[6.2, 0.7, -4.5]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.28, 0.8, 16]} />
          <meshStandardMaterial color="#2b2d34" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.38, 12, 12]} />
          <meshStandardMaterial color="#255630" roughness={0.5} />
        </mesh>
      </group>

      <group position={[-5.6, 0.7, 4.8]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.28, 0.8, 16]} />
          <meshStandardMaterial color="#2b2d34" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.38, 12, 12]} />
          <meshStandardMaterial color="#314c2d" roughness={0.5} />
        </mesh>
      </group>

      <group position={[0, 0, -5.75]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.2, 0.8]} />
          <meshStandardMaterial color="#9b6d3c" roughness={0.65} metalness={0.08} />
        </mesh>
        <mesh position={[0, 1.5, 0.2]}>
          <boxGeometry args={[1.8, 0.1, 0.2]} />
          <meshStandardMaterial color="#a87442" roughness={0.8} />
        </mesh>
      </group>

      <group position={[0, 0, 6.6]}>
        <mesh position={[0, 2.7, 0.08]}>
          <planeGeometry args={[2.8, 0.9]} />
          <meshStandardMaterial color="#0c8f50" emissive="#0a9a59" emissiveIntensity={1.5} roughness={0.2} />
        </mesh>
        <Text position={[0, 2.7, 0.12]} fontSize={0.25} color="#f3fff3" anchorX="center" anchorY="middle" letterSpacing={0.05}>
          EMERGENCY EXIT
        </Text>
      </group>
    </group>
  );
}
