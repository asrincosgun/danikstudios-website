'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamic import for Three.js component
const FeaturedScene = dynamic(() => import('@/components/three/FeaturedScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-dark-900" />,
})

// ============================================
// FEATURED GAME CINEMATIC SECTION
// Scroll-driven 3D experience with text reveals
// ============================================

// Feature milestones that appear at scroll checkpoints
const milestones = [
  {
    title: 'Paraplasm: Beyond the Veil',
    subtitle: 'Our Flagship Horror Experience',
    description: 'A psychological horror game that pushes the boundaries of the afterlife',
  },
  {
    title: 'Into the Unknown',
    subtitle: 'Paranormal Investigation',
    description: 'Mysterious ectoplasm activity and chilling paranormal phenomena await as you head into the heart of darkness',
  },
  {
    title: 'Fear the Unseen',
    subtitle: 'Psychological Terror',
    description: 'Experience true horror where the line between the living and the dead becomes dangerously thin',
  },
  {
    title: 'Available Now',
    subtitle: 'Play on Steam',
    description: 'Step beyond the veil and discover what lurks in the shadows',
  },
]

export default function FeaturedGame() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Calculate which milestone should be active based on scroll
  const currentMilestone = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3])

  // Pre-compute transforms for progress indicator dots
  const dotColor0 = useTransform(currentMilestone, [-0.5, 0, 0.5], ['rgba(255,255,255,0.2)', '#00f0ff', 'rgba(255,255,255,0.2)'])
  const dotColor1 = useTransform(currentMilestone, [0.5, 1, 1.5], ['rgba(255,255,255,0.2)', '#00f0ff', 'rgba(255,255,255,0.2)'])
  const dotColor2 = useTransform(currentMilestone, [1.5, 2, 2.5], ['rgba(255,255,255,0.2)', '#00f0ff', 'rgba(255,255,255,0.2)'])
  const dotColor3 = useTransform(currentMilestone, [2.5, 3, 3.5], ['rgba(255,255,255,0.2)', '#00f0ff', 'rgba(255,255,255,0.2)'])
  const dotColors = [dotColor0, dotColor1, dotColor2, dotColor3]

  // Pre-compute transforms for milestone content opacity
  const milestoneOpacity0 = useTransform(scrollYProgress, [-0.1, 0, 0.15, 0.25], [0, 1, 1, 0])
  const milestoneOpacity1 = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0])
  const milestoneOpacity2 = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0])
  const milestoneOpacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [0, 1, 1, 0])
  const milestoneOpacities = [milestoneOpacity0, milestoneOpacity1, milestoneOpacity2, milestoneOpacity3]

  // Pre-compute transforms for milestone content y position
  const milestoneY0 = useTransform(scrollYProgress, [-0.1, 0, 0.15, 0.25], [50, 0, 0, -50])
  const milestoneY1 = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [50, 0, 0, -50])
  const milestoneY2 = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [50, 0, 0, -50])
  const milestoneY3 = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [50, 0, 0, -50])
  const milestoneYs = [milestoneY0, milestoneY1, milestoneY2, milestoneY3]

  // Pre-compute transform for feature highlights opacity
  const featureHighlightsOpacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1])

  // Pre-compute transform for scroll hint opacity
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh]" // Tall section for scroll-based animation
    >
      {/* Sticky container that holds the 3D scene and content */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D Background Scene */}
        <motion.div className="absolute inset-0">
          <FeaturedScene scrollProgress={scrollYProgress.get()} />
        </motion.div>

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/80 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-center container-wide">
          {/* Progress indicator */}
          <motion.div
            className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {milestones.map((_, index) => (
              <motion.div
                key={index}
                className="relative"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-white/20"
                  style={{
                    backgroundColor: dotColors[index],
                  }}
                />
                {index < milestones.length - 1 && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-px h-8 bg-white/10" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Milestone Content */}
          <div className="max-w-3xl ml-0 lg:ml-20">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  opacity: milestoneOpacities[index],
                  y: milestoneYs[index],
                }}
              >
                {/* Eyebrow */}
                <motion.span
                  className="text-accent-primary text-sm tracking-[0.3em] uppercase font-medium mb-4 block"
                >
                  {milestone.subtitle}
                </motion.span>

                {/* Title */}
                <h2 className="text-display-md md:text-display-lg font-display font-bold text-white mb-6">
                  {milestone.title}
                </h2>

                {/* Description */}
                <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-xl">
                  {milestone.description}
                </p>

                {/* CTA for last milestone */}
                {index === milestones.length - 1 && (
                  <motion.div
                    className="mt-8 flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <a
                      href="https://store.steampowered.com/app/2913670/Paraplasm_Beyond_the_Veil/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Play on Steam
                    </a>
                    <a
                      href="https://store.steampowered.com/app/2913670/Paraplasm_Beyond_the_Veil/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      Watch Trailer
                    </a>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Feature highlights */}
          <motion.div
            className="absolute bottom-12 left-0 right-0 container-wide"
            style={{
              opacity: featureHighlightsOpacity,
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Platform', value: 'PC (Steam)' },
                { label: 'Genre', value: 'Psychological Horror' },
                { label: 'Players', value: 'Single Player' },
                { label: 'Status', value: 'Available Now' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center md:text-left"
                >
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm md:text-base text-white font-medium">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: scrollHintOpacity,
          }}
        >
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <motion.svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </div>
        </motion.div>

        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />
      </div>
    </section>
  )
}
