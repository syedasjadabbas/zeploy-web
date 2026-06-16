import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Line, Sphere } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Core() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.18;
      ref.current.rotation.x += dt * 0.06;
    }
  });
  return (
    <group ref={ref}>
      {/* Inner solid core */}
      <Icosahedron args={[1, 1]}>
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.2}
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

function Nodes() {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const count = 28;
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
  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.y -= dt * 0.05;
      group.current.rotation.x += dt * 0.02;
    }
  });

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <Sphere key={i} args={[0.045, 16, 16]} position={p}>
          <meshBasicMaterial color="#AFD2FA" />
        </Sphere>
      ))}
      {edges.map((seg, i) => (
        <Line
          key={i}
          points={[seg[0], seg[1]]}
          color="#3B82F6"
          lineWidth={0.6}
          transparent
          opacity={0.35}
        />
      ))}
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 220;
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
    if (ref.current) ref.current.rotation.y += dt * 0.03;
  });
  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial color="#AFD2FA" size={0.025} transparent opacity={0.7} />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#3B82F6" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#AFD2FA" />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <Core />
          <Nodes />
        </Float>
        <Particles />
      </Suspense>
    </Canvas>
  );
}
