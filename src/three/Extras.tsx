import { useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Extra } from '../data/order'

// Props that make each drink itself, not just a colour: lime, lychees, fizz, steam, flowers,
// a salted plum, barley, a Milo heap. They live inside the tilting glass group and follow the
// liquid surface, which `surf()` reports every frame (it drops as the page drains the glass).

const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
const BOTTOM = -1.18 // just above the glass's thick base
// inner radius of the glass at height y (matches the liquid lathe), minus a margin
const innerR = (y: number, margin = 0.14) => 0.735 + ((y + 1.21) / 2.67) * 0.21 - margin

type Surf = () => number

// scales a prop in when it appears, so switching drinks doesn't just pop
function Pop({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    const s = g.current!.scale.x
    if (s < 1) g.current!.scale.setScalar(Math.min(1, s + dt * 3))
  })
  return <group ref={g} scale={0.001}>{children}</group>
}

function Lime({ surf }: { surf: Surf }) {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    g.current!.position.y = surf() - 0.03 + (calm ? 0 : Math.sin(t * 1.1) * 0.02)
    g.current!.rotation.z = 0.25 + (calm ? 0 : Math.sin(t * 0.8) * 0.05)
  })
  // a wheel: pale flesh, green rind, a few segment lines
  return (
    <group ref={g} position={[-0.28, 0, -0.18]} rotation={[0.35, 0.4, 0.25]}>
      <mesh>
        <cylinderGeometry args={[0.34, 0.34, 0.07, 40]} />
        <meshStandardMaterial color="#d8e88f" roughness={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.045, 10, 48]} />
        <meshStandardMaterial color="#4f8a2c" roughness={0.5} />
      </mesh>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[0, 0.037, 0]} rotation={[0, (i / 5) * Math.PI, 0]}>
          <boxGeometry args={[0.6, 0.004, 0.012]} />
          <meshStandardMaterial color="#f4f8dc" />
        </mesh>
      ))}
    </group>
  )
}

function Lychees({ surf }: { surf: Surf }) {
  const g = useRef<THREE.Group>(null)
  const spots: [number, number, number][] = [[-0.3, -1.0, 0.12], [0.22, -0.84, -0.22], [0.02, -0.45, 0.28]]
  useFrame(({ clock }) => {
    g.current!.children.forEach((m, i) => {
      const [, y] = spots[i]
      // sit where they sank, unless the drink has drained below them
      m.position.y = Math.min(y + (calm ? 0 : Math.sin(clock.elapsedTime * 0.9 + i) * 0.015), surf() - 0.16)
    })
  })
  return (
    <group ref={g}>
      {spots.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} scale={[1, 0.92, 1]}>
          <sphereGeometry args={[0.16, 24, 16]} />
          <meshPhysicalMaterial color="#f7f2e8" roughness={0.25} transmission={0.25} thickness={0.3} clearcoat={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function Bubbles({ surf }: { surf: Surf }) {
  const COUNT = 70
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const p = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const y = BOTTOM + Math.random() * 2.4
      const r = Math.sqrt(Math.random()) * innerR(y, 0.2)
      const a = Math.random() * Math.PI * 2
      p.set([Math.cos(a) * r, y, Math.sin(a) * r], i * 3)
    }
    g.setAttribute('position', new THREE.BufferAttribute(p, 3))
    return g
  }, [])
  const speed = useMemo(() => Float32Array.from({ length: COUNT }, () => 0.25 + Math.random() * 0.5), [])
  useFrame((_, dt) => {
    if (calm) return
    const pos = geo.attributes.position as THREE.BufferAttribute
    const top = surf() - 0.02
    for (let i = 0; i < COUNT; i++) {
      let y = pos.getY(i) + speed[i] * dt
      if (y > top) y = BOTTOM + Math.random() * 0.2 // popped: a new one starts at the bottom
      pos.setY(i, y)
      pos.setX(i, pos.getX(i) + Math.sin(y * 9 + i) * 0.0015) // a little wander
    }
    pos.needsUpdate = true
  })
  return (
    <points geometry={geo}>
      <pointsMaterial color="#ffffff" size={0.045} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  )
}

