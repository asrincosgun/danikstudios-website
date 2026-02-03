'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ============================================
// 3D FEATURED GAME SCENE (OPTIMIZED)
// Performance-optimized dramatic 3D elements
// ============================================

// Simplified floating geometric shapes
function FloatingShapes({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  const lastTime = useRef(0)

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    // Throttle updates
    if (time - lastTime.current < 0.033) return
    lastTime.current = time

    groupRef.current.rotation.y = scrollProgress * Math.PI * 0.5 + time * 0.1
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1

    const scale = Math.min(viewport.width, viewport.height) * 0.15
    groupRef.current.scale.setScalar(scale)

    // Animate central mesh
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.3
      meshRef.current.rotation.z = time * 0.2
    }
  })

  // Memoize satellite positions
  const satellites = useMemo(() => {
    return [...Array(4)].map((_, i) => {
      const angle = (i / 4) * Math.PI * 2
      const radius = 3
      return {
        position: [Math.cos(angle) * radius, Math.sin(angle * 2) * 0.5, Math.sin(angle) * radius] as [number, number, number],
        color: i % 2 === 0 ? '#00f0ff' : '#8b5cf6',
      }
    })
  }, [])

  return (
    <group ref={groupRef}>
      {/* Central icosahedron - simplified material */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Orbiting rings - reduced segments */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 8, 48]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.015, 8, 48]} />
        <meshBasicMaterial color="#ff00aa" />
      </mesh>

      {/* Satellite spheres - reduced count and segments */}
      {satellites.map((sat, i) => (
        <mesh key={i} position={sat.position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color={sat.color} />
        </mesh>
      ))}
    </group>
  )
}

// Simplified ambient particles
function AmbientParticles() {
  const ref = useRef<THREE.Points>(null)
  const lastTime = useRef(0)

  const particles = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
    }

    return positions
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()
    if (time - lastTime.current < 0.05) return
    lastTime.current = time
    ref.current.rotation.y = time * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

// Optimized camera controller
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  const lastTime = useRef(0)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (time - lastTime.current < 0.033) return
    lastTime.current = time

    const targetZ = 8 - scrollProgress * 3
    const targetY = scrollProgress * 2
    const targetX = Math.sin(scrollProgress * Math.PI) * 2

    camera.position.x += (targetX - camera.position.x) * 0.08
    camera.position.y += (targetY - camera.position.y) * 0.08
    camera.position.z += (targetZ - camera.position.z) * 0.08

    camera.lookAt(0, 0, 0)
  })

  return null
}

interface FeaturedSceneProps {
  scrollProgress: number
  className?: string
}

export default function FeaturedScene({ scrollProgress, className = '' }: FeaturedSceneProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={1}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        performance={{ min: 0.5 }}
      >
        {/* Simplified lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

        {/* Scene elements */}
        <FloatingShapes scrollProgress={scrollProgress} />
        <AmbientParticles />

        {/* Camera animation */}
        <CameraController scrollProgress={scrollProgress} />

        {/* Fog */}
        <fog attach="fog" args={['#000000', 5, 20]} />
      </Canvas>
    </div>
  )
}
