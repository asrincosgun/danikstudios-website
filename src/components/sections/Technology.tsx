'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

// ============================================
// TECHNOLOGY SECTION
// Showcase of tech stack with animated cards
// ============================================

// Technology data
const technologies = [
  {
    name: 'Unreal Engine 5',
    description: 'Leveraging Nanite, Lumen, and MetaHumans for photorealistic visuals and dynamic lighting.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zM8.182 7.09v9.82l7.636-4.91-7.636-4.91z" />
      </svg>
    ),
    color: '#00f0ff',
  },
  {
    name: 'Advanced AI Systems',
    description: 'Custom AI that learns player behavior and adapts horror encounters in real-time.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    color: '#8b5cf6',
  },
  {
    name: 'Procedural Generation',
    description: 'Infinite replayability through algorithmic level design and dynamic event systems.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    color: '#ff00aa',
  },
  {
    name: '3D Spatial Audio',
    description: 'Immersive soundscapes that react to your position and create true environmental horror.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    color: '#ffd700',
  },
  {
    name: 'Ray Tracing',
    description: 'Real-time ray-traced reflections, shadows, and global illumination for cinematic quality.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    color: '#3b82f6',
  },
  {
    name: 'Cross-Platform',
    description: 'Optimized for PC, PlayStation 5, and Xbox Series X|S with seamless cross-save support.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    color: '#10b981',
  },
]

// Animated Tech Card Component
function TechCard({
  tech,
  index,
}: {
  tech: typeof technologies[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div
        className="relative h-full p-8 rounded-3xl glass transition-all duration-500 overflow-hidden"
        style={{
          borderColor: isHovered ? `${tech.color}40` : 'rgba(255,255,255,0.1)',
          boxShadow: isHovered ? `0 0 40px ${tech.color}20` : 'none',
        }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${tech.color}15, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative mb-6 inline-flex p-4 rounded-2xl transition-colors duration-300"
          style={{
            backgroundColor: isHovered ? `${tech.color}20` : 'rgba(255,255,255,0.05)',
            color: tech.color,
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {tech.icon}
        </motion.div>

        {/* Title */}
        <h3 className="relative text-xl font-display font-semibold text-white mb-3">
          {tech.name}
        </h3>

        {/* Description */}
        <p className="relative text-text-secondary leading-relaxed">
          {tech.description}
        </p>

        {/* Animated border line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5"
          style={{ backgroundColor: tech.color }}
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
        <motion.div
          className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-accent-purple/5 rounded-full blur-[150px]"
          style={{ y }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[120px]"
          style={{ y: useTransform(y, (v) => -v * 0.5) }}
        />
      </motion.div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-accent-primary text-sm tracking-[0.3em] uppercase font-medium mb-4 block">
            Our Technology
          </span>
          <h2 className="text-display-md font-display font-bold text-white mb-6">
            Built for the Future
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            We harness cutting-edge technology to create experiences that are visually stunning,
            technically impressive, and deeply immersive.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {technologies.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-text-secondary mb-6">
            Interested in the technical details behind our games?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-accent-primary font-medium animated-underline"
          >
            <span>Read our development blog</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />
    </section>
  )
}
