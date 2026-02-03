'use client'

import { useRef, RefObject } from 'react'
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// ============================================
// SCROLL ANIMATION HOOKS
// Reusable hooks for scroll-driven animations
// ============================================

interface ScrollAnimationOptions {
  offset?: [string, string]
  springConfig?: {
    stiffness?: number
    damping?: number
    restDelta?: number
  }
}

/**
 * Hook for parallax scroll effect
 * Returns a motion value that moves at a different rate than scroll
 */
export function useParallax(
  ref: RefObject<HTMLElement>,
  distance: number = 100,
  options?: ScrollAnimationOptions
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options?.offset || ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance])

  return useSpring(y, {
    stiffness: options?.springConfig?.stiffness ?? 100,
    damping: options?.springConfig?.damping ?? 30,
    restDelta: options?.springConfig?.restDelta ?? 0.001,
  })
}

/**
 * Hook for fade-in on scroll
 * Returns opacity and y transform values
 */
export function useFadeInOnScroll(
  ref: RefObject<HTMLElement>,
  options?: ScrollAnimationOptions
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options?.offset || ['start end', 'center center'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  return {
    opacity: useSpring(opacity, options?.springConfig),
    y: useSpring(y, options?.springConfig),
  }
}

/**
 * Hook for scale on scroll
 * Returns a scale value based on scroll position
 */
export function useScaleOnScroll(
  ref: RefObject<HTMLElement>,
  options?: ScrollAnimationOptions
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options?.offset || ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return useSpring(scale, {
    stiffness: options?.springConfig?.stiffness ?? 100,
    damping: options?.springConfig?.damping ?? 30,
  })
}

/**
 * Hook for scroll progress within a section
 * Returns normalized progress (0-1) and section ref
 */
export function useSectionProgress(options?: ScrollAnimationOptions) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options?.offset || ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: options?.springConfig?.stiffness ?? 100,
    damping: options?.springConfig?.damping ?? 30,
    restDelta: options?.springConfig?.restDelta ?? 0.001,
  })

  return { ref, progress: smoothProgress }
}

/**
 * Hook for reveal animation on scroll
 * Returns style values for a reveal effect
 */
export function useRevealOnScroll(
  ref: RefObject<HTMLElement>,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  options?: ScrollAnimationOptions
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options?.offset || ['start end', 'center center'],
  })

  const distance = 100

  const transforms = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const x = useTransform(scrollYProgress, [0, 0.5], [transforms[direction].x, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [transforms[direction].y, 0])

  return {
    opacity: useSpring(opacity, options?.springConfig),
    x: useSpring(x, options?.springConfig),
    y: useSpring(y, options?.springConfig),
  }
}
