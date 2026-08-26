import { defineConfig, type Plugin } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const spaComponentsRoute = (): Plugin => ({
  name: 'shomaui-spa-components-route',
  enforce: 'pre',
  configureServer(server) {
    server.middlewares.use((request, _response, next) => {
      const pathname = request.url?.split('?', 1)[0]

      if (pathname === '/components') {
        request.url = '/index.html'
      }

      next()
    })
  },
})

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    spaComponentsRoute(),
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
  ],
})

export default config
