"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function RobotBody() {
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const mousePosition = state.pointer;

    // Smooth body sway
    if (robotRef.current) {
      robotRef.current.rotation.y = THREE.MathUtils.lerp(
        robotRef.current.rotation.y,
        mousePosition.x * 0.2,
        0.03,
      );
      robotRef.current.position.y = Math.sin(time * 0.8) * 0.1;
    }

    // Head follows cursor more closely
    if (headRef.current) {
      const targetRotationY = mousePosition.x * 0.4;
      const targetRotationX = -mousePosition.y * 0.25;

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.06,
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.06,
      );
    }

    // Arm animations
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(time * 1.2) * 0.2 - 0.3;
      leftArmRef.current.rotation.z = Math.sin(time * 0.8) * 0.1 + 0.2;
    }
    if (rightArmRef.current) {
      // Right arm follows the cursor dynamically
      const targetRotationX = mousePosition.y * 1.5 - Math.PI / 4;
      const targetRotationZ = mousePosition.x * 1.5 - 0.2;

      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.x,
        targetRotationX,
        0.1,
      );
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.z,
        targetRotationZ,
        0.1,
      );
    }

    // Eye glow pulsing
    if (leftEyeRef.current && rightEyeRef.current) {
      const pulse = Math.sin(time * 3) * 0.5 + 1.5;
      const leftMat = leftEyeRef.current.material as THREE.MeshStandardMaterial;
      const rightMat = rightEyeRef.current
        .material as THREE.MeshStandardMaterial;
      leftMat.emissiveIntensity = pulse;
      rightMat.emissiveIntensity = pulse;
    }

    // Core energy pulse
    if (coreRef.current) {
      const corePulse = Math.sin(time * 2) * 0.5 + 1;
      const coreMat = coreRef.current.material as THREE.MeshStandardMaterial;
      coreMat.emissiveIntensity = corePulse;
    }
  });

  return (
    <group ref={robotRef} position={[0, -0.5, 0]} scale={0.9}>
      {/* === HEAD === */}
      <group ref={headRef} position={[0, 2.2, 0]}>
        {/* Main head shell */}
        <mesh>
          <boxGeometry args={[1.4, 1.2, 1.2]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Face visor */}
        <mesh position={[0, 0, 0.55]}>
          <boxGeometry args={[1.2, 0.8, 0.15]} />
          <meshStandardMaterial
            color="#000010"
            metalness={0.98}
            roughness={0.02}
          />
        </mesh>

        {/* Left eye */}
        <mesh ref={leftEyeRef} position={[-0.3, 0.1, 0.65]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#B026FF"
            emissive="#B026FF"
            emissiveIntensity={1.5}
            metalness={0}
            roughness={0}
          />
        </mesh>

        {/* Right eye */}
        <mesh ref={rightEyeRef} position={[0.3, 0.1, 0.65]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#B026FF"
            emissive="#B026FF"
            emissiveIntensity={1.5}
            metalness={0}
            roughness={0}
          />
        </mesh>

        {/* Mouth indicator */}
        <mesh position={[0, -0.2, 0.65]}>
          <boxGeometry args={[0.5, 0.08, 0.05]} />
          <meshStandardMaterial
            color="#B026FF"
            emissive="#B026FF"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Top antenna */}
        <group position={[0, 0.7, 0]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
            <meshStandardMaterial
              color="#7B2FFF"
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#FF2CF0"
              emissive="#FF2CF0"
              emissiveIntensity={2}
            />
          </mesh>
        </group>

        {/* Side sensors */}
        <mesh position={[-0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.3, 8]} />
          <meshStandardMaterial
            color="#7B2FFF"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        <mesh position={[0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.3, 8]} />
          <meshStandardMaterial
            color="#7B2FFF"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      </group>

      {/* === NECK === */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.4, 12]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* === TORSO === */}
      <group position={[0, 0.5, 0]}>
        {/* Main chest */}
        <mesh>
          <boxGeometry args={[1.8, 1.6, 1]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Chest panel */}
        <mesh position={[0, 0.1, 0.45]}>
          <boxGeometry args={[1.2, 1, 0.15]} />
          <meshStandardMaterial
            color="#F1F5F9"
            metalness={0.3}
            roughness={0.8}
          />
        </mesh>

        {/* Core energy reactor */}
        <mesh ref={coreRef} position={[0, 0.1, 0.55]}>
          <octahedronGeometry args={[0.25]} />
          <meshStandardMaterial
            color="#B026FF"
            emissive="#B026FF"
            emissiveIntensity={1.5}
            metalness={0}
            roughness={0}
          />
        </mesh>

        {/* Side vents */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.85, 0, 0.2]}>
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[0, 0.3 - i * 0.3, 0]}>
                <boxGeometry args={[0.15, 0.08, 0.6]} />
                <meshStandardMaterial
                  color="#7B2FFF"
                  emissive="#7B2FFF"
                  emissiveIntensity={0.3}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* === LEFT ARM === */}
      <group ref={leftArmRef} position={[-1.2, 0.8, 0]}>
        {/* Shoulder */}
        <mesh>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Upper arm */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.18, 0.7, 8]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Elbow */}
        <mesh position={[0, -0.9, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial
            color="#7B2FFF"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Forearm */}
        <mesh position={[0, -1.4, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.7, 8]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Hand */}
        <mesh position={[0, -1.9, 0]}>
          <boxGeometry args={[0.25, 0.3, 0.15]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* === RIGHT ARM === */}
      <group ref={rightArmRef} position={[1.2, 0.8, 0]}>
        {/* Shoulder */}
        <mesh>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Upper arm */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.18, 0.7, 8]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Elbow */}
        <mesh position={[0, -0.9, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial
            color="#7B2FFF"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Forearm */}
        <mesh position={[0, -1.4, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.7, 8]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Hand */}
        <mesh position={[0, -1.9, 0]}>
          <boxGeometry args={[0.25, 0.3, 0.15]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* === LOWER BODY === */}
      <group position={[0, -0.6, 0]}>
        {/* Hip section */}
        <mesh>
          <boxGeometry args={[1.4, 0.6, 0.8]} />
          <meshStandardMaterial
            color="#CBD5E1"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Hip lights */}
        <mesh position={[0, 0, 0.35]}>
          <boxGeometry args={[0.8, 0.15, 0.15]} />
          <meshStandardMaterial
            color="#FF2CF0"
            emissive="#FF2CF0"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* === LEGS === */}
      {[-0.4, 0.4].map((side) => (
        <group key={side} position={[side, -1.3, 0]}>
          {/* Upper leg */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.2, 0.8, 8]} />
            <meshStandardMaterial
              color="#CBD5E1"
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>

          {/* Knee */}
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial
              color="#7B2FFF"
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>

          {/* Lower leg */}
          <mesh position={[0, -1, 0]}>
            <cylinderGeometry args={[0.18, 0.22, 0.7, 8]} />
            <meshStandardMaterial
              color="#CBD5E1"
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>

          {/* Foot */}
          <mesh position={[0, -1.5, 0.1]}>
            <boxGeometry args={[0.3, 0.15, 0.5]} />
            <meshStandardMaterial
              color="#CBD5E1"
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Energy rings around the robot
function EnergyRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.3;
      ring1Ref.current.rotation.y = time * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.2;
      ring2Ref.current.rotation.z = time * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.35;
      ring3Ref.current.rotation.z = -time * 0.15;
    }
  });

  return (
    <group position={[0, 0.5, 0]}>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3, 0.02, 8, 64]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.5, 0.015, 8, 64]} />
        <meshStandardMaterial
          color="#7B2FFF"
          emissive="#7B2FFF"
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[4, 0.01, 8, 64]} />
        <meshStandardMaterial
          color="#FF2CF0"
          emissive="#FF2CF0"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

