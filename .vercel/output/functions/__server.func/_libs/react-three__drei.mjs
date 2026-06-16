import { r as reactExports } from "./react.mjs";
import { _ as _extends } from "./babel__runtime.mjs";
import { h as Vector3, k as Vector4, i as Vector2, C as Color, M as MathUtils } from "./three.mjs";
import { L as LineSegments2, a as Line2, b as LineMaterial, c as LineSegmentsGeometry, d as LineGeometry } from "./three-stdlib.mjs";
import { u as useThree, a as useFrame } from "./react-three__fiber.mjs";
const Line = /* @__PURE__ */ reactExports.forwardRef(function Line3({
  points,
  color = 16777215,
  vertexColors,
  linewidth,
  lineWidth,
  segments,
  dashed,
  ...rest
}, ref) {
  var _vertexColors$, _ref;
  const size = useThree((state) => state.size);
  const line2 = reactExports.useMemo(() => segments ? new LineSegments2() : new Line2(), [segments]);
  const [lineMaterial] = reactExports.useState(() => new LineMaterial());
  const itemSize = (vertexColors == null || (_vertexColors$ = vertexColors[0]) == null ? void 0 : _vertexColors$.length) === 4 ? 4 : 3;
  const lineGeom = reactExports.useMemo(() => {
    const geom = segments ? new LineSegmentsGeometry() : new LineGeometry();
    const pValues = points.map((p) => {
      const isArray = Array.isArray(p);
      return p instanceof Vector3 || p instanceof Vector4 ? [p.x, p.y, p.z] : p instanceof Vector2 ? [p.x, p.y, 0] : isArray && p.length === 3 ? [p[0], p[1], p[2]] : isArray && p.length === 2 ? [p[0], p[1], 0] : p;
    });
    geom.setPositions(pValues.flat());
    if (vertexColors) {
      color = 16777215;
      const cValues = vertexColors.map((c) => c instanceof Color ? c.toArray() : c);
      geom.setColors(cValues.flat(), itemSize);
    }
    return geom;
  }, [points, segments, vertexColors, itemSize]);
  reactExports.useLayoutEffect(() => {
    line2.computeLineDistances();
  }, [points, line2]);
  reactExports.useLayoutEffect(() => {
    if (dashed) {
      lineMaterial.defines.USE_DASH = "";
    } else {
      delete lineMaterial.defines.USE_DASH;
    }
    lineMaterial.needsUpdate = true;
  }, [dashed, lineMaterial]);
  reactExports.useEffect(() => {
    return () => {
      lineGeom.dispose();
      lineMaterial.dispose();
    };
  }, [lineGeom]);
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    object: line2,
    ref
  }, rest), /* @__PURE__ */ reactExports.createElement("primitive", {
    object: lineGeom,
    attach: "geometry"
  }), /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    object: lineMaterial,
    attach: "material",
    color,
    vertexColors: Boolean(vertexColors),
    resolution: [size.width, size.height],
    linewidth: (_ref = linewidth !== null && linewidth !== void 0 ? linewidth : lineWidth) !== null && _ref !== void 0 ? _ref : 1,
    dashed,
    transparent: itemSize === 4
  }, rest)));
});
function create(type, effect) {
  const El = type + "Geometry";
  return /* @__PURE__ */ reactExports.forwardRef(({
    args,
    children,
    ...props
  }, fref) => {
    const ref = reactExports.useRef(null);
    reactExports.useImperativeHandle(fref, () => ref.current);
    reactExports.useLayoutEffect(() => void (effect == null ? void 0 : effect(ref.current)));
    return /* @__PURE__ */ reactExports.createElement("mesh", _extends({
      ref
    }, props), /* @__PURE__ */ reactExports.createElement(El, {
      attach: "geometry",
      args
    }), children);
  });
}
const Sphere = /* @__PURE__ */ create("sphere");
const Icosahedron = /* @__PURE__ */ create("icosahedron");
const Float = /* @__PURE__ */ reactExports.forwardRef(({
  children,
  enabled = true,
  speed = 1,
  rotationIntensity = 1,
  floatIntensity = 1,
  floatingRange = [-0.1, 0.1],
  autoInvalidate = false,
  ...props
}, forwardRef) => {
  const ref = reactExports.useRef(null);
  reactExports.useImperativeHandle(forwardRef, () => ref.current, []);
  const offset = reactExports.useRef(Math.random() * 1e4);
  useFrame((state) => {
    var _floatingRange$, _floatingRange$2;
    if (!enabled || speed === 0) return;
    if (autoInvalidate) state.invalidate();
    const t = offset.current + state.clock.elapsedTime;
    ref.current.rotation.x = Math.cos(t / 4 * speed) / 8 * rotationIntensity;
    ref.current.rotation.y = Math.sin(t / 4 * speed) / 8 * rotationIntensity;
    ref.current.rotation.z = Math.sin(t / 4 * speed) / 20 * rotationIntensity;
    let yPosition = Math.sin(t / 4 * speed) / 10;
    yPosition = MathUtils.mapLinear(yPosition, -0.1, 0.1, (_floatingRange$ = floatingRange == null ? void 0 : floatingRange[0]) !== null && _floatingRange$ !== void 0 ? _floatingRange$ : -0.1, (_floatingRange$2 = floatingRange == null ? void 0 : floatingRange[1]) !== null && _floatingRange$2 !== void 0 ? _floatingRange$2 : 0.1);
    ref.current.position.y = yPosition * floatIntensity;
    ref.current.updateMatrix();
  });
  return /* @__PURE__ */ reactExports.createElement("group", props, /* @__PURE__ */ reactExports.createElement("group", {
    ref,
    matrixAutoUpdate: false
  }, children));
});
export {
  Float as F,
  Icosahedron as I,
  Line as L,
  Sphere as S
};
