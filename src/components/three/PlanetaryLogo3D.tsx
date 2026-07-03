"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { Group, Mesh } from "three";

const COLORS = {
  deepBlue: "#1a3fd4",
  skyCyan: "#00d4ff",
  electricBlue: "#3e3ff0",
  indigo: "#201881",
  deepNavy: "#08057d",
  purple: "#8b3fcf",
  magenta: "#e040a0",
  hotPink: "#ff4da6",
  violet: "#6b2fa0",
};

const CAMERA_PRESETS = {
  hero: { position: [0, 0, 7.5] as [number, number, number], fov: 62 },
  compact: { position: [0, 0, 8.2] as [number, number, number], fov: 54 },
};

function createRingGradientTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createLinearGradient(0, 0, 512, 0);
  gradient.addColorStop(0, COLORS.deepBlue);
  gradient.addColorStop(0.35, COLORS.purple);
  gradient.addColorStop(0.65, COLORS.magenta);
  gradient.addColorStop(1, COLORS.hotPink);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 32);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

interface GasMoonProps {
  position: [number, number, number];
  scale: number;
  color: string;
  emissive: string;
  distort?: number;
  speed?: number;
}

function GasMoon({ position, scale, color, emissive, distort = 0.2, speed = 2 }: GasMoonProps) {
  return (
    <Float speed={1.5 + scale} floatIntensity={0.5} rotationIntensity={0.2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.35}
          metalness={0.6}
          roughness={0.25}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          distort={distort}
          speed={speed}
        />
      </mesh>
    </Float>
  );
}

interface PlanetaryClusterProps {
  mouse: { x: number; y: number };
  scale?: number;
}

function PlanetaryCluster({ mouse, scale = 1 }: PlanetaryClusterProps) {
  const groupRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  const ringTexture = useMemo(() => createRingGradientTexture(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08 + mouse.x * 0.35;
      groupRef.current.rotation.x = mouse.y * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <group rotation={[Math.PI / 3.2, 0.3, 0.15]}>
        <mesh ref={ringRef}>
          <torusGeometry args={[2.15, 0.045, 32, 128]} />
          <meshStandardMaterial
            map={ringTexture}
            emissive={COLORS.magenta}
            emissiveIntensity={0.15}
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={0.95}
          />
        </mesh>
      </group>

      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.15}>
        <mesh>
          <sphereGeometry args={[0.85, 64, 64]} />
          <MeshDistortMaterial
            color={COLORS.purple}
            emissive={COLORS.violet}
            emissiveIntensity={0.25}
            metalness={0.5}
            roughness={0.3}
            clearcoat={1}
            clearcoatRoughness={0.1}
            distort={0.28}
            speed={1.8}
          />
        </mesh>
      </Float>

      <Float speed={1.4} floatIntensity={0.25} rotationIntensity={0.1}>
        <mesh position={[0, 0.15, 0]} scale={[1.02, 0.72, 1.02]}>
          <sphereGeometry args={[0.88, 64, 64]} />
          <MeshDistortMaterial
            color={COLORS.skyCyan}
            emissive={COLORS.electricBlue}
            emissiveIntensity={0.4}
            metalness={0.75}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.05}
            distort={0.42}
            speed={2.5}
          />
        </mesh>
      </Float>

      <GasMoon
        position={[-2.6, -0.15, 0.4]}
        scale={0.38}
        color={COLORS.violet}
        emissive={COLORS.magenta}
        distort={0.22}
      />
      <GasMoon
        position={[-0.9, 1.35, 0.35]}
        scale={0.14}
        color={COLORS.magenta}
        emissive={COLORS.hotPink}
        distort={0.3}
        speed={3}
      />
      <GasMoon
        position={[-0.35, 1.15, 0.55]}
        scale={0.11}
        color={COLORS.hotPink}
        emissive={COLORS.magenta}
        distort={0.35}
        speed={3.5}
      />
      <GasMoon
        position={[0.15, -1.05, -0.25]}
        scale={0.32}
        color={COLORS.deepNavy}
        emissive={COLORS.skyCyan}
        distort={0.25}
      />
      <GasMoon
        position={[1.55, -0.75, 0.25]}
        scale={0.3}
        color={COLORS.skyCyan}
        emissive={COLORS.electricBlue}
        distort={0.2}
      />
      <GasMoon
        position={[2.55, 0.15, 0.1]}
        scale={0.09}
        color={COLORS.skyCyan}
        emissive={COLORS.electricBlue}
        distort={0.4}
        speed={4}
      />
    </group>
  );
}

interface PlanetaryLogo3DProps {
  mouse: { x: number; y: number };
  scale?: number;
  className?: string;
  variant?: "hero" | "compact";
}

export default function PlanetaryLogo3D({
  mouse,
  scale = 1,
  className = "",
  variant = "hero",
}: PlanetaryLogo3DProps) {
  const camera = CAMERA_PRESETS[variant];

  return (
    <div className={`overflow-visible ${className}`}>
      <Canvas
        camera={{ position: camera.position, fov: camera.fov, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", overflow: "visible" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[6, 6, 8]} intensity={1.4} color={COLORS.electricBlue} />
        <pointLight position={[-6, -3, 5]} intensity={1} color={COLORS.hotPink} />
        <pointLight position={[0, -5, 3]} intensity={0.6} color={COLORS.purple} />
        <directionalLight position={[4, 4, 4]} intensity={0.5} color="#ffffff" />
        <PlanetaryCluster mouse={mouse} scale={scale} />
        <Sparkles count={40} scale={10} size={2} speed={0.2} color={COLORS.magenta} opacity={0.5} />
      </Canvas>
    </div>
  );
}

export { COLORS as planetaryColors };