// Floating data particles
function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 3 + Math.random() * 2;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 0.96;
      colors[i * 3 + 2] = 1;
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 0.48;
      colors[i * 3 + 1] = 0.18;
      colors[i * 3 + 2] = 1;
    } else {
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.17;
      colors[i * 3 + 2] = 0.94;
    }
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Orbiting tech icons
function OrbitingIcons() {
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);
  const group3Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (group1Ref.current) {
      group1Ref.current.position.x = Math.cos(time * 0.4) * 4;
      group1Ref.current.position.z = Math.sin(time * 0.4) * 4;
      group1Ref.current.position.y = Math.sin(time * 0.6) * 0.5 + 1;
      group1Ref.current.rotation.y = time;
    }
    if (group2Ref.current) {
      group2Ref.current.position.x = Math.cos(time * 0.4 + 2.1) * 4.5;
      group2Ref.current.position.z = Math.sin(time * 0.4 + 2.1) * 4.5;
      group2Ref.current.position.y = Math.sin(time * 0.6 + 1) * 0.5;
      group2Ref.current.rotation.y = -time;
    }
    if (group3Ref.current) {
      group3Ref.current.position.x = Math.cos(time * 0.4 + 4.2) * 5;
      group3Ref.current.position.z = Math.sin(time * 0.4 + 4.2) * 5;
      group3Ref.current.position.y = Math.sin(time * 0.6 + 2) * 0.5 - 1;
      group3Ref.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group>
      <Float speed={2} floatIntensity={0.3}>
        <group ref={group1Ref}>
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color="#00F5FF"
              emissive="#00F5FF"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      </Float>

      <Float speed={2.5} floatIntensity={0.3}>
        <group ref={group2Ref}>
          <mesh>
            <octahedronGeometry args={[0.4]} />
            <meshStandardMaterial
              color="#7B2FFF"
              emissive="#7B2FFF"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      </Float>

      <Float speed={1.5} floatIntensity={0.3}>
        <group ref={group3Ref}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.3, 0.1, 8, 24]} />
            <meshStandardMaterial
              color="#FF2CF0"
              emissive="#FF2CF0"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// Main scene
