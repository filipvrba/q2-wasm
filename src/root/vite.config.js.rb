
import ['VitePWA'], 'vite-plugin-pwa'

export default = {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['**/*'],
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        globPatterns: ['**/*'],
        maximumFileSizeToCacheInBytes: 30 * 1024 * 1024,
      },
      manifest: {
        name: 'Quake 2',
        "short_name" => 'Quake 2',
        "theme_color" => '#202020',
        "background_color" => "#202020",
        display: "standalone",
        icons: [
          {
            src: './web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: "maskable",
          },
          {
            src: './web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
}
