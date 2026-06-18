import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: './',
  base: '/',
  publicDir: 'public',
  
//   server: {
//     port: 3000,
//     open: true,
//     host: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true
//       }
//     }
//   },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild'
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})
