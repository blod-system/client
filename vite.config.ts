import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_PRODUCT_API_URL, VITE_API_URL } = env

  return {
    server: {
      proxy: {
        [`${VITE_API_URL}`]: {
          target: VITE_PRODUCT_API_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(VITE_API_URL, '')
        },
      },
    },
    define: {
      __VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
