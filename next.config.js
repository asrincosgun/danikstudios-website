/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  // Uncomment and modify if deploying to a subdirectory (e.g., username.github.io/repo-name)
  // basePath: '/danik-studios',
  // assetPrefix: '/danik-studios/',
}

module.exports = nextConfig
