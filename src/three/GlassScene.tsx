import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import type { Drink } from '../data/order'
import { Extras } from './Extras'

const H = 3 // glass height, world units; the glass is centred on the origin

// plan §6 guardrails: cheaper glass on phones, no ripples or sloshing under reduced motion
const lowPower = matchMedia('(pointer: coarse)').matches || innerWidth < 768
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches

// kopitiam tumbler: narrow foot, slight flare, thick base. Outer wall up, inner wall back down.
const glassProfile = [
  [0, -1.5], [0.72, -1.5], [0.79, -1.44], [1.0, 1.48], [0.985, 1.52], [0.955, 1.5], [0.75, -1.22], [0, -1.22],
].map(([x, y]) => new THREE.Vector2(x, y))

const liquidProfile = [
  [0, -1.21], [0.735, -1.21], [0.945, 1.46], [0, 1.46],
].map(([x, y]) => new THREE.Vector2(x, y))

const liquidVert = /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vLocalY;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vLocalY = (position.y + 1.21) / 2.67;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`

// Translucent lit liquid. Everything above a wobbling, rippling world-space plane is cut away;
// the inside back faces seen through the cut are shaded as the surface.
const liquidFrag = /* glsl */ `
  uniform float uSurface;
  uniform float uTime;
  uniform float uMotion;
  uniform vec2 uWobble;
  uniform vec3 uLiquid;
  uniform vec3 uMilk;
  uniform float uMilkOn;
  uniform vec3 uFoam;
  uniform float uFoamH;
  uniform float uClear;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vLocalY;

  void main() {
    float ripple = uMotion * 0.012 * sin(vWorld.x * 9.0 + uTime * 2.1) * sin(vWorld.z * 8.0 + uTime * 1.7);
    float surf = uSurface + uWobble.x * vWorld.x + uWobble.y * vWorld.z + ripple;
    if (vWorld.y > surf) discard;
    float depth = surf - vWorld.y;

    vec3 V = normalize(cameraPosition - vWorld);
    vec3 N = gl_FrontFacing ? normalize(vNormal) : normalize(vec3(-uWobble.x, 1.0, -uWobble.y));
    float facing = abs(dot(N, V));
    float fres = pow(1.0 - facing, 3.0);

    // light passes through less liquid at the edges: clearer and brighter there
    vec3 col = mix(uLiquid * 1.35, uLiquid * 0.72, smoothstep(0.15, 0.95, facing));
    col *= mix(0.82, 1.05, vLocalY);
    // clear drinks (soda, water, tea) let you see what's floating in them
    float alpha = mix(mix(0.62, 0.9, facing), mix(0.14, 0.32, facing), uClear);

    float milkLine = 0.16 + 0.03 * sin(vWorld.x * 6.0 + vWorld.z * 4.0 + uTime * 0.4);
    float milk = uMilkOn * smoothstep(milkLine + 0.05, milkLine - 0.05, vLocalY);
    col = mix(col, uMilk, milk);
    alpha = mix(alpha, 0.97, milk);

    float foam = step(depth, uFoamH * 3.0);
    col = mix(col, uFoam, foam);
    alpha = mix(alpha, 0.96, foam);

    if (!gl_FrontFacing) {
      // the surface: foam if there is any, else a lighter skin of the drink
      col = uFoamH > 0.02 ? uFoam : uLiquid * 1.2;
      alpha = uFoamH > 0.02 ? 0.97 : 0.8;
    }

    // meniscus: a bright line where liquid meets glass
    col += smoothstep(0.035, 0.0, depth) * 0.35 * float(gl_FrontFacing);

    // two soft speculars + rim light from the room
    vec3 L1 = normalize(vec3(-0.5, 0.8, 0.6));
    vec3 L2 = normalize(vec3(0.7, 0.3, 0.6));
    float spec = pow(max(dot(N, normalize(L1 + V)), 0.0), 70.0) * 0.9
               + pow(max(dot(N, normalize(L2 + V)), 0.0), 25.0) * 0.25;
    col += spec + fres * 0.35;
    alpha = min(1.0, alpha + spec + fres * 0.2);

    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`

type Input = { drag: THREE.Vector2; key: THREE.Vector2 }

function makeLiquidMaterial(d: Drink) {
  return new THREE.ShaderMaterial({
    vertexShader: liquidVert,
    fragmentShader: liquidFrag,
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
      uSurface: { value: -H / 2 + d.fill * H },
      uTime: { value: 0 },
      uMotion: { value: calm ? 0 : 1 },
      uWobble: { value: new THREE.Vector2() },
      uLiquid: { value: new THREE.Color(d.liquid) },
      uMilk: { value: new THREE.Color(d.milk ?? d.liquid) },
      uMilkOn: { value: d.milk ? 1 : 0 },
      uFoam: { value: new THREE.Color(d.foam) },
      uFoamH: { value: d.foamH },
      uClear: { value: d.clear ?? 0 },
    },
  })
}

function Glass({ drink, input }: { drink: Drink; input: Input }) {
  const group = useRef<THREE.Group>(null)
  const ice = useRef<THREE.Group>(null)
  // built once and mutated in place: passing uniforms as JSX props would get copied, not shared
  const [liquid] = useState(() => makeLiquidMaterial(drink))
  const state = useRef({
    rot: new THREE.Vector2(),
    vel: new THREE.Vector2(),
    wobbleAmp: new THREE.Vector2(),
    fill: drink.fill,
    foamH: drink.foamH,
    clear: drink.clear ?? 0,
    milkOn: drink.milk ? 1 : 0,
    ice: drink.ice ? 1 : 0,
    t: 0,
  })
  const tmp = useMemo(() => ({ c: new THREE.Color(), prev: new THREE.Vector2(), target: new THREE.Vector2() }), [])
  // where the liquid surface is right now, for the props that float on it or sit under it
  const surf = useMemo(() => () => -H / 2 + state.current.fill * H, [])

  const straw = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(0.25, -1.1, 0.2),
          new THREE.Vector3(0.6, 1.55, 0.2),
          new THREE.Vector3(0.72, 2.05, 0.2),
          new THREE.Vector3(1.15, 2.3, 0.2),
        ]),
        64, 0.07, 12, false,
      ),
    [],
  )

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 30)
    const s = state.current
    const u = liquid.uniforms
    s.t += dt
    u.uTime.value = s.t

    // spring tilt toward drag/keys, settle upright on release
    tmp.target.copy(input.drag).add(input.key)
    tmp.prev.copy(s.rot)
    s.vel.x += ((tmp.target.x - s.rot.x) * 38 - s.vel.x * 5.5) * dt
    s.vel.y += ((tmp.target.y - s.rot.y) * 38 - s.vel.y * 5.5) * dt
    s.rot.addScaledVector(s.vel, dt)
    group.current!.rotation.set(s.rot.x, 0, s.rot.y)

    // liquid wobble: kicked by angular velocity, decays, oscillates
    const avx = (s.rot.x - tmp.prev.x) / dt
    const avy = (s.rot.y - tmp.prev.y) / dt
    const kick = calm ? 0 : 0.014
    s.wobbleAmp.x = THREE.MathUtils.clamp(s.wobbleAmp.x * (1 - dt * 1.4) - avy * kick, -0.4, 0.4)
    s.wobbleAmp.y = THREE.MathUtils.clamp(s.wobbleAmp.y * (1 - dt * 1.4) + avx * kick, -0.4, 0.4)
    const pulse = Math.sin(s.t * Math.PI * 2 * 1.3)
    u.uWobble.value.set(s.wobbleAmp.x * pulse, s.wobbleAmp.y * pulse)

    // drain as the page is read: empty by the footer, refills on the way back up
    const max = document.documentElement.scrollHeight - innerHeight
    const read = max > innerHeight * 0.5 ? Math.min(scrollY / max, 1) : 0
    const k = 1 - Math.exp(-dt * 3)
    s.fill += (drink.fill * (1 - 0.96 * read) - s.fill) * k
    s.foamH += (drink.foamH - s.foamH) * k
    s.milkOn += ((drink.milk ? 1 : 0) - s.milkOn) * k
    s.ice += ((drink.ice ? 1 : 0) - s.ice) * k
    const surf = -H / 2 + s.fill * H
    u.uSurface.value = surf
    u.uFoamH.value = s.foamH
    s.clear += ((drink.clear ?? 0) - s.clear) * k
    u.uClear.value = s.clear
    u.uMilkOn.value = s.milkOn
    u.uLiquid.value.lerp(tmp.c.set(drink.liquid), k)
    u.uFoam.value.lerp(tmp.c.set(drink.foam), k)
    u.uMilk.value.lerp(tmp.c.set(drink.milk ?? drink.liquid), k)

    // ice floats: ~85% under the surface, bobbing; shrinks away when not peng
    ice.current!.children.forEach((cube, i) => {
      cube.position.y = Math.max(surf - 0.12 - i * 0.05 + (calm ? 0 : Math.sin(s.t * 1.3 + i * 2.1) * 0.025), -0.95)
      if (!calm) cube.rotation.y += dt * 0.05 * (i % 2 ? 1 : -1)
      cube.scale.setScalar(Math.max(s.ice, 0.001))
    })
  })

  const icePos: [number, number, number][] = [[-0.34, 0.12, 0.3], [0.3, -0.2, -0.45], [0.0, 0.38, 0.85]]

  return (
    <group ref={group}>
      <mesh material={liquid} renderOrder={2}>
        <latheGeometry args={[liquidProfile, 72]} />
      </mesh>
      <group ref={ice}>
        {icePos.map(([x, z, r], i) => (
          <RoundedBox key={i} args={[0.5, 0.46, 0.5]} radius={0.1} smoothness={3} position={[x, 0, z]} rotation={[r * 0.4, r, r * 0.3]} renderOrder={1}>
            <meshPhysicalMaterial color="#f3fbff" transparent opacity={0.75} roughness={0.12} clearcoat={1} envMapIntensity={2} />
          </RoundedBox>
        ))}
      </group>
      <Extras extras={drink.extras} surf={surf} />
      <mesh geometry={straw}>
        <meshPhysicalMaterial color="#E5432F" roughness={0.35} clearcoat={0.6} />
      </mesh>
      <mesh>
        <latheGeometry args={[glassProfile, 96]} />
        <MeshTransmissionMaterial
          background={new THREE.Color('#efe3e1')}
          samples={lowPower ? 3 : 6}
          resolution={lowPower ? 256 : 512}
          thickness={0.18}
          roughness={0.04}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropicBlur={0.08}
          distortion={0.05}
          distortionScale={0.3}
          temporalDistortion={0}
          clearcoat={1}
          envMapIntensity={1.2}
          color="#ffffff"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default function GlassScene({ drink, label }: { drink: Drink; label: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const input = useMemo<Input>(() => ({ drag: new THREE.Vector2(), key: new THREE.Vector2() }), [])

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting))
    io.observe(wrap.current!)
    return () => io.disconnect()
  }, [])

  // drag to tilt; let go and it rights itself
  useEffect(() => {
    const el = wrap.current!
    let start: { x: number; y: number } | null = null
    const down = (e: PointerEvent) => {
      start = { x: e.clientX, y: e.clientY }
      el.setPointerCapture(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!start) return
      const clamp = (v: number) => THREE.MathUtils.clamp(v, -0.9, 0.9)
      input.drag.set(clamp((e.clientY - start.y) * 0.006), clamp(-(e.clientX - start.x) * 0.006))
    }
    const up = () => {
      start = null
      input.drag.set(0, 0)
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [input])

  const keys: Record<string, [number, number]> = {
    ArrowLeft: [0, 0.6], ArrowRight: [0, -0.6], ArrowUp: [-0.5, 0], ArrowDown: [0.5, 0],
  }

  return (
    <div
      ref={wrap}
      role="img"
      aria-label={`${label}. Drag, or focus and use the arrow keys, to tilt the glass.`}
      tabIndex={0}
      onKeyDown={(e) => {
        const k = keys[e.key]
        if (!k) return
        e.preventDefault()
        input.key.set(k[0], k[1])
      }}
      onKeyUp={(e) => keys[e.key] && input.key.set(0, 0)}
      onBlur={() => input.key.set(0, 0)}
      style={{ width: '100%', height: '100%', touchAction: 'pan-y', cursor: 'grab' }}
    >
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={lowPower ? [1, 1.5] : [1, 1.75]}
        camera={{ position: [0, 1.4, 13.8], fov: 30 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ camera }) => camera.lookAt(0, 0.3, 0)}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} />
        <Environment resolution={256}>
          <Lightformer intensity={3} position={[0, 5, 2]} rotation-x={Math.PI / 2} scale={[6, 6, 1]} />
          <Lightformer intensity={2.2} position={[-4, 0.5, 2]} rotation-y={Math.PI / 2} scale={[1.2, 8, 1]} />
          <Lightformer intensity={1.4} color="#F5CB4C" position={[4, 0, 1]} rotation-y={-Math.PI / 2} scale={[1, 6, 1]} />
          <Lightformer intensity={1} color="#F2A7B5" position={[0, 0, -5]} scale={[10, 4, 1]} />
        </Environment>
        <Glass drink={drink} input={input} />
        <ContactShadows position={[0, -1.52, 0]} opacity={0.35} scale={5} blur={2.6} far={2} color="#5B3A29" />
      </Canvas>
    </div>
  )
}
