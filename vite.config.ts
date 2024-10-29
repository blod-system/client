import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env.GOOGLE_MAP_API_KEY': JSON.stringify(env.GOOGLE_MAP_API_KEY),
      'process.env.GOOGLE_MAP_ID': JSON.stringify(env.GOOGLE_MAP_ID),
    },
    plugins: [react()],
  }
})
