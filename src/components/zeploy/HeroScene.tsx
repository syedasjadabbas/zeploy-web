import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Line, Sphere, Text } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, memo } from "react";
import * as THREE from "three";

function Core({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const zRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, dt) => {
    const targetSpeed = hovered ? 0.8 : 0.18;
    if (ref.current) {
      ref.current.rotation.y += dt * targetSpeed;
      ref.current.rotation.x += dt * (targetSpeed / 3);
    }
    if (zRef.current) {
      zRef.current.rotation.y -= dt * (targetSpeed / 2);
    }
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        hovered ? 1.5 : 0.6,
        0.1
      );
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        hovered ? 0.15 : 0.5,
        0.1
      );
    }
  });

  return (
    <group ref={ref}>
      <group ref={zRef}>
        <Text
          fontSize={1.4}
          fontWeight="bold"
          color="#ffffff"
          position={[0, 0, 0]}
        >
          Z
          <meshStandardMaterial color="#ffffff" emissive="#3B82F6" emissiveIntensity={hovered ? 3 : 1} toneMapped={false} />
        </Text>
      </group>

      {/* Inner solid core */}
      <Icosahedron args={[1, 1]}>
        <meshStandardMaterial
          ref={materialRef}
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.5}
        />
      </Icosahedron>
      {/* Wireframe shell */}
      <Icosahedron args={[1.6, 2]}>
        <meshBasicMaterial color="#AFD2FA" wireframe transparent opacity={0.45} />
      </Icosahedron>
      <Icosahedron args={[2.3, 3]}>
        <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.18} />
      </Icosahedron>
    </group>
  );
}

function Nodes({ hovered }: { hovered: boolean }) {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 3.2;
      arr.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi),
        ),
      );
    }
    return arr;
  }, []);

  const edges = useMemo(() => {
    const e: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 2.4) e.push([points[i], points[j]]);
      }
    }
    return e;
  }, [points]);

  const group = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame((_, dt) => {
    const targetSpeed = hovered ? 0.3 : 0.05;
    if (group.current) {
      group.current.rotation.y -= dt * targetSpeed;
      group.current.rotation.x += dt * (targetSpeed / 2.5);
    }
    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        hovered ? 0.8 : 0.35,
        0.1
      );
    }
  });

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <Sphere key={i} args={[0.045, 8, 8]} position={p}>
          <meshBasicMaterial color={hovered ? "#ffffff" : "#AFD2FA"} />
        </Sphere>
      ))}
      {edges.map((seg, i) => (
        <Line
          key={i}
          points={[seg[0], seg[1]]}
          color="#3B82F6"
          lineWidth={hovered ? 1.2 : 0.6}
          transparent
          opacity={0.35}
        >
          <lineBasicMaterial ref={i === 0 ? materialRef : null} />
        </Line>
      ))}
    </group>
  );
}

function Particles({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 140;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 3;
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
    const targetSpeed = hovered ? 0.15 : 0.03;
    if (ref.current) ref.current.rotation.y += dt * targetSpeed;
    if (materialRef.current) {
      materialRef.current.size = THREE.MathUtils.lerp(
        materialRef.current.size,
        hovered ? 0.05 : 0.025,
        0.1
      );
    }
  });

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial ref={materialRef} color="#AFD2FA" size={0.025} transparent opacity={0.7} />
    </points>
  );
}

const HeroScene = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#3B82F6" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#AFD2FA" />
        
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[3.5, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <Core hovered={hovered} />
          <Nodes hovered={hovered} />
        </Float>
        <Particles hovered={hovered} />
      </Suspense>
    </Canvas>
  );
};

export default memo(HeroScene);
