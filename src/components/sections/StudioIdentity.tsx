'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

// ============================================
// STUDIO IDENTITY SECTION
// Apple-style text reveals and cinematic motion
// ============================================

// Text reveal animation component
function RevealText({
  children,
  delay = 0,
  className = '',
}: {
  children: string
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Split text into words for staggered animation
  const words = children.split(' ')

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

// Animated stat counter
function StatCounter({
  value,
  suffix = '',
  label,
  delay = 0,
}: {
  value: string
  suffix?: string
  label: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient">
        {value}
        <span className="text-accent-primary">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-text-secondary uppercase tracking-wider">{label}</div>
    </motion.div>
  )
}

export default function StudioIdentity() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
        {/* Large gradient orb */}
        <motion.div
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[150px]"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute top-1/4 right-0 translate-x-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[120px]"
          style={{ y: y2 }}
        />
      </motion.div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto text-center mb-24">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-accent-primary text-sm tracking-[0.3em] uppercase font-medium">
              Our Story
            </span>
          </motion.div>

          {/* Main Headline - Apple style big text */}
          <RevealText
            className="text-display-md md:text-display-lg font-display font-bold text-white mb-8"
            delay={0.1}
          >
            We craft experiences that blur the line between reality and imagination
          </RevealText>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            At Danik Studios, we believe in pushing the boundaries of interactive entertainment.
            Our team combines cutting-edge technology with visceral storytelling to create
            games that leave lasting impressions.
          </motion.p>
        </div>

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              title: 'Immersion First',
              description:
                'Every pixel, every sound, every interaction is designed to pull you deeper into our worlds. We obsess over the details that make experiences feel real.',
              icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ),
            },
            {
              title: 'Fear as Art',
              description:
                'Horror is our canvas. We study what makes people afraid and use that knowledge to craft experiences that are genuinely unsettling and memorable.',
              icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
            },
            {
              title: 'Technical Excellence',
              description:
                'We leverage the latest in game technology to deliver photorealistic visuals and seamless gameplay. No compromises on quality.',
              icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative p-8 rounded-3xl glass hover:bg-white/[0.08] transition-all duration-500"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-accent-primary/10 text-accent-primary group-hover:bg-accent-primary/20 transition-colors duration-300">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-display font-semibold text-white mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed">
                {card.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-purple/10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative py-16"
        >
          {/* Decorative line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCounter value="4" suffix="+" label="Games in Development" delay={0} />
            <StatCounter value="12" suffix="" label="Team Members" delay={0.1} />
            <StatCounter value="5" suffix="+" label="Years Experience" delay={0.2} />
            <StatCounter value="∞" suffix="" label="Passion for Horror" delay={0.3} />
          </div>

          {/* Decorative line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mt-24"
        >
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-white/90 leading-relaxed italic">
            &ldquo;We don&apos;t just make games. We create nightmares you&apos;ll want to revisit.&rdquo;
          </blockquote>
          <div className="mt-8 text-text-secondary">
            <span className="font-medium text-white">The Danik Studios Team</span>
          </div>
        </motion.div>
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50" />
    </section>
  )
}
