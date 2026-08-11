import React, { useRef, useState, useCallback } from "react";

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  glareOpacity?: number;
  perspective?: number;
  translateZ?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function TiltCard3D({
  children,
  className = "",
  maxTilt = 7,
  scaleOnHover = 1.02,
  glareOpacity = 0.15,
  perspective = 1000,
  translateZ = 10,
  onClick,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("");
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const px = (e.clientX - rect.left) / width;
      const py = (e.clientY - rect.top) / height;

      const rotateX = ((0.5 - py) * maxTilt).toFixed(2);
      const rotateY = ((px - 0.5) * maxTilt).toFixed(2);
      const glareX = (px * 100).toFixed(1);
      const glareY = (py * 100).toFixed(1);

      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scaleOnHover})`
      );
      setGlareStyle({
        opacity: glareOpacity,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, rgba(59, 130, 246, 0.12) 35%, transparent 70%)`,
      });
    },
    [maxTilt, scaleOnHover, glareOpacity, perspective, translateZ]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)`);
    setGlareStyle({ opacity: 0 });
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transform || `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)`,
        transition: isHovered
          ? "transform 0.12s ease-out, box-shadow 0.25s ease-out"
          : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={`relative overflow-hidden transition-transform duration-150 active:scale-[0.98] ${className}`}
    >
      {children}
      {/* Specular glare reflection */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-[inherit]"
        style={glareStyle}
      />
    </div>
  );
}
