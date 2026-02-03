import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import LoadingScreen from '@/components/LoadingScreen'

// ============================================
// FONT CONFIGURATION
// Premium typography with variable fonts
// ============================================

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// ============================================
// METADATA
// SEO and social sharing configuration
// ============================================

export const metadata: Metadata = {
  title: 'Danik Studios | Immersive Horror & Realistic Interactive Experiences',
  description: 'An indie game studio crafting immersive horror games and realistic interactive experiences. Pushing the boundaries of fear and realism in gaming.',
  keywords: ['game studio', 'indie games', 'horror games', 'interactive experiences', 'Unreal Engine', 'Danik Studios'],
  authors: [{ name: 'Danik Studios' }],
  creator: 'Danik Studios',
  publisher: 'Danik Studios',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danikstudios.com',
    siteName: 'Danik Studios',
    title: 'Danik Studios | Immersive Horror & Realistic Interactive Experiences',
    description: 'An indie game studio crafting immersive horror games and realistic interactive experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Danik Studios',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danik Studios',
    description: 'Immersive Horror & Realistic Interactive Experiences',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// ============================================
// ROOT LAYOUT
// ============================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans bg-dark-900 text-text-primary antialiased">
        <LoadingScreen />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
