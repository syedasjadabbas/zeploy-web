import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Text } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, memo } from "react";
import * as THREE from "three";

// 1. Z Logo inside the globe
function CoreLogo({ hovered }: { hovered: boolean }) {
  const zRef = useRef<THREE.Group>(null);
  
  useFrame((_, dt) => {
    if (zRef.current) {
      zRef.current.rotation.y -= dt * (hovered ? 0.4 : 0.1);
    }
  });

  return (
    <group ref={zRef}>
      <Text
        fontSize={1.8}
        fontWeight="bold"
        color="#ffffff"
        position={[0, 0, 0]}
      >
        Z
        <meshStandardMaterial color="#ffffff" emissive="#3B82F6" emissiveIntensity={hovered ? 5 : 2} toneMapped={false} />
      </Text>
    </group>
  );
}

// 2. Glassy Core
function GlassCore({ hovered }: { hovered: boolean }) {
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        hovered ? 0.6 : 0.15,
        0.05
      );
    }
  });

  return (
    <Sphere args={[1.8, 64, 64]}>
      <meshPhysicalMaterial
        ref={materialRef}
        color="#020817"
        emissive="#1d4ed8"
        emissiveIntensity={0.15}
        metalness={0.9}
        roughness={0.05}
        transmission={0.95}
        thickness={2}
        transparent
        opacity={1}
      />
    </Sphere>
  );
}

// 3. Inner Data Rings
function DataRings({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += dt * (hovered ? 0.5 : 0.15);
      groupRef.current.rotation.y += dt * (hovered ? 0.3 : 0.1);
      groupRef.current.rotation.z -= dt * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[2.0, 32, 32]}>
        <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={hovered ? 0.2 : 0.08} />
      </Sphere>
      <Sphere args={[2.1, 16, 16]}>
        <meshBasicMaterial color="#60A5FA" wireframe transparent opacity={hovered ? 0.1 : 0.03} />
      </Sphere>
    </group>
  );
}

// 4. Point Cloud Surface
function PointCloud({ hovered }: { hovered: boolean }) {
  const points = useMemo(() => {
    const p = [];
    const count = 1200;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      p.push(new THREE.Vector3(x * 2.2, y * 2.2, z * 2.2));
    }
    return new THREE.BufferGeometry().setFromPoints(p);
  }, []);

  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * (hovered ? 0.25 : 0.08);
      ref.current.rotation.x += dt * 0.02;
    }
    if (materialRef.current) {
      materialRef.current.size = THREE.MathUtils.lerp(
        materialRef.current.size,
        hovered ? 0.045 : 0.02,
        0.05
      );
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        hovered ? 0.9 : 0.4,
        0.05
      );
    }
  });

  return (
    <points ref={ref} geometry={points}>
      <pointsMaterial ref={materialRef} color="#60A5FA" size={0.02} transparent opacity={0.4} />
    </points>
  );
}

// 5. Atmosphere Glow (Backside Additive)
function Atmosphere({ hovered }: { hovered: boolean }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        hovered ? 0.2 : 0.1,
        0.05
      );
    }
  });

  return (
    <Sphere args={[2.4, 64, 64]}>
      <meshBasicMaterial 
        ref={materialRef}
        color="#3B82F6" 
        transparent 
        opacity={0.1} 
        side={THREE.BackSide} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
      />
    </Sphere>
  );
}

// 6. Floating Particles
function Particles({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 5; // Spread outside the globe
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(p) * Math.cos(t);
      positions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      positions[i * 3 + 2] = r * Math.cos(p);
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y -= dt * (hovered ? 0.15 : 0.03);
      ref.current.rotation.z += dt * 0.015;
    }
  });

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial color="#AFD2FA" size={0.025} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

const HeroScene = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 45 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#3B82F6" />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#60A5FA" />
        
        {/* Interaction Mesh */}
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[3.8, 32, 32]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
          <CoreLogo hovered={hovered} />
          <GlassCore hovered={hovered} />
          <DataRings hovered={hovered} />
          <PointCloud hovered={hovered} />
          <Atmosphere hovered={hovered} />
        </Float>
        <Particles hovered={hovered} />
      </Suspense>
    </Canvas>
  );
};

export default memo(HeroScene);
