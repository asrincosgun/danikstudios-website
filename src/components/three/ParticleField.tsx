'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ============================================
// 3D PARTICLE FIELD (OPTIMIZED)
// Performance-optimized particle system
// ============================================

// Throttle helper for mouse events
function throttle<Args extends unknown[]>(func: (...args: Args) => void, limit: number): (...args: Args) => void {
  let inThrottle: boolean
  return (...args: Args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

function Particles({ count = 1500, mouse }: { count?: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Points>(null)
  const lastTime = useRef(0)

  // Generate random particle positions in a sphere (memoized)
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 10 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      const t = Math.random()
      colors[i3] = t * 0.55
      colors[i3 + 1] = 0.94 - t * 0.58
      colors[i3 + 2] = 1 - t * 0.04
    }

    return { positions, colors }
  }, [count])

  // Throttled animation (runs at ~30fps instead of 60fps)
  useFrame((state) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime()
    // Skip frames for performance (update every ~33ms)
    if (time - lastTime.current < 0.033) return
    lastTime.current = time

    ref.current.rotation.x = time * 0.02 + mouse.current.y * 0.1
    ref.current.rotation.y = time * 0.03 + mouse.current.x * 0.1
    ref.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.02)
  })

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors} stride={3} frustumCulled>
      <PointMaterial
        transparent
        vertexColors
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

interface ParticleFieldProps {
  className?: string
}

export default function ParticleField({ className = '' }: ParticleFieldProps) {
  const mouseRef = useRef({ x: 0, y: 0 })

  // Throttled mouse handler (60ms throttle)
  const handleMouseMove = useMemo(
    () =>
      throttle((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseRef.current = {
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        }
      }, 60),
    []
  )

  return (
    <div className={`absolute inset-0 ${className}`} onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={1}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        performance={{ min: 0.5 }}
        className="three-canvas"
      >
        <Particles count={1200} mouse={mouseRef} />
        <fog attach="fog" args={['#000000', 10, 30]} />
      </Canvas>
    </div>
  )
}