function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[0, 5, 10]} intensity={2.0} color="#FFFFFF" />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F5FF" />
      <pointLight position={[-10, -5, -10]} intensity={1.5} color="#7B2FFF" />
      <pointLight position={[0, -10, 5]} intensity={1.0} color="#B026FF" />
      <spotLight
        position={[0, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#7B2FFF"
      />

      <RobotBody />
    </>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-40 h-48 rounded-lg bg-gradient-to-br from-[#00F5FF]/10 to-[#7B2FFF]/10 flex items-center justify-center animate-pulse">
          <div className="w-24 h-32 rounded-lg bg-gradient-to-br from-[#0A0A2A] to-[#020020] flex flex-col items-center justify-center gap-4 border border-[#00F5FF]/30">
            {/* Robot head placeholder */}
            <div className="w-12 h-10 rounded bg-[#0A0A2A] border border-[#00F5FF]/20 flex items-center justify-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse"
                style={{ boxShadow: "0 0 8px #00F5FF" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse"
                style={{ boxShadow: "0 0 8px #00F5FF" }}
              />
            </div>
            {/* Robot body placeholder */}
            <div className="w-10 h-12 rounded bg-[#0A0A2A] border border-[#7B2FFF]/20 flex items-center justify-center">
              <div
                className="w-3 h-3 rounded bg-[#00F5FF] animate-pulse"
                style={{ boxShadow: "0 0 8px #00F5FF" }}
              />
            </div>
          </div>
        </div>
        {/* Orbiting ring */}
        <div className="absolute inset-0 animate-rotate-slow">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-2 h-2 rounded-full bg-[#00F5FF]"
            style={{ boxShadow: "0 0 10px #00F5FF" }}
          />
        </div>
      </div>
    </div>
  );
}

// Main export
export function Robot3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
