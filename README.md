# Danik Studios - Premium Cinematic Landing Page

A premium, Apple-style cinematic landing page for Danik Studios, an indie game studio specializing in immersive horror and realistic interactive experiences.

## Features

- **Scroll-Driven Animations**: Smooth cinematic animations triggered by scroll
- **3D Elements**: Interactive particle fields and geometric shapes using Three.js/React Three Fiber
- **Parallax Effects**: Multi-layered depth effects with mouse tracking
- **Premium Typography**: Carefully crafted typography with Space Grotesk and Inter fonts
- **Dark Theme**: High contrast visual style with neon accents
- **Fully Responsive**: Desktop-first design that works beautifully on all devices
- **Performance Optimized**: GPU-friendly animations using transforms and opacity

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Three.js / React Three Fiber** - 3D graphics
- **Lenis** - Smooth scroll

## Sections

1. **Hero** - Full-screen 3D particle background with studio branding
2. **Studio Identity** - Apple-style text reveals and philosophy cards
3. **Games Showcase** - Horizontal carousel with 3D tilt cards
4. **Featured Game** - Scroll-driven 3D cinematic experience
5. **Technology** - Animated tech stack cards
6. **Contact** - CTA with glow effects and social links

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Setup

1. Push your code to a GitHub repository
2. Go to your repository Settings → Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. The site will automatically deploy when you push to the `main` branch

### Manual Deployment

```bash
npm run build
```

The static files will be generated in the `out/` directory.

### Custom Domain

If you're deploying to a subdirectory (e.g., `username.github.io/repo-name`), uncomment and update these lines in `next.config.js`:

```javascript
basePath: '/your-repo-name',
assetPrefix: '/your-repo-name/',
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with fonts
│   │   ├── page.tsx        # Main page component
│   │   └── globals.css     # Global styles
│   └── components/
│       ├── sections/       # Page sections
│       │   ├── Hero.tsx
│       │   ├── StudioIdentity.tsx
│       │   ├── GamesShowcase.tsx
│       │   ├── FeaturedGame.tsx
│       │   ├── Technology.tsx
│       │   └── Contact.tsx
│       ├── three/          # Three.js components
│       │   ├── ParticleField.tsx
│       │   └── FeaturedScene.tsx
│       ├── Navigation.tsx
│       ├── LoadingScreen.tsx
│       └── SmoothScroll.tsx
├── public/                 # Static assets
├── .github/workflows/      # GitHub Actions
└── next.config.js         # Next.js configuration
```

## Customization

### Colors

Edit the color palette in `tailwind.config.ts`:

```typescript
colors: {
  accent: {
    primary: '#00f0ff',    // Cyan
    secondary: '#ff00aa',  // Magenta
    purple: '#8b5cf6',     // Purple
  }
}
```

### Content

Update game information in `src/components/sections/GamesShowcase.tsx` and other section components.

### Animations

Framer Motion animations can be customized in each component. Key animation properties:

- `initial` - Starting state
- `animate` - End state
- `transition` - Animation timing
- `whileInView` - Scroll-triggered animations

## Performance Tips

- Three.js scenes use `dpr={[1, 2]}` for optimal rendering
- Animations use `transform` and `opacity` for GPU acceleration
- Lazy loading with `dynamic()` for Three.js components
- Smooth scroll with Lenis for consistent 60fps

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this template for your own projects.

---

Built with passion by Danik Studios
