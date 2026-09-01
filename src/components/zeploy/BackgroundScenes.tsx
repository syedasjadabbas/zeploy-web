import { useEffect, useRef, memo, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line, Grid } from "@react-three/drei";
import * as THREE from "three";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function useIsVisible(ref: React.RefObject<HTMLDivElement | null>) {
  const [isVisible, setIsVisible] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "200px 0px" }
    );
    observer.observe(el);

    const handleVisibilityChange = () => {
      setIsTabActive(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [ref]);

  return isVisible && isTabActive;
}

// Generate random points in a sphere for the network nodes
const generatePoints = (count: number, radius: number) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

function NodesCloud() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => generatePoints(60, 1.5), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3B82F6"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

const NetworkNodesBase = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);

  if (isMobile) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 2] }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop={isVisible ? "always" : "never"}
      >
        <NodesCloud />
      </Canvas>
    </div>
  );
}

function FallingLines() {
  const ref = useRef<THREE.Group>(null);
  const lineCount = 12;
  const lines = useMemo(() => Array.from({ length: lineCount }).map((_, i) => {
    const x = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 5;
    const length = Math.random() * 2 + 1;
    const speed = Math.random() * 2 + 1;
    return { x, z, length, speed, yOffset: Math.random() * 10 };
  }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        child.position.y -= lines[i].speed * delta;
        if (child.position.y < -5) {
          child.position.y = 5 + Math.random() * 5;
        }
      });
    }
  });

  return (
    <group ref={ref}>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={[
            [line.x, line.length, line.z],
            [line.x, 0, line.z],
          ]}
          color="#AFD2FA"
          lineWidth={1}
          transparent
          opacity={0.3}
          position={[0, line.yOffset, 0]}
        />
      ))}
    </group>
  );
}

const DataStreamsBase = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);

  if (isMobile) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop={isVisible ? "always" : "never"}
      >
        <FallingLines />
      </Canvas>
    </div>
  );
}

const BlueprintGridBase = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);

  if (isMobile) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop={isVisible ? "always" : "never"}
      >
        <ambientLight intensity={0.5} />
        <Grid
          position={[0, -1, 0]}
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={1}
          cellColor="#3B82F6"
          sectionSize={2}
          sectionThickness={1.5}
          sectionColor="#AFD2FA"
          fadeDistance={15}
          fadeStrength={1}
        />
      </Canvas>
    </div>
  );
}

export const NetworkNodes = memo(NetworkNodesBase);
export const DataStreams = memo(DataStreamsBase);
export const BlueprintGrid = memo(BlueprintGridBase);


