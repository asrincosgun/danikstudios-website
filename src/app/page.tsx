'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import StudioIdentity from '@/components/sections/StudioIdentity'
import GamesShowcase from '@/components/sections/GamesShowcase'
import FeaturedGame from '@/components/sections/FeaturedGame'
import Technology from '@/components/sections/Technology'
import Contact from '@/components/sections/Contact'

// ============================================
// MAIN PAGE
// Danik Studios - Premium Cinematic Landing Page
// ============================================

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-900">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Hero Section - Full screen with 3D particles */}
      <Hero />

      {/* Studio Identity - About section with scroll animations */}
      <StudioIdentity />

      {/* Games Showcase - Horizontal carousel with 3D cards */}
      <GamesShowcase />

      {/* Featured Game - Cinematic scroll-driven 3D section */}
      <FeaturedGame />

      {/* Technology - Animated tech stack cards */}
      <Technology />

      {/* Contact - CTA and footer */}
      <Contact />
    </main>
  )
}
