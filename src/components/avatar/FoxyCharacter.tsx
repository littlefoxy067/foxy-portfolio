import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { AvatarAction, AvatarAppearance } from '../../lib/types';

interface Props {
  action: AvatarAction;
  appearance: AvatarAppearance;
}

export default function FoxyCharacter({ action, appearance }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Group>(null!);
  const rightArmRef = useRef<THREE.Group>(null!);
  const leftArmRef = useRef<THREE.Group>(null!);
  const rightLegRef = useRef<THREE.Group>(null!);
  const leftLegRef = useRef<THREE.Group>(null!);

  const t = useRef(0);
  const prevAction = useRef<AvatarAction>('idle');
  const animPhase = useRef(0);

  useEffect(() => {
    if (prevAction.current !== action) {
      animPhase.current = 0;
      prevAction.current = action;
    }
  }, [action]);

  useFrame((_, delta) => {
    t.current += delta;
    animPhase.current += delta;
    const time = t.current;
    const phase = animPhase.current;

    const head = headRef.current;
    const body = bodyRef.current;
    const rArm = rightArmRef.current;
    const lArm = leftArmRef.current;
    const rLeg = rightLegRef.current;
    const lLeg = leftLegRef.current;
    const root = groupRef.current;

    if (!head || !body || !rArm || !lArm || !rLeg || !lLeg || !root) return;

    // Reset
    head.rotation.set(0, 0, 0);
    body.rotation.set(0, 0, 0);
    rArm.rotation.set(0, 0, 0);
    lArm.rotation.set(0, 0, 0);
    rLeg.rotation.set(0, 0, 0);
    lLeg.rotation.set(0, 0, 0);
    root.position.set(0, 0, 0);
    root.rotation.set(0, 0, 0);

    switch (action) {
      case 'idle': {
        const bob = Math.sin(time * 1.2) * 0.04;
        root.position.y = bob;
        rArm.rotation.z = Math.sin(time * 0.8) * 0.06 + 0.15;
        lArm.rotation.z = -(Math.sin(time * 0.8) * 0.06 + 0.15);
        head.rotation.y = Math.sin(time * 0.5) * 0.08;
        break;
      }

      case 'wave': {
        root.position.y = Math.sin(time * 1.2) * 0.03;
        // Right arm waves
        rArm.rotation.z = Math.sin(time * 6) * 0.5 + 0.9;
        rArm.rotation.x = -0.3;
        lArm.rotation.z = -0.15;
        head.rotation.y = 0.2;
        head.rotation.x = Math.sin(time * 2) * 0.04;
        break;
      }

      case 'jump': {
        const jumpY = Math.abs(Math.sin(time * 4)) * 1.2;
        root.position.y = jumpY;
        // Crouch arms and legs on jump
        const crunch = Math.sin(time * 4);
        rArm.rotation.z = crunch * 0.4 + 0.3;
        lArm.rotation.z = -(crunch * 0.4 + 0.3);
        rLeg.rotation.x = crunch > 0 ? 0.3 : 0;
        lLeg.rotation.x = crunch > 0 ? 0.3 : 0;
        head.rotation.x = crunch * 0.1;
        break;
      }

      case 'dance': {
        const s = Math.sin(time * 4);
        const c = Math.cos(time * 4);
        body.rotation.z = s * 0.15;
        root.position.y = Math.abs(Math.sin(time * 4)) * 0.15;
        root.position.x = s * 0.1;
        rArm.rotation.z = c * 0.6 + 0.4;
        rArm.rotation.x = Math.sin(time * 4 + 1) * 0.3;
        lArm.rotation.z = -(c * 0.6 + 0.4);
        lArm.rotation.x = Math.sin(time * 4) * 0.3;
        rLeg.rotation.x = Math.sin(time * 4) * 0.3;
        lLeg.rotation.x = Math.sin(time * 4 + Math.PI) * 0.3;
        head.rotation.z = s * 0.12;
        head.rotation.y = s * 0.15;
        break;
      }

      case 'cartwheel': {
        root.rotation.z = time * 5;
        root.position.x = Math.cos(time * 2.5) * 0.5;
        root.position.y = Math.abs(Math.sin(time * 5)) * 0.6;
        rArm.rotation.z = 1.2;
        lArm.rotation.z = -1.2;
        rLeg.rotation.x = 0.4;
        lLeg.rotation.x = -0.4;
        break;
      }

      case 'nod': {
        root.position.y = Math.sin(time * 1.2) * 0.03;
        head.rotation.x = Math.sin(time * 4) * 0.25;
        rArm.rotation.z = 0.12;
        lArm.rotation.z = -0.12;
        break;
      }

      case 'shake': {
        root.position.y = Math.sin(time * 1.2) * 0.03;
        head.rotation.y = Math.sin(time * 6) * 0.3;
        rArm.rotation.z = 0.12;
        lArm.rotation.z = -0.12;
        break;
      }

      case 'talk': {
        root.position.y = Math.sin(time * 1.5) * 0.03;
        head.rotation.y = Math.sin(time * 1.2) * 0.1;
        head.rotation.x = Math.sin(time * 2.5) * 0.05;
        rArm.rotation.z = Math.sin(time * 1.8) * 0.15 + 0.2;
        lArm.rotation.z = -(Math.sin(time * 1.8 + 1) * 0.15 + 0.2);
        break;
      }
    }
  });

  const skin = appearance.skinColor;
  const top = appearance.topColor;
  const bottom = appearance.bottomColor;
  const hair = appearance.hairColor;

  return (
    <group ref={groupRef}>
      {/* === HEAD GROUP === */}
      <group ref={headRef} position={[0, 2.28, 0]}>
        {/* Skull */}
        <mesh castShadow>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color={skin} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.16, -0.05]} castShadow>
          <sphereGeometry args={[0.37, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial color={hair} />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.13, 0.06, 0.31]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.13, 0.06, 0.31]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Pupils */}
        <mesh position={[0.13, 0.06, 0.37]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#111122" />
        </mesh>
        <mesh position={[-0.13, 0.06, 0.37]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#111122" />
        </mesh>
        {/* Eye glow (cyberpunk cyan) */}
        <mesh position={[0.13, 0.06, 0.375]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-0.13, 0.06, 0.375]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
        </mesh>

        {/* Smile */}
        <mesh position={[0.07, -0.1, 0.33]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.09, 0.02, 0.02]} />
          <meshStandardMaterial color="#cc4455" />
        </mesh>
        <mesh position={[-0.07, -0.1, 0.33]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.09, 0.02, 0.02]} />
          <meshStandardMaterial color="#cc4455" />
        </mesh>
        <mesh position={[0, -0.12, 0.33]}>
          <boxGeometry args={[0.14, 0.02, 0.02]} />
          <meshStandardMaterial color="#cc4455" />
        </mesh>

        {/* Hat */}
        {appearance.showHat && (
          <>
            {/* Brim */}
            <mesh position={[0, 0.28, 0]} castShadow>
              <cylinderGeometry args={[0.5, 0.5, 0.06, 32]} />
              <meshStandardMaterial color={appearance.hatColor} />
            </mesh>
            {/* Crown */}
            <mesh position={[0, 0.58, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.34, 0.6, 32]} />
              <meshStandardMaterial color={appearance.hatColor} emissive={appearance.hatColor} emissiveIntensity={0.3} />
            </mesh>
          </>
        )}
      </group>

      {/* === NECK === */}
      <mesh position={[0, 1.87, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.22, 16]} />
        <meshStandardMaterial color={skin} />
      </mesh>

      {/* === BODY === */}
      <group ref={bodyRef} position={[0, 1.55, 0]}>
        {/* Torso */}
        <mesh castShadow>
          <boxGeometry args={[0.65, 0.72, 0.38]} />
          <meshStandardMaterial color={top} />
        </mesh>
        {/* Cyber stripe accent */}
        <mesh position={[0, 0.05, 0.2]}>
          <boxGeometry args={[0.1, 0.5, 0.02]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} />
        </mesh>
        {/* Belt */}
        <mesh position={[0, -0.38, 0]}>
          <boxGeometry args={[0.67, 0.08, 0.4]} />
          <meshStandardMaterial color="#111122" />
        </mesh>
        <mesh position={[0, -0.38, 0.21]}>
          <boxGeometry args={[0.1, 0.08, 0.04]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* === RIGHT ARM (viewer's right = +X) === */}
      <group ref={rightArmRef} position={[0.42, 1.87, 0]}>
        {/* Upper arm */}
        <mesh position={[0.14, -0.22, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.28, 8, 16]} />
          <meshStandardMaterial color={top} />
        </mesh>
        {/* Elbow */}
        <mesh position={[0.14, -0.4, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={skin} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.14, -0.58, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.24, 8, 16]} />
          <meshStandardMaterial color={skin} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.14, -0.77, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={skin} />
        </mesh>
      </group>

      {/* === LEFT ARM (-X) === */}
      <group ref={leftArmRef} position={[-0.42, 1.87, 0]}>
        <mesh position={[-0.14, -0.22, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.28, 8, 16]} />
          <meshStandardMaterial color={top} />
        </mesh>
        <mesh position={[-0.14, -0.4, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={skin} />
        </mesh>
        <mesh position={[-0.14, -0.58, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.24, 8, 16]} />
          <meshStandardMaterial color={skin} />
        </mesh>
        <mesh position={[-0.14, -0.77, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={skin} />
        </mesh>
      </group>

      {/* === HIPS === */}
      <mesh position={[0, 1.16, 0]} castShadow>
        <boxGeometry args={[0.6, 0.22, 0.36]} />
        <meshStandardMaterial color={bottom} />
      </mesh>

      {/* === RIGHT LEG === */}
      <group ref={rightLegRef} position={[0.18, 1.04, 0]}>
        {/* Upper leg */}
        <mesh position={[0, -0.28, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.35, 8, 16]} />
          <meshStandardMaterial color={bottom} />
        </mesh>
        {/* Knee */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color={bottom} />
        </mesh>
        {/* Lower leg */}
        <mesh position={[0, -0.72, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
          <meshStandardMaterial color={bottom} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0.04, -0.95, 0.05]} castShadow>
          <boxGeometry args={[0.2, 0.12, 0.36]} />
          <meshStandardMaterial color="#111122" />
        </mesh>
        {/* Shoe sole glow */}
        <mesh position={[0.04, -0.995, 0.05]}>
          <boxGeometry args={[0.18, 0.02, 0.34]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* === LEFT LEG === */}
      <group ref={leftLegRef} position={[-0.18, 1.04, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.35, 8, 16]} />
          <meshStandardMaterial color={bottom} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color={bottom} />
        </mesh>
        <mesh position={[0, -0.72, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
          <meshStandardMaterial color={bottom} />
        </mesh>
        <mesh position={[-0.04, -0.95, 0.05]} castShadow>
          <boxGeometry args={[0.2, 0.12, 0.36]} />
          <meshStandardMaterial color="#111122" />
        </mesh>
        <mesh position={[-0.04, -0.995, 0.05]}>
          <boxGeometry args={[0.18, 0.02, 0.34]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}
