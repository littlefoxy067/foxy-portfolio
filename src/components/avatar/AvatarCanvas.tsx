import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import FoxyCharacter from './FoxyCharacter';
import type { AvatarAction, AvatarAppearance } from '../../lib/types';

const DEFAULT_APPEARANCE: AvatarAppearance = {
  skinColor: '#FDBCB4',
  topColor: '#00e5ff',
  bottomColor: '#1a1a3e',
  hairColor: '#2d2d2d',
  hatColor: '#ff00ff',
  showHat: false,
};

function CyberGround() {
  const gridRef = useRef<THREE.GridHelper>(null!);
  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      {/* Glowing platform */}
      <mesh position={[0, -0.01, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.05, 64]} />
        <meshStandardMaterial
          color="#0d0d18"
          emissive="#00e5ff"
          emissiveIntensity={0.08}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Platform edge glow */}
      <mesh position={[0, -0.02, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={3} />
      </mesh>
      {/* Inner ring */}
      <mesh position={[0, -0.015, 0]}>
        <torusGeometry args={[0.9, 0.01, 16, 64]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} />
      </mesh>
      <gridHelper ref={gridRef} args={[6, 20, '#00e5ff22', '#00e5ff11']} position={[0, -0.03, 0]} />
    </>
  );
}

function FloatingParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = 30;
  const dummy = new THREE.Object3D();
  const positions = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 4,
    y: Math.random() * 3,
    z: (Math.random() - 0.5) * 4,
    speed: Math.random() * 0.5 + 0.2,
    offset: Math.random() * Math.PI * 2,
  }));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    positions.forEach((p, i) => {
      dummy.position.set(p.x, (p.y + Math.sin(t * p.speed + p.offset) * 0.3) % 3.5, p.z);
      dummy.scale.setScalar(0.02 + Math.sin(t + p.offset) * 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={3} />
    </instancedMesh>
  );
}

interface Props {
  action: AvatarAction;
  appearance?: Partial<AvatarAppearance>;
  height?: string;
  interactive?: boolean;
}

export default function AvatarCanvas({ action, appearance, height = '400px', interactive = true }: Props) {
  const mergedAppearance: AvatarAppearance = {
    ...DEFAULT_APPEARANCE,
    ...appearance,
  };

  return (
    <div style={{ height, width: '100%' }} className="avatar-section rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 2, 4.5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050508']} />
        <fog attach="fog" args={['#050508', 8, 20]} />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 4, 2]} color="#00e5ff" intensity={2} castShadow />
        <pointLight position={[-2, 3, -2]} color="#ff00ff" intensity={1.5} />
        <pointLight position={[0, 1, 3]} color="#ffffff" intensity={0.8} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} castShadow />

        <Suspense fallback={null}>
          <CyberGround />
          <FloatingParticles />
          <FoxyCharacter action={action} appearance={mergedAppearance} />
          <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={4} blur={2} />
          <Environment preset="night" />
        </Suspense>

        {interactive && (
          <OrbitControls
            enablePan={false}
            minDistance={2.5}
            maxDistance={8}
            minPolarAngle={0.3}
            maxPolarAngle={Math.PI / 2.1}
            target={[0, 1.5, 0]}
            enableDamping
            dampingFactor={0.08}
          />
        )}
      </Canvas>
    </div>
  );
}

export { DEFAULT_APPEARANCE };