function Steam() {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    g.current!.children.forEach((m, i) => {
      const phase = (t * 0.35 + i / 3) % 1 // each puff rises from the rim and fades
      const mesh = m as THREE.Mesh
      mesh.position.set(Math.sin(t * 0.8 + i * 2) * 0.18 - 0.15 + i * 0.12, 1.45 + phase * 1.1, Math.cos(t * 0.6 + i) * 0.1)
      mesh.scale.setScalar(0.5 + phase * 1.1)
      ;(mesh.material as THREE.MeshBasicMaterial).opacity = (calm ? 0.25 : Math.sin(phase * Math.PI) * 0.32)
    })
  })
  return (
    <group ref={g}>
      {[0, 1, 2].map((i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.22, 16, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function Flowers({ surf }: { surf: Surf }) {
  const g = useRef<THREE.Group>(null)
  const spots: [number, number][] = [[-0.3, 0.1], [0.25, -0.25], [0.12, 0.35]]
  useFrame(({ clock }) => {
    g.current!.children.forEach((m, i) => {
      m.position.y = surf() - 0.015 + (calm ? 0 : Math.sin(clock.elapsedTime * 1.2 + i * 1.7) * 0.012)
      if (!calm) m.rotation.y += 0.002 * (i % 2 ? 1 : -1)
    })
  })
  // a dried chrysanthemum head: a ring of thin yellow petals round an amber centre
  return (
    <group ref={g}>
      {spots.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]} rotation={[0.15 * i, i, 0]}>
          {Array.from({ length: 14 }, (_, k) => (
            <mesh key={k} rotation={[0, (k / 14) * Math.PI * 2, 0.12]} position={[Math.cos((k / 14) * Math.PI * 2) * 0.1, 0, -Math.sin((k / 14) * Math.PI * 2) * 0.1]}>
              <boxGeometry args={[0.16, 0.02, 0.045]} />
              <meshStandardMaterial color="#f2c94c" roughness={0.7} />
            </mesh>
          ))}
          <mesh>
            <sphereGeometry args={[0.07, 14, 10]} />
            <meshStandardMaterial color="#c98a2b" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Plum() {
  return (
    <mesh position={[0.12, BOTTOM + 0.15, 0.1]} scale={[1, 0.85, 1]} rotation={[0.3, 0, 0.2]}>
      <icosahedronGeometry args={[0.18, 2]} />
      <meshStandardMaterial color="#6e1a1a" roughness={0.85} flatShading />
    </mesh>
  )
}

function Grains() {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const COUNT = 28
  useLayoutEffect(() => {
    const m = mesh.current!
    const o = new THREE.Object3D()
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random()) * innerR(BOTTOM, 0.12)
      o.position.set(Math.cos(a) * r, BOTTOM + 0.04 + Math.random() * 0.05, Math.sin(a) * r)
      o.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3)
      o.updateMatrix()
      m.setMatrixAt(i, o.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[0.045, 8, 6]} />
      <meshStandardMaterial color="#d8be78" roughness={0.9} />
    </instancedMesh>
  )
}

function Powder({ surf }: { surf: Surf }) {
  const g = useRef<THREE.Group>(null)
  useFrame(() => {
    // heaped well above the rim on a full glass; slumps down with the drink as it drains
    g.current!.position.y = surf() + 0.22
  })
  return (
    <group ref={g}>
      <mesh scale={[1, 0.62, 1]}>
        <sphereGeometry args={[0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#5c3a22" roughness={1} />
      </mesh>
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[Math.cos(i * 2.4) * (0.2 + (i % 4) * 0.15), 0.32 - (i % 4) * 0.08, Math.sin(i * 2.4) * (0.2 + (i % 4) * 0.15)]}>
          <icosahedronGeometry args={[0.07, 0]} />
          <meshStandardMaterial color="#4a2e1a" roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  )
}

export function Extras({ extras = [], surf }: { extras?: Extra[]; surf: Surf }) {
  const has = (e: Extra) => extras.includes(e)
  // keyed by the set, so a new drink re-pops its props
  return (
    <group key={extras.join(',')}>
      {has('lime') && <Pop><Lime surf={surf} /></Pop>}
      {has('lychee') && <Pop><Lychees surf={surf} /></Pop>}
      {has('bubbles') && <Bubbles surf={surf} />}
      {has('steam') && <Steam />}
      {has('flowers') && <Pop><Flowers surf={surf} /></Pop>}
      {has('plum') && <Pop><Plum /></Pop>}
      {has('grains') && <Pop><Grains /></Pop>}
      {has('powder') && <Pop><Powder surf={surf} /></Pop>}
    </group>
  )
}
