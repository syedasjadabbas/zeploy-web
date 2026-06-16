import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { C as Canvas, a as useFrame } from "../_libs/react-three__fiber.mjs";
import { F as Float, I as Icosahedron, S as Sphere, L as Line } from "../_libs/react-three__drei.mjs";
import { h as Vector3, w as BufferGeometry, x as BufferAttribute } from "../_libs/three.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/react-use-measure.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/three-stdlib.mjs";
function Core() {
  const ref = reactExports.useRef(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.18;
      ref.current.rotation.x += dt * 0.06;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icosahedron, { args: [1, 1], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        color: "#3B82F6",
        emissive: "#3B82F6",
        emissiveIntensity: 0.6,
        metalness: 0.7,
        roughness: 0.2
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icosahedron, { args: [1.6, 2], children: /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#AFD2FA", wireframe: true, transparent: true, opacity: 0.45 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icosahedron, { args: [2.3, 3], children: /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#3B82F6", wireframe: true, transparent: true, opacity: 0.18 }) })
  ] });
}
function Nodes() {
  const points = reactExports.useMemo(() => {
    const arr = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + 2 * i / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 3.2;
      arr.push(
        new Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        )
      );
    }
    return arr;
  }, []);
  const edges = reactExports.useMemo(() => {
    const e = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 2.4) e.push([points[i], points[j]]);
      }
    }
    return e;
  }, [points]);
  const group = reactExports.useRef(null);
  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.y -= dt * 0.05;
      group.current.rotation.x += dt * 0.02;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: group, children: [
    points.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { args: [0.045, 16, 16], position: p, children: /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#AFD2FA" }) }, i)),
    edges.map((seg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Line,
      {
        points: [seg[0], seg[1]],
        color: "#3B82F6",
        lineWidth: 0.6,
        transparent: true,
        opacity: 0.35
      },
      i
    ))
  ] });
}
function Particles() {
  const ref = reactExports.useRef(null);
  const geom = reactExports.useMemo(() => {
    const g = new BufferGeometry();
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
    g.setAttribute("position", new BufferAttribute(positions, 3));
    return g;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.03;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("points", { ref, geometry: geom, children: /* @__PURE__ */ jsxRuntimeExports.jsx("pointsMaterial", { color: "#AFD2FA", size: 0.025, transparent: true, opacity: 0.7 }) });
}
function HeroScene() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Canvas,
    {
      camera: { position: [0, 0, 7], fov: 45 },
      dpr: [1, 1.8],
      gl: { antialias: true, alpha: true },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.4 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [5, 5, 5], intensity: 1.2, color: "#3B82F6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-5, -3, -5], intensity: 0.8, color: "#AFD2FA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Float, { speed: 1.2, rotationIntensity: 0.4, floatIntensity: 0.6, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Core, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Nodes, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Particles, {})
      ] })
    }
  );
}
export {
  HeroScene as default
};
