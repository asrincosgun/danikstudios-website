'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// ============================================
// CINEMATIC LOADING SCREEN
// Premium intro animation on page load
// ============================================

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        // Accelerating progress for more realistic feel
        const increment = Math.random() * 15 + (prev > 80 ? 5 : 10)
        return Math.min(prev + increment, 100)
      })
    }, 100)

    // Complete loading after progress reaches 100
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-900"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[100px]"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Logo / Studio name */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Logo mark */}
            <motion.div
              className="mb-8 relative"
              animate={{
                filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-24 h-24 relative">
                <Image
                  src="/logo.png"
                  alt="Danik Studios Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                  priority
                />
                {/* Glow effect */}
                <div className="absolute inset-0 blur-xl bg-blue-500/30 -z-10" />
              </div>
            </motion.div>

            {/* Studio name */}
            <motion.h1
              className="text-2xl md:text-3xl font-display font-bold tracking-wider text-white mb-2"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.2em' }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              DANIK STUDIOS
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-sm text-text-secondary tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Loading Experience
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="mt-8 w-48 h-0.5 bg-dark-600 rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Progress percentage */}
            <motion.span
              className="mt-3 text-xs font-mono text-text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </motion.div>

          {/* Noise overlay */}
          <div className="absolute inset-0 noise-overlay pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
