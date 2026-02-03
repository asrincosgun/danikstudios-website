'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamic import for Three.js component (client-side only)
const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-dark-900" />,
})

// ============================================
// HERO SECTION (OPTIMIZED)
// Performance-optimized cinematic introduction
// ============================================

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Lighter spring for better performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.01,
  })

  // Transform values based on scroll
  const titleY = useTransform(smoothProgress, [0, 1], [0, 200])
  const titleOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const subtitleY = useTransform(smoothProgress, [0, 1], [0, 150])
  const subtitleOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0])
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.1])
  const backgroundOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0.3])

  // Optimized mouse parallax with RAF throttling
  const updateMousePosition = useCallback(() => {
    setMousePosition(mouseRef.current)
    rafRef.current = undefined
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseRef.current = {
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      }

      // Throttle with RAF
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateMousePosition)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateMousePosition])

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
    >
      {/* 3D Particle Background */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          scale: backgroundScale,
          opacity: backgroundOpacity,
        }}
      >
        <ParticleField />
      </motion.div>

      {/* Ambient gradient orbs - reduced blur for performance */}
      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-secondary/5 rounded-full blur-[60px]" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          style={{ opacity: subtitleOpacity, y: subtitleY }}
          className="mb-6"
        >
          <span className="text-sm md:text-base tracking-[0.3em] text-text-secondary uppercase font-light">
            Welcome to
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            opacity: titleOpacity,
            y: titleY,
          }}
          className="text-display-xl font-display font-bold text-center leading-none will-change-transform"
        >
          <span className="block text-white">Danik</span>
          <span className="block text-gradient">Studios</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          style={{ opacity: subtitleOpacity, y: subtitleY }}
          className="mt-8 text-lg md:text-xl lg:text-2xl text-text-secondary text-center max-w-2xl leading-relaxed"
        >
          Immersive Horror & Realistic Interactive Experiences
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          style={{ opacity: subtitleOpacity }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <a href="#games" className="btn-primary group">
            <span>Explore Our Games</span>
            <svg
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#about" className="btn-secondary">
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator - simplified animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        style={{ opacity: titleOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs tracking-widest text-text-muted uppercase">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Vignette effect */}
      <div className="absolute inset-0 vignette pointer-events-none" />
    </section>
  )
}
