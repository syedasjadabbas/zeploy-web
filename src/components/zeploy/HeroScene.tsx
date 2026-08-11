import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect, memo } from "react";
import * as THREE from "three";

// 1. Central 3D Z Logo
function CoreLogo({ hovered }: { hovered: boolean }) {
  const zRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 0.82;
    const h = 1.0;
    const t = 0.35;

    shape.moveTo(-w, h);
    shape.lineTo(w, h);
    shape.lineTo(w, h - t);
    shape.lineTo(-w + t * 1.15, -h + t);
    shape.lineTo(w, -h + t);
    shape.lineTo(w, -h);
    shape.lineTo(-w, -h);
    shape.lineTo(-w, -h + t);
    shape.lineTo(w - t * 1.15, h - t);
    shape.lineTo(-w, h - t);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  useFrame((_, dt) => {
    if (zRef.current) {
      zRef.current.rotation.y -= dt * (hovered ? 0.8 : 0.25);
    }
  });

  return (
    <group ref={zRef} position={[0, 0, 1.8]} scale={0.95}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#60A5FA"
          emissiveIntensity={hovered ? 5 : 3.0}
          metalness={0.95}
          roughness={0.05}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// 2. Liquid AI Brain (Morphing Sphere)
const liquidSphereArgs1 = [2, 48, 48] as const;
const liquidSphereArgs2 = [2.05, 24, 24] as const;

function LiquidCore({ hovered }: { hovered: boolean }) {
  const materialRef = useRef<any>(null);
  const wireframeRef = useRef<any>(null);

  useFrame(() => {
    if (materialRef.current && wireframeRef.current) {
      const targetDistort = hovered ? 0.6 : 0.3;
      const targetSpeed = hovered ? 4 : 1.5;
      
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.05);
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.05);
      
      wireframeRef.current.distort = THREE.MathUtils.lerp(wireframeRef.current.distort, targetDistort, 0.05);
      wireframeRef.current.speed = THREE.MathUtils.lerp(wireframeRef.current.speed, targetSpeed, 0.05);
    }
  });

  return (
    <group>
      {/* Dark Glossy Inner Morph */}
      <Sphere args={liquidSphereArgs1}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#020817"
          emissive="#1d4ed8"
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
          distort={0.3}
          speed={1.5}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Glowing Outer Wireframe Morph */}
      <Sphere args={liquidSphereArgs2}>
        <MeshDistortMaterial
          ref={wireframeRef}
          color="#3B82F6"
          wireframe
          distort={0.3}
          speed={1.5}
          transparent
          opacity={0.15}
        />
      </Sphere>
    </group>
  );
}

// 3. Orbiting Data Rings
const torusArgs1 = [3, 0.02, 16, 100] as const;
const torusArgs2 = [3.2, 0.01, 16, 100] as const;
const torusArgs3 = [3.5, 0.015, 16, 100] as const;

function EnergyRings({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, dt) => {
    if (groupRef.current) {
      const targetSpeed = hovered ? 2 : 0.5;
      groupRef.current.rotation.x += dt * targetSpeed * 0.5;
      groupRef.current.rotation.y += dt * targetSpeed * 0.3;
      groupRef.current.rotation.z += dt * targetSpeed * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={torusArgs1} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#3B82F6" transparent opacity={hovered ? 0.6 : 0.2} />
      </Torus>
      <Torus args={torusArgs2} rotation={[0, Math.PI / 3, 0]}>
        <meshBasicMaterial color="#60A5FA" transparent opacity={hovered ? 0.4 : 0.1} />
      </Torus>
      <Torus args={torusArgs3} rotation={[0, 0, Math.PI / 4]}>
        <meshBasicMaterial color="#AFD2FA" transparent opacity={hovered ? 0.2 : 0.05} />
      </Torus>
    </group>
  );
}

// 4. Floating Particles
function Particles({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
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
      ref.current.rotation.y += dt * (hovered ? 0.2 : 0.05);
      ref.current.rotation.z += dt * 0.02;
    }
  });

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial color="#60A5FA" size={0.03} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function ResponsiveScene({ hovered }: { hovered: boolean }) {
  const { viewport } = useThree();

  const responsiveScale = useMemo(() => {
    const minBound = Math.min(viewport.width, viewport.height);
    const factor = minBound / 7.2;
    return Math.min(Math.max(factor, 0.45), 1.0);
  }, [viewport.width, viewport.height]);

  return (
    <group scale={responsiveScale}>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
        <CoreLogo hovered={hovered} />
        <LiquidCore hovered={hovered} />
        <EnergyRings hovered={hovered} />
      </Float>
      <Particles hovered={hovered} />
    </group>
  );
}

const HeroScene = () => {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop={isVisible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
          <pointLight position={[0, 0, 8]} intensity={6} color="#60A5FA" />
          <pointLight position={[-10, -10, -5]} intensity={2} color="#3B82F6" />
          
          {/* Interaction Mesh */}
          <mesh 
            onPointerOver={() => setHovered(true)} 
            onPointerOut={() => setHovered(false)}
          >
            <sphereGeometry args={[4, 32, 32]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          <ResponsiveScene hovered={hovered} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default memo(HeroScene);
