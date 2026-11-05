import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { StationId, WallId } from '../../types/gameTypes';

interface CameraControllerProps {
  activeStation: StationId;
  activeWall?: WallId;
  onWallDetected?: (wall: WallId) => void;
}

export const WALL_CONFIGS: Record<WallId, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  'wall-1': {
    // Wall 1 (Exit / South): view locked exit door, terminal, mission screen, logo
    pos: [0, 2.05, 1.6],
    lookAt: [0, 1.8, 6.9],
  },
  'wall-2': {
    // Wall 2 (Startup Board / West): view corkboard, founder notice, 5 fragments, shelves
    pos: [-0.7, 2.05, 0.0],
    lookAt: [-4.9, 1.85, 0.0],
  },
  'wall-3': {
    // Wall 3 (Learning / North): view Knowledge Box on left, Design Thinking Board on right
    pos: [0.0, 2.05, -1.4],
    lookAt: [0.0, 1.8, -6.9],
  },
  'wall-4': {
    // Wall 4 (Investigation / East): view filing cabinet, pinboard, time machine
    pos: [0.7, 2.05, 0.0],
    lookAt: [4.9, 1.85, 0.0],
  },
  'center': {
    // Center (Investigation Desk / Case Files): view executive desk, notebook, case studies
    pos: [0.0, 2.55, 3.2],
    lookAt: [0.0, 1.15, -0.1],
  },
};

const STATION_CONFIGS: Record<StationId, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  'overview': {
    pos: [-0.7, 2.05, 0.0],
    lookAt: [-4.9, 1.85, 0.0],
  },
  'exit': {
    pos: [0, 1.65, 4.4],
    lookAt: [0, 1.65, 6.8],
  },
  'startup-board': {
    pos: [-2.4, 2.0, 0],
    lookAt: [-4.9, 2.0, 0],
  },
  'knowledge-box': {
    pos: [-2.0, 1.5, -4.5],
    lookAt: [-2.8, 1.15, -6.6],
  },
  'design-thinking': {
    pos: [1.8, 1.85, -4.6],
    lookAt: [2.2, 1.85, -6.8],
  },
  'filing-cabinet': {
    pos: [3.1, 1.35, -1.8],
    lookAt: [4.9, 1.2, -1.8],
  },
  'time-machine': {
    pos: [3.1, 1.6, 1.8],
    lookAt: [4.9, 1.5, 1.8],
  },
  'central-desk': {
    pos: [-0.6, 1.95, 0.4],
    lookAt: [-0.2, 1.05, -0.2],
  },
  'evidence-sorting': {
    pos: [2.8, 2.0, 0.0],
    lookAt: [4.9, 2.0, 0.0],
  },
  'notebook': {
    pos: [0.6, 1.85, 0.3],
    lookAt: [0.6, 1.05, -0.2],
  },
};

export default function CameraController({
  activeStation,
  activeWall = 'wall-2',
  onWallDetected,
}: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const targetPos = useRef(new THREE.Vector3(...WALL_CONFIGS['wall-2'].pos));
  const targetLook = useRef(new THREE.Vector3(...WALL_CONFIGS['wall-2'].lookAt));
  const currentLook = useRef(new THREE.Vector3(...WALL_CONFIGS['wall-2'].lookAt));
  const isTransitioning = useRef(true);
  const frameCount = useRef(0);
  const forwardVec = useRef(new THREE.Vector3());

  // Determine current desired camera target
  useEffect(() => {
    let config: { pos: [number, number, number]; lookAt: [number, number, number] };
    if (activeStation === 'overview') {
      config = WALL_CONFIGS[activeWall] || WALL_CONFIGS['wall-2'];
    } else {
      config = STATION_CONFIGS[activeStation] || STATION_CONFIGS.overview;
    }

    targetPos.current.set(...config.pos);
    targetLook.current.set(...config.lookAt);
    isTransitioning.current = true;
  }, [activeStation, activeWall]);

  // Hook into OrbitControls to cancel automated transition if user manually drags
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleControlStart = () => {
      isTransitioning.current = false;
    };

    controls.addEventListener('start', handleControlStart);
    return () => {
      controls.removeEventListener('start', handleControlStart);
    };
  }, []);

  useFrame((_, delta) => {
    if (isTransitioning.current) {
      // Smooth cinematic dampening
      const t = Math.min(delta * 4.2, 1);
      camera.position.lerp(targetPos.current, t);
      currentLook.current.lerp(targetLook.current, t);

      if (controlsRef.current) {
        controlsRef.current.target.copy(currentLook.current);
        controlsRef.current.update();
      } else {
        camera.lookAt(currentLook.current);
      }

      // Check if settled
      const distPos = camera.position.distanceTo(targetPos.current);
      const distLook = currentLook.current.distanceTo(targetLook.current);
      if (distPos < 0.04 && distLook < 0.04) {
        camera.position.copy(targetPos.current);
        currentLook.current.copy(targetLook.current);
        if (controlsRef.current) {
          controlsRef.current.target.copy(targetLook.current);
          controlsRef.current.update();
        }
        isTransitioning.current = false;
      }
    } else if (activeStation !== 'overview') {
      camera.lookAt(currentLook.current);
    } else if (controlsRef.current) {
      controlsRef.current.update();

      // Check camera orientation every 20 frames to detect current facing wall during manual orbiting
      frameCount.current += 1;
      if (frameCount.current % 20 === 0 && onWallDetected) {
        camera.getWorldDirection(forwardVec.current);
        let detected: WallId | null = null;
        if (camera.position.y > 2.3 && forwardVec.current.y < -0.35) {
          detected = 'center';
        } else if (forwardVec.current.z > 0.55) {
          detected = 'wall-1';
        } else if (forwardVec.current.x < -0.55) {
          detected = 'wall-2';
        } else if (forwardVec.current.z < -0.55) {
          detected = 'wall-3';
        } else if (forwardVec.current.x > 0.55) {
          detected = 'wall-4';
        }

        if (detected) {
          onWallDetected(detected);
        }
      }
    }
  });

  return (
    <>
      {activeStation === 'overview' && (
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={1.2}
          maxDistance={7.0}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2 - 0.05}
          rotateSpeed={0.65}
          dampingFactor={0.08}
          enableDamping={true}
        />
      )}
    </>
  );
}
