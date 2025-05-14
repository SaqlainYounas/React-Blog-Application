import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // enables global test methods like 'describe', 'it', etc.
    environment: 'jsdom', // allows you to simulate a browser environment
    setupFiles: './src/setupTests.ts', // if you have setup logic
  },
})
