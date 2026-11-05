import React from 'react';
import { Text } from '@react-three/drei';

interface StartupBoard3DProps {
  onInspect: () => void;
  onInspectFragment1?: () => void;
  onHover: (name: string | null) => void;
  fragment1Found?: boolean;
  panelIndex?: number;
  onNavigate?: (direction: 'left' | 'right') => void;
}

export default function StartupBoard3D({
  onInspect,
  onInspectFragment1,
  onHover,
  fragment1Found = false,
  panelIndex = 1,
  onNavigate,
}: StartupBoard3DProps) {
  const boardShift = (panelIndex - 1) * 1.05;

  return (
    <group position={[-4.9 + boardShift, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <pointLight position={[-2, 3.8, 0]} color="#ffedd5" intensity={2.1} distance={7} castShadow />
      <pointLight position={[2, 3.8, 0]} color="#ffedd5" intensity={2.1} distance={7} castShadow />
      <pointLight position={[0, 3.8, 0]} color="#fff7ed" intensity={1.4} distance={8} />

      <group position={[0, 3.9, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.04, 12, 48]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.028, 12, 48]} />
          <meshStandardMaterial color="#fef3c7" emissive="#fef3c7" emissiveIntensity={1.8} roughness={0.1} />
        </mesh>
      </group>

      <mesh position={[0, 2.1, -0.03]} receiveShadow>
        <planeGeometry args={[16, 4.2]} />
        <meshStandardMaterial color="#73675d" roughness={0.9} metalness={0.05} />
      </mesh>

      <mesh position={[-5.2, 2.1, 0.02]} receiveShadow>
        <planeGeometry args={[3.2, 4.2]} />
        <meshStandardMaterial color="#3e2a1c" roughness={0.8} />
      </mesh>

      <group position={[-5.3, 1.7, 0.18]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 3.4, 0.08]} />
          <meshStandardMaterial color="#1b120f" roughness={0.7} />
        </mesh>
        {[-1.25, 1.25].map((x, idx) => (
          <mesh key={`shelf-side-${idx}`} position={[x, 0, 0.18]}>
            <boxGeometry args={[0.06, 3.4, 0.42]} />
            <meshStandardMaterial color="#2d2018" roughness={0.6} />
          </mesh>
        ))}
        {[1.45, 0.65, -0.15, -0.95].map((y, idx) => (
          <mesh key={`shelf-row-${idx}`} position={[0, y, 0.18]}>
            <boxGeometry args={[2.45, 0.06, 0.42]} />
            <meshStandardMaterial color="#3c2d20" roughness={0.6} />
          </mesh>
        ))}
        {[{ x: -0.9, h: 0.46 }, { x: -0.68, h: 0.4 }, { x: -0.45, h: 0.48 }, { x: -0.22, h: 0.42 }, { x: 0.04, h: 0.5 }, { x: 0.25, h: 0.38 }, { x: 0.5, h: 0.44 }].map((b, idx) => (
          <mesh key={`book-${idx}`} position={[b.x, 1.68 + b.h / 2, 0.36]} castShadow>
            <boxGeometry args={[0.08, b.h, 0.28]} />
            <meshStandardMaterial color={['#1d4ed8', '#7c3aed', '#b91c1c', '#065f46', '#92400e', '#1e3a5f', '#4c1d95'][idx]} roughness={0.6} />
          </mesh>
        ))}
        <group position={[0.75, 1.9, 0.38]}>
          <mesh castShadow>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#1d4ed8" roughness={0.3} metalness={0.25} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.18, 0.008, 8, 32]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      <group position={[-3.2, 2.2, 0.18]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.9, 2.1, 0.06]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.82, 2.0]} />
          <meshStandardMaterial color="#1f2937" roughness={0.5} />
        </mesh>
        <Text position={[0, 0.82, 0.04]} fontSize={0.09} color="#f8fafc" anchorX="center" anchorY="middle" letterSpacing={0.04}>
          Our
        </Text>
        <Text position={[0, 0.52, 0.04]} fontSize={0.09} color="#f8fafc" anchorX="center" anchorY="middle" letterSpacing={0.04}>
          Journey
        </Text>
        <mesh position={[0, 0.38, 0.04]}>
          <planeGeometry args={[0.65, 0.005]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {[
          { year: '2019', label: 'Idea' },
          { year: '2020', label: 'MVP' },
          { year: '2021', label: 'Growth' },
          { year: '2022', label: 'Expansion' },
          { year: '2023', label: 'Today' },
        ].map((entry, i) => (
          <group key={`timeline-${i}`} position={[-0.18, 0.12 - i * 0.3, 0.04]}>
            <mesh position={[-0.13, 0, 0]}>
              <circleGeometry args={[0.018, 12]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
            <Text position={[0.12, 0.04, 0]} fontSize={0.05} color="#94a3b8" anchorX="left" anchorY="middle">
              {entry.year}
            </Text>
            <Text position={[0.12, -0.04, 0]} fontSize={0.04} color="#e2e8f0" anchorX="left" anchorY="middle">
              {entry.label}
            </Text>
          </group>
        ))}
      </group>

      <group position={[0, 3.7, 0.12]}>
        <group position={[-0.8, 0, 0]} scale={[1, 1, 1]}>
          <mesh position={[-0.08, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 0.3, 0.04]} />
            <meshStandardMaterial color="#2d5be1" roughness={0.2} metalness={0.6} />
          </mesh>
          <mesh position={[0.08, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 0.3, 0.04]} />
            <meshStandardMaterial color="#1f4ac6" roughness={0.2} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, -0.55]} castShadow>
            <boxGeometry args={[0.04, 0.34, 0.04]} />
            <meshStandardMaterial color="#7bb3ff" roughness={0.25} metalness={0.5} />
          </mesh>
        </group>
        <Text position={[0.2, 0, 0.03]} fontSize={0.24} color="#ffffff" anchorX="left" anchorY="middle" letterSpacing={0.06}>
          NOVALINK
        </Text>
        <Text position={[0.2, -0.18, 0.03]} fontSize={0.08} color="#cbd5e1" anchorX="left" anchorY="middle" letterSpacing={0.04}>
          Connect • Build • Grow
        </Text>
      </group>

      <group position={[0, 2.9, 0.12]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[5.5, 0.12]} />
          <meshBasicMaterial color="#d4a373" transparent opacity={0.7} />
        </mesh>
      </group>

      <group position={[-3.15, 2.1, 0.18]} onClick={(e) => { e.stopPropagation(); onNavigate?.('left'); }} onPointerOver={(e) => { e.stopPropagation(); onHover('Move wall left'); }} onPointerOut={() => onHover(null)}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.5, 0.08]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.35} />
        </mesh>
        <Text position={[0, 0, 0.06]} fontSize={0.2} color="#f8fafc" anchorX="center" anchorY="middle">←</Text>
      </group>

      <group position={[3.15, 2.1, 0.18]} onClick={(e) => { e.stopPropagation(); onNavigate?.('right'); }} onPointerOver={(e) => { e.stopPropagation(); onHover('Move wall right'); }} onPointerOut={() => onHover(null)}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.5, 0.08]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.35} />
        </mesh>
        <Text position={[0, 0, 0.06]} fontSize={0.2} color="#f8fafc" anchorX="center" anchorY="middle">→</Text>
      </group>

      <group position={[0, 2.1, 0.12]} onClick={(e) => { e.stopPropagation(); onInspect(); }} onPointerOver={(e) => { e.stopPropagation(); onHover('Inspect Startup Intelligence Board'); }} onPointerOut={() => onHover(null)}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.8, 2.9, 0.1]} />
          <meshStandardMaterial color="#2d2118" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[4.68, 2.75, 0.04]} />
          <meshStandardMaterial color="#3d2a16" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.09]} receiveShadow>
          <planeGeometry args={[4.48, 2.62]} />
          <meshStandardMaterial color="#b98d5f" roughness={0.96} metalness={0.02} />
        </mesh>

        <group position={[-1.55, 0.45, 0.11]}>
          <mesh rotation={[0, 0, -0.015]}>
            <planeGeometry args={[1.1, 0.8]} />
            <meshStandardMaterial color="#10192d" roughness={0.6} />
          </mesh>
          <Text position={[-0.42, 0.24, 0.02]} fontSize={0.08} color="#f8fafc" anchorX="left" anchorY="top" maxWidth={0.9} lineHeight={1.3}>
            {'Big Ideas\nBuild\nBetter\nTomorrows'}
          </Text>
          <mesh position={[0.32, 0.32, 0.02]}>
            <cylinderGeometry args={[0.02, 0.02, 0.02, 10]} />
            <meshStandardMaterial color="#dc2626" metalness={0.6} roughness={0.2} />
          </mesh>
        </group>

        <group position={[-1.4, -0.55, 0.11]}>
          <mesh rotation={[0, 0, 0.05]}>
            <planeGeometry args={[1.05, 0.7]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.5} />
          </mesh>
          <Text position={[0, 0.18, 0.01]} fontSize={0.04} color="#0f172a" anchorX="center" anchorY="middle">
            Q3 ORDERS vs CANCELLATIONS
          </Text>
          {[[-0.35, 0.12, '#3b82f6'], [-0.15, 0.18, '#3b82f6'], [0.06, 0.25, '#ef4444'], [0.24, 0.34, '#ef4444']].map(([x, h, c], idx) => (
            <mesh key={`bar-${idx}`} position={[Number(x), Number(h) - 0.16, 0.02]}>
              <boxGeometry args={[0.11, Number(h), 0.01]} />
              <meshStandardMaterial color={c as string} />
            </mesh>
          ))}
        </group>

        <group position={[0.15, 0.38, 0.11]}>
          <mesh rotation={[0, 0, -0.02]}>
            <planeGeometry args={[1.18, 0.82]} />
            <meshStandardMaterial color="#0f1729" roughness={0.35} />
          </mesh>
          {[-0.42, -0.25, -0.05, 0.15, 0.35].map((x, idx) => (
            <mesh key={`tower-${idx}`} position={[x, -0.2 + (idx % 2 === 0 ? 0.18 : 0.08), 0.02]}>
              <boxGeometry args={[0.12, 0.38 + idx * 0.08, 0.01]} />
              <meshStandardMaterial color="#1e3a5f" />
            </mesh>
          ))}
          <mesh position={[0, 0.2, 0.02]}>
            <planeGeometry args={[1.08, 0.34]} />
            <meshStandardMaterial color="#1e40af" roughness={0.3} />
          </mesh>
        </group>

        <group position={[1.55, 0.72, 0.11]}>
          <mesh rotation={[0, 0, 0.03]}>
            <planeGeometry args={[0.78, 0.58]} />
            <meshStandardMaterial color="#fef9c3" roughness={0.7} />
          </mesh>
          <Text position={[-0.28, 0.12, 0.02]} fontSize={0.055} color="#713f12" anchorX="left" anchorY="top" lineHeight={1.4}>
            {'Innovation\nPeople\nImpact'}
          </Text>
        </group>

        <group position={[1.25, -0.12, 0.11]}>
          <mesh rotation={[0, 0, 0.02]}>
            <planeGeometry args={[1.0, 0.78]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
          </mesh>
          {[-0.25, -0.08, 0.08, 0.25].map((x, idx) => (
            <group key={`people-${idx}`} position={[x, -0.02, 0.02]}>
              <mesh position={[0, 0.12, 0]}>
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshStandardMaterial color="#425466" />
              </mesh>
              <mesh position={[0, -0.02, 0]}>
                <boxGeometry args={[0.09, 0.15, 0.01]} />
                <meshStandardMaterial color={idx === 1 ? '#2563eb' : '#334155'} />
              </mesh>
            </group>
          ))}
        </group>

        <group position={[1.48, -0.66, 0.11]}>
          <mesh rotation={[0, 0, -0.04]}>
            <planeGeometry args={[0.75, 0.54]} />
            <meshStandardMaterial color="#fce7f3" roughness={0.7} />
          </mesh>
          <Text position={[-0.29, 0.13, 0.02]} fontSize={0.055} color="#831843" anchorX="left" anchorY="top" lineHeight={1.35}>
            {'Small\nSteps\nBig Change'}
          </Text>
        </group>

        <group position={[0.56, -0.68, 0.11]}>
          <mesh rotation={[0, 0, 0.05]}>
            <planeGeometry args={[0.54, 0.5]} />
            <meshStandardMaterial color="#fef08a" roughness={0.7} />
          </mesh>
          <Text position={[-0.18, 0.12, 0.02]} fontSize={0.028} color="#713f12" anchorX="left" anchorY="top" maxWidth={0.46} lineHeight={1.3}>
            {'HEAD OF OPS:\n"Manual handoffs\nbetween 4 tablets\ncompletely failing!"'}
          </Text>
        </group>

        <group position={[-0.16, -0.72, 0.11]}>
          <mesh rotation={[0, 0, -0.06]}>
            <planeGeometry args={[0.58, 0.5]} />
            <meshStandardMaterial color="#fbcfe8" roughness={0.7} />
          </mesh>
          <Text position={[-0.2, 0.12, 0.02]} fontSize={0.028} color="#831843" anchorX="left" anchorY="top" maxWidth={0.5} lineHeight={1.3}>
            {'COURIER QUEUE:\nRiders waiting\n37+ mins at\nkitchen doors.'}
          </Text>
        </group>

        <mesh position={[-0.35, 0.78, 0.11]}>
          <planeGeometry args={[0.92, 0.08]} />
          <meshBasicMaterial color="#dc2626" transparent opacity={0.9} />
        </mesh>

        <group position={[-0.78, 0.12, 0.12]}>
          <mesh>
            <planeGeometry args={[1.4, 1.25]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.65} />
          </mesh>
          <Text position={[0, 0.46, 0.02]} fontSize={0.046} color="#78350f" anchorX="center" anchorY="middle">
            URGENT — INTERNAL INVESTIGATION
          </Text>
          <Text position={[-0.62, 0.18, 0.02]} fontSize={0.028} color="#451a03" anchorX="left" anchorY="top" maxWidth={1.2} lineHeight={1.5}>
            {'NOVALINK was growing rapidly. Then something changed.\nOrders increased. Customers became unhappy.\nEmployees became overwhelmed.\nAnd the startup began losing money.\n\nThe founder started an internal investigation...'}
          </Text>
          <group position={[0, -0.42, 0.01]}>
            <mesh>
              <planeGeometry args={[1.2, 0.17]} />
              <meshStandardMaterial color="#784d1f" roughness={0.4} />
            </mesh>
            <Text position={[0, 0, 0.02]} fontSize={0.03} color="#fef3c7" anchorX="center" anchorY="middle">MISSION 01: RECONSTRUCT THE FOUNDER'S FILE</Text>
          </group>
        </group>
      </group>

      <group position={[4.35, 2.4, 0.2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.32, 1.82, 0.08]} />
          <meshStandardMaterial color="#111111" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[2.16, 1.66, 0.03]} />
          <meshStandardMaterial color="#0f172a" roughness={0.35} />
        </mesh>
        <mesh position={[0.1, 0.1, 0.05]}>
          <planeGeometry args={[1.9, 1.1]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.35} />
        </mesh>
        <group position={[0.1, 0.1, 0.06]}>
          <mesh position={[0.2, 0.38, 0]}>
            <boxGeometry args={[0.45, 0.85, 0.01]} />
            <meshStandardMaterial color="#1e40af" roughness={0.3} metalness={0.2} />
          </mesh>
          {[-0.48, -0.24, 0.0, 0.24].map((x, idx) => (
            <group key={`poster-person-${idx}`} position={[x, -0.26, 0.01]}>
              <mesh position={[0, 0.1, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              <mesh position={[0, -0.05, 0]}>
                <boxGeometry args={[0.07, 0.14, 0.01]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </group>
          ))}
          <mesh position={[-0.6, -0.32, 0.01]}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshStandardMaterial color="#14532d" roughness={0.7} />
          </mesh>
        </group>
        <Text position={[0, -0.7, 0.06]} fontSize={0.1} color="#f8fafc" anchorX="center" anchorY="middle">
          Same Team
        </Text>
        <Text position={[0, -0.82, 0.06]} fontSize={0.1} color="#5ec4ff" anchorX="center" anchorY="middle">
          Bigger Dreams
        </Text>
      </group>

      <group position={[4.7, 0.5, 0.22]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.8, 0.6]} />
          <meshStandardMaterial color="#2b1b12" roughness={0.6} />
        </mesh>
        {[-0.55, 0.55].map((y, idx) => (
          <group key={`drawer-${idx}`} position={[0, y * 0.4, 0.31]}>
            <mesh>
              <boxGeometry args={[2.2, 0.3, 0.02]} />
              <meshStandardMaterial color="#3b2a1d" roughness={0.55} />
            </mesh>
            <mesh position={[0, 0, 0.025]}>
              <boxGeometry args={[0.28, 0.04, 0.03]} />
              <meshStandardMaterial color="#b57c48" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>

      <group position={[-1.8, 0.35, 1.7]}>
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 1.2, 0.85]} />
          <meshStandardMaterial color="#9a6b3d" roughness={0.7} metalness={0.08} />
        </mesh>
        <mesh position={[0, 1.35, 0.12]}>
          <boxGeometry args={[1.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#b57c48" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.3, 0.55]} castShadow>
          <boxGeometry args={[0.8, 0.06, 0.08]} />
          <meshStandardMaterial color="#2b2f36" roughness={0.5} />
        </mesh>
      </group>

      <group position={[-1.7, 0.8, 0.5]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 0.06, 0.7]} />
          <meshStandardMaterial color="#f4f4f5" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.14, 0]} castShadow>
          <boxGeometry args={[0.42, 0.12, 0.42]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      </group>

      <group position={[-5.7, 0.65, 4.5]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.8, 16]} />
          <meshStandardMaterial color="#2d2f34" roughness={0.45} />
        </mesh>
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.38, 12, 12]} />
          <meshStandardMaterial color="#294d2c" roughness={0.5} />
        </mesh>
      </group>

      {[-2.72, -2.62, -2.52, -2.42].map((x, idx) => (
        <mesh key={`slat-left-${idx}`} position={[x, 2.1, 0.08]} castShadow>
          <boxGeometry args={[0.05, 4.0, 0.12]} />
          <meshStandardMaterial color="#3d2a1a" roughness={0.7} metalness={0.05} />
        </mesh>
      ))}
      {[2.42, 2.52, 2.62, 2.72].map((x, idx) => (
        <mesh key={`slat-right-${idx}`} position={[x, 2.1, 0.08]} castShadow>
          <boxGeometry args={[0.05, 4.0, 0.12]} />
          <meshStandardMaterial color="#3d2a1a" roughness={0.7} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}
