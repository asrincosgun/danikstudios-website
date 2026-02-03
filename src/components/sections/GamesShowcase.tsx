'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

// ============================================
// GAMES SHOWCASE SECTION (OPTIMIZED)
// Performance-optimized horizontal carousel
// ============================================

// Game data - Danik Studios titles
const games = [
  {
    id: 1,
    title: 'Paraplasm: Beyond the Veil',
    description: '"Paraplasm: Beyond the Veil" is a psychological horror game that pushes the boundaries of the afterlife. In a world filled with mysterious ectoplasm activity and chilling paranormal phenomena, players will find themselves heading into the heart of darkness.',
    genre: 'Psychological Horror',
    status: 'Released',
    year: '2024',
    color: '#00f0ff',
    gradient: 'from-cyan-500/20 to-blue-600/20',
    link: 'https://store.steampowered.com/app/2913670/Paraplasm_Beyond_the_Veil/',
  },
  {
    id: 2,
    title: 'Rogue 21',
    description: 'WELCOME TO THE GAMBLE-STATE. In the near future, humanity fell in love with probability. You are a Rogue Process, a former auditor turned probability distorter. Rogue 21 is a high-energy roguelike deckbuilder where standard Blackjack rules collide with illegal "Exploit" perks.',
    genre: 'Roguelike Deckbuilder',
    status: 'Coming Soon',
    year: '2026',
    color: '#8b5cf6',
    gradient: 'from-purple-500/20 to-violet-600/20',
    link: 'https://store.steampowered.com/app/4276110/Rogue_21/?curator_clanid=44973762',
  },
  {
    id: 3,
    title: 'JINNI 2: The Ritual',
    description: 'JINNI 2: The Ritual is a ritual-based psychological horror experience inspired by real Anatolian jinn folklore. You enter a house where a ceremony was started years ago… and never finished. Something waits for you in the dark, something that remembers the ritual better than you do.',
    genre: 'Psychological Horror',
    status: 'In Development',
    year: '2026',
    color: '#ff00aa',
    gradient: 'from-pink-500/20 to-rose-600/20',
    link: 'https://store.steampowered.com/app/4197980/JINNI_2__The_Ritual',
  },
  {
    id: 4,
    title: 'Traceback',
    description: 'Traceback is an ultra-realistic multiplayer first-person shooter developed with the latest advancements of Unreal Engine 5. Designed to push the boundaries of realism and photorealism, offering intense, bodycam-style firefights where every choice matters.',
    genre: 'Tactical FPS',
    status: 'Early Development',
    year: '2027',
    color: '#ffd700',
    gradient: 'from-amber-500/20 to-yellow-600/20',
    link: 'https://store.steampowered.com/app/3654830/Traceback/?curator_clanid=44973762',
  },
]

// Optimized 3D Tilt Card Component
function GameCard({
  game,
  index,
}: {
  game: typeof games[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const rafRef = useRef<number>()

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Lighter spring physics for better performance
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
      rafRef.current = undefined
    })
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = undefined
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative flex-shrink-0 w-[350px] md:w-[400px] lg:w-[450px] snap-item will-change-transform"
    >
      <div
        className={`relative h-[500px] md:h-[550px] rounded-3xl overflow-hidden bg-gradient-to-br ${game.gradient} border border-white/10 transition-shadow duration-300`}
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px ${game.color}40`
            : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${game.color}20 0%, transparent 50%)`,
          }}
        />

        {/* Card content */}
        <div className="relative h-full p-8 flex flex-col justify-between z-10">
          {/* Top section */}
          <div>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: game.color }}
              />
              <span className="text-xs font-medium tracking-wider uppercase text-text-secondary">
                {game.status}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-tight">
              {game.title}
            </h3>

            {/* Genre tag */}
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{
                backgroundColor: `${game.color}20`,
                color: game.color,
              }}
            >
              {game.genre}
            </div>

            {/* Description */}
            <p className="text-text-secondary leading-relaxed text-sm md:text-base">
              {game.description}
            </p>
          </div>

          {/* Bottom section */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <span className="text-sm text-text-muted">
              {game.status === 'Released' ? 'Released' : `Expected ${game.year}`}
            </span>
            <a
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: game.color }}
            >
              {game.status === 'Released' ? 'Play Now' : 'Wishlist'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Simplified hover glow */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background: `radial-gradient(circle at center, ${game.color}10, transparent 70%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

export default function GamesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Scroll progress for parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  // Throttled scroll check
  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll, { passive: true })
      checkScroll()
      return () => container.removeEventListener('scroll', checkScroll)
    }
  }, [checkScroll])

  // Scroll controls
  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 400
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }, [])

  return (
    <section ref={sectionRef} id="games" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background - reduced blur */}
      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[80px]" />
      </motion.div>

      {/* Section Header */}
      <div className="container-wide mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-accent-primary text-sm tracking-[0.3em] uppercase font-medium mb-4 block">
              Our Games
            </span>
            <h2 className="text-display-md font-display font-bold text-white">
              Worlds We&apos;re Creating
            </h2>
          </div>
          <p className="text-text-secondary max-w-md">
            Each project is a labor of love, designed to deliver unforgettable experiences
            that push the boundaries of gaming.
          </p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Scroll buttons */}
        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-full bg-dark-600/80 flex items-center justify-center transition-opacity hover:bg-dark-500/80 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-full bg-dark-600/80 flex items-center justify-center transition-opacity hover:bg-dark-500/80 ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none" />

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 px-8 md:px-20 lg:px-32 overflow-x-auto horizontal-scroll pb-8"
          style={{ perspective: '1000px' }}
        >
          {games.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </div>

      {/* Scroll indicator dots */}
      <div className="flex justify-center gap-2 mt-8">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!scrollContainerRef.current) return
              const cardWidth = 450 + 32
              scrollContainerRef.current.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth',
              })
            }}
            className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
          />
        ))}
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />
    </section>
  )
}
