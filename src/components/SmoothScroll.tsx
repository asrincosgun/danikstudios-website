'use client'

import { useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'

// ============================================
// SMOOTH SCROLL PROVIDER
// Uses Lenis for silky smooth scrolling
// ============================================

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Request animation frame loop for smooth updates
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
